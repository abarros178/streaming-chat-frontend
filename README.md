# Virtual Conference - Frontend

## ✨ Descripción del Proyecto
Virtual Conference es una plataforma de videoconferencias con chat en tiempo real y gestión de participantes. Permite a estudiantes y moderadores interactuar mediante mensajes, videollamadas y funcionalidades en tiempo real.

## 🛠️ Tecnologías Utilizadas
- **React**: Biblioteca principal para la construcción de interfaces de usuario.
- **Tailwind CSS**: Framework de diseño para estilizar la aplicación.
- **Socket.io**: Comunicación en tiempo real.
- **React Icons**: Iconografía.
- **Prisma**: ORM para la gestión de la base de datos.
- **Node.js & Express**: Backend para la gestión de sockets y API.

## 📊 Características Principales
- **Autenticación de Usuarios:** Inicio de sesión seguro con JWT.
- **Roles de Usuario:** Diferenciación entre estudiantes y moderadores.
- **Chat en Tiempo Real:** Mensajería instantánea con indicadores de escritura.
- **Lista de Participantes:** Visualización de usuarios conectados/desconectados.
- **Controles de Llamada:** Activar/desactivar micrófono, cámara y finalizar llamada.
- **Diseño Responsivo:** Adaptado para dispositivos móviles y escritorio.

## 📁 Estructura del Proyecto
```
src/
├── components/
│   ├── Chat.jsx           // Chat en tiempo real
│   ├── VideoPlayer.jsx     // Reproductor de videollamadas
│   ├── CallControls.jsx    // Controles de llamada (micrófono, cámara, finalizar)
│   └── RegisterModal.jsx   // Modal para registrar usuarios
│   └── Login.jsx         // Página de inicio de sesión
├── hooks/
│   └── useSocket.js       // Conexión a Socket.io
├── pages/
│   ├── Home.jsx          // Página principal de la conferencia
├── services/
│   ├── api.js            // Peticiones HTTP
│   └── socket.js         // Configuración de socket
├── utils/
│   ├── auth.js          // Gestión de autenticación
└── App.js               // Configuración de rutas principales
```

## 🛠️ Instalación y Ejecución
### 1. **Clonar el repositorio**
```bash
git clone https://github.com/abarros178/streaming-chat-frontend
cd streaming-chat-frontend
```

### 2. **Instalar dependencias**
```bash
npm install
```

### 3. **Configurar variables de entorno**
Crea un archivo `.env` y agrega:
```
REACT_APP_BACKEND_URL=http://localhost:4000
```

### 4. **Ejecutar el proyecto**
```bash
npm start
```
Esto abrirá la aplicación en `http://localhost:3000`.

## 💡 Buenas Prácticas Implementadas
- **Componentes Reutilizables:** Diseño modular y mantenible.
- **Hooks Personalizados:** `useSocket` para manejar sockets.
- **Validaciones de Seguridad:** Manejo de tokens con JWT.
- **Diseño Responsivo:** Adaptado a dispositivos móviles y de escritorio.
- **Control de Errores:** Mensajes claros al usuario.
