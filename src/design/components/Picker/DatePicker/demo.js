import React, { useState } from 'react';
import { DatePicker } from '../..';

const DatePickerDemo = ({}) => {
  const [single, setSingle] = useState();

  const [range, setRange] = useState();

  console.log({
    single: single?.format('YY-MM-DD'),
    start: range && range[0]?.format('YY-MM-DD'),
    end: range && range[1]?.format('YY-MM-DD'),
  });

  return (
    <div
      className="DatePickerDemo"
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(2, 1fr)`,
        gap: 12,
      }}
    >
      {/* 选择范围 */}
      <DatePicker
        range // 选择范围
        value={range}
        onChange={setRange}
        disabledDate={
          (m) =>
            m && (m.isBefore(moment()) || m.isAfter(moment().add(10, 'days'))) // 仅允许选择今天至未来10天
        }
      />
      {/* 单选 */}
      <DatePicker value={single} onChange={setSingle} style={{ width: 300 }} />
    </div>
  );
};

export default DatePickerDemo;
