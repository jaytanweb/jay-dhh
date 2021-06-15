import React, { useMemo } from 'react';
import Chart from './index';
import { throttle, debounce } from 'lodash';
import moment from 'moment';

import { TypeSetting } from './variables';
import { useTheme } from '@/design/hooks/Theme';

const LineChart = ({ chartKey, dataSource, loading, config = {} }) => {
  const { type } = TypeSetting.line;

  const onElementClick = debounce((result) => console.log(result), 200);

  const [
    {
      color: { primary, gray },
    },
  ] = useTheme();

  const lineChartConfig = useMemo(() => {
    return {
      dataSource,
      loading,
      containerConfig: {
        chartKey,
        height: config?.height || 400,
      },
      chartConfig: {
        type,
        size: { values: [4] },
        shape: config?.smooth ? 'smooth' : null,
      },
      renderConfig: {
        scale: {
          x: {
            alias: config?.x?.alias,
          },
          y: {
            tickCount: config?.y?.tickCount || 5,
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
                fill: gray.light,
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
                fill: gray.light,
              },
            },
          },
        },

        legend: {},
      },
      events: {
        onElementClick,
      },
    };
  }, [dataSource, loading, config, chartKey]);

  return <Chart {...lineChartConfig} />;
};

export default LineChart;
