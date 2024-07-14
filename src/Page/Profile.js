import React, { useState, useEffect } from 'react';
import './Profile.css';
import VerticalNav from '../components/VerticalNav/VerticalNav';
import ActivityChart from '../components/charts/ActivityChart/ActivityChart';
import AverageSessionsChart from '../components/charts/AverageSessionsChart/AverageSessionsChart';
import NutritionalInfo from '../components/charts/NutritionalInfo/NutritionalInfo';
import RadarChart from '../components/charts/PerformanceChart/RadarChart';
import ScoreChart from '../components/charts/ScoreChart/ScoreChart';
import {
  fetchUserData as apiFetchUserData,
  fetchUserActivity as apiFetchUserActivity,
  fetchUserAverageSessions as apiFetchUserAverageSessions,
  fetchUserPerformance as apiFetchUserPerformance,
  mapUserData,
  mapUserActivity,
  mapUserAverageSessions,
  mapUserPerformance
} from '../service/api';
import mockData from '../mockData.json';

const Profile = () => {
  const [userId, setUserId] = useState('18');
  const [userData, setUserData] = useState(null);
  const [userActivity, setUserActivity] = useState(null);
  const [userAverageSessions, setUserAverageSessions] = useState(null);
  const [userPerformance, setUserPerformance] = useState(null);
  const [loading, setLoading] = useState(true);
  const [, setIsMocked] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setIsMocked(false);

      try {
        const fetchedUserData = await apiFetchUserData(userId);
        const fetchedUserActivity = await apiFetchUserActivity(userId);
        const fetchedUserAverageSessions = await apiFetchUserAverageSessions(userId);
        const fetchedUserPerformance = await apiFetchUserPerformance(userId);

        setUserData(fetchedUserData);
        setUserActivity(fetchedUserActivity);
        setUserAverageSessions(fetchedUserAverageSessions);
        setUserPerformance(fetchedUserPerformance);

        setLoading(false);
      } catch (error) {
        console.error('Using mocked data due to fetch error');

        setUserData(mapUserData(mockData.USER_MAIN_DATA.find(user => user.id === parseInt(userId))));
        setUserActivity(mapUserActivity(mockData.USER_ACTIVITY.find(activity => activity.userId === parseInt(userId))));
        setUserAverageSessions(mapUserAverageSessions(mockData.USER_AVERAGE_SESSIONS.find(session => session.userId === parseInt(userId))));
        setUserPerformance(mapUserPerformance(mockData.USER_PERFORMANCE.find(performance => performance.userId === parseInt(userId))));

        setIsMocked(true);
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  const handleUserChange = (newUserId) => {
    setUserId(newUserId);
  };

  if (loading || !userData || !userActivity || !userAverageSessions || !userPerformance) {
    return <div>Chargement...</div>;
  }

  if (!userActivity.sessions || !userAverageSessions.sessions || !userPerformance.data) {
    return <div>Données non disponibles</div>;
  }

  const { firstName } = userData.userInfos;

  return (
    <div className="profile-container">
      <VerticalNav userId={userId} onUserChange={handleUserChange} />

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
            <ScoreChart data={{ score: userData.score || userData.TodayScore }} />
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
