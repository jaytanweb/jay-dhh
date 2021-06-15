import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';

import Routers from '@/routes';

import { ThemeProvider, useTheme } from '@/design/hooks/Theme';
import { MediaQueryProvider } from '@/design/hooks/MediaQuery';
import { PopupCtrl } from '@/design/hooks/Popup';

import GlobalStyle from './GlobalStyle';

// import { pwa } from '../defaultSettings';

const App = () => {
  return (
    // UI 主题变量
    <ThemeProvider>
      {/* MediaQuery */}
      <MediaQueryProvider>
        {/* 全局样式 */}
        <GlobalStyle />

        <PopupCtrl>
          {/* 路由 */}
          <Routers />
        </PopupCtrl>
      </MediaQueryProvider>
    </ThemeProvider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));

// if (pwa && 'serviceWorker' in navigator) {
//   window.addEventListener('load', () => {
//     navigator.serviceWorker
//       .register('/service-worker.js')
//       .then((registration) => {
//         console.log('SW registered: ', registration);
//       })
//       .catch((registrationError) => {
//         console.log('SW registration failed: ', registrationError);
//       });
//   });
// }
