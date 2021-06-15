import React, { useEffect, useMemo } from 'react';

import { ClosableCard, Mask } from '@/design/components';
import { useTheme } from '@/design/hooks/Theme';

const Popover = ({
  visible,
  onClose,
  title,
  overlay,
  centered,
  mask,
  maskClosable,
  children,
}) => {
  const [{ padding }] = useTheme();

  const cardPosition = useMemo(() => {
    if (centered) {
      return {
        alignItems: 'center',
        padding: padding.default,
      };
    }
    return {
      alignItems: 'flex-start',
      paddingTop: '15%',
    };
  });

  return (
    <Mask
      visible={visible && mask}
      closable={maskClosable}
      onClose={onClose}
      style={{
        display: 'flex',
        justifyContent: 'center',
        ...cardPosition,
      }}
    >
      <ClosableCard
        title={title}
        onClose={onClose}
        onClick={(e) => e.stopPropagation()}
      >
        {overlay}
      </ClosableCard>
    </Mask>
  );
};

export default Popover;
