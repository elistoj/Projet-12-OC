import React from 'react';
import './header.css';
import logo from '../../images/logo/logo.png';

const Header = () => {
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

export default Header;
