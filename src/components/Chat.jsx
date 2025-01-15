import React, { useState, useEffect, useRef,useCallback } from "react";
import { fetchMessages } from "../services/api";
import { getToken, getCurrentUser, clearToken } from "../utils/auth";
import { FiSend } from "react-icons/fi";
import { BsEmojiSmile, BsShieldLockFill, BsCircleFill } from "react-icons/bs";
import { useSocket } from "../hooks/useSocket"; // Importar el hook personalizado
import { useNavigate } from "react-router-dom";

const Chat = () => {
  const [activeTab, setActiveTab] = useState("chat");
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [typingUser, setTypingUser] = useState("");
  const [error, setError] = useState("");
  const [participants, setParticipants] = useState([]);
  const messagesEndRef = useRef(null);
  const typingTimeoutRef = useRef(null);

  const currentUser = getCurrentUser();
  const socket = useSocket(); // Usar el hook de socket
  const navigate = useNavigate();

   const handleSessionExpired = useCallback(() => {
    alert("⏳ Tu sesión ha expirado. Por favor, inicia sesión de nuevo.");
    clearToken();
    navigate("/");
  }, [navigate]);

  useEffect(() => {
    const loadMessages = async () => {
      const token = getToken();
      if (token) {
        const { data } = await fetchMessages(token);
        setMessages(data);
      }
    };
  
    loadMessages();
  
    if (socket) {

      socket.emit("chat:requestParticipants");
      //  Recibir la lista actualizada de participantes
      socket.on("chat:updateParticipants", (participants) => {
        console.log("📋 Participantes actualizados:", participants);
        setParticipants(participants);
      });
  
      //  Escuchar mensajes nuevos
      socket.on("chat:message", (newMessage) => {
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      });
  
      socket.on("chat:userTyping", ({ user }) => {
        if (user !== currentUser?.name) {
          setTypingUser(user);
        }
      });
  
      socket.on("chat:userStopTyping", () => {
        setTypingUser("");
      });
  
      //  Escuchar errores
      socket.on("chat:error", (err) => {
        console.error("❌ Error recibido:", err.error);
        if (err.error.includes("expirado") || err.error.includes("inicia sesión")) {
          handleSessionExpired();
        } else {
          setError(err.error);
          setTimeout(() => setError(""), 3000);
        }
      });
    }
  
    return () => {
      socket?.off("chat:message");
      socket?.off("chat:userTyping");
      socket?.off("chat:userStopTyping");
      socket?.off("chat:updateParticipants");
      socket?.off("chat:error");
    };
  }, [socket, currentUser?.name, handleSessionExpired]);
  

  useEffect(() => {
    if (activeTab === "chat") {
      scrollToBottom();
    }
  }, [activeTab, messages]);

  // Scroll automático al último mensaje
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (message.trim() && socket) {
      socket.emit("chat:message", { content: message });
      setMessage("");
    }
  };

  const renderParticipants = () => (
    <div className="space-y-3">
      {participants.map((user) => {
        const isOnline = participants.some((u) => u.id === user.id);
        return (
          <div
            key={user.id}
            className="flex items-center justify-between bg-gray-800 p-2 rounded-lg shadow-md"
          >
            <div className="flex items-center space-x-2">
              {user.role === "MODERATOR" && (
                <BsShieldLockFill className="text-yellow-400" size={16} />
              )}
              <span className="font-medium text-white">{user.name}</span>
            </div>
            <BsCircleFill
              className={`text-${isOnline ? "green" : "gray"}-500`}
              size={10}
              title={isOnline ? "En línea" : "Desconectado"}
            />
          </div>
        );
      })}
    </div>
  );

  const handleTyping = () => {
    if (socket) {
      socket.emit("chat:typing");

      clearTimeout(typingTimeoutRef.current);
      typingTimeoutRef.current = setTimeout(() => {
        socket.emit("chat:stopTyping");
      }, 2000);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const formatDate = (date, isCurrentUser) => {
    const msgDate = new Date(date);
    const today = new Date();

    const isToday = msgDate.toDateString() === today.toDateString();

    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);
    const isYesterday = msgDate.toDateString() === yesterday.toDateString();

    const optionsTime = { hour: "2-digit", minute: "2-digit" };
    const optionsFullDate = {
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    };

    let formattedDate = "";

    if (isToday) {
      formattedDate = msgDate.toLocaleTimeString("es-ES", optionsTime); // Solo hora
    } else if (isYesterday) {
      formattedDate = `Ayer a las ${msgDate.toLocaleTimeString(
        "es-ES",
        optionsTime
      )}`;
    } else {
      formattedDate = msgDate.toLocaleString("es-ES", optionsFullDate); // Fecha completa
    }

    return isCurrentUser ? `Tú · ${formattedDate}` : formattedDate;
  };

  return (
    <div className="flex flex-col h-full bg-gray-900 rounded-lg overflow-hidden">
      {/* ⚠️ Mostrar mensaje de error */}
      {error && (
        <div className="bg-red-600 text-white text-center p-2 font-semibold">
          {error}
        </div>
      )}
      {/* Encabezado */}
      <div className="flex items-center justify-between bg-gray-800 p-3 rounded-t-lg">
        <div className="flex space-x-2">
          <button
            onClick={() => setActiveTab("chat")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
              activeTab === "chat"
                ? "bg-black text-white"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
          >
            Chat
          </button>
          <button
            onClick={() => setActiveTab("participants")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
              activeTab === "participants"
                ? "bg-black text-white"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
          >
            Participantes
          </button>
        </div>
      </div>

      {/* Contenido del Chat */}
      <div className="flex-grow overflow-y-auto p-4 bg-gray-800 space-y-3">
        {activeTab === "chat" ? (
          <div className="flex flex-col space-y-4">
            {messages.map((msg) => {
              const isCurrentUser = msg.userId === currentUser?.id;
              const isModerator = msg.user?.role === "MODERATOR";

              return (
                <div
                  key={msg.id}
                  className={`flex ${
                    isCurrentUser ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={` break-words 
                      max-w-[90%] sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl
                      p-3 rounded-2xl shadow-lg  ${
                        isModerator
                          ? "bg-[#CCD0CF] text-black border-l-4 border-gray-500"
                          : isCurrentUser
                          ? "bg-[#7DA0CA] text-white rounded-br-none"
                          : "bg-gray-600 text-gray-100 rounded-bl-none"
                      }`}
                  >
                    <div className="flex items-center text-xs text-black mb-1">
                      {!isCurrentUser && msg.user?.name && (
                        <span className="mr-2 font-semibold flex items-center">
                          {msg.user.name}
                          {isModerator && (
                            <span className="ml-2 flex items-center bg-gray-500 text-black px-2 py-0.5 rounded-full text-xs font-semibold">
                              <BsShieldLockFill className="mr-1" size={12} />
                              Moderador
                            </span>
                          )}
                        </span>
                      )}
                      <span className="ml-2 text-xs">
                        {formatDate(msg.createdAt, isCurrentUser)}
                      </span>
                    </div>
                    <p className="text-sm break-words break-all whitespace-pre-wrap">
                      {msg.content}
                    </p>
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>
        ) : (
          <div className="text-center text-gray-400">
            {renderParticipants()}
          </div>
        )}
      </div>
      {/* Mostrar el mensaje "X está escribiendo..." */}
      {typingUser && (
        <div className="p-2 text-sm italic text-gray-400">
          ✍️ {typingUser} está escribiendo...
        </div>
      )}
      {/* Barra de entrada de texto */}
      {activeTab === "chat" && (
        <div className="bg-gray-900 p-3 border-t border-gray-800 flex items-center">
          <button className="text-gray-400 hover:text-gray-200 mr-2">
            <BsEmojiSmile size={20} />
          </button>
          <input
            type="text"
            placeholder="Escribe tu mensaje..."
            className="flex-grow px-4 py-2 bg-gray-800 text-white rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleTyping}
          />
          <button
            onClick={handleSendMessage}
            className="ml-2 p-2 bg-[#2E4156] hover:bg-[#3a536d] text-white rounded-full focus:outline-none"
          >
            <FiSend size={18} />
          </button>
        </div>
      )}
    </div>
  );
};

export default Chat;
