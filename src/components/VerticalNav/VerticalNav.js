import React, { useState } from 'react';
import './VerticalNav.css';
import swimmingIcon from '../../images/icons/swimming.png';
import meditationIcon from '../../images/icons/meditation.png';
import weightsIcon from '../../images/icons/weights.png';
import cyclingIcon from '../../images/icons/cycling.png';

const VerticalNav = ({ userId, onUserChange }) => {
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
    <div>
      <nav className="vertical-nav">
        {/* Dropdown menu for user selection */}
        <div className="profile-dropdown">
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
        </div>
        <ul>
          <li>
            <button className="nav-button" onClick={() => console.log("Swimming button clicked")}>
              <img src={swimmingIcon} alt="Swimming" className="nav-icon" />
            </button>
          </li>
          <li>
            <button className="nav-button" onClick={() => console.log("Meditation button clicked")}>
              <img src={meditationIcon} alt="Meditation" className="nav-icon" />
            </button>
          </li>
          <li>
            <button className="nav-button" onClick={() => console.log("Weights button clicked")}>
              <img src={weightsIcon} alt="Weights" className="nav-icon" />
            </button>
          </li>
          <li>
            <button className="nav-button" onClick={() => console.log("Cycling button clicked")}>
              <img src={cyclingIcon} alt="Cycling" className="nav-icon" />
            </button>
          </li>
        </ul>
        <p className="copyright">Copyright, SportSee 2020</p>
      </nav>
    </div>
  );
};

export default VerticalNav;
