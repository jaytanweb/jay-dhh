import React from 'react';
import { Avatar } from '..';

const AvatarDemo = () => {
  return (
    <div
      className="AvatarDemo"
      style={{
        display: 'grid',
        gap: 12,
        gridTemplateColumns: `repeat(4, 1fr)`,
        placeItems: 'center',
      }}
    >
      <Avatar
        size={42}
        uname="吴渊"
        avatar="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8YXZhdGFyfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
      />
      <Avatar />
      <Avatar uname="吴渊" />
      <Avatar size={48} uname="吴渊" />
    </div>
  );
};

export default AvatarDemo;
