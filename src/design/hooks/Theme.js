import React, { useState } from 'react';
import createContext from './createContext';

import lightTheme from '@/design/theme/theme.light';
import darkTheme from '@/design/theme/theme.dark';

const { Provider, useContext: useTheme } = createContext('Theme');

function ThemeProvider({ themes: customeThemes, ...props }) {
  const [theme, setTheme] = useState(
    (customeThemes && customeThemes.lightTheme) || lightTheme,
  );

  const toggleTheme = () =>
    setTheme(
      theme.type === 'DARK'
        ? (customeThemes && customeThemes.lightTheme) || lightTheme
        : (customeThemes && customeThemes.darkTheme) || darkTheme,
    );

  return <Provider {...props} value={[theme, toggleTheme]} />;
}

export { ThemeProvider, useTheme };
