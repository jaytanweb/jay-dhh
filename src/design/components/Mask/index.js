import React from 'react';
import styled from 'styled-components';

const Mask = styled.div.attrs(({ onClose, closable, visible }) => ({
  className: 'Mask',
  onClick: (e) => {
    const clickOnMask = e.target.classList.contains('Mask');

    return (
      visible &&
      closable &&
      clickOnMask &&
      typeof onClose === 'function' &&
      onClose()
    );
  },
}))(
  ({ visible }) => `
    width: 100vw;
    height: ${visible ? '100vh' : 0};
    overflow-x: hidden;
    overflow-y: auto;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
    background: ${visible ? `rgba(0,0,0,.2)` : 'transparent'};
  `,
);

export default Mask;
