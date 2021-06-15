import React, { useMemo } from 'react';
import styled from 'styled-components';

import { useTheme } from '@/design/hooks/Theme';
import { Text } from '@/design/components';

import { isValidArray } from '@/utils/type';

import check from '@/design/components/Icon/assets/svg_icon_check_white.svg';

const CheckboxContainer = styled.label(({ disabled }) => {
  const [
    {
      padding,
      margin,
      borderRadius,
      color: { primary, gray },
    },
  ] = useTheme();

  return `
        display: grid;
        gap: ${margin.small}px;
        grid-template-columns: auto 1fr;
        place-items: center;
        padding: ${padding.tiny}px;
        margin: ${margin.tiny}px;
        cursor: ${disabled ? 'not-allowed' : 'pointer'};
        border-radius: ${borderRadius.mini}px;
        color: ${primary.light_5};

        &:hover {
          color: ${primary.light_1};
        }

        &:hover {
          background: ${disabled ? gray.light_3 : primary.light_3};
        }
    `;
});

const Dot = styled.span(
  ({
    width,
    selected, // 全部选中
    undetermined = false, // 部分选中， 待定
    disabled,
    rounded,
  }) => {
    const [
      {
        size,
        color: { gray, primary },
      },
    ] = useTheme();

    width = width || size.s_16;

    const background = useMemo(() => {
      if (selected) {
        return `
            background-image: url(${check});
            background-repeat: no-repeat;
            background-size: contain;
            background-position: center center;
            background-color: ${disabled ? gray.light_1 : primary.default};
            border: 2px solid ${disabled ? gray.light_1 : primary.default};
          `;
      }

      if (undetermined)
        return `background-color: ${
          disabled ? gray.light_3 : primary.default
        };`;

      return `background-color: transparent;`;
    }, [selected, undetermined, disabled]);

    const color = useMemo(() => {
      return selected ? primary.default : gray.light_2;
    }, [selected, disabled]);

    return `
        display: inline-grid;
        box-sizing: border-box;
        width: ${width}px;
        height: ${width}px;
        border: 1px solid ${gray.light_1};

        opacity: ${disabled ? 0.5 : 1};

        border-radius: ${rounded ? '50%' : `${size.s_2}px`};

        &:not(:disabled):hover {
          border: 1px solid ${color};
        }

        &::before {
            content: "";
            display: inline-block;

            width: 100%;
            height: 100%;

            border-radius: ${rounded ? '50%' : `${size.s_2 / 2}px`};

            transform-origin: center center;
            transform: scale(${selected ? 1 : undetermined ? 0.6 : 0});
            transition: all .1s ease;

            ${background}
        }
    `;
  },
);

const Checkbox = ({ children, onClick, style = {}, disabled, ...rest }) => (
  <CheckboxContainer
    onClick={(e) => {
      if (!disabled && onClick) onClick(e);
    }}
    style={style}
    disabled={disabled}
  >
    <Dot {...rest} />
    <Text style={{ maxWidth: '100%' }}>{children}</Text>
  </CheckboxContainer>
);

const CheckboxGroup = ({
  value = [],
  onChange,
  disabled,
  options = [],
  showCheckAll = true,
  checkAllTitle = '全选',

  col = 2,
}) => {
  const [
    {
      margin,
      padding,
      color: { gray },
    },
  ] = useTheme();

  if (!isValidArray(options)) return null;

  // 全选的状态
  const { selected, undetermined } = useMemo(() => {
    let selected = false,
      undetermined = false;

    const selectedCount = value ? value.length : 0;

    if (selectedCount > 0) {
      if (selectedCount === options.length) {
        selected = true;
        undetermined = false;
      } else {
        selected = false;
        undetermined = true;
      }
    }

    return { selected, undetermined };
  }, [value, options]);

  return (
    <div className="CheckboxGroup">
      {showCheckAll && (
        <div
          style={{
            paddingBottom: margin.mini,
            marginBottom: margin.mini,
            borderBottom: `1px dashed ${gray.light_3}`,
          }}
        >
          <Checkbox
            className="CheckboxGroupCheckAll"
            selected={selected}
            undetermined={undetermined}
            onClick={() =>
              onChange(selected ? [] : options.map((opt) => opt.value))
            }
            style={{ display: 'inline-grid', paddingRight: padding.default }}
          >
            {checkAllTitle}
          </Checkbox>
        </div>
      )}
      <div
        className="CheckboxGroupOptions"
        style={{
          display: 'grid',
          gap: margin.mini,
          gridTemplateColumns: `repeat(${col}, 1fr)`,
        }}
      >
        {options.map(({ title, value: optValue, disabled: optDisabled }) => {
          disabled = disabled || optDisabled;
          const selected = isValidArray(value) && value.includes(optValue);

          return (
            <Checkbox
              key={optValue}
              onClick={() =>
                onChange(
                  selected
                    ? value.filter((val) => val !== optValue)
                    : [...value, optValue],
                )
              }
              disabled={disabled}
              selected={selected}
            >
              {title}
            </Checkbox>
          );
        })}
      </div>
    </div>
  );
};

Checkbox.Group = CheckboxGroup;

export default Checkbox;
