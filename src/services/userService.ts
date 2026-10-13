// ─────────────────────────────────────────────────────────────
// userService.ts — Gestión Persistente de Usuarios & Aprendices
// Almacena en localStorage para que todo el sistema funcione conectado
// ─────────────────────────────────────────────────────────────

export interface Usuario {
  id: string;
  email: string;
  rol: "APRENDIZ" | "ENTRENADOR" | "ADMINISTRADOR" | "BIENESTAR";
  tipoDoc: string;
  numDoc: string;
  nombres: string;
  apellidos: string;
  genero: string;
  fechaNacimiento: string; // "YYYY-MM-DD"
  avatarUrl: string;
  fechaRegistro: string; // "DD/MM/YYYY"
  grado?: string;
  peso?: string;
  talla?: string;
}

const STORAGE_KEY = "deportest_usuarios_v1";
const EVENT_NAME = "deportest_usuarios_updated";

// Usuarios iniciales precargados (SENA y Colegio)
const USUARIOS_INICIALES: Usuario[] = [
  {
    id: "usr-1",
    email: "jcamilo.rodriguez@sena.edu.co",
    rol: "APRENDIZ",
    tipoDoc: "Cédula de Ciudadanía (CC)",
    numDoc: "1001234567",
    nombres: "Juan Camilo",
    apellidos: "Rodríguez",
    genero: "Masculino",
    fechaNacimiento: "2010-03-12",
    avatarUrl: "https://api.dicebear.com/9.x/notionists/svg?seed=juancamilo&backgroundColor=b6e3f4",
    fechaRegistro: "13/10/2026",
    grado: "10° B",
    peso: "64.5",
    talla: "1.74"
  },
  {
    id: "usr-2",
    email: "valentina.morales@sena.edu.co",
    rol: "APRENDIZ",
    tipoDoc: "Tarjeta de Identidad (TI)",
    numDoc: "1002345678",
    nombres: "Valentina",
    apellidos: "Morales Peña",
    genero: "Femenino",
    fechaNacimiento: "2009-08-22",
    avatarUrl: "https://api.dicebear.com/9.x/lorelei/svg?seed=valentina&backgroundColor=ffd6e0",
    fechaRegistro: "12/10/2026",
    grado: "11° A",
    peso: "55.0",
    talla: "1.65"
  },
  {
    id: "usr-3",
    email: "andres.gomez@sena.edu.co",
    rol: "APRENDIZ",
    tipoDoc: "Tarjeta de Identidad (TI)",
    numDoc: "1003456789",
    nombres: "Andrés Felipe",
    apellidos: "Gómez",
    genero: "Masculino",
    fechaNacimiento: "2011-01-18",
    avatarUrl: "https://api.dicebear.com/9.x/miniavs/svg?seed=andres&backgroundColor=ffdfbf",
    fechaRegistro: "10/10/2026",
    grado: "9° C",
    peso: "68.2",
    talla: "1.68"
  },
  {
    id: "usr-4",
    email: "walter.pinto@sena.edu.co",
    rol: "ENTRENADOR",
    tipoDoc: "Cédula de Ciudadanía (CC)",
    numDoc: "79841230",
    nombres: "Walter",
    apellidos: "Pinto",
    genero: "Masculino",
    fechaNacimiento: "1988-06-15",
    avatarUrl: "https://api.dicebear.com/9.x/dylan/svg?seed=walterpinto&backgroundColor=d1f4e0",
    fechaRegistro: "01/02/2026",
    grado: "Instructor SENA Titular"
  },
  {
    id: "usr-5",
    email: "maria.caicedo@sena.edu.co",
    rol: "BIENESTAR",
    tipoDoc: "Cédula de Ciudadanía (CC)",
    numDoc: "52147896",
    nombres: "María Elena",
    apellidos: "Caicedo",
    genero: "Femenino",
    fechaNacimiento: "1992-11-04",
    avatarUrl: "https://api.dicebear.com/9.x/avataaars-neutral/svg?seed=mariacaicedo&backgroundColor=c0aede",
    fechaRegistro: "15/05/2026",
    grado: "Coordinadora Bienestar"
  }
];

export const userService = {
  // Obtener lista completa de usuarios
  getUsuarios(): Usuario[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error("Error al leer usuarios de localStorage:", e);
    }
    // Guardar iniciales si no hay nada
    localStorage.setItem(STORAGE_KEY, JSON.stringify(USUARIOS_INICIALES));
    return USUARIOS_INICIALES;
  },

  // Guardar un nuevo usuario
  guardarUsuario(nuevo: Omit<Usuario, "id" | "fechaRegistro">): Usuario {
    const usuarios = this.getUsuarios();
    
    // Formatear fecha actual DD/MM/AAAA
    const hoy = new Date();
    const dia = String(hoy.getDate()).padStart(2, "0");
    const mes = String(hoy.getMonth() + 1).padStart(2, "0");
    const anio = hoy.getFullYear();
    const fechaRegistro = `${dia}/${mes}/${anio}`;

    const usuarioCreado: Usuario = {
      ...nuevo,
      id: "usr-" + Date.now(),
      fechaRegistro,
      peso: nuevo.peso || "60.0",
      talla: nuevo.talla || "1.70",
      grado: nuevo.grado || (nuevo.rol === "APRENDIZ" ? "10° A" : undefined)
    };

    const nuevaLista = [usuarioCreado, ...usuarios];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nuevaLista));

    // Notificar a toda la aplicación
    window.dispatchEvent(new Event(EVENT_NAME));

    return usuarioCreado;
  },

  // Eliminar usuario por ID
  eliminarUsuario(id: string): boolean {
    const usuarios = this.getUsuarios();
    const filtrados = usuarios.filter((u) => u.id !== id);
    if (filtrados.length !== usuarios.length) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(filtrados));
      window.dispatchEvent(new Event(EVENT_NAME));
      return true;
    }
    return false;
  },

  // Actualizar peso y talla del aprendiz
  actualizarMedidas(id: string, peso: string, talla: string): void {
    const usuarios = this.getUsuarios();
    const idx = usuarios.findIndex((u) => u.id === id);
    if (idx !== -1) {
      usuarios[idx].peso = peso;
      usuarios[idx].talla = talla;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(usuarios));
      window.dispatchEvent(new Event(EVENT_NAME));
    }
  },

  // Suscribirse a cambios en tiempo real
  subscribe(callback: () => void): () => void {
    const handler = () => callback();
    window.addEventListener(EVENT_NAME, handler);
    return () => window.removeEventListener(EVENT_NAME, handler);
  },

  // Calcular edad a partir de fecha de nacimiento YYYY-MM-DD
  calcularEdad(fechaNacimiento: string): number | null {
    if (!fechaNacimiento) return null;
    const nac = new Date(fechaNacimiento);
    if (isNaN(nac.getTime())) return null;
    const hoy = new Date();
    let edad = hoy.getFullYear() - nac.getFullYear();
    const m = hoy.getMonth() - nac.getMonth();
    if (m < 0 || (m === 0 && hoy.getDate() < nac.getDate())) {
      edad--;
    }
    return edad >= 0 ? edad : null;
  }
};
