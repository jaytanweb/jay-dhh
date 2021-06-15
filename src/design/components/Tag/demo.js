import { useTheme } from '@/design/hooks/Theme';
import React from 'react';
import Tag from '.';

const TagDemo = () => {
  const [
    {
      padding,
      margin,
      size,
      color: { primary, gray, orange, green, yellow },
    },
  ] = useTheme();

  return (
    <div
      className="TagDemo"
      style={{
        width: '100%',
        display: 'inline-block',
      }}
    >
      <Tag style={{ margin: margin.small }}>
        asgdahsdgahsgdahgsd, asgdahsdgahsgdahgsd asgdahsdgahsgdahgsd
      </Tag>
      <Tag style={{ margin: margin.small }} type="fill">
        asgdahsdgahsgdahgsd, asgdahsdgahsgdahgsd asgdahsdgahsgdahgsd
      </Tag>
      <Tag
        style={{ margin: margin.small }}
        type="outline"
        closable
        onClose={() => console.log('close')}
      >
        asgdahsdgahsgdahgsd, asgdahsdgahsgdahgsd asgdahsdgahsgdahgsd
      </Tag>
      <Tag
        style={{ margin: margin.small }}
        cate="img"
        type="outline"
        closable
        onClose={() => console.log('close')}
      >
        asgdahsdgahsgdahgsd, asgdahsdgahsgdahgsd asgdahsdgahsgdahgsd
      </Tag>

      <Tag
        style={{ margin: margin.small }}
        cate="file"
        type="outline"
        closable
        onClose={() => console.log('close')}
      >
        asgdahsdgahsgdahgsd, asgdahsd
      </Tag>

      <Tag
        style={{ margin: margin.small }}
        cate="video"
        type="outline"
        closable
        onClose={() => console.log('close')}
      >
        asgdahsdgahsgdahgsd, asgdahsd
      </Tag>
    </div>
  );
};

export default TagDemo;
