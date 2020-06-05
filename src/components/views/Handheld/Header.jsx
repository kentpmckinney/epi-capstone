import React from 'react';
import './Header.scss';

const Header = props => {
  return (
    <div className="header">
      <div className="header-grid">
        {props.children}
      </div>
    </div>
  )
}

export default Header;