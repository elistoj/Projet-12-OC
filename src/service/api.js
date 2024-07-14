const BASE_URL = 'http://localhost:3000/user';

export function fetchUserData(userId) {
  return fetch(`${BASE_URL}/${userId}`)
    .then(response => response.json())
    .then(userData => mapUserData(userData.data));
}

export function fetchUserActivity(userId) {
  return fetch(`${BASE_URL}/${userId}/activity`)
    .then(response => response.json())
    .then(userActivity => mapUserActivity(userActivity.data));
}

export function fetchUserAverageSessions(userId) {
  return fetch(`${BASE_URL}/${userId}/average-sessions`)
    .then(response => response.json())
    .then(userAverageSessions => mapUserAverageSessions(userAverageSessions.data));
}

export function fetchUserPerformance(userId) {
  return fetch(`${BASE_URL}/${userId}/performance`)
    .then(response => response.json())
    .then(userPerformance => mapUserPerformance(userPerformance.data));
}

export function mapUserData(userData) {
  const scoreToUse = userData.score !== undefined ? userData.score : userData.TodayScore ?? 0;

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
    score: scoreToUse,
  };
}

export function mapUserActivity(userActivity) {
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

export function mapUserAverageSessions(userAverageSessions) {
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

export function mapUserPerformance(userPerformance) {
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
