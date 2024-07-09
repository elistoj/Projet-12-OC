import mockData from '../mockData.json';

const BASE_URL = 'http://localhost:3000/user';

export function fetchUserData(userId) {
  return fetch(`${BASE_URL}/${userId}`)
    .then(response => response.json())
    .then(userData => mapUserData(userData.data))
    .catch(() => {
      console.warn('Using mocked user data due to fetch error.');
      const userDataFromMock = mockData.USER_MAIN_DATA.find(user => user.id === parseInt(userId));
      return mapUserData(userDataFromMock);
    });
}

export function fetchUserActivity(userId) {
  return fetch(`${BASE_URL}/${userId}/activity`)
    .then(response => response.json())
    .then(userActivity => mapUserActivity(userActivity.data))
    .catch(() => {
      console.warn('Using mocked user activity data due to fetch error.');
      const userActivityFromMock = mockData.USER_ACTIVITY.find(activity => activity.userId === parseInt(userId));
      return mapUserActivity(userActivityFromMock);
    });
}

export function fetchUserAverageSessions(userId) {
  return fetch(`${BASE_URL}/${userId}/average-sessions`)
    .then(response => response.json())
    .then(userAverageSessions => mapUserAverageSessions(userAverageSessions.data))
    .catch(() => {
      console.warn('Using mocked user average sessions data due to fetch error.');
      const userAverageSessionsFromMock = mockData.USER_AVERAGE_SESSIONS.find(session => session.userId === parseInt(userId));
      return mapUserAverageSessions(userAverageSessionsFromMock);
    });
}

export function fetchUserPerformance(userId) {
  return fetch(`${BASE_URL}/${userId}/performance`)
    .then(response => response.json())
    .then(userPerformance => mapUserPerformance(userPerformance.data))
    .catch(() => {
      console.warn('Using mocked user performance data due to fetch error.');
      const userPerformanceFromMock = mockData.USER_PERFORMANCE.find(performance => performance.userId === parseInt(userId));
      return mapUserPerformance(userPerformanceFromMock);
    });
}

function mapUserData(userData) {
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
