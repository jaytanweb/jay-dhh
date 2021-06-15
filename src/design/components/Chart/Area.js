import React from 'react';
import Chart from './index';
import { throttle, debounce } from 'lodash';
import moment from 'moment';

import { TypeSetting } from './variables';

const AreaChart = ({ chartKey, dataSource, loading, smooth, config = {} }) => {
  const { type } = TypeSetting.area;

  const onElementClick = debounce((result) => console.log(result), 200);

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
        shape: smooth ? 'smooth' : null,
        adjust: ['stack'],
      }}
      renderConfig={{
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

export default AreaChart;
