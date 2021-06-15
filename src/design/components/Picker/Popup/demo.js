import React, { useState } from 'react';
import moment from 'moment';

import PopupDatePicker from './';

const PopupDatePickerDemo = ({}) => {
  const [value, setValue] = useState(moment());
  const [range, setRange] = useState([moment(), moment().add(5, 'days')]);

  return (
    <div>
      {/* <PopupDatePicker
        range
        value={range}
        onChange={setRange}
        style={{ marginBottom: 12 }}
      /> */}

      <PopupDatePicker
        value={value}
        onChange={setValue}
        style={{ marginBottom: 12 }}
      />
    </div>
  );
};

export default PopupDatePickerDemo;
