import axios from 'axios';

const API_URL = 'http://localhost:4000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 🎯 Interceptor de respuestas para manejar errores globalmente
api.interceptors.response.use(
  (response) => response,  // Si la respuesta es correcta, sigue normalmente
  (error) => {
    if (error.response && error.response.status === 403) {
      // 🚫 Manejar el error 403 (Prohibido)
      alert('🚫 No tienes permisos para realizar esta acción. Inicia sesión nuevamente.');

      // 🔑 Opcional: Eliminar token para forzar reautenticación
      localStorage.removeItem('token');

      // 🔄 Opcional: Redirigir al login (si tienes react-router-dom)
      window.location.href = '/';  // Cambia a tu ruta de login
    }

    // 📤 Propaga otros errores para manejarlos localmente si es necesario
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
