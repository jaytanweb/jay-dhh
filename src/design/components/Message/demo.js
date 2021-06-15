import { usePopup } from '@/design/hooks/Popup';
import { randomNumber } from '@/utils/format';
import React from 'react';
import { Message } from '..';
import Button from '../Button';

const MessageDemo = () => {
  const { addMessage, clearMessage } = usePopup();

  const randomMessage = () => {
    const i = randomNumber(0, 3);

    const msgs = [
      <Message
        type="complete"
        title="成功"
        desc="正常展示   提示文字不要超过三行文字成功操作后的状态 提示文字不要超过三行文字成功操作后的状态 提示文字不要超过三行文字成功操作后的状态 提示文字不要超过三行文字成功操作后的状态 提示文字不要超过三行文字"
      />,
      <Message type="warn" desc="隐藏标题" />,
      <Message title="通知" desc="隐藏 icon" />,
      <Message type="error" title="失败" />,
    ];

    return msgs[i];
  };

  const onMessage = (e) => addMessage(randomMessage());

  return (
    <div
      className="MessageDemo"
      style={{
        display: 'grid',
        gap: 12,
        placeItems: 'flex-start',
      }}
    >
      <div>
        <Button type="secondary" onClick={onMessage}>
          随机 Message
        </Button>

        <Button type="primary" onClick={clearMessage}>
          清空 Message
        </Button>
      </div>
      <Message
        type="complete"
        title="成功"
        desc="正常展示   提示文字不要超过三行文字成功操作后的状态 提示文字不要超过三行文字成功操作后的状态 提示文字不要超过三行文字成功操作后的状态 提示文字不要超过三行文字成功操作后的状态 提示文字不要超过三行文字"
      />

      <Message
        type="warn"
        // title="警告"
        desc="隐藏标题"
      />
      <Message title="通知" desc="隐藏 icon" />
      <Message
        type="error"
        title="失败"
        // desc="成功操作后的状态 提示文字不要超过三行文字"
      />
    </div>
  );
};

export default MessageDemo;
