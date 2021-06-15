import React from 'react';
import styled from 'styled-components';

// TAG 素材
import LOGO from '@/assets/img/LOGO-Netblue.png';
// TAG components
import User from './User';

const NetBlueLogo = styled.a(() => {
  return `
    display: block;
    width: 150px;
    height: 33px;
    background: url('${LOGO}');
    margin-left: 50px;
  `;
});

// NOTE Banner
const Header = () => {
  return (
    <div
      style={{
        width: '100%',
        minWidth: 1440,
        height: 70,
        background: '#ffffff',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '1px solid #ccc',
      }}
    >
      <NetBlueLogo href="https://www.netbluegames.com" target="_blank" />
      <User />
    </div>
  );
};

export default Header;
