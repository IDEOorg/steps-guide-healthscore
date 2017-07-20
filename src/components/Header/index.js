import React from 'react';
import './index.less';

const Header = () =>  {
  return (
    <div className="header">
      <img src={require('../../assets/header-icon.svg')} />
    </div>
  );
};

export default Header;

Header.displayName = 'Header';
