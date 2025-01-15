import React, { useState } from "react";
import { registerUser } from "../services/api";
import { FiX } from "react-icons/fi";

const RegisterModal = ({ isOpen, onClose }) => {
  const initialFormData = {
    name: "",
    username: "",
    password: "",
    role: "STUDENT",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // 👉 Función para limpiar el formulario
  const resetForm = () => {
    setFormData(initialFormData);
    setError("");
    setSuccess("");
  };

  // 🚪 Cerrar el modal y limpiar datos
  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(formData);
      setSuccess("✅ Usuario registrado exitosamente.");
      setError("");
      setTimeout(() => {
        handleClose();
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.error || "❌ Error al registrar.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
      <div className="bg-gray-800 p-8 rounded-3xl shadow-2xl w-96">
        {/* Encabezado del Modal */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Registrar Usuario</h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-white bg-gray-700 p-2 rounded-full transition-transform transform hover:scale-110"
          >
            <FiX size={20} />
          </button>
        </div>

        {/* Mensajes de error y éxito */}
        {error && <p className="text-red-500 mb-3">{error}</p>}
        {success && <p className="text-green-500 mb-3">{success}</p>}

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Campo Nombre */}
          <input
            type="text"
            name="name"
            placeholder="Nombre completo"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Campo Usuario */}
          <input
            type="text"
            name="username"
            placeholder="Usuario"
            value={formData.username}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Campo Contraseña */}
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Selección de Rol */}
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-full text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="STUDENT">Estudiante</option>
            <option value="MODERATOR">Moderador</option>
          </select>

          {/* Botón de Registrar */}
          <button
            type="submit"
            className="w-full py-3 text-lg font-semibold rounded-full bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white shadow-md transition-transform transform hover:scale-105"
          >
            Registrar
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterModal;
