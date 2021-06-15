import React from 'react';

const createContext = (displayName) => {
  const context = React.createContext();
  context.displayName = displayName;

  return {
    Provider: context.Provider,
    useContext: () => React.useContext(context),
  };
};

export default createContext;
