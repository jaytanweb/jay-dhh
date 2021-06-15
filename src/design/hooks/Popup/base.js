import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import ReactDOM from 'react-dom';

import { uniqueId } from 'lodash';
import { isValidArray } from '@/utils/type';

export const Popup_State = {
  Entering: 'Entering',
  Present: 'Present',
  Holdon: 'Holdon',
  Leaving: 'Leaving',
  Destroy: 'Destroy',
};

// 弹出组件集中管理器
class PopupManager {
  constructor() {
    this.list = [];

    this.removeItem = this.removeItem.bind(this);
    this.updateItem = this.updateItem.bind(this);
    this.addItem = this.addItem.bind(this);
    this.removeAll = this.removeAll.bind(this);
  }

  onUpdate() {}

  //   删除
  removeItem(popupId) {
    // 默认关闭最上层的 popup
    if (!popupId && isValidArray(this.list)) {
      this.list[0]?.onLeave();
    }
    // 删除指定 popup
    else {
      this.list = this.list.filter((m) => m.id !== popupId);
      this.onUpdate(this.list);
    }
  }

  //   修改
  updateItem(popup) {
    let index = this.list.findIndex((m) => m.id === popup.id);

    if (index >= 0) {
      // 删除
      if (popup.state === Popup_State.Destroy) {
        this.removeItem(popup.id);
      }
      // 修改
      else {
        const list = this.list.slice();
        list.splice(index, 1, popup);

        this.onUpdate(list);
      }
    }
  }

  //   新增
  addItem(children, config = {}) {
    const popup = new Popup({
      children,
      state: Popup_State.Entering,

      id: config?.popupId || uniqueId('popup'),
      manager: this,

      config,
    });

    this.list = [popup, ...this.list];
    this.onUpdate(this.list);

    return popup;
  }

  // 全部清空
  removeAll() {
    this.list.map((m) => m.onLeave());
  }
}

// 弹出组件生命周期管理
class Popup {
  constructor({ id, children, manager, config }) {
    this.id = id;
    this.state = Popup_State.Entering;

    this.children = children;
    this.config = config;

    this.manager = manager;

    this.onEnter = this.onEnter.bind(this);
    this.onPresent = this.onPresent.bind(this);
    this.onLeave = this.onLeave.bind(this);
    this.onDestroy = this.onDestroy.bind(this);

    this.updateWidthDelay = this.updateWidthDelay.bind(this);

    this.presentDuration = 2000;
    this.presentTimer = null;
  }

  update(state) {
    this.state = state;
    this.manager.updateItem(this);
  }

  clearTimer() {
    if (this.presentTimer) {
      clearTimeout(this.presentTimer);
      this.presentTimer = null;
    }
  }

  updateWidthDelay(state, delay) {
    // 延迟更新
    if (delay && !this.presentTimer) {
      const delayDuration = Math.max(
        0,
        typeof delay === 'number' ? delay : this.presentDuration,
      );
      this.presentTimer = setTimeout(() => this.update(state), delayDuration);
    } else {
      this.update(state);
    }
  }

  // 开始进入
  onEnter(delay) {
    this.updateWidthDelay(Popup_State.Entering, delay);
  }

  // 完成进入
  onPresent(delay) {
    this.updateWidthDelay(Popup_State.Present, delay);
  }

  onHoldon(delay) {
    this.updateWidthDelay(Popup_State.Holdon, delay);
    this.clearTimer();
  }

  // 开始退出
  onLeave(delay) {
    this.updateWidthDelay(Popup_State.Leaving, delay);
  }

  // 完成退出
  onDestroy(delay) {
    this.updateWidthDelay(Popup_State.Destroy, delay);
  }
}

// 提供 hook
function genPopupProvider({ Provider, children, container: PopUpContainer }) {
  const [list, setList] = useState([]);

  // 数据驱动
  const ref = useRef(new PopupManager());
  useEffect(() => {
    const popupManager = ref.current;
    popupManager.onUpdate = (list) => {
      setList(list);
    };
  });

  const portal = useMemo(() => {
    return ReactDOM.createPortal(<PopUpContainer />, document.body);
  }, [list]);

  return (
    <Provider
      value={{
        list,
        add: ref.current.addItem,
        remove: ref.current.removeItem,
        clear: ref.current.removeAll,
      }}
    >
      {children}
      {portal}
    </Provider>
  );
}

export default genPopupProvider;
