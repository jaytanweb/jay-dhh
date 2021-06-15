import React, { useEffect, useState } from 'react';

import styled from 'styled-components';

import createContext from '@/design/hooks/createContext';

import { useTheme } from '@/design/hooks/Theme';

import { fadeEnter, scaleExitBL } from '@/design/theme/animation';

import { isValidArray } from '@/utils/type';

import genPopupProvider, { Popup_State } from './base';
import { ClosableCard, Mask } from '@/design/components';

const { Provider, useContext } = createContext('Tooltip');

// 提供 hook
export const useTooltip = useContext;

export const TooltipProvider = ({ children, ...props }) =>
  genPopupProvider({ Provider, children, container: TooltipList, ...props });

const TooltipList = () => {
  const { list, clear } = useTooltip();

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
    <div
      visible
      className="Tooltip"
      style={{
        zIndex: 900,
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        heihgt: 0,
      }}
    >
      {list.map((popup) => (
        <AnimContainer
          key={popup.id}
          style={{
            position: 'absolute',
            height: '100%',
            top: popup?.config?.top || 0,
            left: popup?.config?.left || 0,
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
          {popup.children}
        </AnimContainer>
      ))}
    </div>
  ) : null;
};

const AnimContainer = styled.div(({ animation }) => animation);
