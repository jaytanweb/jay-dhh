import React, { useMemo } from 'react';
import moment from 'moment';
import { useTheme } from '@/design/hooks/Theme';
import { useEventCalendarContext } from '.';
import { Title, Text, Icon } from '@/design/components';

const TimeOfDay = () => {
  const { timeOfDay, cellHeight, isAm, setIsAm } = useEventCalendarContext();

  const [{ padding }] = useTheme();

  return (
    <div
      className="time"
      style={{
        width: '100%',
        height: '100%',
        display: 'grid',
        gridTemplateRows: `repeat(${timeOfDay?.length}, ${cellHeight}px)`,
        position: 'relative',
      }}
    >
      {timeOfDay.map((m) => {
        const time = m.format('HH:mm');
        const active = time.endsWith(':00');
        return (
          <Text
            key={time}
            style={{
              textAlign: 'right',
              paddingRight: padding.small,
              lineHeight: 0,
              // lineHeight: `${active ? cellHeight / 2 : 1}px`,
            }}
          >
            {active ? time : '-'}
          </Text>
        );
      })}

      {/* <div
        style={{
          position: 'absolute',
          left: 0,
          bottom: 0,
          width: '100%',
          borderRadius: borderRadius.mini,
          background: `${blue.light_5}`,
          padding: `${padding.small}px 0`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onClick={() => setIsAm(!isAm)}
      >
        <Icon
          color={primary.default}
          type="arrowDown"
          style={{
            transform: `rotate(${isAm ? 0 : 180}deg)`,
            transition: 'all .2s ease-in-out',
          }}
        />
        <Text size="small" style={{ color: primary.default }}>
          {isAm ? '下午' : '上午'}
        </Text>
      </div> */}
    </div>
  );
};

export default TimeOfDay;
