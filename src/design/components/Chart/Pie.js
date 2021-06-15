import React from 'react';
import Chart from './index';
import { throttle, debounce } from 'lodash';
import moment from 'moment';

import { TypeSetting } from './variables';

const PieChart = ({ chartKey, dataSource, loading, config = {} }) => {
  const { type } = TypeSetting.interval;

  const onElementClick = debounce((result) => console.log(result), 200);

  return (
    <Chart
      dataSource={dataSource}
      loading={loading}
      containerConfig={{
        chartKey,
        height: config?.height || 400,
      }}
      chartConfig={{
        type,
        color: 'x',
        adjust: ['stack'],
        // size: { values: [4] },
        label: {
          y: {
            offset: -30,
            style: {
              fontSize: 10,
              fill: 'white',
            },
          },
        },
      }}
      renderConfig={{
        scale: {
          x: {
            formatter: (val) => moment(val).format('YY-MM-DD'),
          },
          y: {
            formatter: (val) => Math.floor(val),
          },
        },

        coordinate: {
          type: 'theta',
          options: { radius: 0.8, innerRadius: 0.5 },
        },
        legend: {
          x: {
            position: 'bottom',
            title: false,
            flipPage: false,
            maxWidth: 600,
          },
        },
      }}
      events={{
        onElementClick,
      }}
    />
  );
};

export default PieChart;
