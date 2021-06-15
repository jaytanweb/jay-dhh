import React, { useEffect, useState } from 'react';
import { ProgressBar } from '..';

const Range = ({ value, onChange, min, max, step = 1 }) => {
  const [val, setVal] = useState();

  useEffect(() => {
    setVal(value);
  }, [value]);

  return (
    <div className="Range">
      <ProgressBar value={val} min={min} max={max} />
    </div>
  );
};

export default Range;
