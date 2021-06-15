import React from 'react';
import { useTheme } from '@/design/hooks/Theme';
import { SubTitle } from '@/design/components';

// 显示周天时间轴
const WeekDays = () => {
  const [
    {
      padding,
      margin,
      color: { primary, blue },
    },
  ] = useTheme();

  const days = ['一', '二', '三', '四', '五', '六', '日'];
  return (
    <div
      style={{
        display: 'grid',
        marginBottom: margin.small,
        padding: padding.mini,
        gridTemplateColumns: `repeat(7, 1fr)`,
      }}
    >
      {days.map((day, i) => (
        <SubTitle
          key={`${day}-${i}`}
          style={{
            textAlign: 'center',
            color: i >= 5 ? primary.default : blue.light_1,
          }}
        >
          {day}
        </SubTitle>
      ))}
    </div>
  );
};
export default WeekDays;
