import React from 'react';
import './VerticalNav.css';
import swimmingIcon from '../../images/icons/swimming.png';
import meditationIcon from '../../images/icons/meditation.png';
import weightsIcon from '../../images/icons/weights.png';
import cyclingIcon from '../../images/icons/cycling.png';

const VerticalNav = () => {
  const handleSwimmingClick = () => {
    console.log("Swimming button clicked");
  };

  const handleMeditationClick = () => {
    console.log("Meditation button clicked");
  };

  const handleWeightsClick = () => {
    console.log("Weights button clicked");
  };

  const handleCyclingClick = () => {
    console.log("Cycling button clicked");
  };

  return (
    <div>
      <nav className="vertical-nav">
        <ul>
          <li><button className="nav-button" onClick={handleSwimmingClick}><img src={swimmingIcon} alt="Swimming" className="nav-icon" /></button></li>
          <li><button className="nav-button" onClick={handleMeditationClick}><img src={meditationIcon} alt="Meditation" className="nav-icon" /></button></li>
          <li><button className="nav-button" onClick={handleWeightsClick}><img src={weightsIcon} alt="Weights" className="nav-icon" /></button></li>
          <li><button className="nav-button" onClick={handleCyclingClick}><img src={cyclingIcon} alt="Cycling" className="nav-icon" /></button></li>
        </ul>   
        <p className="copyright">Copyright, SportSee 2020</p>
      </nav>
    </div>
  );
};

export default VerticalNav;
