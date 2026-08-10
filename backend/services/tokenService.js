const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const redisClient = require('../config/redis');

/**
 * Servicio de gestión de tokens JWT + Refresh tokens en Redis
 */
class TokenService {
  // Generar Access Token (JWT de corta duración)
  generateAccessToken(userId, role) {
    return jwt.sign(
      { userId, role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '15m' }
    );
  }

  // Generar Refresh Token (UUID almacenado en Redis por 7 días)
  async generateRefreshToken(userId, role, deviceInfo = 'unknown') {
    const refreshToken = uuidv4();
    const key = `refresh:${refreshToken}`;
    
    await redisClient.setEx(key, 7 * 24 * 60 * 60, JSON.stringify({
      userId,
      role,
      deviceInfo,
      createdAt: new Date().toISOString()
    }));

    return refreshToken;
  }

  // Verificar Access Token
  verifyAccessToken(token) {
    try {
      return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      return null;
    }
  }

  // Obtener datos del Refresh Token desde Redis
  async getRefreshTokenData(refreshToken) {
    const key = `refresh:${refreshToken}`;
    const data = await redisClient.get(key);
    return data ? JSON.parse(data) : null;
  }

  // Revocar Refresh Token (logout)
  async revokeRefreshToken(refreshToken) {
    const key = `refresh:${refreshToken}`;
    await redisClient.del(key);
  }

  // Revocar TODOS los tokens de un usuario (cambio de rol / seguridad)
  async revokeAllUserTokens(userId) {
    const keys = await redisClient.keys(`refresh:*`);
    for (const key of keys) {
      const data = await redisClient.get(key);
      if (data) {
        const parsed = JSON.parse(data);
        if (parsed.userId === userId) {
          await redisClient.del(key);
        }
      }
    }
  }
}

module.exports = new TokenService();
