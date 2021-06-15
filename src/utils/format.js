import { stringify } from 'qs';

/**
 * @author Elon 2019-04-01
 * @description 四舍五入， 并保留指定有效位数
 * @param {number} 处理的数字
 * @param {number} digit 保留小数位数
 */
export function formatRound(num, digit = 2) {
  return Math.round(num * Math.pow(10, digit)) / Math.pow(10, digit);
}

/**
 *  @description 字符串数字 / 数字 加上千分符
 *
 */

export function addCommas(nStr) {
  let [integerPart, decimalPart] = nStr.toString().split('.');
  const reg = /(\d+)(\d{3})/;
  while (reg.test(integerPart)) {
    integerPart = integerPart.replace(reg, '$1' + ',' + '$2');
  }
  return `${integerPart}${decimalPart === undefined ? '' : '.' + decimalPart}`;
}

export function queryParams(params) {
  return Object.keys(params).length > 0 ? `?${stringify(params)}` : ``;
}

// 格式化 file 的 size
export function calcFileSize(size) {
  const kb = Math.ceil(size / 1024);

  const oneGB = 1024 * 1024;
  const oneMB = 1024;

  if (kb >= oneGB) return `${Math.floor((kb / oneGB) * 100) / 100}GB`;
  if (kb >= oneMB) return `${Math.floor((kb / oneMB) * 100) / 100}MB`;
  return `${kb}KB`;
}

// 上传文件的预览地址
export const readPreviewUrl = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

/**
 * @description 四舍五入， 并保留指定有效位数
 */
export function randomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}
