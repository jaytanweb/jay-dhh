import { useMemo } from 'react';
import moment from 'moment';
import { isValidArray } from '@/utils/type';

export const useTimeOfDay = ({
  startHour,
  startMinute,
  endHour,
  endMinute,
  cellTimeGap,
}) => {
  return useMemo(() => {
    let curr = moment().hour(startHour).minute(startMinute),
      end = moment().hour(endHour).minute(endMinute);

    let ret = [];

    while (curr.isBefore(end)) {
      ret.push(moment(curr));
      curr.add(cellTimeGap, 'minute');
    }
    return ret;
  }, [startHour, startMinute, endHour, endMinute]);
};

export const useDaysOfWeek = (weekOffset, hideWeekend) => {
  return useMemo(() => {
    let start = moment().startOf('isoweek').add(weekOffset, 'week');

    let ret = [start];
    for (let i = 1; i < (hideWeekend ? 5 : 7); i++) {
      ret.push(moment(ret[ret.length - 1]).add(1, 'day'));
    }
    return ret;
  }, [weekOffset]);
};

export const useDayFormat = (m) => {
  if (moment.isMoment(m)) {
    return {
      day: `星期${['日', '一', '二', '三', '四', '五', '六'][m.day()]}`,
      date: m.format('MM / DD'),
    };
  }

  return '-';
};

// 时间段是否和当前事件冲突
export const hasConflict = (events, m) => {
  return (
    isValidArray(events) &&
    events.find((ev) => m.isBetween([moment(ev.startTime), moment(ev.endTime)]))
  );
}; // 和其它时间冲突

export const hasOverlap = (events, [start, end]) => {
  return events.find(
    ({ startTime, endTime }) =>
      moment(startTime).isBetween(start, end) ||
      moment(endTime).isBetween(start, end),
  );
};
