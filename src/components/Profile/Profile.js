import React, { useState, useEffect } from 'react';
import './Profile.css';
import ActivityChart from '../charts/ActivityChart/ActivityChart';
import AverageSessionsChart from '../charts/AverageSessionsChart/AverageSessionsChart';
import NutritionalInfo from '../charts/NutritionalInfo/NutritionalInfo';
import RadarChart from '../charts/PerformanceChart/RadarChart';
import ScoreChart from '../charts/ScoreChart/ScoreChart';
import { getUserProfile } from '../../service/api'; 

const Profile = ({ userId }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getUserProfile(userId);
        setUserData(data);
        setLoading(false);
      } catch (error) {
        console.error('Грешка при фетчирање на податоци:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!userData) {
    return <div>Податоците не се достапни.</div>;
  }

  return (
    <div className="profile-container">
      <div className='profile-header-section'>
        <div className="profile-header">
          <h1>Bonjour <span className="user-name">{userData.userInfos.firstName}</span></h1>
          <p>Félicitation ! Vous avez explosé vos objectifs hier 👏</p>
        </div>
        <div className="section-activity">
          <ActivityChart data={userData.sessions} />
        </div>
        <div className='trois-sections'>
          <div className="section">
            <AverageSessionsChart data={userData.averageSessions} />
          </div>
          <div className="section">
            <RadarChart data={userData.performance} />
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
