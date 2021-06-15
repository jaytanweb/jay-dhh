import React from 'react';

import Trigger from 'rc-trigger';

import { ClosableCard } from '@/design/components';

const Popover = ({ visible, onClose, title, overlay, children }) => {
  return (
    <Trigger
      className="Popover"
      action={['click']}
      //   popupVisible={visible}
      //   onPopupVisibleChange={(visible) => {
      //     if (!visible) onClose();
      //   }}

      zIndex={1000}
      mask
      maskClosable
      popup={
        <div
          className="Mask"
          onClick={(e) => {
            onClose();
          }}
          style={{
            width: '100vw',
            height: '100vh',
            overflowY: 'auto',
            position: 'fixed',
            top: 0,
            left: 0,
            zIndex: 1000,
            background: `rgba(0,0,0,.2)`,
          }}
        >
          <ClosableCard
            style={{ width: 600, margin: '10% auto' }}
            title={title}
            onClose={onClose}
            onClick={(e) => e.stopPropagation()}
          >
            {overlay}
          </ClosableCard>
        </div>
      }
    >
      {children}
    </Trigger>
  );
};

export default Popover;
