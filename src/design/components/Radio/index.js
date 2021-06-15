import React, { Children, useMemo } from 'react';
import styled from 'styled-components';

import { useTheme } from '@/design/hooks/Theme';
import { Text } from '@/design/components';
import { isValidArray } from '@/utils/type';

const RadioGroup = ({ value, onChange, disabled, options = [], col = 2 }) => {
  const [{ margin }] = useTheme();

  if (!isValidArray(options)) return null;

  return (
    <div
      className="RadioGroup"
      style={{
        display: 'grid',
        gap: margin.minni,
        gridTemplateColumns: `repeat(${col}, 1fr)`,
      }}
    >
      {options.map(({ title, value: optValue, disabled: optDisabled }) => {
        disabled = disabled || optDisabled;
        const selected = optValue === value;

        return (
          <Radio
            key={optValue}
            onClick={() => onChange(optValue)}
            disabled={disabled}
            selected={selected}
          >
            {title}
          </Radio>
        );
      })}
    </div>
  );
};

const Radio = ({ selected, disabled, onClick, children }) => {
  const [{ padding }] = useTheme();

  return (
    <div
      className="radio"
      onClick={(e) => {
        if (disabled || selected || !onClick) return;
        onClick();
      }}
      style={{
        display: 'inline-flex',
        alignItems: 'flex-start',
      }}
    >
      <span style={{ padding: `${padding.tiny}px 0` }}>
        <Dot selected={selected} rounded />
      </span>
      <Text style={{ flex: 1, minWidth: 0 }}>{children}</Text>
    </div>
  );
};

const Dot = styled.span(({ width, selected, disabled, rounded }) => {
  const [
    {
      margin,
      padding,
      size,
      color: { gray, state: stateColor, primary },
    },
  ] = useTheme();

  width = width || size.s_14;

  const { lineColor, circleColor, hoverColor } = useMemo(() => {
    //   已选中
    if (selected) {
      return disabled
        ? {
            lineColor: stateColor.disabled,
            circleColor: stateColor.disabled,
            hoverColor: stateColor.disabled,
          }
        : {
            lineColor: primary.default,
            circleColor: primary.default,
            hoverColor: primary.light_2,
          };
    }

    //   未选中
    return disabled
      ? {
          lineColor: stateColor.disabled,
          circleColor: gray.light_5,
          hoverColor: stateColor.disabled,
        }
      : {
          lineColor: gray.default,
          circleColor: gray.light_5,
          hoverColor: gray.light_2,
        };
  }, [selected, disabled]);

  const borderRadius = rounded ? '50%' : 0;

  return `
        display: inline-grid;
        width: ${width}px;
        height: ${width}px;
        padding: ${size.s_2}px;
        margin: 0 ${margin.mini}px;
        border: 1px solid ${lineColor};

        opacity: ${disabled ? 0.3 : 1};

        border-radius: ${borderRadius};

        &:not(:disabled):hover {
            border-color: ${hoverColor};
        }

        &::before {
            content: "";
            display: inline-block;
            width: 100%;
            height: 100%;

            transform: scale(${selected ? 1 : 0});
            transform-origin: center center;

            border-radius: ${borderRadius};
            background: ${circleColor};

            transition: all .2s ease;
        }
    `;
});

Radio.Group = RadioGroup;

export default Radio;
