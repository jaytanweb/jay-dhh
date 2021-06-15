import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router';
import { Button } from 'antd';

import { clearSession } from '@/utils/session';
import userIcon from '@/assets/img/icon-user.png';
import { useGloablContext } from '@/layout/Global';

// NOTE 用户
const User = (props) => {
  const { isLogin, setIsLogin } = useGloablContext();

  const handleLogout = () => {
    setIsLogin(false);
    clearSession();
    props.history.push('/');
  };

  return isLogin ? (
    <div
      style={{
        display: 'flex',
        marginRight: 50,
        alignItems: 'center',
      }}
    >
      <div
        style={{
          display: 'flex',
          width: 30,
          height: 30,
          background: `url('${userIcon}')`,
          marginRight: 12,
        }}
      />
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Button
          type="link"
          style={{ color: 'black', padding: 0, fontSize: 16 }}
          onClick={(e) => {
            // TODO 显示用户信息
          }}
        >
          登录信息
        </Button>
        <div
          style={{ height: 16, width: 1, background: 'black', margin: '0 2' }}
        />
        <Button
          type="link"
          style={{ color: 'black', padding: 0, fontSize: 16, marginRight: 12 }}
          onClick={(e) => handleLogout()}
        >
          注销
        </Button>
        <FullScreenButton />
      </div>
    </div>
  ) : (
    <></>
  );
};

export default withRouter(User);
// TAG 全屏
const FullScreenButton = () => {
  return (
    <Button
      onClick={(e) => {
        document.querySelector('#GameArea').requestFullscreen();
      }}
      type="dashed"
      style={{ marginRight: 12 }}
    >
      全屏
    </Button>
  );
};
