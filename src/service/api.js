const BASE_URL = 'https://projet-12-o939grqns-elis-projects-d6a7030e.vercel.app/';

// Функција за вчитување на податоци за корисникот
export const fetchUserData = async (userId) => {
  try {
    const response = await fetch(`${BASE_URL}/api/user/${userId}/data.js`);
    if (!response.ok) {
      throw new Error('Indisponibilité des données utilisateur');
    }
    
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/javascript')) {
      throw new Error('Invalid content type. Expected JavaScript.');
    }
    
    const jsCode = await response.text(); // Вчитај го како текст
    const userData = new Function(jsCode)(); // Изврши го како JavaScript код
    
    return userData;
  } catch (error) {
    console.error("Erreur lors de la récupération des données utilisateur", error);
    throw error;
  }
};

// Функција за вчитување на податоци за активност на корисникот
export const fetchUserActivity = async (userId) => {
  try {
    const response = await fetch(`${BASE_URL}/api/user/${userId}/activity.js`);
    if (!response.ok) {
      throw new Error('Indisponibilité des données d\'activité utilisateur');
    }
    
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/javascript')) {
      throw new Error('Invalid content type. Expected JavaScript.');
    }
    
    const jsCode = await response.text(); // Вчитај го како текст
    const userActivity = new Function(jsCode)(); // Изврши го како JavaScript код
    
    return userActivity;
  } catch (error) {
    console.error("Erreur lors de la récupération des données d'activité utilisateur", error);
    throw error;
  }
};

// Функција за вчитување на податоци за просечни сесии на корисникот
export const fetchUserAverageSessions = async (userId) => {
  try {
    const response = await fetch(`${BASE_URL}/api/user/${userId}/average-sessions.js`);
    if (!response.ok) {
      throw new Error('Indisponibilité des sessions moyennes utilisateur');
    }
    
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/javascript')) {
      throw new Error('Invalid content type. Expected JavaScript.');
    }
    
    const jsCode = await response.text(); // Вчитај го како текст
    const averageSessions = new Function(jsCode)(); // Изврши го како JavaScript код
    
    return averageSessions;
  } catch (error) {
    console.error("Erreur lors de la récupération des sessions moyennes utilisateur", error);
    throw error;
  }
};

// Функција за вчитување на податоци за перформанси на корисникот
export const fetchUserPerformance = async (userId) => {
  try {
    const response = await fetch(`${BASE_URL}/api/user/${userId}/performance.js`);
    if (!response.ok) {
      throw new Error('Indisponibilité des données de performance utilisateur');
    }
    
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/javascript')) {
      throw new Error('Invalid content type. Expected JavaScript.');
    }
    
    const jsCode = await response.text(); // Вчитај го како текст
    const userPerformance = new Function(jsCode)(); // Изврши го како JavaScript код
    
    return userPerformance;
  } catch (error) {
    console.error("Erreur lors de la récupération des données de performance utilisateur", error);
    throw error;
  }
};
