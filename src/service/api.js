const BASE_URL = 'http://localhost:3000';
const API_KEY = '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';

async function checkResponse(response) {
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Network response was not ok. Status: ${response.status}. Message: ${errorText}`);
  }
  return response.json();
}

export async function fetchUserData(userId) {
  try {
    const response = await fetch(`${BASE_URL}/${userId}`, {
      headers: {
        'Authorization': `token ${API_KEY}`
      }
    });
    const userData = await checkResponse(response);
    return mapUserData(userData);
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
}

export async function fetchUserActivity(userId) {
  try {
    const response = await fetch(`${BASE_URL}/${userId}/events`, {
      headers: {
        'Authorization': `token ${API_KEY}`
      }
    });
    const userActivity = await checkResponse(response);
    return mapUserActivity(userActivity);
  } catch (error) {
    console.error('Error fetching user activity:', error);
    throw error;
  }
}

export async function fetchUserAverageSessions(userId) {
  try {
    const response = await fetch(`${BASE_URL}/${userId}/average-sessions`, {
      headers: {
        'Authorization': `token ${API_KEY}`
      }
    });
    const userAverageSessions = await checkResponse(response);
    return mapUserAverageSessions(userAverageSessions);
  } catch (error) {
    console.error('Error fetching user average sessions:', error);
    throw error;
  }
}

export async function fetchUserPerformance(userId) {
  try {
    const response = await fetch(`${BASE_URL}/${userId}/performance`, {
      headers: {
        'Authorization': `token ${API_KEY}`
      }
    });
    const userPerformance = await checkResponse(response);
    return mapUserPerformance(userPerformance);
  } catch (error) {
    console.error('Error fetching user performance:', error);
    throw error;
  }
}

function mapUserData(userData) {
  return {
    id: userData.id,
    userInfos: {
      firstName: userData.name ? userData.name.split(' ')[0] : '',
      lastName: userData.name ? userData.name.split(' ')[1] : '',
    },
    keyData: {
      calorieCount: userData.public_repos,
      proteinCount: userData.followers,
      carbohydrateCount: userData.following,
      lipidCount: userData.bio,
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
