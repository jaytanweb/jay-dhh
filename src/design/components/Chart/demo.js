import React, { useMemo } from 'react';
import { BarChart, LineChart, PieChart } from '..';

const Chartdemo = () => {
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
    ].map(({ id, name, date, data }) => ({
      id,
      name,
      date,
      data,

      x: date,
      y: data,
    }));
  }, []);

  return (
    <div className="Chartdemo">
      <BarChart
        chartKey="TestBarChart"
        config={{ height: 300 }}
        dataSource={dataSource}
      />
      <PieChart
        chartKey="TestPieChart"
        config={{ height: 300 }}
        dataSource={dataSource}
      />
      <LineChart
        chartKey="TestLineChart"
        config={{ height: 300 }}
        dataSource={dataSource}
      />
    </div>
  );
};

export default Chartdemo;
