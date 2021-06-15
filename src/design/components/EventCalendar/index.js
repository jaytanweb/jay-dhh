import React, { useState, useMemo, useEffect } from 'react';
import moment from 'moment';

import DaysOfWeek from './DaysOfWeek';
import TimeOfDay from './TimeOfDay';
import Cells from './Cells';
import Event from './Event';

import { useTimeOfDay, useDaysOfWeek, hasConflict, hasOverlap } from './util';

import useLocalContext from '@/design/hooks/createContext';
import { DomBoundary } from '@/design/components';

// 局部变量共享
const { Provider, useContext } = useLocalContext();
export const useEventCalendarContext = useContext;

const EventCalendar = ({ events = [], onRangeSelect, onTimeChange }) => {
  // 上下午
  const [isAm, setIsAm] = useState(moment().hour() <= 13);
  // 是否隐藏周末
  const [hideWeekend, setHideWeek] = useState(true);

  //   日历配置
  const {
    startHour,
    startMinute,
    endHour,
    endMinute,
    cellTimeGap,
    cellHeight,
  } = useMemo(() => {
    return {
      startHour: 9, // 开始 小时数
      startMinute: 30, // 开始 分钟数
      endHour: 19, // 结束 小时数
      endMinute: 30, // 结束 分钟数
      cellTimeGap: 30, // 每一格的分钟数
      cellHeight: 48,
    };
  }, []);
  // const {
  //   startHour,
  //   startMinute,
  //   endHour,
  //   endMinute,
  //   cellTimeGap,
  //   cellHeight,
  // } = useMemo(() => {
  //   return isAm
  //     ? {
  //         startHour: 9, // 开始 小时数
  //         startMinute: 0, // 开始 分钟数
  //         endHour: 12, // 结束 小时数
  //         endMinute: 30, // 结束 分钟数
  //         cellTimeGap: 30, // 每一格的分钟数
  //         cellHeight: 62,
  //       }
  //     : {
  //         startHour: 14, // 开始 小时数
  //         startMinute: 0, // 开始 分钟数
  //         endHour: 19, // 结束 小时数
  //         endMinute: 0, // 结束 分钟数
  //         cellTimeGap: 30, // 每一格的分钟数
  //         cellHeight: 62,
  //       };
  // }, [isAm]);

  // 展示周
  const [weekOffset, setWeekOffset] = useState(0);
  const daysOfWeek = useDaysOfWeek(weekOffset, hideWeekend);

  //   展示时间段
  const timeOfDay = useTimeOfDay(
    { startHour, startMinute, endHour, endMinute, cellTimeGap },
    hideWeekend,
  );

  // 本次选中范围
  const [firstSelect, setFirstSelect] = useState(); // 第一个选择
  const [secondSelect, setSecondSelect] = useState(); // 第二个选择

  // 取消选择
  const onKeyUp = (e) => {
    if (e.key === 'Escape') {
      setFirstSelect(null);
      setSecondSelect(null);
    }
  };

  useEffect(() => {
    document.addEventListener('keyup', onKeyUp);
    return () => document.removeEventListener('keyup', onKeyUp);
  }, []);

  useEffect(() => {
    // console.log({
    //   startTime: moment(daysOfWeek[0])
    //     .hour(startHour)
    //     .minute(startMinute)
    //     .format('YYYY-MM-DD HH:mm:ss'),
    //   endTime: moment(daysOfWeek[daysOfWeek.length - 1])
    //     .hour(endHour)
    //     .minute(endMinute)
    //     .format('YYYY-MM-DD HH:mm:ss'),
    // });

    // 更新展示面板的时间
    onTimeChange &&
      onTimeChange({
        startTime: moment(daysOfWeek[0])
          .hour(startHour)
          .minute(startMinute)
          .format('YYYY-MM-DD HH:mm:ss'),
        endTime: moment(daysOfWeek[daysOfWeek.length - 1])
          .hour(endHour)
          .minute(endMinute)
          .format('YYYY-MM-DD HH:mm:ss'),
      });
  }, [isAm, weekOffset]);

  // 鼠标进入 cell
  const onEnterCell = (m) => {
    // console.log('onMouseEnter', m.format('MM-DD HH:mm'));

    const conflict = hasConflict(events, m);

    if (conflict) {
      console.log('conflict');
      if (secondSelect) setSecondSelect(null);
      return;
    }

    // 已选择第一个
    if (firstSelect) {
      // 第二个和第一个是同一天
      if (firstSelect.isSame(m, 'day')) {
        setSecondSelect(m);
      }
      // 不是同一天时， 清除第二个选择
      else {
        setSecondSelect(null);
      }
    }
  };

  // 鼠标点击 cell
  const onClickCell = (m) => {
    // console.log('onClick', m.format('MM-DD HH:mm'));

    const conflict = hasConflict(events, m);

    if (conflict) return;

    // 第二次点击
    if (firstSelect && secondSelect) {
      const [start, end] = firstSelect.isBefore(secondSelect)
        ? [firstSelect, moment(secondSelect).add(cellTimeGap, 'minute')]
        : [secondSelect, moment(firstSelect).add(cellTimeGap, 'minute')];

      const overlap = hasOverlap(events, [start, end]);
      if (overlap) {
        // 清空已选
        setFirstSelect(m);
        setSecondSelect(null);
      } else {
        // 确认已选
        onRangeSelect([start, end]);

        // 清空已选
        setFirstSelect(null);
        setSecondSelect(null);
      }
    }
    // 首次点击
    else {
      setFirstSelect(m);
      setSecondSelect(m);
    }
  };

  return (
    <Provider
      value={{
        // 展示周
        weekOffset,
        setWeekOffset,
        daysOfWeek,

        // 展示时间段
        timeOfDay,

        // 切换上下午
        isAm,
        setIsAm,

        // 日历配置
        startHour,
        startMinute,
        endHour,
        endMinute,
        cellTimeGap,
        cellHeight,
        hideWeekend,

        // 本次选中范围
        firstSelect,
        secondSelect,

        onEnterCell,
        onClickCell,

        // 已创建事件
        events,
      }}
    >
      <DomBoundary
        onClickOutside={() => {
          // 清空已选
          setFirstSelect(null);
          setSecondSelect(null);
        }}
      >
        <div
          className="EventCalendar"
          style={{
            display: 'grid',
            gridTemplateColumns: '64px 1fr',
            gridTemplateRows: '64px 1fr',
            gridTemplateAreas: `
                ". week"
                "time cells"
            `,
          }}
        >
          {/* 当前周的日期 */}
          <div style={{ gridArea: 'week' }}>
            <DaysOfWeek />
          </div>

          {/* 当天的时间点 */}
          <div style={{ gridArea: 'time' }}>
            <TimeOfDay />
          </div>

          <div
            style={{
              gridArea: 'cells',
              position: 'relative',
              overflow: 'hidden',
              display: 'grid', // 适配 safari
            }}
          >
            {/* 格子 */}
            <Cells />

            {/* 已创建的事件 */}
            {events.map(({ key, startTime, endTime, content }) => (
              <Event key={key} range={[moment(startTime), moment(endTime)]}>
                {content}
              </Event>
            ))}
          </div>
        </div>
      </DomBoundary>
    </Provider>
  );
};

export default EventCalendar;
