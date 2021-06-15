import { useTheme } from '@/design/hooks/Theme';
import React, { useMemo, useState } from 'react';
import { Icon, Profile } from '..';

const UserItem = ({
  size,
  showClose,
  onClose,
  selected,
  onSelect,
  disabled,
  block,
  style = {},
  user,
  ...rest
}) => {
  const [
    {
      size: themeSize,
      margin,
      color: { primary, gray },
    },
  ] = useTheme();

  const [enter, setEnter] = useState(false);

  const styles = useMemo(() => {
    return {
      background: selected
        ? primary.default
        : enter
        ? primary.light_4
        : gray.light_5,
    };
  }, [selected, enter, primary]);

  size ||= themeSize.s_36;

  const { foreColor, bgColor } = useMemo(() => {
    return {
      foreColor: selected ? gray.light_5 : primary.default,
      bgColor: selected ? primary.default : gray.light_5,
    };
  }, [selected, primary, gray]);

  return (
    <div
      className="userItem"
      style={{
        padding: themeSize.s_4,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: (size + themeSize.s_4 * 2) / 2,
        cursor: disabled ? 'not-allowed' : 'pointer',
        width: block ? '100%' : 'auto',
        ...styles,
        ...style,
      }}
      onMouseEnter={() => setEnter(true)}
      onMouseLeave={() => setEnter(false)}
      onClick={(e) => {
        if (disabled) return;

        if (!selected && onSelect) {
          onSelect();
        } else if (selected && onClose) {
          onClose();
        }
      }}
    >
      <Profile
        size={size}
        foreColor={foreColor}
        bgColor={bgColor}
        avatar={user?.avatar}
        uname={user?.realName}
        position={user?.position}
        {...rest}
      />

      <span
        style={{
          margin: `0 ${margin.small}px`,
          opacity: showClose && selected ? 1 : 0,
        }}
      >
        <Icon
          type="close"
          size={themeSize.s_8}
          color={foreColor}
          onClick={(e) => {
            e.stopPropagation();
            if (!disabled && onClose) onClose();
          }}
        />
      </span>
    </div>
  );
};

export default UserItem;
