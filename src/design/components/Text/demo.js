import React from 'react';
import { SubTitle, Text, Title } from '.';

const TextDemo = ({}) => {
  return (
    <div className="TextDemo">
      <Title
        type="h1"
        ellipsis={2}
        style={{ width: 180, wordBreak: 'break-word' }}
      >
        多行省略, title test -- h1
      </Title>

      <Title type="h2" ellipsis style={{ width: 240 }}>
        单行省略 title test -- h2 title test -- h2
      </Title>

      <Title type="h3" light="1">
        title test -- h3
      </Title>
      <Title type="h3" light="5">
        title test -- h3
      </Title>

      <SubTitle type="sub1">Subtitle test -- sub1 </SubTitle>
      <SubTitle type="sub2">Subtitle test -- sub2 </SubTitle>
      <Text type="p1" light="1">
        Text test -- p1
      </Text>
      <Text type="p1" light="5">
        Text test -- p1
      </Text>

      <Text type="p2">Text test -- p2 </Text>
      <Text type="p3">Text test -- p3 </Text>
    </div>
  );
};

export default TextDemo;
