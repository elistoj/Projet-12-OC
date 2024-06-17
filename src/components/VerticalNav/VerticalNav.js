import React from 'react';
import './VerticalNav.css';
import swimmingIcon from '../../images/icons/swimming.png';
import meditationIcon from '../../images/icons/meditation.png';
import weightsIcon from '../../images/icons/weights.png';
import cyclingIcon from '../../images/icons/cycling.png';

const VerticalNav = () => {
  return (
    <nav className="vertical-nav">
      <ul>
        <li><img src={swimmingIcon} alt="Swimming" className="nav-icon" /></li>
        <li><img src={meditationIcon} alt="Meditation" className="nav-icon" /></li>
        <li><img src={weightsIcon} alt="Weights" className="nav-icon" /></li>
        <li><img src={cyclingIcon} alt="Cycling" className="nav-icon" /></li>
      </ul>
    </nav>
  );
};

export default VerticalNav;
