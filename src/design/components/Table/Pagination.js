import React, { useMemo } from 'react';

// 样式
import { default as APagination } from 'antd/lib/pagination';
import 'antd/lib/pagination/style';

import { Text, Button } from '@/design/components';
import { useTheme } from '@/design/hooks/Theme';

const Pagination = ({ total, page = 1, pageSize = 10, onChange }) => {
  const [
    {
      size,
      color: { primary, gray },
    },
  ] = useTheme();

  return (
    <div className="Pagination" style={{ textAlign: 'center' }}>
      <APagination
        total={total}
        current={page}
        pageSize={pageSize}
        responsive
        onChange={onChange}
        style={{}}
        itemRender={(
          curr, // 当前页码
          type, // 'page' | 'prev' | 'next' | 'jump-prev' | 'jump-next'
          originalElement,
        ) => {
          switch (type) {
            case 'page':
              return (
                <Text
                  style={{
                    lineHeight: `${size.s_32}px`,
                    color: curr === page ? primary.default : gray.default,
                  }}
                >
                  {curr}
                </Text>
              );

            case 'prev':
              return (
                <Button
                  type="text"
                  icon="arrowLeft"
                  style={{ height: size.s_32 }}
                />
              );

            case 'next':
              return (
                <Button
                  type="text"
                  icon="arrowRight"
                  style={{ height: size.s_32 }}
                />
              );
            default:
              return originalElement;
          }
        }}
      />
    </div>
  );
};

export default Pagination;
