require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const redisClient = require('./config/redis');

const app = express();
const PORT = process.env.PORT || 4000;

// Middlewares globales
app.use(cors({
  origin: true, // Permitir solicitudes desde el frontend (localhost:3000 o cualquier origen local)
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// Rutas
app.use('/api/auth', authRoutes);

// Manejador de errores global
app.use((err, req, res, next) => {
  console.error('Error no capturado:', err);
  res.status(500).json({ error: 'Error interno del servidor' });
});

// Iniciar servidor solo si es ejecutado directamente
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    console.log(`📌 Entorno: ${process.env.NODE_ENV || 'development'}`);
  });
}

// Cierre graceful
process.on('SIGINT', async () => {
  await redisClient.quit();
  process.exit(0);
});

module.exports = app;
