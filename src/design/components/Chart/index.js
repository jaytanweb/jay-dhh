import React, { useState, useEffect, useMemo } from 'react';
import { Chart, registerTheme } from '@antv/g2';

import { Loading } from '@/design/components';
import { useTheme } from '@/design/hooks/Theme';

const EChart = ({
  dataSource,
  loading,
  error,

  // 整体绘制配置
  containerConfig = {},
  // 图表属性
  chartConfig = {},
  // 绘制属性
  renderConfig = {},
  // 事件绑定
  events = {},
}) => {
  // 图表实例
  const [chart, setChart] = useState(null);

  const finalContainerConfig = useMemo(() => {
    const {
      height = 400,
      chartKey = '',
      renderer = 'svg',
      ...rest
    } = containerConfig;

    // 定制主题
    // registerTheme("bbgTheme", {
    //   defaultColor: "red"
    // });

    return {
      height,
      container: `chart-${chartKey}`,
      autoFit: true,
      // padding: [20, 20, 20, 20],
      renderer,
      // limitInPlot: true,
      // theme: "bbgTheme",
      ...rest,
    };
  }, [containerConfig]);

  const [theme] = useTheme();

  useEffect(() => {
    const {
      padding,
      margin,
      size,
      color: {
        primary,
        gray,
        purple,
        yellow,
        red,
        orange,
        green,
        blue,
        state,
        type,
      },
    } = theme;

    registerTheme('ETheme', {
      defaultColor: primary.default,

      minColumnWidth: size.s_2,
      maxColumnWidth: size.s_48,

      colors10: [
        primary.default,
        purple.default,
        yellow.default,
        red.default,
        orange.default,
        green.default,
        blue.default,
      ],
    });
  }, [theme]);

  // 初始化
  useEffect(() => {
    setChart(new Chart(finalContainerConfig));
  }, []);

  useEffect(() => {
    if (chart) {
      // console.log('re-render');

      // 清空已有图形
      chart.clear();

      const {
        type: chartType,
        color,
        size,
        shape,
        adjust,
        label = {},
        transpose,
        slider,
      } = chartConfig;

      // 绘制配置
      const {
        scale = {},
        axis = {},
        legend,
        coordinate = {},
        style = {},
      } = renderConfig;

      const { x: axisX, y: axisY } = axis;
      const { x: scaleX = {}, y: scaleY = {}, nice = true } = scale;
      const {
        cfg = {},
        type: coordinateType = 'rect',
        actions: coordinateActions = [],
        options: coordinateOptions = {},
      } = coordinate;

      // 图表配置
      {
        let curr;

        if (coordinateType === 'theta') {
          curr = chart[chartType]().position('y');
        } else {
          curr = chart[chartType]().position('x*y');
        }

        if (color) curr = curr.color(color);

        if (
          Array.isArray(dataSource) &&
          dataSource[0] &&
          dataSource[0].z !== undefined
        ) {
          curr = curr.color('z').adjust('stack');
        }

        if (size) curr = curr.size(size);
        if (style) curr = curr.style(style);
        if (shape) curr = curr.shape(shape);
        if (adjust) curr = curr.adjust(adjust);
        if (label.x) curr = curr.label('x', label.x);
        if (label.y) curr = curr.label('y', label.y);

        chart.option('slider', slider || false);
      }

      /* 度量 ***************/
      {
        chart.scale(
          {
            x: {
              ...scaleX,
            },
            y: {
              ...scaleY,
            },
          },
          { nice }, // 自动调整 min / max
        );
      }
      /*************** 度量 */

      /* 坐标系 ***************/
      {
        let curr = chart.coordinate(
          coordinateType === 'theta'
            ? 'theta'
            : {
                cfg,
                type: coordinateType,
                actions: coordinateActions,
              },
          coordinateOptions,
        );

        if (transpose) curr.transpose();
      }
      /*************** 坐标系 */

      /* 坐标轴 ***************/
      {
        if (axisX) {
          chart.axis('x', {
            position: 'bottom',
            title: {
              style: { opacity: 0 },
            },

            line: {
              // style: { opacity: 0 }
            },
            tickLine: {
              length: 2,
              // style: { opacity: 0 }
            },
            subTickLine: {
              style: { opacity: 0 },
            },
            grid: {
              line: {
                type: 'circle',
                style: { opacity: 0.1 },
              },
              closed: true,
              alignTick: true,
            },
            label: {
              autoHide: true,
              autoRotate: true,
              autoEllipsis: true,

              offset: 4,
              style: {
                fontSize: 10,
                fill: '#444',
              },
            },
            verticalLimitWidth: 20,
            ...axisX,
          });
        } else {
          chart.axis('x', false);
        }

        if (axisY) {
          chart.axis('y', {
            // position: 'left',
            title: {
              style: { opacity: 0 },
            },

            line: {
              // style: { opacity: 0 }
            },
            tickLine: {
              length: 2,
              // style: { opacity: 0 }
            },
            subTickLine: {
              style: { opacity: 0 },
            },
            grid: {
              line: {
                type: 'circle',
                style: { opacity: 0.1 },
              },
              closed: true,
              alignTick: true,
            },
            label: {
              autoHide: true,
              autoRotate: true,
              autoEllipsis: true,

              offset: 4,
              style: {
                fontSize: 10,
                fill: 'red',
              },
            },
            verticalLimitWidth: 20,
            ...axisY,

            position: transpose ? 'right' : 'left',
          });
        } else {
          chart.axis('y', false);
        }
      }
      /*************** 坐标轴 */

      /* 图例 ***************/
      {
        if (legend && Object.keys(legend).length > 0) {
          for (let key of Object.keys(legend)) {
            chart.legend(key, legend[key]);
          }
        } else {
          chart.legend(false);
        }
      }
      /*************** 图例 */

      // 事件绑定
      if (events.onElementClick) {
        chart.on('element:click', (ev) => {
          events.onElementClick({
            data: ev.data.data,
            event: ev.gEvent,
          });
        });
      }

      // 载入数据
      chart.data(dataSource);

      chart.theme('ETheme');
      // 绘制
      chart.render();
      // 更新存储的 chart 实例
      setChart(chart);
    }
  }, [dataSource, chart, chartConfig, renderConfig, events]);

  return (
    <div
      id={finalContainerConfig.container}
      style={{
        display: 'grid',
        placeItems: 'center',
        height: finalContainerConfig.height,
      }}
    >
      {loading && <Loading />}
    </div>
  );
};

export default EChart;
