import React, { useState, useEffect } from 'react';
import './Profile.css';
import ActivityChart from '../components/charts/ActivityChart/ActivityChart';
import AverageSessionsChart from '../components/charts/AverageSessionsChart/AverageSessionsChart';
import NutritionalInfo from '../components/charts/NutritionalInfo/NutritionalInfo';
import RadarChart from '../components/charts/PerformanceChart/RadarChart';
import ScoreChart from '../components/charts/ScoreChart/ScoreChart';
import {
  fetchUserData,
  fetchUserActivity,
  fetchUserAverageSessions,
  fetchUserPerformance,
} from '../service/api';
import mockData from '../mockData.json';

const Profile = ({ userId }) => {
  const [userData, setUserData] = useState(null);
  const [userActivity, setUserActivity] = useState(null);
  const [userAverageSessions, setUserAverageSessions] = useState(null);
  const [userPerformance, setUserPerformance] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const fetchedUserData = await fetchUserData(userId);
        const fetchedUserActivity = await fetchUserActivity(userId);
        const fetchedUserAverageSessions = await fetchUserAverageSessions(userId);
        const fetchedUserPerformance = await fetchUserPerformance(userId);

        setUserData(fetchedUserData);
        setUserActivity(fetchedUserActivity);
        setUserAverageSessions(fetchedUserAverageSessions);
        setUserPerformance(fetchedUserPerformance);

        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);

        setUserData(mockData.USER_MAIN_DATA.find(user => user.id === parseInt(userId)));
        setUserActivity(mockData.USER_ACTIVITY.find(activity => activity.userId === parseInt(userId)));
        setUserAverageSessions(mockData.USER_AVERAGE_SESSIONS.find(session => session.userId === parseInt(userId)));
        setUserPerformance(mockData.USER_PERFORMANCE.find(performance => performance.userId === parseInt(userId)));
      }
    };

    fetchData();
  }, [userId]);

  if (loading || !userData || !userActivity || !userAverageSessions || !userPerformance) {
    return <div>Chargement...</div>;
  }

  if (!userActivity.sessions || !userAverageSessions.sessions || !userPerformance.data) {
    return <div>Données non disponibles</div>;
  }

  const { firstName } = userData.userInfos;

  return (
    <div className="profile-container">
      <div className="profile-header-section">
        <div className="profile-header">
          <h1>Bonjour <span className="user-name">{firstName}</span></h1>
          <p>Félicitation ! Vous avez explosé vos objectifs hier 👏</p>
        </div>
        <div className="section-activity">
          <ActivityChart data={userActivity.sessions} />
        </div>
        <div className="trois-sections">
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
