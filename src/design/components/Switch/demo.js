import React, { useState } from 'react';
import { Switch } from '..';

const SwitchDemo = () => {
  const [sw, setSw] = useState(false);

  return (
    <div
      className="SwitchDemo"
      style={{
        display: 'grid',
        gap: 12,
        gridTemplateColumns: `repeat(3, 1fr)`,
        placeItems: 'center',
      }}
    >
      <Switch value={sw} onChange={setSw} disabled />

      <Switch value={sw} onChange={setSw} yes="xxxx" no="yyyy" width={80} />

      <Switch
        value={sw}
        onChange={setSw}
        yes="同意"
        no="不同意"
        width={98}
        height={36}
      />
    </div>
  );
};

export default SwitchDemo;
