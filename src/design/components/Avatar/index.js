import React, { useMemo } from 'react';

import { Icon, Img, Text, Title } from '@/design/components';
import { useTheme } from '@/design/hooks/Theme';

const Avatar = ({ avatar, uname = '', size, show = true, style = {} }) => {
  const [
    {
      size: themeSize,
      color: { gray, primary },
    },
  ] = useTheme();

  const width = size || themeSize.s_32;

  const userDom = useMemo(() => {
    // 隐藏头像
    if (!show) return <Icon type="user" color={gray.light_5} />;

    // 展示头像
    if (avatar)
      return (
        <Img
          src={avatar}
          style={{
            width: '100%',
            height: '100%',
            borderRadius: '50%',
          }}
        />
      );

    // 展示名字
    return (
      <Text style={{ display: 'inline-block', color: 'inherit' }}>
        {(uname && uname[0]) || '?'}
      </Text>
    );
  }, [show, gray, width]);

  return (
    <div
      className="avatar"
      style={{
        width,
        height: width,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '50%',
        overflow: 'hidden',
        backgroundColor: primary.default,
        color: gray.light_5,
        ...style,
      }}
    >
      {userDom}
    </div>
  );
};

export default Avatar;
