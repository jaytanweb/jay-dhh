import React, { useMemo, useState } from 'react';

import Trigger from 'rc-trigger';
import 'rc-trigger/assets/index.less';

import { DatePicker, Button } from '@/design/components';
import moment, { isMoment } from 'moment';
import { useTheme } from '@/design/hooks/Theme';
import { isValidArray } from '@/utils/type';

const PopupDatePicker = ({
  value,
  onChange,
  style = {},
  datePickerStyle = {},
  format = 'YY年 / MM月 / DD日',
  range,
  disabled,
}) => {
  const [visible, setVisible] = useState(false);

  const [{ margin }] = useTheme();

  const formatMessage = useMemo(() => {
    if (range)
      return isValidArray(value)
        ? `${value[0].format(format)} ~ ${value[1].format(format)}`
        : `请选择`;

    return isMoment(value) ? value.format(format) : `请选择`;
  });

  return (
    <div className="PopupDatePicker" style={style}>
      <Trigger
        popupVisible={visible}
        popupAlign={{
          points: ['tl', 'bl'],
          offset: [0, margin.default],
        }}
        popup={
          <DatePicker
            style={{ width: 300, ...datePickerStyle }}
            value={value}
            onChange={(val) => {
              setVisible(false);
              onChange(val);
            }}
            range={range}
          />
        }
      >
        <Button
          disabled={disabled}
          onClick={() => setVisible(!visible)}
          type="secondary"
        >
          {formatMessage}
        </Button>
      </Trigger>
    </div>
  );
};

export default PopupDatePicker;
