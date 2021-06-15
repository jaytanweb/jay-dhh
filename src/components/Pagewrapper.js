import React, { useState, useEffect } from 'react';

import Header from './Header';
const PageWrapper = ({ children, ...rest }) => {
  return (
    <div style={{ width: 'auto', height: '100%' }} {...rest}>
      <Header />
      {children}
    </div>
  );
};

export default PageWrapper;
