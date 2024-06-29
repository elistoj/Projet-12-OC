import React from 'react';
import caloriesIcon from '../../../images/icons/icons-small/calories-icon.png';
import proteinsIcon from '../../../images/icons/icons-small/protein-icon.png';
import fatIcon from '../../../images/icons/icons-small/fat-icon.png';
import carbsIcon from '../../../images/icons/icons-small/carbs-icon.png'
import './NutritionalInfo.css'


const NutritionalInfo = ({ calorieCount, proteinCount, carbohydrateCount }) => {
  return (
    <div className="nutrition-container">
      <div className="nutrition-item">
        <img src={caloriesIcon} alt="Calories" className="icon calories-icon" />
        <div className="text">
          <span className="amount">{calorieCount}kCal</span>
          <span className="label">Calories</span>
        </div>
      </div>
      <div className="nutrition-item">
        <img src={proteinsIcon} alt="Proteins" className="icon proteins-icon" />
        <div className="text">
          <span className="amount">{proteinCount}g</span>
          <span className="label">Protéines</span>
        </div>
      </div>
      <div className="nutrition-item">
        <img src={carbsIcon} alt="Fat" className="icon carbs-icon" />
        <div className="text">
          <span className="amount">{carbohydrateCount}g</span>
          <span className="label">Glucides</span>
        </div>
      </div>
      <div className="nutrition-item">
        <img src={fatIcon} alt="Fat" className="icon fat-icon" />
        <div className="text">
          <span className="amount">{carbohydrateCount}g</span>
          <span className="label">Lipides</span>
        </div>
      </div>
    </div>
  );
}

export default NutritionalInfo;
