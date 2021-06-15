import React, { useMemo } from 'react';

import { useTheme } from '@/design/hooks/Theme';
import { Icon, Text } from '@/design/components';

const Tag = ({
  children,
  cate,
  type,
  icon,
  closable,
  onClose,
  style = {},
  ...rest
}) => {
  const [
    {
      size,
      padding,
      borderRadius,
      color: { primary, type: typeColor },
    },
  ] = useTheme();

  const {
    icon: prefixIcon,
    color: { default: defaultColor, light_1 },
  } = useMemo(() => {
    switch (cate) {
      case 'img':
        return {
          icon: icon || 'imgPreview',
          color: typeColor[0],
        };
      case 'file':
        return {
          icon: icon || 'filePreview',
          color: typeColor[1],
        };
      case 'video':
        return {
          icon: icon || 'videoPreview',
          color: typeColor[2],
        };
      default:
        return {
          icon,
          color: {
            default: primary.default,
            light_1: primary.light_4,
          },
        };
    }
  }, [cate, icon]);

  const containerStyle = useMemo(() => {
    switch (type) {
      case 'fill':
        return {
          borderRadius: size.s_16,
          background: light_1,
        };
      case 'outline':
        return {
          borderRadius: size.s_16,
          border: `1px solid ${defaultColor}`,
        };
      default:
        return {};
    }
  }, [defaultColor, light_1, type]);

  return (
    <div
      className="Tag"
      style={{
        maxWidth: '100%',
        display: 'inline-flex',
        alignItems: 'center',
        padding: `${padding.default}px 0`,
        height: size.s_32,
        ...containerStyle,
        ...style,
      }}
      {...rest}
    >
      {prefixIcon && (
        <span style={{ display: 'inline-block', padding: padding.small }}>
          <Icon type={prefixIcon} size={size.s_14} color={defaultColor} />
        </span>
      )}

      <Text
        ellipsis
        style={{
          paddingLeft: prefixIcon ? 0 : padding.default,
          paddingRight: closable ? 0 : padding.default,
          color: defaultColor,
        }}
      >
        {children}
      </Text>

      {closable && (
        <span style={{ display: 'inline-block', padding: padding.small }}>
          <Icon
            size={size.s_10}
            color={defaultColor}
            type="close"
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
          />
        </span>
      )}
    </div>
  );
};

export default Tag;
