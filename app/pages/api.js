import axios from "axios";
const API_BASE_URL = "https://672bfa5d1600dda5a9f6eb68.mockapi.io";

const api = axios.create({ baseURL: API_BASE_URL });





//create a function to fetch all the tasks

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
    const response = await api.post("/highscores", newHighScore); //newHighScore is the object that we want to add
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};


export const updateHighScores = async (id, name, score) => {
  try {
    const response = await api.put(`/highscores/${id}`, updatefield);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteTasks = async (id) => {
  try {
    const response = await api.delete(`/highscores/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
