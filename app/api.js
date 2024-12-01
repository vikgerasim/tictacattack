import axios from "axios";
const API_BASE_URL = "https://672bfa5d1600dda5a9f6eb68.mockapi.io";

const api = axios.create({ baseURL: API_BASE_URL });

export const getHighScores = async () => {
  try {
    const response = await api.get("/highscores");
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const addHighScore = async (newHighScore) => {
  try {
    const response = await api.post("/highscores", newHighScore); 
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};