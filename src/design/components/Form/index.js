import React, { useMemo, useCallback } from 'react';
import { useForm as useReactHookForm, Controller } from 'react-hook-form';

import { throttle } from 'lodash';

import { useTheme } from '@/design/hooks/Theme';
import { useMediaQuery } from '@/design/hooks/MediaQuery';

import { Title, Text } from '@/design/components';
import { SubTitle } from '../Text';

// 其实没有实质影响， 主要是避免触发自动提交的刷新， 也提供一个页面上表单区域的标识
const Form = ({ style = {}, ...rest }) => {
  const stopDefault = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <form
      style={{ width: '100%', ...style }}
      onSubmit={stopDefault}
      onDrag={stopDefault}
      onDragStart={stopDefault}
      onDragEnd={stopDefault}
      onDragOver={stopDefault}
      onDragEnter={stopDefault}
      onDragLeave={stopDefault}
      onDrop={stopDefault}
      className="BBGForm"
      {...rest}
    />
  );
};
// react-hook-form 再封装
export function useForm(items) {
  const methods = useReactHookForm();

  const formItemDoms = useMemo(() => {
    let formItemDoms = {};

    items.forEach(
      (item) =>
        (formItemDoms[item.key] = (
          <FormItem key={item.key} methods={methods} item={item} />
        )),
    );

    return formItemDoms;
  }, [items, methods]);

  const { watch, handleSubmit } = methods;

  // 检测并返回数据
  const onValidate = useCallback(
    throttle(
      () =>
        new Promise((resolve) =>
          handleSubmit(
            () => resolve({ error: null, values: watch() }),
            (error) => resolve({ error }),
          )(),
        ),
      300,
    ),
    [watch, handleSubmit],
  );

  return { formItemDoms, onValidate, ...methods };
}

// react-hook-form 的 controller 用来承载第三方的输入组件
const FormItem = ({
  methods: { control, errors, trigger },
  item: {
    key,
    content,
    label,
    options = {},
    errorStyle = {},
    formItemStyle = {},
  },
  ...rest
}) => {
  const [
    {
      margin,
      padding,
      font,
      size,
      color: { gray, red, white },
    },
  ] = useTheme();

  const [isMobile] = useMediaQuery();

  const { initialValue, rules = {} } = options;

  if (rules.required === true)
    rules.required = {
      value: true,
      message: `${label || '此项'} 是必填的`,
    };

  const errMsg = errors[key] && errors[key].message;
  // const errMsg = useMemo(() => errors[key] && errors[key].message, [
  //   errors,
  //   key,
  // ]);

  const render = ({ onChange, ...restProps }) => {
    const ownUpdate = content && content.props.onChange;

    const props = {
      onChange: (...args) => {
        if (!restProps.disabled) {
          onChange(...args);
          trigger(key);
          ownUpdate && ownUpdate(...args);
        }
      },
      // hasError: Boolean(errMsg),
      ...rest,
      ...restProps,
    };

    return React.cloneElement(content, props);
  };

  return (
    <div
      key={key}
      className="formItem"
      style={{
        height: 'auto',
        minHeight: size.s_40,
        paddingBottom: padding.mini,

        display: 'grid',
        gap: margin.small,
        gridTemplateColumns: isMobile || !label ? '1fr' : '108px 1fr',
        placeContent: 'flex-start flex-start',
        // placeItems: 'flex-start center',

        ...formItemStyle,
      }}
    >
      {label && (
        <label
          style={{
            display: 'grid',
            placeContent: 'flex-start flex-start',
            marginTop: size.s_10,
            padding: `0 ${padding.small}px`,
          }}
        >
          <SubTitle>{label}:</SubTitle>
        </label>
      )}
      <div
        style={{
          // display: 'grid',
          // alignItems: 'center',
          position: 'relative',
        }}
      >
        <Controller
          name={key}
          control={control}
          rules={rules}
          render={render}
          defaultValue={initialValue}
        />
        {errMsg && (
          <Text
            className="ErrorMsg"
            style={{
              color: red.light_1,
              position: 'absolute',
              right: '5%',
              bottom: -size.s_12,
              zIndex: 10,
              maxWidth: `90%`,
              padding: `0 ${padding.small}px`,
              // background: `linear-gradient(0, ${gray.light_5} 0, ${gray.light_5} 50%, ${red.light_5} 50%)`,
              background: gray.light_5,
              ...errorStyle,
            }}
          >
            {errMsg}
          </Text>
        )}
      </div>
    </div>
  );
};

export default Form;
