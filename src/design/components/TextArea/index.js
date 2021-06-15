import React, { useEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import { useTheme } from '@/design/hooks/Theme';
import { Icon } from '@/design/components';

import { default as createLocalContext } from '@/design/hooks/createContext';
const { Provider, useContext: useTextareaContext } = createLocalContext(
  'Textarea',
);

// 容器
const Container = styled.div(() => {
  const [{ borderRadius, size, padding }] = useTheme();

  const { foreColor, bgColor, complete, error } = useTextareaContext();

  return `
        width: 100%;
        padding: ${padding.small}px ${
    complete || error ? padding.large : padding.small
  }px  ${padding.small}px ${padding.small}px;
        border-bottom: 1px solid ${foreColor};
        border-top-left-radius: ${borderRadius.small}px;
        border-top-right-radius: ${borderRadius.small}px;
        background: ${bgColor};
        position: relative;
      `;
});

// 输入框
const Textarea = styled.textarea(() => {
  const [{ size }] = useTheme();
  const { disabled, fontColor } = useTextareaContext();

  return `
    all: unset;
    border: none;
    width: 100%;
    word-break: break-word;
    
    color: ${fontColor};
    -webkit-text-fill-color: ${fontColor};

    font-weight: 400;
    font-size: ${size.s_14}px;
    line-height: ${size.s_24}px;
    letter-spacing: 0%;

    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', Helvetica, Arial,
    sans-serif;
    text-align: left;

    cursor: ${disabled ? 'not-allowed' : 'pointer'};

    &::placeholder {
        all: unset;
        color: ${fontColor}44;
        -webkit-text-fill-color: ${fontColor}99;
    }
  `;
});

// 图标按钮
const Icons = () => {
  const [{ size, padding }] = useTheme();
  const { icon, disabled, error, complete, fontColor } = useTextareaContext();

  const iconType = useMemo(() => {
    if (error) return 'stateError';
    if (complete && !icon) return 'stateComplete';
    return icon;
  }, [disabled, error, complete]);

  return iconType ? (
    <Icon
      size={size.s_12}
      type={iconType}
      color={fontColor}
      style={{ position: 'absolute', top: size.s_14, right: padding.mini }}
    />
  ) : null;
};

export default ({
  value,
  onChange,
  onFocus,
  readOnly,
  onBlur,
  disabled,
  placeholder,
  error,
  complete,
  rows = 5,
  icon,
  style = {},
  textareaStyle = {},
}) => {
  /**
   *  控制内部状态
   */
  const textareaRef = React.createRef();
  const [composition, setComposition] = useState(false); // 输入法输入中

  // 内部值
  const [val, setVal] = useState(); // 值
  useEffect(() => setVal(value), [value]);
  // 清空输入
  const onClear = () => onChange();

  /**
   *  聚焦管理
   */
  const [focus, setFocus] = useState(false); // 聚焦
  const onTextareaFocus = (e) => {
    if (disabled) return;
    if (!focus) {
      setFocus(true);
      // 通知外部的 foucus 监听
      onFocus && onFocus(e);
      // 触发 TextareaBase 的 focus
      textareaRef?.current?.focus(e);
      // 滚动到可视范围的居中位置
      textareaRef?.current?.scrollIntoView({
        block: 'center',
        inline: 'center',
      });
    }
  };
  const onTextareaBlur = (e) => {
    setFocus(false);
    // 通知外部的 foucus 监听
    onBlur && onBlur(e);
  };

  /**
   *  状态样式
   */
  const [
    {
      color: { gray, primary, red, green, blue, state: stateColor },
    },
  ] = useTheme();
  // 文本、图标颜色
  const fontColor = useMemo(() => {
    if (disabled) return stateColor.disabled;
    if (error) return red.light_2;
    if (complete) return green.default;
    if (focus) return primary.light_1;
    return blue.light_2;
  }, [error, disabled, complete, focus]);
  // 前景色，边框等颜色
  const foreColor = useMemo(() => {
    if (disabled) return stateColor.disabled;
    if (error) return red.light_3;
    if (complete) return green.light_3;
    if (focus) return primary.light_3;
    return gray.light_2;
  }, [error, disabled, complete, focus]);
  // 背景色
  const bgColor = useMemo(() => {
    if (disabled) return stateColor.disabled;
    if (error) return red.light_5;
    if (complete) return green.light_5;
    if (focus) return primary.light_5;
    return gray.light_4;
  }, [error, disabled, complete, focus]);

  return (
    <Provider
      value={{
        disabled,
        error,
        readOnly,
        complete,
        composition,
        focus,
        value: val,
        onChange,
        rows,

        icon,

        foreColor,
        bgColor,
        fontColor,
      }}
    >
      <Container
        className="TextareaContainer"
        onFocus={onTextareaFocus}
        onBlur={onTextareaBlur}
        style={style}
      >
        <Textarea
          rows={rows}
          className="TextareaBase"
          ref={textareaRef}
          placeholder={placeholder}
          disabled={disabled}
          readOnly={readOnly}
          value={val}
          defaultValue={null}
          onCompositionStart={() => setComposition(true)}
          onCompositionEnd={(e) => {
            setVal(e.target.value);
            onChange && onChange(e.target.value);
            setComposition(false);
          }}
          onKeyDown={(e) => {
            if (error || readOnly || disabled || e.key !== 'Enter') return;
            onSearch && onSearch(val);
          }}
          onChange={(e) => {
            setVal(e.target.value);
            if (!composition) onChange && onChange(e.target.value);
          }}
          style={textareaStyle}
        />
        <Icons className="TextareaIcons" />
      </Container>
    </Provider>
  );
};
