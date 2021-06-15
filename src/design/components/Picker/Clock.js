import React, { useMemo, useState, useEffect } from 'react';
import styled from 'styled-components';
import { useTheme } from '@/design/hooks/Theme';

import { Switch, Text, Title, Button } from '@/design/components';

const Clock = ({
  value,
  onChange,
  width: clockWidth = 280,
  style = {},
  editable,
  disabled,
}) => {
  const [
    {
      margin,
      padding,
      color: { primary, gray },
    },
  ] = useTheme();
  // 是否上午
  const [isAm, setIsAm] = useState(true);
  // 是否已经选择小时
  const [isHourChoose, setIsHourChoose] = useState(false);

  const onChoose = (h) => {
    if (!onChange || !editable) return;
    if (h === 12) h = 0;

    if (!isHourChoose) {
      onChange(moment(value).hour(isAm ? h : h + 12));
      setIsHourChoose(true);
    } else {
      onChange(moment(value).minute(h * 5));
    }
  };

  const { hourAngle, minuteAngle, secondAngle } = useMemo(() => {
    const curr = moment(value),
      start = moment(value).startOf('day');

    if (isAm) start.hour(12);

    const toAngle = (ratio) => parseInt(((ratio * 360) % 360).toFixed(10));

    const hourAngle = toAngle(curr.diff(start, 'minutes') / (12 * 60));
    const minuteAngle = toAngle(curr.minute() / 60);
    const secondAngle = toAngle(curr.second() / 60);

    return { hourAngle, minuteAngle, secondAngle };
  }, [value]);

  return (
    <div
      className="Clock"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        ...style,
      }}
    >
      {editable && (
        <TimePreview
          value={value}
          isHourChoose={isHourChoose}
          isAm={isAm}
          setIsAm={setIsAm}
          clockWidth={clockWidth}
          onChange={onChange}
        />
      )}

      <div
        className="ClockBody"
        style={{
          margin: `${margin.medium}px auto`,
          width: clockWidth,
          height: clockWidth,
          border: `6px solid #e5ded6`,
          borderRadius: '50%',
          position: 'relative',
          boxShadow: `rgba(185, 209, 255, 0.2) 0px -1px 5px 0px inset, rgb(255, 242, 242) -2px 1px 5px 0px inset, rgb(104 104 104 / 62%) 3px 3px 5px 0px`,
          background: `linear-gradient(30deg, #e0e0e036, #fffbfb36)`,
        }}
      >
        <Hours onChoose={onChoose} clockWidth={clockWidth} />
        <Minutes />

        <Center
          editable={editable}
          clockWidth={clockWidth}
          onClick={() => {
            if (!editable) return;
            onChange(moment(value).startOf('day'));
            setIsHourChoose(false);
          }}
        />

        <Pointer
          className="HourPointer"
          angle={hourAngle}
          type="hour"
          onClick={() => {
            if (!editable) return;
            onChange(moment(value).hour(isAm ? 0 : 12));
            setIsHourChoose(false);
          }}
          clockWidth={clockWidth}
          style={{ cursor: isHourChoose ? 'pointer' : 'normal' }}
        />

        <Pointer
          className="MinutePointer"
          angle={minuteAngle}
          type="minute"
          onClick={() => {
            if (!editable) return;
            if (isHourChoose) onChange(moment(value).minute(0));
          }}
          clockWidth={clockWidth}
          style={{ cursor: isHourChoose ? 'pointer' : 'normal' }}
        />

        {!editable && (
          <Pointer
            clockWidth={clockWidth}
            className="SecondPointer"
            angle={secondAngle}
            type="second"
          />
        )}
      </div>
    </div>
  );
};

const Pointer = styled.span(({ type, clockWidth, angle = 0 }) => {
  const {
    theme: {
      color: { primary, gray },
    },
  } = useTheme();
  const { width, color, height, zIndex, crossLen, boxShadow } = useMemo(() => {
    const shadowDir = angle <= 180 ? -1 : 1;

    const types = {
      hour: {
        width: clockWidth / 30,
        color: primary.medium,
        height: '30%',
        zIndex: 10,
        crossLen: clockWidth / 20,
        boxShadow: `${shadowDir * 3}px 1px 1px 0px #dce2f39e`,
      },
      minute: {
        width: clockWidth / 35,
        color: gray.light,
        height: '38%',
        zIndex: 9,
        crossLen: clockWidth / 15,
        boxShadow: `${shadowDir * 2}px 2px 1px 0px #dfdfdf73`,
      },
      second: {
        width: clockWidth / 80,
        // color: `linear-gradient(to bottom,#e9eeff 0, ${primary.medium} 88%)`,
        color: primary.light,
        height: '43%',
        zIndex: 12,
        crossLen: clockWidth / 10,
        boxShadow: `${shadowDir}px -2px 2px 0px #dfdfdf73`,
      },
    };

    return types[type] || types.hour.minute;
  }, [type, angle]);

  const rotate = angle - 180;

  const transition =
    rotate === -180
      ? 'none'
      : `all .24s ${
          type === 'second'
            ? 'cubic-bezier(0.48, -1.01, 0.64, 2.24)'
            : 'ease-in-out'
        }`;

  return `
        display: inline-block;
        width: ${width}px;
        height: ${height};
        box-sizing: border-box;
        border-radius: ${width / 2}px;
        background: ${color};

        position: absolute;
        top: calc(50% - ${crossLen}px);
        left: calc(50% - ${width / 2}px);

        transform-origin: center ${crossLen}px;

        transform: rotate(${rotate}deg);

        transition: ${transition};

        // box-shadow: ${boxShadow};

        z-index: ${zIndex};
      `;
});

const Center = styled.span(({ clockWidth, editable }) => {
  const [
    {
      color: { primary, white },
    },
  ] = useTheme();

  const width = clockWidth / 15;

  return `
        cursor: pointer;
        display: inline-block;
        width: ${width}px;
        height: ${width}px;
        box-sizing: border-box;
        border-radius: 50%;
        background: ${white.medium};

        position: absolute;
        top: calc(50% - ${width / 2}px);
        left: calc(50% - ${width / 2}px);

        border: ${width * 0.4}px solid ${
    editable ? primary.medium : primary.light
  };
        box-shadow: 1px 1px 1px 1px ${primary.medium}66;
        z-index: 20;
      `;
});

const Hour = styled(Button)(({ h, editable, clockWidth }) => {
  const [
    {
      color: { primary, gray, white, orange },
    },
  ] = useTheme();

  const width = clockWidth / 10;

  const { translateX, translateY } = useMemo(() => {
    const offset = (clockWidth / 2) * 0.78;
    const angle = Math.PI * 2 * (h / 12);

    const translateX = Math.floor(offset * Math.sin(angle) * 100) / 100;
    const translateY = Math.floor(offset * -Math.cos(angle) * 100) / 100;

    return { translateX, translateY };
  }, [h]);

  // 覆盖掉 button 属性
  const stateStyle = editable
    ? `
          cursor: default;
          &:hover, &:active {
            color: ${white.medium};
          }
        `
    : `
        cursor: default;
        &:hover, &:active {
          background: transparent!important;
          font-weight: ${h % 3 === 0 ? 600 : 400};
          color: ${h % 3 === 0 ? orange.light : gray.light}!important;
        }
      `;

  return `
        width: ${width}px;
        height: ${width}px;
        box-sizing: border-box;
        padding: 0;
        border-radius: 50%;

        display: grid;
        place-content: center center;

        background: transparent;
        font-weight: ${h % 3 === 0 ? 600 : 400};
        color: ${h % 3 === 0 ? orange.light : gray.light};

        

        position: absolute;
        top: calc(50% - ${width / 2}px);
        left: calc(50% - ${width / 2}px);

        transform-origin: center center;
        transform: translate(${translateX}px, ${translateY}px);


        ${stateStyle}
      `;
});

const Dot = styled.span(({ m, clockWidth }) => {
  const [
    {
      borderRadius,
      color: { primary, gray, white },
    },
  ] = useTheme();
  const { width, height } = useMemo(() => {
    return m % 5 === 0 ? { width: 2, height: 5 } : { width: 1, height: 2 };
  }, [m]);

  const { translateX, translateY, rotate } = useMemo(() => {
    const offset = (clockWidth / 2) * 0.9;
    const angle = Math.PI * 2 * (m / 60);

    const translateX = Math.floor(offset * Math.sin(angle) * 100) / 100;
    const translateY = Math.floor(offset * -Math.cos(angle) * 100) / 100;
    const rotate = (m / 60) * 360;

    return { translateX, translateY, rotate };
  }, [m]);

  return `
        width: ${width}px;
        height: ${height}px;
        display: inline-block;
        background: ${gray.light};
        border-radius: ${width / 2}px;
        position: absolute;
        top: calc(50% - ${height / 2}px);
        left: calc(50% - ${width / 2}px);
        transform-origin: center center;
        transform: translateX(${translateX}px) translateY(${translateY}px) rotate(${rotate}deg);
      `;
});

export default Clock;

const TimePreview = ({
  value,
  isHourChoose,
  isAm,
  setIsAm,
  clockWidth,
  onChange,
}) => {
  const [
    {
      padding,
      color: { gray, primary },
    },
  ] = useTheme();

  const { hour, hourFormat, minuteFormat, secondFormat } = useMemo(() => {
    let m = moment(value);

    return {
      hour: m.hour(),

      hourFormat: moment(value).format('HH'),
      minuteFormat: moment(value).format('mm'),
      secondFormat: moment(value).format('ss'),
    };
  }, [value]);

  return (
    <div
      style={{
        width: clockWidth,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: `${padding.medium}px ${padding.small}px`,
      }}
    >
      {/* 上午 / 下午 */}
      <Switch
        yes="上午"
        no="下午"
        value={isAm}
        onChange={(isAm) => {
          setIsAm(isAm);
          // 更新已选
          if (isAm && hour >= 12) onChange(moment(value).hour(hour - 12));
          else if (!isAm && hour < 12) onChange(moment(value).hour(hour + 12));
        }}
      />

      {/* 时间标示 */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
        }}
      >
        <Title
          size={isHourChoose ? 'small' : 'medium'}
          style={{
            color: isHourChoose ? gray.lighter : primary.medium,
          }}
        >
          {hourFormat}
        </Title>
        <Text color="lightest"> : </Text>
        <Title
          size={isHourChoose ? 'medium' : 'small'}
          style={{
            color: isHourChoose ? primary.medium : gray.lighter,
          }}
        >
          {minuteFormat}
        </Title>
        <Text color="lightest"> : </Text>
        <Title size="small" style={{ lineHeight: 1, color: gray.lighter }}>
          {secondFormat}
        </Title>
      </div>
    </div>
  );
};

const Hours = ({ onChoose, clockWidth }) => {
  const hours = useMemo(() => Array.from(new Array(12), (_, i) => i + 1), []);

  return hours.map((h) => (
    <Hour
      key={`hour-${h}`}
      h={h}
      clockWidth={clockWidth}
      onClick={() => onChoose(h)}
      editable
    >
      {h}
    </Hour>
  ));
};

const Minutes = ({ clockWidth }) => {
  const minutes = useMemo(() => Array.from(new Array(60), (_, i) => i), []);
  return minutes.map((m) => (
    <Dot key={`minute-${m}`} m={m} clockWidth={clockWidth} />
  ));
};
