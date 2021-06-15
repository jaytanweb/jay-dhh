// 非空数组
export function isValidArray(arr) {
  return Array.isArray(arr) && arr.length > 0;
}

// 有效数据
export function notNil(val) {
  return val || val === 0;
}
