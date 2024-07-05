import React, { useEffect, useState } from 'react';
import './Profile.css';
import ActivityChart from '../charts/ActivityChart/ActivityChart';
import AverageSessionsChart from '../charts/AverageSessionsChart/AverageSessionsChart';
import { fetchUserData, fetchUserActivity, fetchUserAverageSessions, fetchUserPerformance } from '../fetchFunctions/fetchFunctions';
import NutritionalInfo from '../charts/NutritionalInfo/NutritionalInfo';
import RadarChart from '../charts/PerformanceChart/RadarChart';
import ScoreChart from '../charts/ScoreChart/ScoreChart';

const Profile = ({ userId }) => {
  const [userData, setUserData] = useState(null);
  const [userActivity, setUserActivity] = useState(null);
  const [userAverageSessions, setUserAverageSessions] = useState(null);
  const [userPerformance, setUserPerformance] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data1 = await fetchUserData(userId);
        const data2 = await fetchUserActivity(userId);
        const data3 = await fetchUserAverageSessions(userId);
        const data4 = await fetchUserPerformance(userId);

        setUserData(data1);
        setUserActivity(data2);
        setUserAverageSessions(data3);
        setUserPerformance(data4);
      } catch (error) {
        console.error('Error fetching data:', error);
        // Handle error state if needed
      }
    };

    fetchData();
  }, [userId]);

  if (!userData || !userActivity || !userAverageSessions || !userPerformance) return <div>Loading...</div>;



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
          <ScoreChart data={userData.todayScore} />
        </div>
        </div>
      </div> 
      <div className="sections">
        <NutritionalInfo
          calorieCount={userData.keyData.calorieCount}
          proteinCount={userData.keyData.proteinCount}
          carbohydrateCount={userData.keyData.carbohydrateCount}
        />
      </div>
    </div>
  );
};

export default Profile;