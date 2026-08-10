const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/auth');
const { isAdmin, isInstructor, isAprendiz } = require('../middlewares/roleGuard');

// ── Rutas públicas (sin autenticación) ──────────────────────
router.post('/login',         authController.login);
router.post('/refresh-token', authController.refreshToken);
router.post('/logout',        authController.logout);

// ── Rutas protegidas ─────────────────────────────────────────

// Cualquier usuario autenticado puede ver su perfil
router.get('/me', authMiddleware, (req, res) => {
  res.json({ user: req.user });
});

// Ver fichas antropométricas (instructor y admin)
router.get('/fichas', authMiddleware, isInstructor, (req, res) => {
  res.json({ message: `Fichas disponibles para ${req.user.role}` });
});

// Registrar resultados de pruebas (instructor)
router.post('/pruebas', authMiddleware, isInstructor, (req, res) => {
  res.json({ message: 'Prueba registrada', user: req.user });
});

// Ver propio historial (aprendiz)
router.get('/mi-historial', authMiddleware, isAprendiz, (req, res) => {
  res.json({ message: `Historial del aprendiz ${req.user.userId}` });
});

// Cambiar rol de un usuario (solo admin)
router.post('/admin/change-role', authMiddleware, isAdmin, authController.changeUserRole);

module.exports = router;
