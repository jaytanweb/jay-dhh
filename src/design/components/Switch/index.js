import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';

import { useTheme } from '@/design/hooks/Theme';
import { Text } from '@/design/components';
import { padding } from '@/design/theme/theme.common';

const Switch = ({
  yes = '是',
  no = '否',
  value = false,
  onChange,
  disabled,
  height = 28,
  width = 54,
}) => {
  const [
    {
      padding,
      color: { gray },
    },
  ] = useTheme();

  // 同时达成受控和非受控
  const [turnedOn, setTurnedOn] = useState(value);

  //   受控时， 随时根据 value 更新组件状态
  useEffect(() => {
    setTurnedOn(value);
  }, [value]);

  return (
    <Container
      width={width}
      height={height}
      disabled={disabled}
      turnedOn={turnedOn}
      onClick={() => {
        if (!disabled) {
          // 非受控时，组件状态内部更新
          setTurnedOn(!turnedOn);
          onChange && onChange(!turnedOn);
        }
      }}
    >
      <Text
        ellipsis
        style={{
          textAlign: 'center',
          color: gray.light_5,
          width: turnedOn ? '100%' : 0,
          opacity: turnedOn ? 1 : 0,
          transition: 'all .12s ease',
        }}
      >
        {yes}
      </Text>
      <Text
        ellipsis
        style={{
          textAlign: 'center',
          color: gray.light_5,
          width: turnedOn ? 0 : '100%',
          opacity: turnedOn ? 0 : 1,
          transition: 'all .12s ease',
        }}
      >
        {no}
      </Text>
    </Container>
  );
};

export default Switch;

const Container = styled.div(({ turnedOn, disabled, width, height }) => {
  const [
    {
      size,
      color: { primary, gray, state: stateColor },
    },
  ] = useTheme();

  // 悬浮球
  const dotPadding = 1;
  const dotWidth = height - dotPadding * 4;

  const containerPadding = useMemo(() => {
    return turnedOn
      ? `${dotPadding}px ${dotWidth + dotPadding}px ${dotPadding}px 0`
      : `${dotPadding}px 0 ${dotPadding}px ${dotWidth + dotPadding}px`;
  }, [height, turnedOn]);

  return `
        width: ${width}px;
        height: ${height}px;
        border-radius: ${height / 2}px;
        padding: ${containerPadding};

        cursor: ${disabled ? 'not-allowed' : 'pointer'};

        display: inline-flex;
        align-items: center;
        justify-content: center;

        background: ${
          disabled
            ? stateColor.disabled
            : turnedOn
            ? primary.default
            : gray.light_1
        };
        transition: all .12s ease;

        position: relative;

        // 悬浮球
        &::before{
          content: "";
          display: inline-block;
          position: absolute;
          width: ${dotWidth}px;
          height: ${dotWidth}px;
          border-radius: 50%;
          top: ${dotPadding * 2}px;
          left: ${
            turnedOn
              ? `calc(100% - ${dotWidth + dotPadding * 2}px)`
              : `${dotPadding * 2}px`
          };
          background: ${disabled ? gray.light_4 : gray.light_5};
          transition: all .12s ease;
        }
      `;
});
