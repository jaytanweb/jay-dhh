import React from 'react';
import { useTheme } from '@/design/hooks/Theme';
import { Icon, Text } from '@/design/components';

const Empty = ({ style = {}, desc = '暂无数据' }) => {
  const [
    {
      margin,
      borderRadius,
      color: { gray },
    },
  ] = useTheme();
  return (
    <div
      className="Empty"
      style={{
        width: '100%',
        height: '100%',
        borderRadius: borderRadius.default,
        padding: margin.small,
        background: gray.light_5,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        ...style,
      }}
    >
      <Icon type="empty" size={16} />
      <Text style={{ marginTop: margin.small }}>{desc}</Text>
    </div>
  );
};

export default Empty;
