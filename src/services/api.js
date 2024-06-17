import axios from 'axios';

const API_URL = 'http://localhost:5000';

export const fetchUserData = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user data", error);
    return null;
  }
};

export const fetchUserActivity = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/user/${userId}/activity`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user activity", error);
    return null;
  }
};

export const fetchUserAverageSessions = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/user/${userId}/average-sessions`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user average sessions", error);
    return null;
  }

};

export const fetchUserPerformance = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/user/${userId}/performance`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user performance", error);
    return null;
  }
};
