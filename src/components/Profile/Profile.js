import React, { useState, useEffect } from 'react';
import './Profile.css';
import ActivityChart from '../charts/ActivityChart/ActivityChart';
import AverageSessionsChart from '../charts/AverageSessionsChart/AverageSessionsChart';
import NutritionalInfo from '../charts/NutritionalInfo/NutritionalInfo';
import RadarChart from '../charts/PerformanceChart/RadarChart';
import ScoreChart from '../charts/ScoreChart/ScoreChart';

import mockData from '../../mockData.json';

const Profile = ({ userId }) => {
  const [userData, setUserData] = useState(null);
  const [userActivity, setUserActivity] = useState(null);
  const [userAverageSessions, setUserAverageSessions] = useState(null);
  const [userPerformance, setUserPerformance] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);

        await new Promise(resolve => setTimeout(resolve, 1000));

        const fetchedUserData = mockData.USER_MAIN_DATA.find(user => user.id === parseInt(userId));

        if (fetchedUserData) {
          setUserData({
            userInfos: {
              firstName: fetchedUserData.userInfos.firstName,
            },
            keyData: {
              calorieCount: fetchedUserData.keyData.calorieCount,
              proteinCount: fetchedUserData.keyData.proteinCount,
              carbohydrateCount: fetchedUserData.keyData.carbohydrateCount,
              lipidCount: fetchedUserData.keyData.lipidCount,
            },
            score: fetchedUserData.score,
          });

          const activityData = mockData.USER_ACTIVITY.find(activity => activity.userId === parseInt(userId));
          const averageSessionsData = mockData.USER_AVERAGE_SESSIONS.find(session => session.userId === parseInt(userId));
          const performanceData = mockData.USER_PERFORMANCE.find(performance => performance.userId === parseInt(userId));

          setUserActivity(activityData);
          setUserAverageSessions(averageSessionsData);
          setUserPerformance(performanceData);

          setLoading(false);
        } else {
          console.error('User not found in mock data.');
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  if (loading || !userData || !userActivity || !userAverageSessions || !userPerformance) {
    return <div>Loading...</div>;
  }

  if (!userActivity.sessions || !userAverageSessions.sessions || !userPerformance.data) {
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
