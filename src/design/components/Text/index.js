import React, { useMemo } from 'react';
import styled, { css } from 'styled-components';

import { useTheme } from '@/design/hooks/Theme';

/**
 * 标题
 */
export const Title = styled.h2(({ type, light, ellipsis }) => {
  if (!['h1', 'h2', 'h3', 'h4'].includes(type)) type = 'h4';

  const color = useColor(light, [1, 2, 3, 4]);

  const style = useThemeFont({ type, color, ellipsis });

  return style;
});

/**
 * 副标题
 */
export const SubTitle = styled.h4(({ type, light, ellipsis }) => {
  if (!['sub1', 'sub2'].includes(type)) type = 'sub2';

  const color = useColor(light, [1, 2, 3, 4]);

  const style = useThemeFont({ type, color, ellipsis });

  return style;
});

/**
 * 文本
 */
export const Text = styled.p(({ type, light, ellipsis }) => {
  if (!['p1', 'p2', 'p3'].includes(type)) type = 'p2';

  const color = useColor(light, [2, 3, 4, 5]);

  const style = useThemeFont({ type, color, ellipsis });

  return style;
});

// 根据 blue 来定义颜色
// TODO 根据 theme 修改
const useColor = (light, options) => {
  const [
    {
      font,
      color: { blue },
    },
  ] = useTheme();

  return useMemo(() => {
    const { default: defaultColor, light_1, light_2, light_3, light_4 } = blue;

    light = typeof light === 'string' ? parseInt(light) : light;

    if (!options.includes[light]) light === 1;

    return (
      [defaultColor, light_1, light_2, light_3, light_4][light - 1] ||
      defaultColor
    );
  }, [light, options]);
};

const useThemeFont = ({ type, color, ellipsis }) => {
  const [{ font }] = useTheme();

  const ellipsisStyle = useMemo(() => {
    if (!ellipsis) return ``;

    // 多行省略
    if (typeof ellipsis === 'number' && ellipsis >= 2) {
      return `
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: ${ellipsis};
          -webkit-box-orient: vertical;
          word-break: break-all;
        `;
    }

    // 单行省略
    return `
        // width: 100%;
        // overflow: hidden;
        // text-overflow: ellipsis;
        // white-space: nowrap;

        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        word-break: break-all;
      `;
  }, [ellipsis]);

  return useMemo(() => {
    const { fontWeight, fontSize, lineHeight, letterSpaceing } = font[type];

    return css`
      font-weight: ${fontWeight};
      font-size: ${fontSize}px;
      line-height: ${lineHeight}px;
      letter-spacing: ${letterSpaceing}px;
      color: ${color};
      user-select: none;
      margin: 0;
      ${ellipsisStyle}
    `;
  }, [type, color, ellipsisStyle]);
};
