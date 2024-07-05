import React from 'react';
import './Profile.css';
import ActivityChart from '../charts/ActivityChart/ActivityChart';
import AverageSessionsChart from '../charts/AverageSessionsChart/AverageSessionsChart';
import NutritionalInfo from '../charts/NutritionalInfo/NutritionalInfo';
import RadarChart from '../charts/PerformanceChart/RadarChart';
import ScoreChart from '../charts/ScoreChart/ScoreChart';

import mockData from '../../mockData.json';

const Profile = ({ userId }) => {
  const userData = mockData.USER_MAIN_DATA.find(user => user.id === parseInt(userId));
  const userActivity = mockData.USER_ACTIVITY.find(activity => activity.userId === parseInt(userId));
  const userAverageSessions = mockData.USER_AVERAGE_SESSIONS.find(session => session.userId === parseInt(userId));
  const userPerformance = mockData.USER_PERFORMANCE.find(performance => performance.userId === parseInt(userId));

  if (!userData || !userActivity || !userAverageSessions || !userPerformance) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-container">
      <div className='profile-header-section'>
        <div className="profile-header">
          <h1>Bonjour <span className="user-name">{userData.userInfos.firstName}</span></h1>
          <p>Félicitation ! Vous avez explosé vos objectifs hier 👏</p>
        </div>
        <div className="section-activity">
          <ActivityChart data={userActivity.sessions} />
        </div>
        <div className='trois-sections'>
          <div className="section">
            <AverageSessionsChart data={userAverageSessions.sessions} />
          </div>
          <div className="section">
            <RadarChart data={userPerformance.data} />
          </div>
          <div className="section">
            <ScoreChart data={{ score: userData.score }} />
          </div>
        </div>
      </div>
      <div className="sections">
        <NutritionalInfo
          calorieCount={userData.keyData.calorieCount}
          proteinCount={userData.keyData.proteinCount}
          carbohydrateCount={userData.keyData.carbohydrateCount}
          lipidCount={userData.keyData.lipidCount}
        />
      </div>
    </div>
  );
};

export default Profile;
