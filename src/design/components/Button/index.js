import React, { useMemo } from 'react';
import styled from 'styled-components';
import { useTheme } from '@/design/hooks/Theme';
import { Text } from '../Text';
import { Icon } from '..';
import { margin, padding } from '@/design/theme/theme.common';

const ButtonBase = styled.button(({ block, size, styles = '' }) => {
  const [{ padding, borderRadius, size: themeSize }] = useTheme();

  const buttonPadding = useMemo(() => {
    const styles = {
      large: `${padding.small}px ${themeSize.s_32}px`,
      default: `${padding.mini}px ${padding.large}px`,
      small: `${padding.tiny}px ${padding.small}px`,
    };

    return styles[size] || styles.default;
  }, [size]);

  return `
        all: unset;
        padding: ${buttonPadding};
        border-radius: ${borderRadius.small}px;
        border: none;
        box-sizing: border-box;

        transition: all .2s ease-in-out;
  
        display: ${block ? 'block' : 'inline-block'};
        width: ${block ? '100%' : 'auto'};
  
        cursor: pointer;
        &:disabled {
            cursor: not-allowed;
        }

        ${styles}
      `;
});

const Button = ({
  children,
  block,
  type,
  size,
  icon,
  disabled,
  loading,
  state: btnState,
  style = {},
  onClick,
  className = '',
}) => {
  const [
    {
      margin,
      color: { primary, gray, yellow, red, green, orange, state },
    },
  ] = useTheme();

  const stateColor = useMemo(() => {
    const stateColors = {
      default: primary,
      danger: red,
      warn: orange,
      process: yellow,
      complete: green,
    };
    return stateColors[btnState] || stateColors.default;
  }, [btnState]);

  const iconColor = useMemo(() => {
    return !type || type === 'fill' ? gray.light_5 : stateColor.default;
  }, [type, stateColor]);

  const stateStyles = useMemo(() => {
    const styles = {
      default: `
        background: ${stateColor.default};
        color: ${gray.light_5};

        &:not(:disabled):hover {
            background: ${stateColor.light_1};
        }

        &:not(:disabled):active {
            background: ${stateColor.dark};
        }

        &:disabled {
            background: ${state.disabled};
        }
    `,
      primary: `
      background: ${stateColor.light_4};
      color: ${stateColor.default};

      &:not(:disabled):hover {
          background: ${stateColor.light_5};
      }

      &:not(:disabled):active {
          background: ${stateColor.light_3};
      }

      &:disabled {
          color: ${state.disabled};
          background: ${gray.light_5};
      }
  `,
      secondary: `
        background: ${gray.light_5};
        color: ${stateColor.default};
        border: 1px solid ${stateColor.default};

        &:not(:disabled):hover {
            border-color: ${stateColor.light_1};
            background: ${stateColor.light_5}22;
            color: ${stateColor.light_1};
        }

        &:not(:disabled):active {
            border-color: ${stateColor.dark};
            background: ${stateColor.light_5}44;
            color: ${stateColor.dark};
        }

        &:disabled {
            border-color: ${state.disabled};
            color: ${state.disabled};
        }
    `,
      text: `
        background: transparent;
        color: ${stateColor.default};

        &:not(:disabled):not(:active):hover {
            color: ${stateColor.light_1};
            background: ${stateColor.light_5};
        }

        &:not(:disabled):active {
            color: ${stateColor.light_1};
        }

        &:disabled {
            color: ${state.disabled};
        }
    `,
    };

    return styles[type] || styles.default;
  }, [type, stateColor]);

  return (
    <ButtonBase
      block={block}
      disabled={disabled || loading}
      size={size}
      styles={stateStyles}
      style={style}
      onClick={onClick}
      className={`Button ${className}`}
    >
      {loading ? (
        <Icon
          className="ButtonLoading"
          type="loading"
          size={12}
          color={iconColor}
          style={{ padding: padding.small }}
        />
      ) : (
        <div
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          className="ButtonContainer"
        >
          {icon && (
            <Icon
              type={icon}
              size={12}
              color={iconColor}
              style={{ marginRight: children ? margin.mini : 0 }}
              className="ButtonIcon"
            />
          )}
          <Text
            ellipsis
            className="ButtonText"
            style={{ maxWidth: '100%', color: 'inherit', textAlign: 'center' }}
          >
            {children}
          </Text>
        </div>
      )}
    </ButtonBase>
  );
};

export default Button;
