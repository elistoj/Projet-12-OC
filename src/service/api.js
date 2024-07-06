const BASE_URL = 'https://projet-12-oc.vercel.app';

async function checkResponse(response) {
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Network response was not ok. Status: ${response.status}. Message: ${errorText}`);
  }
  return response.json();
}

export async function fetchUserData(userId) {
  try {
    const response = await fetch(`${BASE_URL}/users/${userId}`);
    const userData = await checkResponse(response);
    return mapUserData(userData);  // Format data
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
}

export async function fetchUserActivity(userId) {
  try {
    const response = await fetch(`${BASE_URL}/users/${userId}/activity`);
    const userActivity = await checkResponse(response);
    return mapUserActivity(userActivity);  // Format data
  } catch (error) {
    console.error('Error fetching user activity:', error);
    throw error;
  }
}

export async function fetchUserAverageSessions(userId) {
  try {
    const response = await fetch(`${BASE_URL}/users/${userId}/average-sessions`);
    const userAverageSessions = await checkResponse(response);
    return mapUserAverageSessions(userAverageSessions);  // Format data
  } catch (error) {
    console.error('Error fetching user average sessions:', error);
    throw error;
  }
}

export async function fetchUserPerformance(userId) {
  try {
    const response = await fetch(`${BASE_URL}/users/${userId}/performance`);
    const userPerformance = await checkResponse(response);
    return mapUserPerformance(userPerformance);  // Format data
  } catch (error) {
    console.error('Error fetching user performance:', error);
    throw error;
  }
}


function mapUserData(userData) {
  return {
    id: userData.id,
    userInfos: {
      firstName: userData.firstName,
      lastName: userData.lastName,
    },
    keyData: {
      calorieCount: userData.calorieCount,
      proteinCount: userData.proteinCount,
      carbohydrateCount: userData.carbohydrateCount,
      lipidCount: userData.lipidCount,
    },
    score: userData.score,
  };
}

function mapUserActivity(userActivity) {
  return {
    userId: userActivity.userId,
    sessions: userActivity.sessions.map(session => ({
      day: session.day,
      sessionLength: session.calories,
    })),
  };
}

function mapUserAverageSessions(userAverageSessions) {
  return {
    userId: userAverageSessions.userId,
    sessions: userAverageSessions.sessions.map(session => ({
      day: session.day,
      averageDuration: session.sessionLength,
    })),
  };
}

function mapUserPerformance(userPerformance) {
  return {
    userId: userPerformance.userId,
    data: userPerformance.data.map(item => ({
      kind: item.kind,
      value: item.value,
    })),
  };
}
