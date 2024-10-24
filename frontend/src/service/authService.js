import axios from 'axios';

// Set the correct API URL here
const API_URL = 'http://127.0.0.1:8000/auth/';

export const register = (username, email, password) => {
  return axios.post(`${API_URL}registration/`, {
    username,
    email,
    password,
  });
};

export const login = (username, password) => {
  return axios.post(`${API_URL}login/`, {
    username,
    password,
  });
  
};
