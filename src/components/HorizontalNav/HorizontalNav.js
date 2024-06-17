import React from 'react';
import './HorizontalNav.css';
import logo from '../../images/logo/logo.png'

const HorizontalNav = () => {
  return (
    <nav className="horizontal-nav">
      <ul>
        <li><img src={logo} alt="logo" className="logo" /></li>
        <li>Accueil</li>
        <li>Profil</li>
        <li>Réglage</li>
        <li>Communauté</li>
      </ul>
    </nav>
  );
};

export default HorizontalNav;
