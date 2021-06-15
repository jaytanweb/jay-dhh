import React from 'react';
import { useTheme } from '@/design/hooks/Theme';
import { usePercent } from './usePercent';

import { Text } from '@/design/components';

const ProgressBar = ({
  value,
  min,
  max,
  height,
  bgColor,
  foreColor,
  style = {},
  showTip,
}) => {
  const [
    {
      size,
      color: { primary },
    },
  ] = useTheme();

  foreColor ||= primary.default;
  bgColor ||= primary.light_5;
  height ||= size.s_12;

  const {
    // value: val, min: minVal, max: maxVal,
    percent,
  } = usePercent({ value, min, max });

  return (
    <div
      className="ProgressBar"
      style={{
        width: '100%',
        paddingTop: showTip ? size.s_24 : 0,
        position: 'relative',
        ...style,
      }}
    >
      <div
        className="outterBar"
        style={{
          width: '100%',
          height,
          borderRadius: height / 2,
          position: 'relative',
          background: bgColor,
        }}
      >
        <div
          className="innerBar"
          style={{
            height,
            borderRadius: height / 2,
            width: `${percent}%`,
            background: foreColor,
            position: 'absolute',
            top: 0,
            left: 0,
            transition: `all .2s ease-in-out`,
          }}
        />
      </div>

      {showTip && (
        <Tip percent={percent} foreColor={foreColor} bgColor={bgColor} />
      )}
    </div>
  );
};

const Tip = ({ percent, foreColor, bgColor }) => {
  const [{ size, borderRadius, padding }] = useTheme();

  const triangleSize = size.s_8;

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: `${percent}%`,
        transform: `translateX(-50%)`,
        transition: `all .2s ease-in-out`,
      }}
    >
      <Text
        style={{
          background: bgColor,
          color: foreColor,
          padding: `0 ${padding.small}px`,
          borderRadius: borderRadius.small,
        }}
      >
        {percent}%
      </Text>

      <span
        style={{
          width: triangleSize,
          height: triangleSize,
          borderRadius: triangleSize / 10,
          position: 'absolute',
          bottom: -triangleSize / 2,
          left: '50%',
          transform: `translateX(-50%) rotate(45deg)`,
          background: bgColor,
        }}
      />
    </div>
  );
};

export default ProgressBar;
