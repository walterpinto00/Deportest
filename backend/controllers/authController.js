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
    password: '$2a$10$5gTWmgHpSR0WVUGsWrObcufdYgrSsq/SIqwujnp0XBUA702ooVYy6', // Admin123
    role: 'administrador',
    name: 'Admin SENA'
  },
  {
    id: 2,
    email: 'entrenador@deportest.sena.edu.co',
    password: '$2a$10$FLNphwWwkpZ.hn5M1ZUpt.RiM/2PMArfYGH.o6TggRvvZF7l8qZya', // Entrenador123
    role: 'entrenador',
    name: 'Carlos Entrenador'
  },
  {
    id: 3,
    email: 'aprendiz@deportest.sena.edu.co',
    password: '$2a$10$nzfShN5EhWyTtfgc9CfagOjJmhqNVVHiVdiQtwMvZ/Zs8h4jbyhpa', // Aprendiz123
    role: 'aprendiz',
    name: 'Juan Aprendiz'
  },
  {
    id: 4,
    email: 'bienestar@deportest.sena.edu.co',
    password: '$2a$10$3N1HQ8.wS5gYZzHa.LfU9u3Qkt/Jpzc3rS53rwJc4RJuhW7d5Okx6', // Bienestar123
    role: 'bienestar',
    name: 'Maria Bienestar'
  },
  {
    id: 5,
    email: 'entrenador@deportest.com',
    password: '$2a$10$A1YZ73clEZt0NYdfcAyAgultgCEcenig.OaUkJVP2gcJYF2YhL8GO', // 123456
    role: 'entrenador',
    name: 'Docente Titular'
  },
  {
    id: 6,
    email: 'aprendiz@deportest.com',
    password: '$2a$10$A1YZ73clEZt0NYdfcAyAgultgCEcenig.OaUkJVP2gcJYF2YhL8GO', // 123456
    role: 'aprendiz',
    name: 'Aprendiz Evaluado'
  }
];

class AuthController {
  // POST /api/auth/register (Cifrado con bcrypt salt rounds >= 10)
  async register(req, res) {
    try {
      const { name, email, password, role = 'aprendiz' } = req.body;

      if (!name || !email || !password) {
        return res.status(400).json({ error: 'Nombre, email y contraseña son obligatorios' });
      }

      if (password.length < 6) {
        return res.status(400).json({ error: 'La contraseña debe tener al menos 6 caracteres' });
      }

      const normalizedEmail = email.trim().toLowerCase();
      if (USERS_DB.some(u => u.email.toLowerCase() === normalizedEmail)) {
        return res.status(409).json({ error: 'El correo electrónico ya se encuentra registrado' });
      }

      // Hash unidireccional con bcrypt (salt rounds >= 10)
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      const validRoles = ['administrador', 'entrenador', 'aprendiz', 'bienestar'];
      const assignedRole = validRoles.includes(role.toLowerCase()) ? role.toLowerCase() : 'aprendiz';

      const newUser = {
        id: USERS_DB.length + 1,
        name: name.trim(),
        email: normalizedEmail,
        password: hashedPassword,
        role: assignedRole
      };

      USERS_DB.push(newUser);

      // Generar tokens JWT
      const accessToken = tokenService.generateAccessToken(newUser.id, newUser.role);
      const refreshToken = await tokenService.generateRefreshToken(
        newUser.id,
        newUser.role,
        req.headers['user-agent'] || 'unknown'
      );

      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000
      });

      res.status(201).json({
        message: 'Usuario registrado con éxito y contraseña cifrada con bcrypt',
        accessToken,
        user: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
          role: newUser.role
        }
      });

    } catch (error) {
      console.error('Register error:', error);
      res.status(500).json({ error: 'Error interno del servidor al registrar' });
    }
  }

  // POST /api/auth/login
  async login(req, res) {
    try {
      const { email, password } = req.body;

      // Validar que lleguen los campos
      if (!email || !password) {
        return res.status(400).json({ error: 'Email y contraseña son requeridos' });
      }

      // Buscar usuario (insensible a mayúsculas y espacios)
      const user = USERS_DB.find(u => u.email.toLowerCase() === email.trim().toLowerCase());
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
      
      const allowedRoles = ['administrador', 'entrenador', 'aprendiz', 'bienestar'];
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
