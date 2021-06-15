/**
 * 2019-3-12 Elon
 *
 * 封装 localStorage 方法
 */

// 是否需要加密
const USE_ENCODE = true;

// 加密方法
function encode(data) {
  return USE_ENCODE ? btoa(encodeURIComponent(data)) : data;
}
// 解密方法
function decode(data) {
  return USE_ENCODE ? decodeURIComponent(atob(data)) : data;
}
// 存储 session
export function setSession(key, value) {
  if (typeof key !== 'string' || value === null || value === undefined) {
    return;
  }
  localStorage.setItem(encode(key), encode(JSON.stringify(value)));
}

// 获取 session
export function getSession(key) {
  if (typeof key !== 'string') {
    return;
  }
  const value = localStorage.getItem(encode(key));

  if (value === null || value === undefined) {
    return;
  }
  return JSON.parse(decode(value));
}

// 删除 session
export function removeSession(key) {
  if (typeof key !== 'string') {
    return;
  }
  localStorage.removeItem(key);
}

// 清空 session
export function clearSession() {
  localStorage.clear();
}
