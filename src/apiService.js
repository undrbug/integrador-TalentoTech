import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api', 
  withCredentials: true, // Permite que Axios envíe cookies (para el refreshToken)
});

// añade el accessToken al header.
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const registerUser = (email, password) => 
  api.post('/auth/register', { email, password });

export const loginUser = (email, password) => 
  api.post('/auth/login', { email, password });

export const logoutUser = () => 
  api.post('/auth/logout');

export const getMyProfile = () => 
  api.get('/users/me');

export const refreshToken = () => 
  api.post('/auth/refresh');

export default api;