import React, { useMemo } from 'react';
import moment from 'moment';
import { useTheme } from '@/design/hooks/Theme';
import { useEventCalendarContext } from '.';

const Cells = () => {
  const {
    daysOfWeek,
    timeOfDay,
    firstSelect,
    secondSelect,
    onEnterCell,
    onClickCell,
    cellTimeGap,
  } = useEventCalendarContext();

  const cells = useMemo(() => {
    let cells = [];

    timeOfDay.forEach((time) =>
      daysOfWeek.forEach((day) =>
        cells.push(
          moment(day).hour(time.hour()).minute(time.minute()).second(0),
        ),
      ),
    );

    return cells;
  }, [daysOfWeek, timeOfDay]);

  const [
    {
      borderRadius,
      color: { primary, gray },
    },
  ] = useTheme();

  return (
    <div
      className="cells"
      style={{
        width: '100%',
        height: '100%',
        display: 'grid',
        gridTemplateColumns: `repeat(${daysOfWeek?.length}, 1fr)`,
        gridTemplateRows: `repeat(${timeOfDay?.length}, 1fr)`,
        border: `1px solid ${primary.default}11`,
        borderRadius: borderRadius.samll,
      }}
    >
      {cells.map((m, i) => {
        const isFirstSelected = firstSelect && m.isSame(firstSelect, 'minute');

        let isInRange = false;

        if (firstSelect && secondSelect) {
          if (firstSelect.isBefore(secondSelect)) {
            isInRange = m.isBetween(
              firstSelect,
              moment(secondSelect).add(cellTimeGap, 'minute'),
            );
          } else {
            isInRange = m.isBetween(
              moment(secondSelect).subtract(1, 'second'),
              moment(firstSelect).add(cellTimeGap, 'minute'),
            );
          }
        }

        return (
          <div
            className="cell"
            key={m.format()}
            style={{
              width: '100%',
              height: '100%',
              border: `1px solid ${primary.default}11`,
              borderRadius: borderRadius.small,
              cursor: 'pointer',

              background: isFirstSelected
                ? `${primary.default}44`
                : isInRange
                ? `${primary.default}22`
                : gray.light_5,
            }}
            onClick={() => onClickCell(m)}
            onMouseEnter={() => onEnterCell(m)}
          />
        );
      })}
    </div>
  );
};
export default Cells;
