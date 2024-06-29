import React, { useEffect, useState } from 'react';
import './Profile.css';
import ActivityChart from '../charts/ActivityChart/ActivityChart';
import AverageSessionsChart from '../charts/AverageSessionsChart/AverageSessionsChart';
import { fetchUserData, fetchUserActivity, fetchUserAverageSessions } from '../fetchFunctions/fetchFunctions';
import NutritionalInfo from '../charts/NutritionalInfo/NutritionalInfo';

const Profile = ({ userId }) => {
  const [userData, setUserData] = useState(null);
  const [userActivity, setUserActivity] = useState(null);
  const [userAverageSessions, setUserAverageSessions] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data1 = await fetchUserData(userId);
        const data2 = await fetchUserActivity(userId);
        const data3 = await fetchUserAverageSessions(userId);

        setUserData(data1);
        setUserActivity(data2);
        setUserAverageSessions(data3);
      } catch (error) {
        console.error('Error fetching data:', error);
        // Handle error state if needed
      }
    };

    fetchData();
  }, [userId]);

  if (!userData || !userActivity || !userAverageSessions) return <div>Loading...</div>;

  return (
    <div className="profile-container">
      <div className='profile-header-section'>
      <div className="profile-header">
        <h1>Bonjour <span className="user-name">{userData.userInfos.firstName}</span></h1>
        <p>Félicitation ! Vous avez explosé vos objectifs hier 👏</p>
      </div>
      <div className="section">
        <ActivityChart data={userActivity.sessions} />
      </div>
     
      <div className="section">
        <AverageSessionsChart data={userAverageSessions.sessions} />
      </div>
      </div> 
      <div className="section">
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
