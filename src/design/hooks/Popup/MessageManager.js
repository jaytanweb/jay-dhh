import React from 'react';

import styled from 'styled-components';

import createContext from '@/design/hooks/createContext';

import { useTheme } from '@/design/hooks/Theme';

import { scaleEnterBL, scaleExitBL } from '@/design/theme/animation';

import { isValidArray } from '@/utils/type';

import genPopupProvider, { Popup_State } from './base';

const { Provider, useContext } = createContext('Message');

// 提供 hook
export const useMessage = useContext;

export const MessageProvider = ({ children, ...props }) =>
  genPopupProvider({ Provider, children, container: MessageList, ...props });

const MessageList = () => {
  const [{ margin, padding }] = useTheme();

  const { list } = useMessage();

  const onAnimationEnd = (popup) => {
    switch (popup.state) {
      case Popup_State.Entering:
        // 转为展示中
        popup.onPresent();
        // 延迟后离开
        popup.onLeave(true);
        break;
      case Popup_State.Leaving:
        popup.onDestroy();
        break;
    }
  };

  if (!isValidArray(list)) return null;

  return (
    <div
      className="MessageListContainer"
      style={{
        position: 'fixed',
        top: 0,
        right: 0,
        width: 400,
        zIndex: 1000,
        maxWidth: '100%',
        // height: '100vh',
        height: 0,
        overflowY: 'visible',
      }}
    >
      <div
        className="MessageList"
        style={{
          padding: padding.default,
        }}
      >
        {list.map((popup) => {
          return (
            <AnimContainer
              key={popup.id}
              targetRef={popup.ref}
              className={`popup-${popup.state}`}
              //   鼠标进入时，弹出驻留
              onMouseEnter={() => popup.onHoldon()}
              onMouseLeave={() => popup.onLeave()}
              onAnimationEnd={() => onAnimationEnd(popup)}
              animation={
                {
                  [Popup_State.Entering]: scaleEnterBL,
                  [Popup_State.Leaving]: scaleExitBL,
                }[popup.state] || ``
              }
              style={{ marginBottom: margin.default }}
            >
              {popup.children}
            </AnimContainer>
          );
        })}
      </div>
    </div>
  );
};

const AnimContainer = styled.div(({ animation }) => animation);
