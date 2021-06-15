import React from 'react';
import { useTheme } from '@/design/hooks/Theme';
import { Icon } from '..';

const IconDemo = () => {
  const [
    {
      size,
      color: { gray, orange, green },
    },
  ] = useTheme();

  return (
    <div
      className="IconDemo"
      style={{
        display: 'grid',
        gap: 12,
        gridTemplateColumns: `repeat(4, 1fr)`,
        placeItems: 'center',
      }}
    >
      <Icon type="edit" size={size.s_12} color={gray.default} />
      <Icon type="wechat" />
      <Icon type="dingtalk" size={size.s_28} color={green.default} />
      <Icon
        type="heart"
        size={size.s_32}
        color={orange.default}
        onClick={() => console.log(111)}
      />

      <Icon type="bookmark" size={size.s_12} color={gray.default} />
      <Icon type="file" />
      <Icon type="img" size={size.s_28} color={green.default} />
      <Icon type="video" size={size.s_32} color={orange.default} />

      <Icon type="thunderbolt" size={size.s_12} color={gray.default} />
      <Icon type="pushPin" />
      <Icon type="paperClip" size={size.s_28} color={green.default} />
      <Icon type="filter" size={size.s_32} color={orange.default} />

      <Icon type="user" size={size.s_12} color={gray.default} />
      <Icon type="male" />
      <Icon type="female" size={size.s_28} color={green.default} />
      <Icon type="team" size={size.s_32} color={orange.default} />

      <Icon type="close" size={size.s_12} color={gray.default} />
      <Icon type="check" />
      <Icon type="arrowLeft" size={size.s_28} color={green.default} />
      <Icon type="arrowRight" size={size.s_32} color={orange.default} />
    </div>
  );
};

export default IconDemo;
