import axios from 'axios';

// ✅ Usar variable de entorno para el API
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 🎯 Interceptor de respuestas para manejar errores globalmente
api.interceptors.response.use(
  (response) => response, 
  (error) => {
    if (error.response && error.response.status === 403) {
      //  Manejar el error 403 (Prohibido)
      alert('🚫 No tienes permisos para realizar esta acción. Inicia sesión nuevamente.');

      // Eliminar token para forzar reautenticación
      localStorage.removeItem('token');

      // 🔄 Redirigir al login
      window.location.href = '/'; 
    }

    return Promise.reject(error);
  }
);

// 📌 Funciones de autenticación
export const registerUser = (userData) => api.post('/auth/register', userData);
export const loginUser = (userData) => api.post('/auth/login', userData);

// 📌 Funciones de chat
export const fetchMessages = (token) =>
  api.get('/chat', { headers: { Authorization: `Bearer ${token}` } });

export const sendMessage = (message, token) =>
  api.post('/chat', { content: message }, { headers: { Authorization: `Bearer ${token}` } });

export default api;
