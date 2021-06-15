import React, { useEffect, useState } from 'react';
import { useTheme } from '@/design/hooks/Theme';
import ProgressBar from './bar';
import ProgressContainer from './container';

import { randomNumber } from '@/utils/format';
import { Text } from '../Text';

const ProgressDemo = () => {
  const [
    {
      color: { orange, gray, yellow },
    },
  ] = useTheme();

  const [progress, setProgress] = useState(6);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(randomNumber(1, 6));
    }, 2000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div
      className="ProgressDemo"
      style={{
        display: 'grid',
        gap: 12,
        placeItems: 'flex-start',
        gridTemplateRows: `repeat(3, 50px)`,
        placeItems: 'center stretch',
      }}
    >
      <ProgressContainer
        value={progress}
        min={0}
        max={10}
        foreColor={orange.default}
        bgColor={orange.light_5}
      >
        <Text style={{ color: gray.light_5 }}>Progress 容器</Text>
      </ProgressContainer>

      <ProgressBar
        value={progress}
        min={0}
        max={10}
        foreColor={yellow.default}
        bgColor={yellow.light_5}
        showTip
      />

      <ProgressBar value={progress} min={0} max={10} height={6} />
    </div>
  );
};

export default ProgressDemo;
