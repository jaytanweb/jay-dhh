import { useTheme } from '@/design/hooks/Theme';
import React, { useMemo } from 'react';
import { Title } from '../Text';

const Tabs = ({ tabs, active, onChange }) => {
  const [
    {
      color: { primary, gray },
    },
  ] = useTheme();

  const { total, currIndex, curr } = useMemo(() => {
    const total = tabs.length;
    const currIndex = tabs.findIndex((tab) => tab.key === active);

    if (total && currIndex < 0) {
      onChange(tabs[0].key);
    }

    return { total, currIndex, curr: tabs[currIndex] };
  }, [tabs, active]);

  return total === 0 ? (
    <Empty desc="空 Tabs" />
  ) : (
    <div
      className="Tabs"
      style={{ display: 'grid', gridTemplateRows: `48px 1fr` }}
    >
      <div
        className="title"
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(auto-fit, 100px)`,
        }}
      >
        {tabs.map((tab) => {
          const currActive = active === tab.key;
          return (
            <Title
              key={tab.key}
              onClick={() => onChange(tab.key)}
              style={{
                textAlign: 'center',
                color: currActive ? primary.default : gray.default,
                borderBottom: currActive
                  ? `2px solid ${primary.default}`
                  : 'none',
              }}
            >
              {tab.title}
            </Title>
          );
        })}
      </div>

      <div
        className="content"
        style={{
          width: '100%',
          height: 400,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          className="contentContainer"
          style={{
            display: 'flex',
            flexWrap: 'nowrap',
            width: `${total * 100}%`,
            position: 'absolute',
            top: 0,
            left: `${-currIndex * 100}%`,

            transition: `all .5s ease-in-out`,
          }}
        >
          {tabs.map((tab) => (
            <div className="tabContent" style={{ width: `${100 / total}%` }}>
              {tab.content}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tabs;
