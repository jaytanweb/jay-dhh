import React, { useMemo } from 'react';
import { useTheme } from '@/design/hooks/Theme';
import { Icon, SubTitle, Text, Card } from '@/design/components';

const Message = ({ type, title, desc, style = {}, onClose }) => {
  const [
    {
      size,
      padding,
      boxShadow,
      color: { primary, gray, red, orange, green, blue },
    },
  ] = useTheme();

  const { icon, pallete } = useMemo(() => {
    const types = {
      complete: {
        icon: 'stateComplete',
        pallete: green,
      },
      error: {
        icon: 'stateError',
        pallete: red,
      },
      warn: {
        icon: 'stateWarn',
        pallete: orange,
      },
      info: {
        icon: 'stateInfo',
        pallete: blue,
      },
    };

    return types[type] || types.info;
  }, [type]);

  return (
    <Card
      className="Message"
      style={{
        width: '100%',
        borderTop: `${size.s_4}px solid ${pallete.default}`,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,

        boxShadow: boxShadow.darkest,
        ...style,
      }}
      bodyStyle={{
        display: 'flex',
        position: 'relative',
      }}
    >
      {/* 关闭  Icon */}
      {typeof onClose === 'function' && (
        <span
          style={{
            padding: padding.mini,
            position: 'absolute',
            top: 0,
            right: 0,
          }}
        >
          <Icon type="close" color={gray.default} size={10} onClick={onClose} />
        </span>
      )}
      {/* 状态  Icon */}
      {type && (
        <div style={{ padding: padding.mini }}>
          <Icon type={icon} color={pallete.default} size={22} />
        </div>
      )}
      <div
        style={{
          flex: 1,
          padding: padding.mini,
        }}
      >
        {/* 标题 */}
        {title && (
          <SubTitle type="sub1" style={{ lineHeight: `${size.s_24}px` }}>
            {title}
          </SubTitle>
        )}
        {/* 内容， 三行起省略 */}
        {desc && (
          // 此时和 icon 的行高相同
          <Text type="p3" ellipsis={3} style={{ lineHeight: `${size.s_24}px` }}>
            {desc}
          </Text>
        )}
      </div>
    </Card>
  );
};

export default Message;
