import React from 'react';
import './Header.scss';

const Header = props => {
  return (
    <div className="header">
      <div className="header-grid">
        <div className="tab-left">Search</div>
        <div className="tab-right">Browse</div>
        <div className="header-content">
          <input /><button>Search</button>
        </div>
      </div>
    </div>
  )
}

export default Header;