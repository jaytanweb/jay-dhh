import React from 'react';
import { useTheme } from '@/design/hooks/Theme';

import { Icon, Button } from '@/design/components';
import styled from 'styled-components';

// tips: 这种写法更方便事件、disbalde等属性的传递
const IconButton = styled(Button).attrs(
  ({ icon, iconColor, iconSize, style = {} }) => {
    const [
      {
        size: themeSize,
        padding,
        color: { primary, gray },
      },
    ] = useTheme();

    iconColor ||= gray.light_5;
    iconSize ||= themeSize.s_14;

    return {
      style: {
        borderRadius: '50%',
        padding: padding.default,
        ...style,
      },
      icon: null, // 覆盖 icon， 避免 button 组件渲染 icon
      children: <Icon type={icon} size={iconSize} color={iconColor} />,
    };
  },
)``;

export default IconButton;
