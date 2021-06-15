import React from 'react';
import { createGlobalStyle } from 'styled-components';
import { useTheme } from '@/design/hooks/Theme';

const GloablStyleBase = createGlobalStyle(
  ({
    theme: {
      size,
      color: { primary, gray },
    },
  }) => {
    const scrollBar = size.s_4;

    return `
      /* ***********
        css reset
      ************ */
      html {
        scroll-behavior: smooth;
      }
      
      body,
      #root {
        height: 100%;
        background: ${gray.light_5};
      }
      
      *,
      *::before,
      *::after {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      
      body {
        text-rendering: optimizeLegibility;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
          Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', Helvetica, Arial,
          sans-serif;
      }
      
      ul,
      ol {
        list-style: none;
      }
      
      canvas {
        display: block;
      }
      
      ul,
      ol,
      li,
      p,
      h1,
      h2,
      h3,
      h4,
      h5,
      h6 {
        user-select: none;
        margin: 0;
      }
      
      
      ::-moz-selection {
        color: ${gray.light_5};
        -webkit-text-fill-color: ${gray.light_5};
        background: ${primary.default};
      }
      
      ::selection {
        color: ${gray.light_5};
        -webkit-text-fill-color: ${gray.light_5};
        background: ${primary.default};
      }
      
      /* ***********
          滚动条
      ************ */
      
      *::-webkit-scrollbar {
        width: ${scrollBar}px;
        height: ${scrollBar}px;
      }
      
      /* Track */
      *::-webkit-scrollbar-track {
        background: transparent;
        background: ${primary.default}11;
        border-radius: ${scrollBar / 2}px;
      }
      
      /* Handle */
      *::-webkit-scrollbar-thumb {
        cursor: pointer;
      
        background: transparent;
        background: ${primary.default}22;
      }
      
      /* Handle on hover */
      *::-webkit-scrollbar-thumb:hover {
        background: transparent;
        background: ${primary.default}44;
      }
  `;
  },
);

const GlobalStyle = () => {
  const [theme] = useTheme();
  return <GloablStyleBase theme={theme} />;
};
export default GlobalStyle;
