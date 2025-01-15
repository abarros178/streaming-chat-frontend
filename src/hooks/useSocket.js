// src/hooks/useSocket.js
import { useEffect } from "react";
import { io } from "socket.io-client";
import { getToken, clearToken } from "../utils/auth";
import { useNavigate } from "react-router-dom";

let socket = null;

export const useSocket = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = getToken();

    if (!token) {
      console.error("🔒 No se encontró el token. Inicia sesión.");
      clearToken();
      navigate("/");
      return;
    }

    if (!socket) {
      socket = io("http://localhost:4000", {
        auth: { token },
        transports: ["websocket"],
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
        timeout: 20000,
      });

      socket.on("connect", () => {
        console.log("✅ Conectado al socket:", socket.id);
      });

      socket.on("connect_error", (err) => {
        console.error("❌ Error de conexión:", err.message);

        if (err.message.includes("Acceso denegado") || err.message.includes("Token inválido")) {
          alert("🚫 Tu sesión ha expirado. Por favor, inicia sesión de nuevo.");
          clearToken();
          navigate("/");
        } else {
          alert(`⚠️ Error de conexión: ${err.message}`);
        }
      });
      socket.on("disconnect", (reason) => {
        console.warn(`🔌 Desconectado: ${reason}`);
      });
    }

    return () => {
      if (socket) {
        socket.disconnect();
        socket = null;
      }
    };
  }, [navigate]);

  return socket;
};
