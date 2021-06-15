import React, { useState } from 'react';
import { UserItem, Tree } from '@/design/components';
import { Title } from '../Text';
import { useTheme } from '@/design/hooks/Theme';

// 测试组件
const Demo = () => {
  const dataSource = [
    {
      key: 1,
      title: 'Group 1',
      children: [
        {
          key: 'user1',
          value: 'user1',
          dataSource: {
            user: {
              id: 1,
              name: 'elon',
              avatar:
                'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8YXZhdGFyfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
            },
          },
          render: ({ user, value, onChange, showOnly, diabled }) => (
            <UserItem
              user={user}
              selected={value}
              onSelect={() => {
                if (showOnly || diabled || !onChange) return;
                onChange(true);
              }}
              onClose={() => {
                if (showOnly || diabled || !onChange) return;
                onChange(false);
              }}
            />
          ),
        },
        {
          key: 'user2',
          value: 'user2',
        },
        {
          key: 12,
          title: 'Group 12',
          children: [
            {
              key: 'user13',
              value: 'user13',
            },
          ],
        },
        {
          key: 2,
          title: 'Group 2',
          children: [
            {
              key: 'user3',
              value: 'user3',
            },

            {
              key: 5,
              title: 'Group 5',
              children: [
                {
                  key: 'user6',
                  value: 'user6',
                },

                {
                  key: 7,
                  title: 'Group 7',
                  children: [
                    {
                      key: 'user8',
                      value: 'user8',
                    },
                  ],
                },
              ],
            },
            // {
            //   key: 9,
            //   title: 'Group 9',
            //   children: [
            //     {
            //       key: 'user10',
            //       value: 'user10',
            //     },

            //     {
            //       key: 11,
            //       title: 'Group 11',
            //       children: [
            //         {
            //           key: 'user12',
            //           value: 'user12',
            //         },
            //       ],
            //     },
            //   ],
            // },
          ],
        },
      ],
    },
    // {
    //   key: 3,
    //   title: 'Group 3',
    //   children: [
    //     {
    //       key: 'user4',
    //       value: 'user4',
    //     },
    //   ],
    // },
  ];

  const [value, onChange] = useState(['user4']);

  const [
    {
      padding,
      margin,
      color: { primary },
    },
  ] = useTheme();

  const titleStyle = {
    padding: `${padding.small}px ${padding.default}px`,
    marginBottom: margin.small,
    borderLeft: `4px solid ${primary.default}`,
  };

  return (
    <div>
      <Title type="h3" style={titleStyle}>
        自动收起， 可选
      </Title>
      <Tree
        dataSource={dataSource}
        itemCol={3}
        value={value}
        onChange={onChange}
        style={{ marginBottom: 4 }}
        collapse
      />

      <Title type="h3" style={titleStyle}>
        自动展开， 仅展示
      </Title>
      <Tree
        dataSource={dataSource}
        itemCol={3}
        value={value}
        onChange={onChange}
        showOnly
        style={{ marginBottom: 4 }}
      />

      <Title type="h3" style={titleStyle}>
        自动展开， 不可选
      </Title>
      <Tree
        dataSource={dataSource}
        itemCol={3}
        value={value}
        onChange={onChange}
        disabled
        style={{ marginBottom: 4 }}
      />

      <Title type="h3" style={titleStyle}>
        空树
      </Title>
      <Tree
        dataSource={[]}
        itemCol={3}
        value={value}
        onChange={onChange}
        disabled
      />
    </div>
  );
};

export default Demo;
