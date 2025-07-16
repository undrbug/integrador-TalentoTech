import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api-auth-secure.onrender.com/api', 
  withCredentials: true, // Permite que Axios envíe cookies (para el refreshToken)
});

// Es para agregar el accessToken al header.
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

export const registerUser = (name, email, password) => 
  api.post('/auth/register', { name, email, password });

export const loginUser = (email, password) => 
  api.post('/auth/login', { email, password });

export const logoutUser = () => 
  api.post('/auth/logout');

export const getMyProfile = () => 
  api.get('/users/me');

export const refreshToken = () => 
  api.post('/auth/refresh');

export const getProducts = () => 
  api.get('/products');

export const getProductDeals = () => {
  return api.get('/products/deals');
}

export const getProductById = (id) => 
  api.get(`/products/${id}`);

export const createProduct = (product) => 
  api.post('/products', product);

export const updateProduct = (id, product) => 
  api.put(`/products/${id}`, product);

export const deleteProduct = (id) => 
  api.delete(`/products/${id}`);

export const getUsers = () => 
  api.get('/users');

export const getUserById = (id) => 
  api.get(`/users/${id}`);

export const updateUser = (id, user) => 
  api.put(`/users/${id}`, user);

export const deleteUser = (id) => 
  api.delete(`/users/${id}`);

export default api;