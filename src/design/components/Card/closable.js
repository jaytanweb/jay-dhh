import React from 'react';
import { Card, Icon, Title } from '..';

const ClosableCard = ({ header, className = '', onClose, ...rest }) => (
  <Card
    className={`ClosableCard ${className}`}
    header={
      <div
        className="ClosableCardHeader"
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {typeof header === 'string' ? <Title>{header}</Title> : header}
        <Icon type="close" size={10} onClick={onClose} />
      </div>
    }
    {...rest}
  />
);

export default ClosableCard;
