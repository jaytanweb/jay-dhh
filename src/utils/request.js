import { notification, Modal } from 'antd';

import axios from 'axios';

import { getSession, clearSession } from './session';
import { queryParams } from './format';

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '请求无效。',
  401: '未认证登陆。',
  403: '禁止访问。',
  404: '请求的 URL 找不到。',
  405: '请求的方式不允许。',
  410: '请求的资源被永久删除，且不会再得到的。',
  413: '上传的文件内容过大，请简化后重新操作',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};
// 重新登录
const reLogin = () => {
  Modal.destroyAll();
  Modal.warning({
    title: '登录失效',
    content: '点击确认重新登录',
    onOk() {
      clearSession();
      window.location.reload();
    },
  });
};

const handleErr = (axiosError) => {
  if (axiosError?.response?.status === 402) {
    reLogin();
    return axiosError;
  }

  const response = axiosError.response;

  const error =
    response?.data?.msg ||
    response?.data?.message || // 优先使用后端响应信息;
    codeMessage[response?.status] || // 其次使用 codeMessage;
    response?.statusText || // 或者 statusText;
    '未知错误信息';

  return {
    ...axiosError,
    message: error,
  };
};

export default class AxiosApi {
  // 不需要设置头部的接口； 默认返回一个空对象
  constructor(baseURL, withCredentials = true, getHeader = () => ({})) {
    this.OPS_INSTANCE = axios.create({
      baseURL,
      timeout: 180000,
      withCredentials,
    });

    this.getHeader = getHeader;
    this.request = this.request.bind(this);
    this.reqWithQuery = this.reqWithQuery.bind(this);
    this.reqWithBody = this.reqWithBody.bind(this);
    this.get = this.get.bind(this);
    this.post = this.post.bind(this);
    this.put = this.put.bind(this);
    this.patch = this.patch.bind(this);
    this.destroy = this.destroy.bind(this);
    this.deleteWithQuery = this.deleteWithQuery.bind(this);
  }

  request(opts) {
    let options = { ...opts };

    if (
      options.method === 'POST' ||
      options.method === 'PUT' ||
      options.method === 'PATCH' ||
      options.method === 'DELETE'
    ) {
      if (!(options.data instanceof FormData)) {
        options.headers = {
          Accept: 'application/json',
          'Content-Type': 'application/json; charset=utf-8',
          ...options.headers,
        };
        options.data = JSON.stringify(options.data);
      } else {
        // options.data is FormData
        options.headers = {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data; chartset=UTF-8',
          ...options.headers,
        };
      }
    }

    options.headers = { ...options.headers, ...this.getHeader() };

    return new Promise(async (resolve, reject) => {
      try {
        const response = await this.OPS_INSTANCE.request(options);
        resolve(response.data);
      } catch (err) {
        reject(handleErr(err));
      }
    });
  }

  reqWithQuery({ url, params, headersOpt, ...rest }, method = 'GET') {
    return this.request({
      url: `${url}${queryParams(params)}`,
      method,
      headers: {
        ...headersOpt,
      },
      ...rest,
    });
  }

  reqWithBody({ url, params, headersOpt, ...rest }, method = 'POST') {
    return this.request({
      ...rest,
      url: `${url}`,
      method,
      headers: {
        ...headersOpt,
      },
      data: params,
    });
  }

  get(url, params = {}, headersOpt = {}) {
    return this.reqWithQuery({ url, params, headersOpt }, 'GET');
  }

  // delete 为保留字
  // delete 请求允许通过 body 传递数据， 也可通过query
  deleteWithId(url, id, headersOpt = {}) {
    return this.request({ url: `${url}/${id}/`, headersOpt, method: 'DELETE' });
  }
  deleteWithQuery(url, params = {}, headersOpt = {}) {
    return this.reqWithQuery({ url, params, headersOpt }, 'DELETE');
  }
  // delete 请求允许通过 body 传递数据， 也可通过query
  destroy(url, params = {}, headersOpt = {}) {
    return this.reqWithBody({ url, params, headersOpt }, 'DELETE');
  }

  patch(url, params = {}, headersOpt = {}) {
    return this.reqWithBody({ url, params, headersOpt }, 'PATCH');
  }
  post(url, params = {}, headersOpt = {}) {
    return this.reqWithBody({ url, params, headersOpt }, 'POST');
  }

  put(url, params = {}, headersOpt = {}) {
    return this.reqWithBody({ url, params, headersOpt }, 'PUT');
  }

  // 当后端直接返回二进制文件时，触发下载
  download(url, filename, params, onDownloadProgress) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await this.reqWithQuery({
          url,
          params: params || {},
          headersOpt: {
            'Content-Type': 'application/json; application/octet-stream',
          },
          responseType: 'arraybuffer',
          onDownloadProgress, // {e : {loaded, total}}
        });
        downloadFile(response, filename);
        resolve();
      } catch (err) {
        console.log(err);
      }
    });
  }
  // 当后端直接返回二进制文件时，触发下载
  upload(url, params = {}, callcack = {}) {
    const { onUploadProgress = EmptyFunc, setCancelTokenSource = EmptyFunc } =
      callcack;

    return new Promise(async (resolve, reject) => {
      let options = {};

      if (setCancelTokenSource) {
        const cancelTokenSource = axios.CancelToken.source();
        options.cancelToken = cancelTokenSource.token;

        setCancelTokenSource(cancelTokenSource);
      }

      try {
        const response = await this.reqWithBody({
          url,
          params,
          headersOpt: { 'Content-Type': 'multipart/form-data; chartset=UTF-8' },
          onUploadProgress, // {e : {loaded, total}}
          ...options,
        });
        resolve(response);
      } catch (err) {
        console.log(err);
        reject(err);
      }
    });
  }
}

function downloadFile(data, filename) {
  try {
    const blob = new Blob([data], {
      encoding: 'UTF-8',
      // type: 'application/vnd.ms-excel',
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });
    if (window.navigator.msSaveOrOpenBlob) {
      navigator.msSaveOrOpenBlob(blob, filename);
    } else {
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = filename;

      link.click();
      window.URL.revokeObjectURL(link.href);
    }
  } catch (err) {
    console.log({ err });
  }
}

const EmptyFunc = () => null;
