import React from 'react';
import Chart from './index';
import { throttle, debounce } from 'lodash';
import moment from 'moment';

import { TypeSetting } from './variables';

const PointChart = ({ chartKey, dataSource, loading, smooth, config = {} }) => {
  const { type } = TypeSetting.point;

  const onElementClick = debounce((result) => console.log(result), 200);

  dataSource = dataSource.map(({ x, y }) => ({
    x,
    y,
    size: y / 2000,
  }));

  return (
    <Chart
      dataSource={dataSource}
      loading={loading}
      containerConfig={{
        chartKey,
        height: 400,
      }}
      chartConfig={{
        type,
        color: 'x',
        size: {
          values: ['size'],
        },
        shape: 'circle',
        // slider: false
      }}
      renderConfig={{
        scale: {
          x: {
            alias: 'xxx',
          },
          y: {
            tickCount: 5,
            formatter: (val) => Math.floor(val),
          },
        },

        axis: {
          x: {
            title: false,
            tickLine: { length: 2 },
            subTickLine: false,
            grid: {
              line: { style: { opacity: 0 } },
            },
            label: {
              autoHide: true,
              autoRotate: true,
              autoEllipsis: true,
              offset: 4,
              style: {
                fontSize: 10,
                fill: 'blue',
              },
            },
            verticalLimitWidth: 40,
          },
          y: {
            title: false,
            tickLine: { length: 2 },
            subTickLine: false,
            grid: {
              line: { style: { opacity: 0 } },
            },
            label: {
              style: {
                fontSize: 10,
                fill: 'blue',
              },
            },
          },
        },

        // legend: {
        //   x: false,
        //   y: false,
        //   size: false,
        // },
      }}
      events={{
        onElementClick,
      }}
    />
  );
};

export default PointChart;
