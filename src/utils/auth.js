import { jwtDecode } from "jwt-decode";

export const getToken = () => localStorage.getItem("token");

export const saveToken = (token) => localStorage.setItem("token", token);

export const clearToken = () => {
  localStorage.removeItem("token"); // Elimina el token del almacenamiento local
};

export const isTokenExpired = (token) => {
  try {
    const decoded = jwtDecode(token);
    return decoded.exp * 1000 < Date.now();
  } catch (error) {
    return true;
  }
};

// Obtener usuario actual desde el token
export const getCurrentUser = () => {
  try {
    const token = getToken();
    if (!token) return null;

    const decoded = jwtDecode(token);
    // Solo decodifica, NO valida
    return decoded;
  } catch (error) {
    console.error("❌ Error al obtener el usuario:", error);
    return null;
  }
};
