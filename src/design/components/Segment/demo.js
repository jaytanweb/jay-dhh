import React, { useMemo, useState } from 'react';
import { Segment } from '..';

const SegmentDemo = () => {
  const [seg, setSeg] = useState('month');

  const options = useMemo(() => {
    return [
      {
        title: '月视图月视图月视图月视图月视图月视图月视图',
        value: 'month',
      },
      { title: '周视图', value: 'week' },
      { title: '日视图', value: 'day' },
    ];
  }, []);

  return (
    <div className="SegmentDemo">
      <Segment value={seg} onChange={setSeg} options={options} />

      <div style={{ width: 300, margin: `12px auto` }}>
        <Segment value={seg} onChange={setSeg} options={options} />
      </div>

      <div style={{ textAlign: 'center' }}>
        <Segment
          style={{ width: 260 }}
          disabled
          value={seg}
          onChange={setSeg}
          options={options}
        />
      </div>
    </div>
  );
};

export default SegmentDemo;
