import React, { useState } from "react";
import VideoPlayer from "../components/VideoPlayer";
import Chat from "../components/Chat";
import RegisterModal from "../components/RegisterModal";

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal de registro
  const [showChat, setShowChat] = useState(false); // Modal de chat en móvil

  return (
    <div className="flex flex-col h-screen text-gray-100 bg-gray-900">
      {/* Encabezado */}
      <header className="p-4 border-b border-gray-800 bg-gray-900 flex items-center justify-between">
        <h1 className="text-xl font-bold tracking-wide">Virtual Conference</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md"
        >
          Crear Usuario
        </button>
      </header>

      {/* Contenido principal */}
      <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
        {/* Sección de video */}
        <div className="md:flex-1 p-4 overflow-y-auto">
          <h2 className="text-lg font-semibold mb-3">Sala de Conferencia</h2>
          <VideoPlayer />

          {/* Botón flotante de Chat solo en pantallas pequeñas */}
          <button
            onClick={() => setShowChat(true)}
            className="md:hidden fixed bottom-16 right-4 bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white p-4 rounded-full shadow-xl z-50 transform hover:scale-110 transition-transform duration-300"
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
