import React, { useState, useEffect } from 'react';
import { default as createGlobalContext } from '@/design/hooks/createContext';

import { genHeaders } from '@/api/base';

const { Provider, useContext } = createGlobalContext();
export const useGloablContext = useContext;

export default ({ children }) => {
  const [isLogin, setIsLogin] = useState(true); // 登录状态

  useEffect(() => {
    // TAG 生成header固定参数
    genHeaders();
  }, [isLogin]);

  return (
    <Provider
      value={{
        isLogin, // 登录状态
        setIsLogin,
      }}
    >
      <div
        className="Global"
        style={{
          width: '100%',
          height: '100%',
          margin: 'auto',
        }}
      >
        {children}
      </div>
    </Provider>
  );
};
