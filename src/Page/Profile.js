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
  fetchUserPerformance as apiFetchUserPerformance
} from '../service/api';  // Import API functions

// Import mock data from JSON file
import mockData from '../mockData.json';

const Profile = () => {
  const [userId, setUserId] = useState('18');
  const [userData, setUserData] = useState(null);
  const [userActivity, setUserActivity] = useState(null);
  const [userAverageSessions, setUserAverageSessions] = useState(null);
  const [userPerformance, setUserPerformance] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const fetchedUserData = await apiFetchUserData(userId).catch(() => null);
        const fetchedUserActivity = await apiFetchUserActivity(userId).catch(() => null);
        const fetchedUserAverageSessions = await apiFetchUserAverageSessions(userId).catch(() => null);
        const fetchedUserPerformance = await apiFetchUserPerformance(userId).catch(() => null);

        const userDataFromMock = mockData.USER_MAIN_DATA.find(user => user.id === parseInt(userId)) || null;
        const userActivityFromMock = mockData.USER_ACTIVITY.find(activity => activity.userId === parseInt(userId)) || null;
        const userAverageSessionsFromMock = mockData.USER_AVERAGE_SESSIONS.find(session => session.userId === parseInt(userId)) || null;
        const userPerformanceFromMock = mockData.USER_PERFORMANCE.find(performance => performance.userId === parseInt(userId)) || null;

        setUserData(fetchedUserData || userDataFromMock);
        setUserActivity(fetchedUserActivity || userActivityFromMock);
        setUserAverageSessions(fetchedUserAverageSessions || userAverageSessionsFromMock);
        setUserPerformance(fetchedUserPerformance || userPerformanceFromMock);

        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
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
      {/* Vertical navigation */}
      <VerticalNav userId={userId} onUserChange={handleUserChange} />  

      {/* Profile header section */}
      <div className="profile-header-section">
        <div className="profile-header">
          <h1>Bonjour <span className="user-name">{firstName}</span></h1>
          <p>Félicitation ! Vous avez explosé vos objectifs hier 👏</p>
        </div>
        
        {/* Activity chart section */}
        <div className="section-activity">
          <ActivityChart data={userActivity.sessions} />
        </div>

        {/* Three sections with charts */}
        <div className="trois-sections">
          {/* Average sessions chart */}
          <div className="section">
            <AverageSessionsChart data={userAverageSessions.sessions} />
          </div>

          {/* Radar chart for performance */}
          <div className="section">
            <RadarChart data={userPerformance.data} />
          </div>

          {/* Score chart */}
          <div className="section">
            <ScoreChart data={{ score: userData.score || userData.TodayScore }} />
          </div>
        </div>
      </div>

      {/* Nutritional info section */}
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
