import React, { useState } from 'react';
import { Checkbox } from '..';

const CheckboxDemo = () => {
  const [value, setValue] = useState(false);

  return (
    <div className="CheckboxDemo">
      <Checkbox.Group
        value={value}
        onChange={setValue}
        col={3}
        options={[
          { title: '111', value: 111 },
          { title: '222', value: 222 },
          { title: '333', value: 333 },
        ]}
      />
    </div>
  );
};

export default CheckboxDemo;
