import { useTheme } from '@/design/hooks/Theme';
import { useDatePickerContext } from '.';
import React from 'react';
import moment from 'moment';
import { SubTitle, Icon } from '@/design/components';

const Month = () => {
  const { selectedMonth, setSelectedMonth } = useDatePickerContext();
  const [{ size, padding }] = useTheme();
  return (
    <div
      className="DatePickerHeader"
      style={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Icon
        type="arrowLeft"
        size={size.s_10}
        onClick={() =>
          setSelectedMonth(moment(selectedMonth.subtract(1, 'month')))
        }
      />
      <SubTitle style={{ padding: `0 ${padding.default}px` }}>
        {selectedMonth?.format('YYYY 年 / MM月')}
      </SubTitle>
      <Icon
        type="arrowRight"
        size={size.s_10}
        onClick={() => setSelectedMonth(moment(selectedMonth.add(1, 'month')))}
      />
    </div>
  );
};

export default Month;
