/**
 * Middleware de control de roles (RBAC)
 * Protege rutas según el rol del usuario autenticado
 */
const roleGuard = (allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: 'No autenticado' });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ 
        error: `Acceso denegado. Se requiere uno de estos roles: ${allowedRoles.join(', ')}` 
      });
    }

    next();
  };
};

// Middlewares específicos para cada rol del sistema DEPORTEST
const isAdmin        = roleGuard(['administrador']);
const isEntrenador   = roleGuard(['administrador', 'entrenador']);
const isBienestar    = roleGuard(['administrador', 'bienestar']);
const isAprendiz     = roleGuard(['administrador', 'entrenador', 'aprendiz']);

module.exports = {
  roleGuard,
  isAdmin,
  isEntrenador,
  isBienestar,
  isAprendiz
};
