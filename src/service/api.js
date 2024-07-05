const BASE_URL = 'https://github.com/elistoj/Projet-12-OC/blob/main/back-end/app/data.js'; 

export const getUserProfile = async (userId) => {
  try {
    const response = await fetch(`${BASE_URL}/api/user/${userId}`);
    if (!response.ok) {
      throw new Error('Неуспешно добивање на податоци.');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Грешка при барање:', error);
    throw error;
  }
};

