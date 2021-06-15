import React, { useEffect } from 'react';
import createContext from '../createContext';
import { MessageProvider, useMessage } from './MessageManager';
import { ModalProvider, useModal } from './ModalManager';
import { DrawerProvider, useDrawer } from './DrawerManager';
import { TooltipProvider, useTooltip } from './TooltipManager';

import ScrollLocker from 'rc-util/lib/Dom/scrollLocker';
import { isValidArray } from '@/utils/type';

const { Provider, useContext } = createContext('PopupControl');

export const usePopup = useContext;

export const PopupCtrl = ({ children }) => {
  return (
    <ModalProvider>
      <DrawerProvider>
        <MessageProvider>
          <TooltipProvider>
            <PopupCtrlProvider>{children}</PopupCtrlProvider>
          </TooltipProvider>
        </MessageProvider>
      </DrawerProvider>
    </ModalProvider>
  );
};

const PopupCtrlProvider = ({ children }) => {
  const messageCtrl = useMessage();
  const modalCtrl = useModal();
  const drawerCtrl = useDrawer();
  const tooltipCtrl = useTooltip();

  const addMessage = messageCtrl.add;
  const removeMessage = messageCtrl.remove;
  const clearMessage = messageCtrl.clear;
  //const messages = messageCtrl.list;

  const addModal = modalCtrl.add;
  const removeModal = modalCtrl.remove;
  const clearModal = modalCtrl.clear;
  //const modals = modalCtrl.list;

  const addDrawer = drawerCtrl.add;
  const removeDrawer = drawerCtrl.remove;
  const clearDrawer = drawerCtrl.clear;
  //const drawers = drawerCtrl.list;

  const addTooltip = tooltipCtrl.add;
  const removeTooltip = tooltipCtrl.remove;
  const clearTooltip = tooltipCtrl.clear;
  //const tooltips = tooltipCtrl.list;

  useEffect(() => {
    const { lock, unLock } = new ScrollLocker();

    const hasPopup =
      isValidArray(drawerCtrl.list) || isValidArray(modalCtrl.list);

    hasPopup ? lock() : unLock();

    return unLock;
  }, [drawerCtrl.list, modalCtrl.list]);

  return (
    <Provider
      value={{
        addMessage,
        clearMessage,
        removeMessage,

        addModal,
        clearModal,
        removeModal,

        addDrawer,
        clearDrawer,
        removeDrawer,

        addTooltip,
        clearTooltip,
        removeTooltip,
      }}
    >
      {children}
    </Provider>
  );
};
