import React, { useState } from 'react';
import './header.css';
import logo from '../../images/logo/logo.png';

const Header = ({ userId, onUserChange }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleToggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleUserChange = (e) => {
    onUserChange(e.target.value);
    setDropdownOpen(false); 
  };

  const profileOptions = [
    { value: '18', label: 'Profil 18' },
    { value: '12', label: 'Profil 12' },
  ].filter(profile => profile.value !== userId);

  return (
    <nav className="horizontal-nav">
      <ul>
        <li><img src={logo} alt="logo" className="logo" /></li>
        <li>Accueil</li>
        <li className="profile-dropdown">
          <button className="profile-title" onClick={handleToggleDropdown}>
            Profil {userId}
            <i className={`dropdown-icon ${dropdownOpen ? 'open' : ''}`} />
          </button>
          {dropdownOpen && (
            <ul className="dropdown-menu">
              {profileOptions.map(profile => (
                <li key={profile.value} onClick={() => handleUserChange({ target: { value: profile.value } })}>
                  {profile.label}
                </li>
              ))}
            </ul>
          )}
        </li>
        <li>Réglage</li>
        <li>Communauté</li>
      </ul>
    </nav>
  );
};

export default Header;
