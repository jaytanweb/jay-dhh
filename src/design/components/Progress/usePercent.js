import { useMemo } from 'react';
import { notNil } from '@/utils/type';

export const usePercent = ({ value, min, max }) => {
  return useMemo(() => {
    let val = value,
      minVal = min,
      maxVal = max;

    // 确保 min max 都是正常数字
    if (!notNil(minVal) || typeof minVal !== 'number') minVal = 0;
    if (!notNil(maxVal) || typeof maxVal !== 'number') maxVal = 10;

    // 确保大小关系
    if (minVal > maxVal) {
      let temp = minVal;
      minVal = maxVal;
      maxVal = temp;
    }

    // 确保 val 是合理的数字
    if (!notNil(val) || typeof val !== 'number' || val < minVal) val = minVal;
    if (val > maxVal) val = maxVal;

    const percent = ((val - minVal) / (maxVal - minVal)) * 100;

    return { value: val, min: minVal, max: maxVal, percent };
  }, [value, min, max]);
};
