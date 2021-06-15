import React, { useMemo } from 'react';
import moment from 'moment';
import { useTheme } from '@/design/hooks/Theme';
import { useEventCalendarContext } from '.';
import { Title, Text } from '@/design/components';

import { useDayFormat } from './util';

const DaysOfWeek = () => {
  const { weekOffset, setWeekOffset, daysOfWeek } = useEventCalendarContext();

  const [
    {
      margin,
      padding,
      borderRadius,
      color: { primary, white, black },
    },
  ] = useTheme();

  return (
    <div
      className="DaysOfWeek"
      style={{
        width: '100%',
        height: '100%',
        display: 'grid',
        gridTemplateColumns: `repeat(${daysOfWeek?.length},1fr)`,
      }}
    >
      {daysOfWeek.map((m, i) => {
        const { day, date } = useDayFormat(m);
        const active = m.isSame(moment(), 'day');

        const isFirst = i === 0;
        const isLast = i === daysOfWeek.length - 1;

        return (
          <div
            key={date}
            style={{
              width: '100%',
              height: '100%',
              padding: `${padding.small}px 0`,
              display: 'grid',
              gap: margin.mini,
              gridTemplateRows: 'repeat(1fr)',
              placeItems: 'center',
              borderRadius: borderRadius.mini,
              // background: active ? primary.medium : white.medium,
            }}
            onClick={() => {
              if (isFirst) {
                setWeekOffset(weekOffset - 1);
              } else if (isLast) {
                setWeekOffset(weekOffset + 1);
              }
            }}
          >
            <Title
              style={{
                textAlign: 'center',
                // color: active ? white.medium : black.medium,
              }}
            >
              {day}
            </Title>
            <Text
              style={{
                textAlign: 'center',
                // color: active ? white.medium : black.light,
              }}
            >
              {date}
            </Text>
          </div>
        );
      })}
    </div>
  );
};

export default DaysOfWeek;
