
export const fetchUserData = async (userId) => {
  try {
    const response = await fetch(`/MockData/userData.json`);  
    if (!response.ok) {
      throw new Error('Failed to fetch user data');
    }
    const data = await response.json();
    return data[userId];  
  } catch (error) {
    console.error("Error fetching user data", error);
    return null;
  }
};

export const fetchUserActivity = async (userId) => {
  try {
    const response = await fetch(`/MockData/userActivityData.json`); 
    if (!response.ok) {
      throw new Error('Failed to fetch user activity');
    }
    const data = await response.json();
    return data[userId];  
  } catch (error) {
    console.error("Error fetching user activity", error);
    return null;
  }
};

export const fetchUserAverageSessions = async (userId) => {
  try {
    const response = await fetch(`/MockData/userAverageSessionsData.json`); 
    if (!response.ok) {
      throw new Error('Failed to fetch user average sessions');
    }
    const data = await response.json();
    return data[userId]; 
  } catch (error) {
    console.error("Error fetching user average sessions", error);
    return null;
  }
};

export const fetchUserPerformance = async (userId) => {
  try {
    const response = await fetch(`/MockData/userPerformanceData.json`); 
    if (!response.ok) {
      throw new Error('Failed to fetch user performance');
    }
    const data = await response.json();
    return data[userId]; 

  } catch (error) {
    console.error("Error fetching user performance", error);
    return null;
  }
};
