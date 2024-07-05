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

const Profile = ({ userId }) => {
  const [userData, setUserData] = useState(null);
  const [userActivity, setUserActivity] = useState(null);
  const [userAverageSessions, setUserAverageSessions] = useState(null);
  const [userPerformance, setUserPerformance] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        setError(null); // Clear error if fetching succeeds
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Les données sont temporairement indisponibles. Veuillez réessayer plus tard.');
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!userData || !userActivity || !userAverageSessions || !userPerformance) {
    return <div>Data not available</div>;
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
