# Backend – Sistema de Seguridad Deportest

Servidor Express con autenticación JWT + Redis para el sistema DEPORTEST SENA.

## Estructura
```
backend/
├── server.js              ← Punto de entrada
├── config/
│   └── redis.js           ← Conexión a Redis
├── controllers/
│   └── authController.js  ← Login, logout, refresh, cambio de rol
├── middlewares/
│   ├── auth.js            ← Verificación de token JWT
│   └── roleGuard.js       ← Control de acceso por rol (RBAC)
├── routes/
│   └── authRoutes.js      ← Rutas /api/auth/*
└── services/
    └── tokenService.js    ← Generación y revocación de tokens
```

## Roles del sistema
| Rol           | Permisos                                        |
|---------------|------------------------------------------------|
| administrador | Acceso total + gestión de usuarios y roles      |
| instructor    | Registrar pruebas, ver y editar fichas          |
| aprendiz      | Ver su propio historial y resultados            |
| bienestar     | Ver reportes generales de salud                 |

## Endpoints principales
```
POST /api/auth/login           → Iniciar sesión
POST /api/auth/logout          → Cerrar sesión
POST /api/auth/refresh-token   → Renovar access token
GET  /api/auth/me              → Ver perfil (autenticado)
GET  /api/auth/fichas          → Ver fichas (instructor/admin)
POST /api/auth/pruebas         → Registrar prueba (instructor)
GET  /api/auth/mi-historial    → Historial propio (aprendiz)
POST /api/auth/admin/change-role → Cambiar rol (solo admin)
```

## Instalación
```bash
cd backend
cp .env.example .env
npm install express jsonwebtoken bcryptjs redis cookie-parser dotenv uuid
node server.js
```
