import React, { useMemo, useState } from 'react';
import { Profile, UserItem } from '..';

const ProfileDemo = () => {
  const [selectedUsers, setSelectedUsers] = useState([]);

  const users = useMemo(() => {
    return [
      {
        id: 1,
        realName: '吴渊1',
        avatar:
          'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8YXZhdGFyfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
      },
      { id: 2, realName: '吴渊2' },
      { id: 3, realName: '吴渊3' },
      { id: 4, realName: '吴渊4' },
      { id: 5, realName: '吴渊5' },
    ];
  }, []);

  return (
    <div className="ProfileDemo">
      <div
        style={{
          display: 'grid',
          gap: 12,
          gridTemplateColumns: `repeat(2, 1fr)`,
          placeItems: 'center',
        }}
      >
        <Profile uname="吴渊" desc="web 前端工程师" />

        <Profile
          // uname="吴渊"
          desc="web 前端工程师"
          avatar="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8YXZhdGFyfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
        />

        <Profile
          uname="吴渊"
          // desc="web 前端工程师"
          avatar="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8YXZhdGFyfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
        />
      </div>

      <div
        style={{
          display: 'grid',
          gap: 12,
          gridTemplateColumns: `repeat(3, 1fr)`,
          placeItems: 'center',
        }}
      >
        {users.map(({ id, realName, avatar }) => (
          <UserItem
            key={id}
            uname={realName}
            avatar={avatar}
            selected={selectedUsers.includes(id)}
            onSelect={() => setSelectedUsers([...selectedUsers, id])}
            onClose={() =>
              setSelectedUsers(selectedUsers.filter((el) => el !== id))
            }
            showClose
            block
          />
        ))}
      </div>
    </div>
  );
};

export default ProfileDemo;
