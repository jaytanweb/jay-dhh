import { Button, Message } from '@/design/components';
import { randomNumber } from '@/utils/format';
import React from 'react';
import { usePopup } from '.';

const PopupDemo = () => {
  const {
    addMessage,
    clearMessage,
    addModal,
    clearModal,
    addDrawer,
    clearDrawer,
  } = usePopup();

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

  const onDrawer = (e) => {
    // clearDrawer();

    const content = randomMessage();

    addDrawer(
      <div>
        {content}
        <Button type="secondary" onClick={onDrawer}>
          触发 Drawer
        </Button>
      </div>,
    );
  };

  const onModal = (e) => {
    // clearModal();

    const content = randomMessage();

    addModal(
      <div>
        {content}
        <Button type="secondary" onClick={onModal}>
          触发 Modal
        </Button>
      </div>,
    );
  };

  return (
    <div
      className="PopupDemo"
      style={{
        display: 'grid',
        gap: 12,
        placeItems: 'flex-start',
        placeItems: 'center stretch',
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

      <div>
        <Button type="secondary" onClick={onDrawer}>
          触发 Drawer
        </Button>
      </div>

      <div>
        <Button type="secondary" onClick={onModal}>
          触发 Modal
        </Button>
      </div>
    </div>
  );
};

export default PopupDemo;
