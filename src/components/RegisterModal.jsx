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
    onClose(); // Llama a la función de cierre original
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
      const response = await registerUser(formData);
      setSuccess("✅ Usuario registrado exitosamente.");
      setError("");
      setTimeout(() => {
        handleClose();  // Cierra el modal y limpia el formulario
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.error || "❌ Error al registrar.");
    }
  };

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-96">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-white">Registrar Usuario</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            <FiX size={24} />
          </button>
        </div>

        {error && <p className="text-red-500 mb-2">{error}</p>}
        {success && <p className="text-green-500 mb-2">{success}</p>}

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            name="name"
            placeholder="Nombre completo"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-700 rounded-md bg-gray-700 text-white placeholder-gray-400"
          />
          <input
            type="text"
            name="username"
            placeholder="Usuario"
            value={formData.username}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-700 rounded-md bg-gray-700 text-white placeholder-gray-400"
          />
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-700 rounded-md bg-gray-700 text-white placeholder-gray-400"
          />
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full p-2 border border-gray-700 rounded-md bg-gray-700 text-white"
          >
            <option value="STUDENT">Estudiante</option>
            <option value="MODERATOR">Moderador</option>
          </select>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition duration-300"
          >
            Registrar
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterModal;
