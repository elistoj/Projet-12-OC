const BASE_URL = 'http://localhost:3000/user';

async function checkResponse(response) {
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Network response was not ok. Status: ${response.status}. Message: ${errorText}`);
  }
  return response.json();
}

export async function fetchUserData(userId) {
  try {
    const response = await fetch(`${BASE_URL}/${userId}`);
    const userData = await checkResponse(response);
    console.log('User Data:', userData.data);
    return mapUserData(userData.data);
  } catch (error) {
    console.error('Error fetching user data:', error);
    return null;
  }
}

export async function fetchUserActivity(userId) {
  try {
    const response = await fetch(`${BASE_URL}/${userId}/activity`);
    const userActivity = await checkResponse(response);
    console.log('User Activity:', userActivity.data);
    return mapUserActivity(userActivity.data);
  } catch (error) {
    console.error('Error fetching user activity:', error);
    return null;
  }
}

export async function fetchUserAverageSessions(userId) {
  try {
    const response = await fetch(`${BASE_URL}/${userId}/average-sessions`);
    const userAverageSessions = await checkResponse(response);
    console.log('User Average Sessions:', userAverageSessions.data);
    return mapUserAverageSessions(userAverageSessions.data);
  } catch (error) {
    console.error('Error fetching user average sessions:', error);
    return null;
  }
}


export async function fetchUserPerformance(userId) {
  try {
    const response = await fetch(`${BASE_URL}/${userId}/performance`);
    const userPerformance = await checkResponse(response);
    console.log('User Performance:', userPerformance.data);
    return mapUserPerformance(userPerformance.data);
  } catch (error) {
    console.error('Error fetching user performance:', error);
    return null;
  }
}

function mapUserData(userData) {
  return {
    id: userData.id,
    userInfos: {
      firstName: userData.userInfos?.firstName ?? '',
      lastName: userData.userInfos?.lastName ?? '',
    },
    keyData: {
      calorieCount: userData.keyData?.calorieCount ?? 0,
      proteinCount: userData.keyData?.proteinCount ?? 0,
      carbohydrateCount: userData.keyData?.carbohydrateCount ?? 0,
      lipidCount: userData.keyData?.lipidCount ?? 0,
    },
    score: userData.score ?? 0,
  };
}

function mapUserActivity(userActivity) {
  if (!userActivity || !Array.isArray(userActivity.sessions)) {
    return { userId: '', sessions: [] };
  }

  return {
    userId: userActivity.userId,
    sessions: userActivity.sessions.map(session => ({
      day: session.day ?? '',
      kilogram: session.kilogram ?? 0,
      calories: session.calories ?? 0,
    })),
  };
}

function mapUserAverageSessions(userAverageSessions) {
  if (!userAverageSessions || !Array.isArray(userAverageSessions.sessions)) {
    return { userId: '', sessions: [] };
  }

  return {
    userId: userAverageSessions.userId,
    sessions: userAverageSessions.sessions.map(session => ({
      day: session.day ?? '',
      sessionLength: session.sessionLength ?? 0,
    })),
  };
}


function mapUserPerformance(userPerformance) {
  if (!userPerformance || !Array.isArray(userPerformance.data)) {
    return { userId: '', data: [] };
  }

  return {
    userId: userPerformance.userId,
    data: userPerformance.data.map(item => ({
      kind: item.kind ?? '',
      value: item.value ?? 0,
    })),
  };
}
