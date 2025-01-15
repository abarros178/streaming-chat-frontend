import React from "react";
import ReactPlayer from "react-player/youtube";
import { FiMic, FiMicOff } from "react-icons/fi";
import { getCurrentUser } from "../utils/auth";  // Suponiendo que tienes esta función
import CallControls from "../components/CallControls";


// Extraer ID del video de YouTube
const getVideoId = (url) => {
  const urlObj = new URL(url);
  return urlObj.searchParams.get("v");
};

// Participantes (puedes cargar esto dinámicamente)
const participants = [
  { id: 1, name: "Juan Pérez", isMuted: false, videoUrl: "https://www.youtube.com/watch?v=D0snwVA8Y-s" },
  { id: 2, name: "María López", isMuted: true, videoUrl: "https://www.youtube.com/watch?v=Sxf7UEGUweM" },
  { id: 3, name: "Carlos Ruiz", isMuted: false, videoUrl: "https://www.youtube.com/watch?v=opeP4KUEzSY" },
  { id: 4, name: "Ana Torres", isMuted: true, videoUrl: "https://www.youtube.com/watch?v=ajkv_tjRKz4" },
  { id: 5, name: "Luis Gómez", isMuted: false, videoUrl: "https://www.youtube.com/watch?v=56ImIT_x4Vk" },
  { id: 6, name: "Camilo Rivera", isMuted: false, videoUrl: "https://www.youtube.com/watch?v=jT1V7agy9Hs" },
  { id: 7, name: "Natalia Perez", isMuted: true, videoUrl: "https://www.youtube.com/watch?v=o3EvKwJoXeU" },
  { id: 8, name: "Edenilson Ramirez", isMuted: true, videoUrl: "https://www.youtube.com/watch?v=eZN8qz8jSjI" },

];

const VideoPlayer = () => {
  const currentUser = getCurrentUser();  // Obtenemos el usuario actual

  return (
    <div className="relative h-full bg-gray-900">
      {/* Cuadrícula de videos */}
      <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 h-full">
        {participants.map((user) => {
          const videoId = getVideoId(user.videoUrl);

          return (
            <div
              key={user.id}
              className="relative bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105"
            >
              <ReactPlayer
                url={`${user.videoUrl}?autoplay=1&mute=1&loop=1&playlist=${videoId}&rel=0&modestbranding=1`}
                playing
                loop
                muted
                width="100%"
                height="100%"
                className="object-cover"
              />
              {/* Overlay con nombre y micrófono */}
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 flex items-center justify-between px-3 py-2">
                <span className="text-sm font-semibold text-white">{user.name}</span>
                {user.isMuted ? (
                  <FiMicOff className="text-red-500" size={20} />
                ) : (
                  <FiMic className="text-green-400" size={20} />
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Ventana flotante del usuario actual */}
      <div className="absolute bottom-4 right-4 w-48 h-32 bg-gray-800 rounded-lg overflow-hidden shadow-xl border-2 border-blue-500">
        <ReactPlayer
          url="https://www.youtube.com/watch?v=hXqS95yl4uo"  // Video fijo para el usuario actual
          playing
          muted
          loop
          width="100%"
          height="100%"
          className="object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 px-2 py-1 text-white text-xs text-center">
          {currentUser?.name || "Tú"}
        </div>
      </div>
      <CallControls />

    </div>
  );
};

export default VideoPlayer;
