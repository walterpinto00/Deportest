const redis = require('redis');

let isConnected = false;
const memoryStore = new Map();

const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';
const redisClient = redis.createClient({
  url: redisUrl,
  socket: {
    reconnectStrategy: false // No reintentar en bucle infinito si no existe el servicio local
  }
});

redisClient.on('error', (err) => {
  if (isConnected) {
    console.warn('⚠️ Error de conexión en Redis:', err.message);
  }
});

redisClient.on('connect', () => {
  isConnected = true;
  console.log('✅ Redis conectado correctamente');
});

// Intentar conexión inicial sin colgar el servidor
(async () => {
  try {
    await redisClient.connect();
    isConnected = true;
  } catch (err) {
    isConnected = false;
    console.log('ℹ️ Servidor Redis no detectado en local. Utilizando almacén de sesiones seguro en memoria (modo desarrollo).');
  }
})();

// Wrapper compatible con la interfaz de Redis
const clientWrapper = {
  async setEx(key, seconds, value) {
    if (isConnected) {
      try {
        return await redisClient.setEx(key, seconds, value);
      } catch (e) {}
    }
    memoryStore.set(key, value);
    setTimeout(() => memoryStore.delete(key), seconds * 1000);
  },
  async get(key) {
    if (isConnected) {
      try {
        return await redisClient.get(key);
      } catch (e) {}
    }
    return memoryStore.get(key) || null;
  },
  async del(key) {
    if (isConnected) {
      try {
        return await redisClient.del(key);
      } catch (e) {}
    }
    memoryStore.delete(key);
  },
  async keys(pattern) {
    if (isConnected) {
      try {
        return await redisClient.keys(pattern);
      } catch (e) {}
    }
    const regex = new RegExp('^' + pattern.replace(/\*/g, '.*') + '$');
    return Array.from(memoryStore.keys()).filter((k) => regex.test(k));
  },
  async quit() {
    if (isConnected) {
      try {
        await redisClient.quit();
      } catch (e) {}
    }
  }
};

module.exports = clientWrapper;
