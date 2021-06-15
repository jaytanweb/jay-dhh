import React, { useState, useEffect, useMemo } from 'react';
import { debounce } from 'lodash';

import createContext from './createContext';

const { Provider, useContext: useMediaQuery } = createContext('MediaQuery');

function MediaQueryProvider({ children, limits = [768, 1200] }) {
  const [matchList, setMatchList] = useState([]);

  useEffect(() => {
    const mediaQueryStrList = genMediaQueryStr(limits);

    if (mediaQueryStrList.length > 0) {
      const mediaList = mediaQueryStrList.map(window.matchMedia);

      // 第一次判断
      setMatchList(mediaList.map((m) => m.matches));

      // 保存全部监听函数， 用于移除监听
      const onChangeList = mediaQueryStrList.map((_, i) => {
        // 防抖
        const onChange = debounce((ev) => {
          if (ev.matches) {
            // 只有一个 true, 无需更细致的判断
            let newMatchList = matchList.map((m) => false);
            newMatchList[i] = true;

            setMatchList(newMatchList);
          } else if (mediaList.length === 1) {
            setMatchList([false]); // 当只判断一个节点时， 才可能出现全是false
          }
        }, 100);

        // 监听变化
        mediaList[i].addEventListener('change', onChange);
        return onChange;
      });

      return () => {
        // 卸载 hook 时移除监听
        mediaList.forEach((currMedia, i) =>
          currMedia.removeEventListener('change', onChangeList[i]),
        );
      };
    }
  }, []);

  return <Provider value={matchList}>{children}</Provider>;
}

function genMediaQueryStr(list) {
  let result = [];
  if (!Array.isArray(list) || list.length === 0) return result;

  // 去重 => 只保留数字 => 排序
  const limits = Array.from(new Set(list))
    .map((el) => Number(el))
    .filter((el) => !isNaN(el) && el > 0)
    .sort((a, b) => a - b);

  // console.log({ limits });

  if (limits.length === 0) return result;

  // 第一个分割点
  result.push(`(max-width: ${limits[0]}px)`);

  // 中间点
  for (let i = 0; i < limits.length - 1; i++) {
    result.push(
      `(min-width: ${limits[i] + 1}px) and (max-width: ${limits[i + 1]}px)`,
    );
  }

  // 结束点
  if (limits.length > 1)
    result.push(`(min-width: ${limits[limits.length - 1] + 1}px)`);

  return result;
}

const useVw = () => {
  // 监听视口
  const [windowWidth, setWindowWidth] = useState(800);

  useEffect(() => {
    const onResize = debounce(() => setWindowWidth(window.innerWidth), 300);
    onResize();
    window.addEventListener('resize', onResize);
    // 解除监听
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const vw = useMemo(
    () => (num) => {
      // 折算系数, 并限定系数范围
      let ratio = Math.min(1, (windowWidth * (isMobile ? 0.98 : 0.5)) / 960);
      if (!isMobile) ratio = Math.max(0.6, ratio);
      // 保留3位有效数字
      return (num * Math.floor(ratio * 10)) / 10;
    },
    [windowWidth],
  );

  return vw;
};

export { MediaQueryProvider, useMediaQuery };
