import React, { useState } from "react";
import { loginUser } from "../services/api";
import { saveToken } from "../utils/auth";
import { useNavigate } from "react-router-dom";
import { connectSocket } from "../services/socket";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await loginUser({ username, password });

      saveToken(data.token); 
      connectSocket();       

      navigate("/home"); 
    } catch {
      alert("Credenciales incorrectas");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-gray-100">
      {/* Tarjeta del Login */}
      <div className="bg-gray-800 p-10 rounded-3xl shadow-2xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6">Bienvenido</h2>
        <p className="text-center text-gray-400 mb-8">
          Inicia sesión para acceder a la conferencia virtual.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Campo Usuario */}
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-400 mb-1">
              Usuario
            </label>
            <input
              id="username"
              type="text"
              placeholder="Ingresa tu usuario"
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-full text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          {/* Campo Contraseña */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-400 mb-1">
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              placeholder="Ingresa tu contraseña"
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-full text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Botón de Ingresar */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 text-lg font-semibold rounded-full shadow-md transition-transform transform hover:scale-105 ${
              loading
                ? "bg-blue-600 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white"
            }`}
          >
            {loading ? "Ingresando..." : "Ingresar"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
