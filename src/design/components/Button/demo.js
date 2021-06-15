import React from 'react';
import Button from '.';

const ButtonDemo = () => {
  return (
    <div
      className="ButtonDemo"
      style={{
        display: 'grid',
        gap: 12,
        placeItems: 'flex-start',
      }}
    >
      <Button block size="large" type="primary">
        Block Button
      </Button>

      <Button block>Block Button</Button>

      <Button block type="secondary">
        Block Button
      </Button>

      <Button block size="small" type="text">
        Block Button
      </Button>

      <div>
        <Button style={{ margin: 4 }} size="large" type="primary">
          Button
        </Button>

        <Button style={{ margin: 4 }} icon="user">
          Button
        </Button>

        <Button style={{ margin: 4 }} type="secondary">
          Button
        </Button>

        <Button style={{ margin: 4 }} size="small" type="text">
          Button
        </Button>
      </div>

      <div>
        <Button
          style={{ margin: 4 }}
          state="danger"
          size="large"
          type="primary"
          icon="user"
        >
          Button
        </Button>

        <Button style={{ margin: 4 }} state="complete">
          Button
        </Button>

        <Button style={{ margin: 4 }} state="warn" type="secondary">
          Button
        </Button>

        <Button style={{ margin: 4 }} state="process" size="small" type="text">
          Button
        </Button>
      </div>

      <div>
        <Button disabled style={{ margin: 4 }} state="complete">
          Button
        </Button>

        <Button icon="user" style={{ margin: 4 }} state="warn" type="secondary">
          Button
        </Button>

        <Button
          icon="user"
          style={{ margin: 4 }}
          state="complete"
          // type="text"
          loading
        >
          Button
        </Button>

        <Button style={{ margin: 4 }} type="secondary" state="warn" loading>
          Button
        </Button>
      </div>

      {/* <div
          style={{
            display: 'grid',
            gap: 12,
            gridTemplateColumns: `repeat(4, 1fr)`,
            placeItems: 'center',
          }}
        >
          <IconButton icon="left" />

          <IconButton icon="left" type="primary" iconColor={primary.default} />

          <IconButton
            icon="right"
            type="secondary"
            state="warn"
            iconColor={orange.default}
          />

          <IconButton icon="right" type="text" iconColor={primary.default} />
        </div> */}
    </div>
  );
};

export default ButtonDemo;
