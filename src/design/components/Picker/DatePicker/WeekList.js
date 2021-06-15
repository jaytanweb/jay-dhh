import React, { useMemo } from 'react';
import moment from 'moment';
import styled from 'styled-components';
import { useTheme } from '@/design/hooks/Theme';
import { Text } from '@/design/components';
import { useDatePickerContext } from '.';
import { isValidArray } from '@/utils/type';

// 显示当前月份的每一周
const WeekList = () => {
  const {
    selectedMonth,
    onChange,
    range,
    setRange,
    start,
    end,
    indetermined,
    setIndetermined,
    disabled,
    disabledDate,
  } = useDatePickerContext();
  const [{ padding, size }] = useTheme();

  // 渲染当前月份可见日期
  const weeks = useMemo(() => {
    let weeks = [];

    let curr = moment(selectedMonth).startOf('month').startOf('isoWeek');
    let end = moment(selectedMonth).endOf('month').endOf('isoWeek');

    while (curr.isBefore(end)) {
      let days = [];
      for (let i = 0; i < 7; i++) {
        days.push(moment(curr));
        curr = curr.add(1, 'day');
      }
      weeks.push(days);
    }
    return weeks;
  }, [selectedMonth]);

  const onPick = (day) => {
    // 单选
    if (!range) return onChange(day);

    // 多选时选择第二个日期
    if (indetermined) {
      // 决定两个选择的前后顺序
      const final = day.isAfter(start)
        ? [moment(start).startOf('day'), moment(day).endOf('day')]
        : [moment(day).startOf('day'), moment(start).endOf('day')];

      // 修改局部状态
      setRange(final);
      setIndetermined(false);

      // 确认选择
      onChange(final);
    } else {
      // 修改局部状态
      setRange([day, day]);
      setIndetermined(true);
    }
  };

  const onMouseEnter = (day) => {
    if (indetermined) {
      setRange([start, day]);
    }
  };

  const onMouseLeave = () => {
    if (indetermined) {
      setRange([start, start]);
    }
  };

  return (
    <div onMouseLeave={onMouseLeave}>
      {weeks.map((week) => {
        return (
          <div
            key={week[0].format('YY-MM-DD')}
            style={{
              display: 'grid',
              gridTemplateColumns: `repeat(7, 1fr)`,
              padding: padding.mini,
              borderRadius: size.s_24 / 2 + padding.mini,
            }}
          >
            {week.map((day) => {
              const dayDisabled =
                disabled || (disabledDate && disabledDate(day));
              return (
                <DayContainer
                  key={day.format('YY-MM-DD')}
                  onClick={() => !dayDisabled && onPick(day)}
                  onMouseEnter={() => {
                    if (dayDisabled) {
                      if (indetermined) {
                        setRange([start, start]);
                      }
                    } else {
                      onMouseEnter(day);
                    }
                  }}
                  day={day}
                >
                  <Day day={day} />
                </DayContainer>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

// 日期容器背景， 方便展示范围
const DayContainer = styled.div(({ day }) => {
  const { start, end, range, indetermined } = useDatePickerContext();

  const [
    {
      size,
      color: { primary, gray },
    },
  ] = useTheme();

  const style = useMemo(() => {
    // 多选
    if (range && start && end) {
      let startM = moment(start),
        endM = moment(end);

      if (endM.isBefore(startM)) {
        (startM = moment(end)), (endM = moment(start));
      }

      const isStart = day.isSame(startM, 'day');
      const isEnd = day.isSame(endM, 'day');
      const isBetween = !isStart && !isEnd && day.isBetween(startM, endM);

      const color = indetermined ? primary.light_3 : primary.default;

      // 开始结束为同一天
      if (isStart && isEnd) {
        return `
          background: ${color};
          border-radius: ${size.s_24 / 2}px;
        `;
      }
      // 范围起始日期
      if (isStart) {
        return `
          border-top-left-radius: ${size.s_24 / 2}px;
          border-bottom-left-radius: ${size.s_24 / 2}px;
          background: ${color};
        `;
      }
      // 范围结束日期
      if (isEnd) {
        return `
          border-top-right-radius: ${size.s_24 / 2}px;
          border-bottom-right-radius: ${size.s_24 / 2}px;
          background: ${color};
        `;
      }
      // 在范围中间日期
      if (isBetween) {
        return `
          background: ${color};
        `;
      }
    }

    // 单选 / 未选择
    return ``;
  }, [range, start, end, day, indetermined]);

  return `
    height: ${size.s_24};
    display: grid;
    place-content: center;
    ${style}
  `;
});

// 显示每一天
const Day = styled(Text).attrs(({ day }) => {
  const isToday = day.isSame(moment(), 'day');
  return {
    isToday,
    children: isToday ? '今' : day.date(),
  };
})(({ day, isToday }) => {
  const {
    value,
    start,
    end,
    selectedMonth,
    disabled,
    disabledDate,
    range,
    indetermined,
  } = useDatePickerContext();

  const [
    {
      size,
      color: { primary, gray, blue, state: stateColor },
    },
  ] = useTheme();

  const { active, isStartOrEnd } = useMemo(() => {
    let active = false,
      isStartOrEnd = false;
    // 单选时
    if (!range) {
      return {
        active: value && day.isSame(value, 'day'),
        isStartOrEnd: false,
      };
    }

    // 多选时
    if (start && end) {
      let startM = moment(start),
        endM = moment(end);

      if (endM.isBefore(startM)) {
        startM = moment(end);
        endM = moment(start);
      }

      isStartOrEnd = day.isSame(startM, 'day') || day.isSame(endM, 'day');

      active = isStartOrEnd || day.isBetween(startM, endM);
    }
    return { active, isStartOrEnd };
  }, [value, start, end, range, day]);

  const inCurrMonth = day.isSame(selectedMonth, 'month');

  const dayDisabled = useMemo(() => {
    return disabled || (disabledDate && disabledDate(day));
  }, [disabled, disabledDate]);

  const style = useMemo(() => {
    if (dayDisabled) {
      return `
        cursor: not-allowed;
        opacity: 0.5;
        color: ${stateColor.disabled};
      `;
    }

    if (active) {
      return `
        background: ${indetermined ? primary.light_3 : primary.default};
        color: ${gray.light_5};

        // transform: scale(${!range || isStartOrEnd ? 1.15 : 1});

        &:hover {
          color: ${gray.light_5};
          background: ${primary.light_2};
        }
      `;
    }

    return ``;
  }, [
    isToday,
    active,
    inCurrMonth,
    dayDisabled,
    isStartOrEnd,
    range,
    indetermined,
  ]);

  const daySize = size.s_24;

  return `
      font-size: ${size.s_12}px;
      line-height: ${daySize}px;
      width: ${daySize}px;
      height: ${daySize}px;
      border-radius: 50%;
      text-align: center;

      user-select: none;

      transition: all .05s ease;
      will-change: all;
      transform-origin: center center;

      cursor: pointer;


      color: ${
        isToday ? blue.default : inCurrMonth ? blue.light_1 : blue.light_4
      };
      &:hover {
        color: ${inCurrMonth && !dayDisabled ? gray.light_5 : gray.light_4};
        background: ${
          inCurrMonth && !dayDisabled ? primary.light_1 : primary.light_3
        };
      }

      ${style}
    `;
});

export default WeekList;
