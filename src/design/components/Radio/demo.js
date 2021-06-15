import React, { useState } from 'react';
import { Radio } from '..';

const RadioDemo = () => {
  const [value, setValue] = useState('Radio1');
  return (
    <div className="RadioDemo">
      <Radio.Group
        value={value}
        onChange={setValue}
        col={3}
        options={[
          { title: 'Radio1', value: 'Radio1' },
          { title: 'Radio2', value: 'Radio2' },
          { title: 'Radio3', value: 'Radio3' },
        ]}
      />
    </div>
  );
};

export default RadioDemo;
