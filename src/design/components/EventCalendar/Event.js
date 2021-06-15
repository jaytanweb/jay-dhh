import React, { useMemo } from 'react';
import moment from 'moment';
import { useTheme } from '@/design/hooks/Theme';
import { isValidArray } from '@/utils/type';
import { useEventCalendarContext } from '.';

const Event = ({ range, children }) => {
  const {
    daysOfWeek,
    timeOfDay,
    cellTimeGap,
    cellHeight,
  } = useEventCalendarContext();

  const styles = useMemo(() => {
    if (!isValidArray(range) || !range[0] || !range[1]) {
      return { display: 'none' };
    }

    const [startM, endM] = range;

    const leftDay = moment(daysOfWeek[0]);
    const topTime = moment(timeOfDay[0]);

    const leftOffset = startM.diff(leftDay, 'day'); // 距离左侧
    const topOffset =
      (moment(startM).date(topTime.date()).diff(topTime, 'minute') + 1) /
      cellTimeGap; // 距离顶部
    const duration = endM.diff(startM, 'minute') / cellTimeGap; // 实际长度

    return {
      width: `${100 / daysOfWeek.length}%`,
      left: `${(100 / daysOfWeek.length) * leftOffset}%`,

      // height: `${(100 / timeOfDay.length) * duration}%`,
      // top: `${(100 / timeOfDay.length) * topOffset}%`,

      height: cellHeight * duration,
      top: cellHeight * topOffset,
    };
  }, [range, daysOfWeek, timeOfDay, cellTimeGap]);

  const [
    {
      margin,
      padding,
      borderRadius,
      color: { primary },
    },
  ] = useTheme();

  return (
    <div
      style={{
        position: 'absolute',
        borderRadius: borderRadius.mini,
        padding: padding.mini,
        overflow: 'hidden',
        ...styles,
      }}
    >
      {children}
    </div>
  );
};

export default Event;
