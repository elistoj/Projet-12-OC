import React, { useEffect, useState } from 'react';
import './Profile.css';
import ActivityChart from '../charts/ActivityChart/ActivityChart';
import { fetchUserData, fetchUserActivity} from '../fetchFunctions/fetchFunctions';

const Profile = ({ userId }) => {
  const [userData, setUserData] = useState(null);
  const [userActivity, setUserActivity] = useState(null);


  useEffect(() => {
    const fetchData = async () => {
      const data1 = await fetchUserData(userId);
      const data2 = await fetchUserActivity(userId);

      setUserData(data1);
      setUserActivity(data2);

    };

    fetchData();
  }, [userId]);

  if (!userData || !userActivity ) return <div>Loading...</div>;

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1>Bonjour <span className="user-name">{userData.userInfos.firstName}</span></h1>
        <p>Félicitation ! Vous avez explosé vos objectifs hier 👏</p>
      </div>

      <div className="section">
        <ActivityChart data={userActivity.sessions} />
      </div>
  
    </div>
  );
};

export default Profile;
