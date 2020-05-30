import React from 'react';
import './Footer.scss';

const Footer = props => {
  return (
    <div className="footer">
      <div className="footer-grid">
        <div className="content-left"><span role='img' aria-label='Search'>🔍</span></div>
        <div className="content-center"><span role='img' aria-label='Menu'>✎</span></div>
        <div className="content-right"><span role='img' aria-label='Totals'>∑</span></div>
      </div>
    </div>
  )
}

export default Footer;