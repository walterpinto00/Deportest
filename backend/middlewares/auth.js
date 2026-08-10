const tokenService = require('../services/tokenService');

/**
 * Middleware de autenticación JWT
 * Verifica el Bearer token en el header Authorization
 */
const authMiddleware = (req, res, next) => {
  // 1. Obtener token del header Authorization
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Token no proporcionado' });
  }

  const token = authHeader.split(' ')[1];

  // 2. Verificar token
  const decoded = tokenService.verifyAccessToken(token);
  if (!decoded) {
    return res.status(401).json({ error: 'Token inválido o expirado' });
  }

  // 3. Adjuntar datos del usuario al request
  req.user = {
    userId: decoded.userId,
    role: decoded.role
  };

  next();
};

module.exports = authMiddleware;
