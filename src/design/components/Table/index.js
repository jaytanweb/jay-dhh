import React, { useMemo } from 'react';

// TODO 转为自定制的组件
import { default as ATable } from 'antd/lib/table';
import 'antd/lib/table/style';

// 组件
import { Empty, Text, SubTitle } from '@/design/components';

import { isValidArray } from '@/utils/type';

import { useTheme } from '@/design/hooks/Theme';
import Pagination from './Pagination';

const canRenderDirectly = (val) => ['number', 'string'].includes(typeof val);

const Renders = {
  default: (value) => (
    <Text ellipsis>{canRenderDirectly(value) ? value : '-'}</Text>
  ),
};

const Table = ({
  dataSource,
  columns,
  total,
  page,
  pageSize,
  onPaginationChange,
  rowKey = 'id',
  ...rest
}) => {
  const formatColumns = useMemo(() => {
    return columns.map((config) => {
      const { key, title, type, render, ...rest } = config;

      return {
        key,
        dataIndex: key,
        title: canRenderDirectly(title) ? (
          <SubTitle
            ellipsis
            style={{ width: rest?.width || 'auto', maxWidth: '100%' }}
          >
            {title}
          </SubTitle>
        ) : (
          title
        ),
        render: (value, row) => {
          // 定制的render -> 自定义render -> 默认文字;
          const renderer = (type && Renders[type]) || render || Renders.default;

          return (
            <div
              key={key}
              style={{ width: rest?.width || '100%', height: '100%' }}
            >
              {renderer(value, row)}
            </div>
          );
        },
        ellipsis: rest?.ellipsis || rest?.width,
        align: rest?.align || 'left',
        ...rest,
      };
    });
  }, [columns, dataSource]);

  const formatDataSource = useMemo(() => {
    return dataSource.slice(0, pageSize);
  }, [dataSource, pageSize]);

  const [{ margin }] = useTheme();

  return (
    <div
      className="Table"
      style={{
        display: 'grid',
        gap: margin.default,
        gridTemplateRows: `1fr 48px`,
        alignItems: 'stretch',
      }}
    >
      {isValidArray(formatDataSource) ? (
        <ATable
          rowKey={rowKey}
          dataSource={formatDataSource}
          columns={formatColumns}
          pagination={false}
          {...rest}
        />
      ) : (
        <Empty desc="暂无数据" />
      )}

      {typeof total === 'number' && total > 0 && (
        <Pagination
          total={total}
          page={page}
          pageSize={pageSize}
          onChange={(page, pageSize) =>
            onPaginationChange && onPaginationChange({ page, pageSize })
          }
        />
      )}
    </div>
  );
};

export default Table;
