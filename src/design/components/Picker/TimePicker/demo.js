import moment from 'moment';
import React, { useState } from 'react';
import TimePicker from './index';

const TimePickerDemo = ({}) => {
  const [value, onChange] = useState(moment());

  return (
    <div className="TimePickerDemo">
      <TimePicker value={value} onChange={onChange} />
    </div>
  );
};

export default TimePickerDemo;
