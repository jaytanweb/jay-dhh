import React, { useState, useMemo } from 'react';
import { Table } from '..';

const Demo = () => {
  const [{ page, pageSize }, setPagination] = useState({
    page: 1,
    pageSize: 2,
  });

  const dataSource = useMemo(() => {
    return [
      {
        id: 2,
        name: '吴渊2吴渊2吴渊2吴渊2吴渊2吴渊2吴渊2吴渊2吴渊2',
        date: '2021-03-26',
        data: 120,
      },
      { id: 3, name: '吴渊3', date: '2021-04-26', data: 180 },
      { id: 4, name: '吴渊4', date: '2021-05-26', data: 150 },
      { id: 5, name: '吴渊5', date: '2021-06-26', data: 210 },
    ];
  }, []);

  return (
    <Table
      page={page}
      pageSize={pageSize}
      total={dataSource.length}
      onPaginationChange={setPagination}
      dataSource={dataSource.slice((page - 1) * pageSize, page * pageSize)}
      columns={[
        { key: 'id', title: 'ID', width: 40 },
        { key: 'name', title: '名称名称名称名称名称名称', width: 120 },
        { key: 'data', title: '数据', width: 220 },
      ]}
    />
  );
};

export default Demo;
