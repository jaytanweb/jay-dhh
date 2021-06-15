import React, { useEffect, useRef } from 'react';

const DomBoundary = ({
  onClickOutside,
  onClickInside,
  children,
  autoScrollIntoView,
  style = {},
}) => {
  const targetRef = useRef(null);

  // 判断点击是否在 dom 范围内
  useEffect(() => {
    const detectClick = e => {
      // 判断点击的 dom 是否在目标 dom 内部
      if (targetRef && targetRef.current) {
        if (targetRef.current.contains(e.target)) {
          onClickInside && onClickInside();
        } else {
          onClickOutside && onClickOutside();
        }
      }
    };

    document.addEventListener('mousedown', detectClick);

    return () => {
      document.removeEventListener('mousedown', detectClick);
    };
  }, []);

  // 自动滚动到可视范围内
  useEffect(() => {
    const executeScroll = () =>
      targetRef.current.scrollIntoView({ block: 'center', inline: 'center' });

    if (autoScrollIntoView) executeScroll();
  }, []);

  return (
    <div className="DomBoundary" ref={targetRef} style={style}>
      {children}
    </div>
  );
};

export default DomBoundary;
