import React, { useState } from "react";
import {
  FiMic,
  FiMicOff,
  FiVideo,
  FiVideoOff,
  FiPhoneOff,
  FiShare2,
  FiSmile,
} from "react-icons/fi";

const CallControls = () => {
  const [isMicOn, setIsMicOn] = useState(true);
  const [isCamOn, setIsCamOn] = useState(true);

  const toggleMic = () => setIsMicOn(!isMicOn);
  const toggleCam = () => setIsCamOn(!isCamOn);

  return (
    <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-50 bg-gray-800 bg-opacity-80 px-4 py-2 rounded-full flex space-x-2 shadow-lg md:space-x-4 md:px-6 md:py-3">
      {/* Micrófono */}
      <button
        onClick={toggleMic}
        className={`p-2 md:p-3 rounded-full ${
          isMicOn
            ? "bg-green-600 hover:bg-green-700"
            : "bg-red-600 hover:bg-red-700"
        } text-white transition`}
      >
        {isMicOn ? <FiMic size={16} /> : <FiMicOff size={16} />}
      </button>

      {/* Cámara */}
      <button
        onClick={toggleCam}
        className={`p-2 md:p-3 rounded-full ${
          isCamOn
            ? "bg-green-600 hover:bg-green-700"
            : "bg-red-600 hover:bg-red-700"
        } text-white transition`}
      >
        {isCamOn ? <FiVideo size={16} /> : <FiVideoOff size={16} />}
      </button>

      {/* Compartir pantalla - Solo en escritorio */}
      <button
        onClick={() => alert("Compartir pantalla")}
        className="hidden md:flex p-3 bg-gray-700 hover:bg-gray-600 rounded-full text-white transition"
      >
        <FiShare2 size={20} />
      </button>

      {/* Reacciones - Solo en escritorio */}
      <button
        onClick={() => alert("Reacciones")}
        className="hidden md:flex p-3 bg-gray-700 hover:bg-gray-600 rounded-full text-white transition"
      >
        <FiSmile size={20} />
      </button>

      {/* Salir de la llamada */}
      <button
        onClick={() => alert("Has salido de la llamada")}
        className="p-2 md:p-3 bg-red-600 hover:bg-red-700 rounded-full text-white transition"
      >
        <FiPhoneOff size={16} />
      </button>
    </div>
  );
};

export default CallControls;
