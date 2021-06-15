import { useTheme } from '@/design/hooks/Theme';
import React, { useMemo } from 'react';
import styled from 'styled-components';

import { Text } from '@/design/components';
import { boxShadow } from '@/design/theme/theme.common';

const Segment = ({
  options,
  value: target,
  defaultValue,
  onChange,
  disabled: segmentDisabled,
  style = {},
}) => {
  const [
    {
      margin,
      color: { primary, state: stateColor },
      padding,
      borderRadius,
    },
  ] = useTheme();

  return (
    <div
      className="Radio"
      style={{
        display: 'inline-grid',
        gridTemplateColumns: `repeat(${options.length}, 1fr)`,
        placeItems: 'stretch',
        gap: margin.mini,
        background: segmentDisabled ? stateColor.disabled : primary.light_2,
        padding: padding.mini,
        borderRadius: borderRadius.small,
        ...style,
      }}
    >
      {options
        .filter((opt) => typeof opt.title === 'string')
        .map(({ title, value, disabled: optionsDisabled }) => {
          const disabled = segmentDisabled || optionsDisabled;

          const active =
            value === (target === undefined ? defaultValue : target);

          return (
            <Option
              key={value}
              children={title}
              disabled={disabled}
              active={active}
              onClick={() => {
                if (!disabled && onChange) onChange(value);
              }}
            />
          );
        })}
    </div>
  );
};

const Option = styled((props) => <Text type="p2" ellipsis {...props} />)(
  ({ active, disabled }) => {
    const [
      {
        padding,
        borderRadius,
        boxShadow,
        genBoxShadow,
        color: { primary, gray, state: stateColor },
      },
    ] = useTheme();

    const styles = useMemo(() => {
      if (disabled) {
        return `
            background: ${active ? gray.light_5 : stateColor.disabled};
            color: ${active ? stateColor.disabled : gray.light_5};
            box-shadow: ${
              active ? genBoxShadow(stateColor.disabled).darker : 'none'
            };
        `;
      }

      return `
            background: ${active ? gray.light_5 : primary.light_2};
            color: ${active ? primary.default : gray.light_5};
            box-shadow: ${active ? boxShadow.darker : 'none'};
        `;
    }, [disabled, active, primary, gray, stateColor]);

    return `
        max-width: 100%;
      // 排列
        text-align: center;
        vertical-align: bottom;
    
        // 动态
        padding: ${padding.mini}px;
        border-radius: ${borderRadius.mini}px;
        cursor: ${disabled ? 'not-allowed' : 'pointer'};
        ${styles}
      `;
  },
);

export default Segment;
