import { usePopup } from '@/design/hooks/Popup';
import { useTheme } from '@/design/hooks/Theme';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import Button from '../Button';
import Card from '../Card';
import { Text } from '../Text';

const ToolTip = React.forwardRef(({ children, overlay = '-' }) => {
  const hasMultypleElement = React.Children.count(children) > 1;

  const tooltipRef = useRef(null);

  const { addTooltip } = usePopup();

  const [tooltip, setTooltip] = useState();

  //   进入时
  const onMouseEnter = (e) => {
    console.log('enter', tooltip, tooltipRef?.current, rect);

    if (tooltip) return; // 不用重复
    const rect = tooltipRef?.current?.getBoundingClientRect();
    const dom = typeof overlay === 'string' ? <Text>{overlay}</Text> : overlay;
    setTooltip(addTooltip(dom, rect));
  };

  //   离开容器而不是局部内容时， destroy
  const onMouseLeave = (e) => {
    console.log({
      tooltip,
      target: e.target,
      tooltipRef: tooltipRef?.current,
      sameDom: e.target === tooltipRef?.current,
    });

    if (tooltip && e.target === tooltipRef?.current) {
      tooltip.onDestroy();
      setTooltip(null);
    }
  };

  console.log({ hasMultypleElement });

  const [{ padding }] = useTheme();

  return hasMultypleElement ? (
    <div
      className="ToolTipContainer"
      ref={tooltipRef}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{ padding: padding.mini, border: `1px solid #ededed` }}
    >
      {children}
    </div>
  ) : (
    React.cloneElement(children, {
      onMouseEnter,
      onMouseLeave,
      title: 'test',
      ref: tooltipRef,
    })
  );
});

export default ToolTip;
