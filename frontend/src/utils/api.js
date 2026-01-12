import axios from 'axios';

// Live Backend
export const API_BASE_URL = 'https://swarmdeal.onrender.com/api';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 8000 // 8s timeout (Render wake-up time handling)
});
