import createContext from '@/design/hooks/createContext';
import { useTheme } from '@/design/hooks/Theme';
import moment from 'moment';
import React, { useEffect, useState } from 'react';

import { Card } from '@/design/components';

import WeekDays from './Weekdays';
import WeekList from './WeekList';
import Month from './Month';
import { isValidArray } from '@/utils/type';

const { Provider, useContext } = createContext('DatePicker');

export const useDatePickerContext = useContext;

const DatePicker = ({
  value,
  onChange,
  disabled,
  disabledDate,
  range, // 是否选择范围
  style = {},
}) => {
  const [selectedMonth, setSelectedMonth] = useState();

  // 是否选择了第一个
  const [indetermined, setIndetermined] = useState(false);
  // 局部状态 开始结束日期
  const [[start, end], setRange] = useState(isValidArray(value) ? value : []);

  // 设置默认月份 已选起始日期所在月份 / 当前月份
  useEffect(() => {
    setSelectedMonth(
      moment(range ? value && value[0] : value).startOf('month'),
    );
  }, []);

  return (
    <Provider
      value={{
        // 多选
        range,
        // 多选时，组件内部状态
        start,
        end,
        setRange,
        indetermined, // 是否选择了部分
        setIndetermined,

        // 通用
        value,
        onChange,
        disabled,
        disabledDate,
        selectedMonth,
        setSelectedMonth,
      }}
    >
      <Card
        className="DatePicker"
        header={<Month />}
        style={style}
        width={style?.width}
      >
        {/* 选择日期 */}
        <WeekDays />
        <WeekList />
      </Card>
    </Provider>
  );
};

export default DatePicker;
