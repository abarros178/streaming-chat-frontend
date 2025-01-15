import React, { useState } from "react";
import VideoPlayer from "../components/VideoPlayer";
import Chat from "../components/Chat";
import RegisterModal from "../components/RegisterModal";
import { clearToken } from "../utils/auth";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal de registro
  const [showChat, setShowChat] = useState(false); // Modal de chat en móvil
  const navigate = useNavigate();

  // Función para cerrar sesión
  const handleLogout = () => {
    clearToken(); // 1️⃣ Eliminar el token
    navigate("/"); // 2️⃣ Redirigir al inicio
  };

  return (
    <div className="flex flex-col h-screen text-gray-100 bg-gray-900">
      {/* Encabezado */}
      <header className="p-4 border-b border-gray-800 bg-gray-900 flex items-center justify-between">
        {/* Título alineado a la izquierda */}
        <h1 className="text-xl font-bold tracking-wide">
          Universidad del saber
        </h1>

        {/* Contenedor para los botones alineados a la derecha */}
        <div className="flex space-x-3">
          {/* Botón de Crear Usuario */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-5 py-2 bg-white hover:bg-gray-200 text-black rounded-full shadow-md transition-transform transform hover:scale-105"
          >
            Crear Usuario
          </button>

          {/* Botón de Logout */}
          <button
            onClick={handleLogout}
            className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white rounded-full shadow-md transition-transform transform hover:scale-105"
          >
            Cerrar Sesión
          </button>
        </div>
      </header>

      {/* Contenido principal */}
      <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
        {/* Sección de video */}
        <div className="md:flex-1 p-4 overflow-y-auto">
          <h2 className="text-lg font-semibold mb-3">Clase de desarollo</h2>
          <VideoPlayer />

          {/* Botón flotante de Chat solo en pantallas pequeñas */}
          <button
            onClick={() => setShowChat(true)}
            className="md:hidden fixed bottom-16 right-4 bg-[#2E4156] hover:bg-[#3a536d] text-white p-4 rounded-full shadow-xl z-50 transform hover:scale-110 transition-transform duration-300"
          >
            💬
          </button>

          {/* Chat en un modal solo en pantallas pequeñas */}
          {showChat && (
            <div className="md:hidden fixed inset-0 bg-black bg-opacity-80 z-50 flex flex-col">
              {/* Encabezado del modal */}
              <div className="p-4 bg-gray-800 flex justify-between items-center">
                <h2 className="text-lg font-semibold text-white">Chat</h2>
                <button
                  onClick={() => setShowChat(false)}
                  className="text-white text-xl"
                >
                  ✖️
                </button>
              </div>

              {/* Contenido del Chat */}
              <div className="flex-1 overflow-y-auto">
                <Chat />
              </div>
            </div>
          )}
        </div>

        {/* Sección de chat visible en pantallas md+ */}
        <div className="hidden md:block w-[400px] bg-gray-850 p-4 border-l border-gray-800">
          <Chat />
        </div>
      </div>

      {/* Modal de Registro */}
      <RegisterModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default Home;
