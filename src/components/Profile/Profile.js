// Profile.js
import React, { useEffect, useState } from 'react';
import {
  fetchUserData,
  fetchUserActivity,
  fetchUserAverageSessions,
  fetchUserPerformance,
} from '../fetchFunctions/fetchFunctions';

const Profile = ({ userId }) => {
  const [userData, setUserData] = useState(null);
  const [userActivity, setUserActivity] = useState(null);
  const [userAverageSessions, setUserAverageSessions] = useState(null);
  const [userPerformance, setUserPerformance] = useState(null);

  useEffect(() => {
    const getUserData = async () => {
      const data = await fetchUserData(userId);
      setUserData(data);
    };

    const getUserActivity = async () => {
      const data = await fetchUserActivity(userId);
      setUserActivity(data);
    };

    const getUserAverageSessions = async () => {
      const data = await fetchUserAverageSessions(userId);
      setUserAverageSessions(data);
    };

    const getUserPerformance = async () => {
      const data = await fetchUserPerformance(userId);
      setUserPerformance(data);
    };

    getUserData();
    getUserActivity();
    getUserAverageSessions();
    getUserPerformance();
  }, [userId]);

  if (!userData || !userActivity || !userAverageSessions || !userPerformance) return <div>Loading...</div>;

  return (
    <div>
      <h1>{userData.userInfos.firstName}</h1>
      <p>Age: {userData.userInfos.age}</p>
      <h2>Activity</h2>
      <pre>{JSON.stringify(userActivity, null, 2)}</pre>
      <h2>Average Sessions</h2>
      <pre>{JSON.stringify(userAverageSessions, null, 2)}</pre>
      <h2>Performance</h2>
      <pre>{JSON.stringify(userPerformance, null, 2)}</pre>
    </div>
  );
};

export default Profile;
