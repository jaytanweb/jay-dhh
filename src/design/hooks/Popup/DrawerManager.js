import React from 'react';

import styled from 'styled-components';

import createContext from '@/design/hooks/createContext';

import { useTheme } from '@/design/hooks/Theme';

import { scaleEnterBR, scaleExitBR } from '@/design/theme/animation';

import { isValidArray } from '@/utils/type';

import genPopupProvider, { Popup_State } from './base';
import { ClosableCard, Mask } from '@/design/components';

const { Provider, useContext } = createContext('Drawer');

// 提供 hook
export const useDrawer = useContext;

export const DrawerProvider = ({ children, ...props }) =>
  genPopupProvider({ Provider, children, container: DrawerList, ...props });

const DrawerList = () => {
  const { list, clear } = useDrawer();

  const onAnimationEnd = (popup) => {
    switch (popup.state) {
      case Popup_State.Entering:
        // 转为展示中
        popup.onPresent();
        break;
      case Popup_State.Leaving:
        popup.onDestroy();
        break;
    }
  };

  return (
    <Mask
      visible
      closable
      onClose={() => clear()}
      className="DrawerMask"
      style={
        isValidArray(list)
          ? {
              zIndex: 900,
              visibility: 'visible',
            }
          : { zIndex: -1, visibility: 'hidden' }
      }
    >
      {list.map((popup, i) => {
        return (
          <AnimContainer
            key={popup.id}
            style={{
              width: 600,
              maxWidth: '100vw',
              height: '100%',
              maxHeight: '100vh',
              position: 'absolute',
              top: 0,

              transformOrigin: 'center left',
              left: (list.length - 1 - i) * 12,
              transform: `scale(${Math.max(0, 1 - i * 0.05)})`,
              zIndex: Math.max(0, 900 - i),
              transition: `transform .2s ease-in-out`,
              willChange: 'transform',

              display: 'grid',
              placeItems: 'stretch',
            }}
            className={`popup-${popup.state}`}
            onAnimationEnd={() => onAnimationEnd(popup)}
            animation={
              {
                [Popup_State.Entering]: scaleEnterBR,
                [Popup_State.Leaving]: scaleExitBR,
              }[popup.state] || ``
            }
          >
            <ClosableCard
              style={{
                display: 'grid',
                maxHeight: '100vh',
                gridTemplateRows: `auto minmax(0, 1fr) auto`,
              }}
              bodyStyle={{ overflow: 'auto', display: 'grid' }}
              header={popup?.config?.header || 'Drawer'}
              onClose={() => popup.onLeave()}
            >
              {popup.children}
            </ClosableCard>
          </AnimContainer>
        );
      })}
    </Mask>
  );
};

const AnimContainer = styled.div(({ animation }) => animation);
