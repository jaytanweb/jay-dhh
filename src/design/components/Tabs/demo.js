import React, { useMemo, useState } from 'react';
import { Tabs } from '..';
import Button from '../Button';

const TabDemo = () => {
  const [active, setActive] = useState();

  const tabs = useMemo(() => {
    return [
      {
        key: 'tab1',
        title: 'Tab1',
        content: <Button>Tab1</Button>,
      },
      {
        key: 'tab2',
        title: 'Tab2',
        content: <Button>Tab2</Button>,
      },
      {
        key: 'tab3',
        title: 'Tab3',
        content: <Button>Tab3</Button>,
      },
    ];
  });

  return (
    <div className="TabDemo">
      <Tabs active={active} onChange={setActive} tabs={tabs} />
    </div>
  );
};

export default TabDemo;
