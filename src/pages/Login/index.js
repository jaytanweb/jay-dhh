import React, { useState, useEffect, useRef } from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { message } from 'antd';

import { getSession, setSession, clearSession } from '@/utils/session';

import Pagewrapper from '@/components/Pagewrapper';

import GameBG from '@/assets/img/game-bg.png';
import start from '@/assets/img/start.png';

import useLocalContext from '@/design/hooks/createContext';

// NOTE 使用局部变量
const { Provider, useContext } = useLocalContext();
export const useLoginContext = useContext;
import { useGloablContext } from '@/layout/Global';

const Login = (props) => {
  // TAG 获取全局变量
  const { setIsLogin } = useGloablContext();


  // TAG 点击[开始游戏]
  const handleStart = async (e) => {
    // 检查登录状态
    alert('点击了[开始游戏]')
  };

  return (
    <Provider
      value={{
      }}
    >
      <>
        <Pagewrapper className="login">
          <GameBackground bg={GameBG}>
            <Start bg={start} onClick={handleStart} />
          </GameBackground>
        </Pagewrapper>
      </>
    </Provider>
  );
};

const GameBackground = styled.div(({ bg }) => {
  return `
    width: 100%;
    min-width: 1440px;
    height: calc(100% - 70px);
    background: url('${bg}');
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
  `;
});
const Start = styled.div(({ bg }) => {
  return `
    width: 160px;
    height: 50px;
    background: url('${bg}');
    cursor: pointer;
    transition: .2s;
    &:hover {
      transform: scale(0.97);
    }
  `;
});

export default withRouter(Login);
