import React, { useMemo } from 'react';

import { Avatar, Icon, Img, Text, Title } from '@/design/components';
import { useTheme } from '@/design/hooks/Theme';

const Profile = ({
  avatar,
  avatarPlacement = 'left',
  uname = '',
  desc = '',
  size,
  show = true,
  style = {},

  foreColor,
  bgColor,

  ...rest
}) => {
  const [
    {
      padding,
      size: themeSize,
      color: { primary, gray },
    },
  ] = useTheme();

  size ||= themeSize.s_36;

  foreColor ||= primary.default;
  bgColor ||= gray.light_5;

  return (
    <div
      className="Profile"
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: avatarPlacement === 'left' ? 'row' : 'row-reverse',
        padding: 0,
        ...style,
      }}
      {...rest}
    >
      <Avatar
        avatar={avatar}
        uname={uname}
        size={size}
        show={show}
        style={{ flexShrink: 0, backgroundColor: foreColor, color: bgColor }}
      />

      <div
        style={{
          flex: 1,
          minWidth: 0,
          height: size,
          paddingLeft: padding.small,

          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: avatarPlacement === 'left' ? 'flex-start' : 'flex-end',
        }}
      >
        {uname && (
          <Title
            ellipsis
            style={{
              color: foreColor,
              fontSize: themeSize.s_14,
              lineHeight: 1.15,
              maxWidth: '100%',
            }}
          >
            {show ? uname : '???'}
          </Title>
        )}

        {desc && (
          <Text
            ellipsis
            type="p3"
            style={{
              maxWidth: '100%',
            }}
          >
            {show ? desc : '???'}
          </Text>
        )}
      </div>
    </div>
  );
};

export default Profile;
