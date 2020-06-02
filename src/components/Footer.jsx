import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.scss';

const Footer = props => {

  console.log(props.links[0].img)
  return (
    <div className="footer">
      <div className="footer-grid">
        <div className="content-left"><span role='img' aria-label='Search'><Link to={props.links[0].to}><img src={props.links[0].img.searchIcon} /></Link></span></div>
        <div className="content-center"><span role='img' aria-label='Menu'><Link to={props.links[1].to}><img src={props.links[1].img.menuIcon} /></Link></span></div>
        <div className="content-right"><span role='img' aria-label='Totals'><Link to={props.links[2].to}><img src={props.links[2].img.totalIcon} /></Link></span></div>
      </div>
    </div>
  )
}

export default Footer;