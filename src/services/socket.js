import { io } from "socket.io-client";
import { getToken } from "../utils/auth";

let socket = null;

// Conectar el socket con reconexión automática
export const connectSocket = () => {
  const token = getToken();

  if (!token) {
    console.error("🔒 No se encontró el token. Inicia sesión.");
    return;
  }

  if (!socket) {
    socket = io("http://localhost:4000", {
      auth: { token },
      transports: ["websocket"],
      reconnection: true,               // Habilita reconexión automática
      reconnectionAttempts: Infinity,   // Intenta reconectar indefinidamente
      reconnectionDelay: 1000,         // 1 segundo entre intentos
      reconnectionDelayMax: 5000,      // Máximo 5 segundos de espera
      timeout: 20000,                  // Timeout de conexión
    });

    // ✅ Conexión exitosa
    socket.on("connect", () => {
      console.log("✅ Conectado al socket:", socket.id);
    });

    // ❌ Error de conexión
    socket.on("connect_error", (err) => {
      console.error("❌ Error de conexión:", err.message);
      alert(`⚠️ Error de conexión: ${err.message}`);
    });

    // 🔄 Intentando reconectar
    socket.on("reconnect_attempt", (attempt) => {
      console.warn(`🔄 Intentando reconectar... (Intento ${attempt})`);
    });

    // ❗ Fallo en la reconexión
    socket.on("reconnect_failed", () => {
      console.error("❗ No se pudo reconectar al servidor.");
      alert("❗ No se pudo reconectar. Intenta recargar la página.");
    });

    // 🔌 Desconexión
    socket.on("disconnect", (reason) => {
      console.warn(`🔌 Desconectado: ${reason}`);
    });
  }
};

export const getSocket = () => socket;
