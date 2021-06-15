import React, { useState, useEffect, useMemo } from 'react';
import {
  Input,
  TextButton,
  SvgIcon,
  DomBoundary,
} from '@/v3/BBGDesign/components';
import { useTheme } from '@/design/hooks/Theme';
import { notNil } from '@/v3/utils/type';
import { InputBase, InputContainer } from '.';

import NumberInput from 'rc-input-number';
import styled from 'styled-components';
import { Paragraph } from '../Text';

const InputNumber = ({
  value,
  onChange,
  min,
  max,
  placeholder = '输入',
  disabled,
  hasError,
  block,
  theme: {
    color: { gray, primary },
  },
}) => {
  const [focused, setFocused] = useState(false);

  const finished = useMemo(() => {
    return !focused && notNil(value);
  }, [focused, value]);

  const onInputUpdate = (diff) => {
    // 防止溢出范围
    const val = Math.max(
      min,
      Math.min(
        max,
        // 解决小数加减的精度问题
        parseFloat(value + diff).toFixed(10),
      ),
    );
    onChange(isNaN(val) ? null : val);
  };

  const onBlur = () => {
    setFocused(false);
  };

  const { minusDisabled, plusDisabled } = useMemo(() => {
    return {
      minusDisabled: disabled || (notNil(min) && notNil(value) && value <= min),
      plusDisabled: disabled || (notNil(max) && notNil(value) && value >= max),
    };
  }, [min, max, value]);

  return (
    <DomBoundary onClickInside={() => setFocused(true)} onClickOutside={onBlur}>
      <InputContainer
        className="InputNumber"
        hasError={hasError}
        disabled={disabled}
        finished={finished}
        focused={focused}
      >
        <SvgIcon
          type="minus"
          onClick={() => onInputUpdate(-1)}
          disabled={minusDisabled}
          color={minusDisabled ? gray.lightest : primary.medium}
        />

        <NumberInputContainer>
          <NumberInput
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            placeholder={placeholder}
            min={min}
            max={max}
            disabled={disabled}
          />
        </NumberInputContainer>

        <SvgIcon
          type="plus"
          onClick={() => onInputUpdate(1)}
          disabled={plusDisabled}
          color={plusDisabled ? gray.lightest : primary.medium}
        />
      </InputContainer>
    </DomBoundary>
  );
};

export default withTheme(InputNumber);

const NumberInputContainer = styled.div`
  & input {
      border: none;
      text-align: center;
      outline: none;
      background: transparent;
    }}
  }

`;
