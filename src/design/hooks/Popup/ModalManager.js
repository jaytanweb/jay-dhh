import React, { useEffect, useState } from 'react';

import styled from 'styled-components';

import createContext from '@/design/hooks/createContext';

import { useTheme } from '@/design/hooks/Theme';

import { fadeEnter, scaleExitBL } from '@/design/theme/animation';

import { isValidArray } from '@/utils/type';

import genPopupProvider, { Popup_State } from './base';
import { ClosableCard, Mask } from '@/design/components';

const { Provider, useContext } = createContext('Modal');

// 提供 hook
export const useModal = useContext;

export const ModalProvider = ({ children, ...props }) =>
  genPopupProvider({ Provider, children, container: ModalList, ...props });

const ModalList = () => {
  const { list, clear } = useModal();

  const onAnimationEnd = (popup) => {
    if (!popup) return;

    switch (popup.state) {
      case Popup_State.Entering:
        popup.onPresent();
        break;
      case Popup_State.Leaving:
        popup.onDestroy();
        break;
    }
  };

  return isValidArray(list) ? (
    <Mask
      visible
      className="ModalMask"
      closable
      onClose={() => clear()}
      style={{ zIndex: 900, overflowY: 'auto' }}
    >
      {list.map((popup, i) => (
        <AnimContainer
          key={popup.id}
          style={{
            position: 'absolute',
            height: '100%',
            top: 0,
            left: `calc(50% - 300px)`,
            overflowY: 'auto',

            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
            paddingTop: `calc(8% + ${(list.length - 1 - i) * 12}px)`,
            transform: `scale(${Math.max(0, 1 - i * 0.05)}, ${Math.max(
              0,
              1 - i * 0.02,
            )})`,
            zIndex: Math.max(0, 900 - i),
            transition: `all .2s ease-in-out`,
            willChange: 'all',
          }}
          className={`popup-${popup.state}`}
          onAnimationEnd={() => onAnimationEnd(popup)}
          animation={
            {
              [Popup_State.Entering]: fadeEnter,
              [Popup_State.Leaving]: scaleExitBL,
            }[popup.state] || ``
          }
        >
          <ClosableCard
            header={popup?.config?.header || 'title'}
            onClose={() => popup.onLeave()}
            width={600}
            style={{ maxWidth: '100%', maxHeight: '100%' }}
          >
            {popup.children}
          </ClosableCard>
        </AnimContainer>
      ))}
    </Mask>
  ) : null;
};

const AnimContainer = styled.div.attrs(({ targetRef }) => {
  //   const { top, left, width, height } = targetRef.getBoundingClientRect();
  //   return {
  //     style: { position: 'fixed', top, left: left + width + 16 },
  //   };
})(({ animation }) => {
  return animation;
});
