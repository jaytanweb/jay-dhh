import * as dd from 'dingtalk-jsapi';
import { message } from 'antd';

// import { getSignature } from '@/v3/api/Dingtalk/api';

class Ding {
  constructor({ agentId, corpId }) {
    this.agentId = agentId;
    this.corpId = corpId;

    this.available = dd.env.platform !== 'notInDingTalk';
  }

  config() {
    if (!this.available) return;

    dd.ready(async () => {
      const agentId = this.agentId,
        corpId = this.corpId;

      // 为当前地址赋予权限
      const { origin, pathname, search } = window.location;
      const url = `${origin}${pathname}${search}`;

      // const signature = await getSignature({ url });

      // dd.config({
      //   ...signature,
      //   agentId,
      //   corpId,
      //   type: 0,
      //   jsApiList: [
      //     'biz.chat.pickConversation',
      //     'biz.chat.toConversation',
      //     'runtime.info',
      //     'biz.contact.choose',
      //     'device.notification.confirm',
      //     'device.notification.alert',
      //     'device.notification.prompt',
      //     // 'biz.ding.post',
      //     // 'biz.util.openLink',
      //   ],
      // });
    });
  }

  // 钉钉请求
  requestDing(cb, params = {}) {
    const corpId = this.corpId;

    return new Promise((resolve, reject) => {
      if (!this.available) {
        message.error('请在钉钉内操作');
        reject();
        return;
      }
      dd.ready(() => {
        cb({
          corpId,
          onSuccess: resolve,
          onFail: (err) => {
            message.error('钉钉接口异常，请稍后重试');
            message.error(err ? err.errorMessage : '未知错误');
            reject();
          },
          ...params,
        });
      });
    });
  }

  /**
   * @description 获取钉钉免登码
   * @return { string }
   */
  async requestAuthCode() {
    return this.requestDing(dd.runtime.permission.requestAuthCode);
  }

  // 选择对话
  async pickConversation() {
    await this.config();
    return this.requestDing(dd.biz.chat.pickConversation, {
      isConfirm: 'false',
      onFail: (err) => {
        if (err.errorCode === 3) return; // 此时是取消选择
        message.error(err ? err.errorMessage : '未知错误');
      },
    });
  }

  // 进入对话
  async toConversation(cid) {
    await this.config();
    return this.requestDing(dd.biz.chat.toConversation, { cid });
  }
}

export default new Ding({
  agentId: '-',
  corpId: '-',
});
