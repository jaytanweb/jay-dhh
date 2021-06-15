import { useTheme } from '@/design/hooks/Theme';
import React, { useMemo } from 'react';
import styled from 'styled-components';

import { usePercent } from './usePercent';

const ProgressContainer = styled.div.attrs({ className: 'ProgressContainer' })(
  ({ value, min, max, bgColor, foreColor }) => {
    const [
      {
        padding,
        borderRadius,
        color: { primary },
      },
    ] = useTheme();

    foreColor ||= primary.default;
    bgColor ||= primary.light_5;

    // 格式化三个输入值
    const {
      // value: val, min: minVal, max: maxVal,
      percent,
    } = usePercent({ value, min, max });

    const gradient = `linear-gradient(to right, ${foreColor} ${percent}%, ${bgColor} ${percent}%)`;

    return `
      display: block;
      width: 100%;
      padding: ${padding.small}px;
      border-radius: ${borderRadius.default}px;
      background: ${gradient};
      transition: all .2s ease-in-out;
  `;
  },
);

export default ProgressContainer;
