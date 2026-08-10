const bcrypt = require('bcryptjs');
const tokenService = require('../services/tokenService');
const redisClient = require('../config/redis');

/**
 * Base de datos simulada de usuarios DEPORTEST
 * En producción reemplazar por consultas a PostgreSQL/MySQL
 */
const USERS_DB = [
  {
    id: 1,
    email: 'admin@deportest.sena.edu.co',
    password: '$2a$10$H7zPZqX5YwZ6xV9uY2zX8O5nZ5kF3jH7sK2lM9nBvCxW2qRtY3uE', // Admin123
    role: 'administrador',
    name: 'Admin SENA'
  },
  {
    id: 2,
    email: 'instructor@deportest.sena.edu.co',
    password: '$2a$10$H7zPZqX5YwZ6xV9uY2zX8O5nZ5kF3jH7sK2lM9nBvCxW2qRtY3uE',
    role: 'instructor',
    name: 'Carlos Instructor'
  },
  {
    id: 3,
    email: 'aprendiz@deportest.sena.edu.co',
    password: '$2a$10$H7zPZqX5YwZ6xV9uY2zX8O5nZ5kF3jH7sK2lM9nBvCxW2qRtY3uE',
    role: 'aprendiz',
    name: 'Juan Aprendiz'
  },
  {
    id: 4,
    email: 'bienestar@deportest.sena.edu.co',
    password: '$2a$10$H7zPZqX5YwZ6xV9uY2zX8O5nZ5kF3jH7sK2lM9nBvCxW2qRtY3uE',
    role: 'bienestar',
    name: 'Maria Bienestar'
  }
];

class AuthController {
  // POST /api/auth/login
  async login(req, res) {
    try {
      const { email, password } = req.body;

      // Validar que lleguen los campos
      if (!email || !password) {
        return res.status(400).json({ error: 'Email y contraseña son requeridos' });
      }

      // Buscar usuario
      const user = USERS_DB.find(u => u.email === email);
      if (!user) {
        return res.status(401).json({ error: 'Credenciales inválidas' });
      }

      // Verificar contraseña con bcrypt
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return res.status(401).json({ error: 'Credenciales inválidas' });
      }

      // Generar tokens
      const accessToken = tokenService.generateAccessToken(user.id, user.role);
      const refreshToken = await tokenService.generateRefreshToken(
        user.id,
        user.role,
        req.headers['user-agent'] || 'unknown'
      );

      // Refresh token en cookie HTTP-only (no accesible desde JS)
      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 días
      });

      res.json({
        accessToken,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role
        }
      });

    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }

  // POST /api/auth/refresh-token
  async refreshToken(req, res) {
    try {
      const refreshToken = req.cookies.refreshToken;
      if (!refreshToken) {
        return res.status(401).json({ error: 'No hay refresh token' });
      }

      const tokenData = await tokenService.getRefreshTokenData(refreshToken);
      if (!tokenData) {
        return res.status(401).json({ error: 'Refresh token inválido o expirado' });
      }

      const newAccessToken = tokenService.generateAccessToken(
        tokenData.userId,
        tokenData.role
      );

      res.json({ accessToken: newAccessToken });

    } catch (error) {
      console.error('Refresh error:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }

  // POST /api/auth/logout
  async logout(req, res) {
    try {
      const refreshToken = req.cookies.refreshToken;
      if (refreshToken) {
        await tokenService.revokeRefreshToken(refreshToken);
      }

      res.clearCookie('refreshToken');
      res.json({ message: 'Sesión cerrada exitosamente' });

    } catch (error) {
      console.error('Logout error:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }

  // POST /api/auth/admin/change-role  (solo administradores)
  async changeUserRole(req, res) {
    try {
      const { userId, newRole } = req.body;
      
      const allowedRoles = ['administrador', 'instructor', 'aprendiz', 'bienestar'];
      if (!allowedRoles.includes(newRole)) {
        return res.status(400).json({ error: 'Rol no válido para el sistema DEPORTEST' });
      }

      const user = USERS_DB.find(u => u.id === userId);
      if (!user) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }

      user.role = newRole;

      // Invalidar todos los tokens activos del usuario por seguridad
      await tokenService.revokeAllUserTokens(userId);

      res.json({ 
        message: `Rol actualizado a ${newRole} para ${user.name}`,
        user: { id: user.id, name: user.name, role: user.role }
      });

    } catch (error) {
      console.error('Change role error:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }
}

module.exports = new AuthController();
