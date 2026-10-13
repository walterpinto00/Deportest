// ─────────────────────────────────────────────────────────────
// userService.ts — Gestión Persistente de Usuarios & Aprendices
// Almacena en localStorage para que todo el sistema funcione conectado
// Precargado con datos ricos institucionales del SENA
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

const STORAGE_KEY = "deportest_usuarios_v2";
const EVENT_NAME = "deportest_usuarios_updated";

// Usuarios iniciales precargados (SENA y Colegios Deportivos)
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
    grado: "10° B (Fútbol Formativo)",
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
    grado: "11° A (Entrenamiento Deportivo)",
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
    grado: "9° C (Actividad Física)",
    peso: "68.2",
    talla: "1.68"
  },
  {
    id: "usr-4",
    email: "sofia.martinez@sena.edu.co",
    rol: "APRENDIZ",
    tipoDoc: "Tarjeta de Identidad (TI)",
    numDoc: "1004567890",
    nombres: "Sofía Daniela",
    apellidos: "Martínez",
    genero: "Femenino",
    fechaNacimiento: "2009-04-14",
    avatarUrl: "https://api.dicebear.com/9.x/lorelei/svg?seed=sofiamartinez&backgroundColor=d1f4e0",
    fechaRegistro: "08/10/2026",
    grado: "11° B (Atletismo & Velocidad)",
    peso: "58.0",
    talla: "1.67"
  },
  {
    id: "usr-5",
    email: "cristian.restrepo@sena.edu.co",
    rol: "APRENDIZ",
    tipoDoc: "Tarjeta de Identidad (TI)",
    numDoc: "1005678901",
    nombres: "Cristian Camilo",
    apellidos: "Restrepo",
    genero: "Masculino",
    fechaNacimiento: "2010-07-29",
    avatarUrl: "https://api.dicebear.com/9.x/dylan/svg?seed=cristianrestrepo&backgroundColor=ffeaa7",
    fechaRegistro: "05/10/2026",
    grado: "10° A (Acondicionamiento Físico)",
    peso: "72.0",
    talla: "1.78"
  },
  {
    id: "usr-6",
    email: "mariana.torres@sena.edu.co",
    rol: "APRENDIZ",
    tipoDoc: "Tarjeta de Identidad (TI)",
    numDoc: "1006789012",
    nombres: "Mariana Lucía",
    apellidos: "Torres",
    genero: "Femenino",
    fechaNacimiento: "2009-11-03",
    avatarUrl: "https://api.dicebear.com/9.x/notionists/svg?seed=marianatorres&backgroundColor=a8edea",
    fechaRegistro: "03/10/2026",
    grado: "11° A (Gimnasia & Flexibilidad)",
    peso: "52.5",
    talla: "1.60"
  },
  {
    id: "usr-7",
    email: "mateo.ospina@sena.edu.co",
    rol: "APRENDIZ",
    tipoDoc: "Tarjeta de Identidad (TI)",
    numDoc: "1007890123",
    nombres: "Mateo Alejandro",
    apellidos: "Ospina",
    genero: "Masculino",
    fechaNacimiento: "2011-06-19",
    avatarUrl: "https://api.dicebear.com/9.x/pixel-art/svg?seed=mateoospina&backgroundColor=fed7aa",
    fechaRegistro: "01/10/2026",
    grado: "9° B (Baloncesto Formativo)",
    peso: "61.0",
    talla: "1.72"
  },
  {
    id: "usr-8",
    email: "isabella.caicedo@sena.edu.co",
    rol: "APRENDIZ",
    tipoDoc: "Tarjeta de Identidad (TI)",
    numDoc: "1008901234",
    nombres: "Isabella",
    apellidos: "Caicedo Vera",
    genero: "Femenino",
    fechaNacimiento: "2010-09-10",
    avatarUrl: "https://api.dicebear.com/9.x/avataaars-neutral/svg?seed=isabellacaicedo&backgroundColor=ffd6e0",
    fechaRegistro: "28/09/2026",
    grado: "10° C (Voleibol Juvenil)",
    peso: "59.4",
    talla: "1.71"
  },
  {
    id: "usr-9",
    email: "daniel.parra@sena.edu.co",
    rol: "APRENDIZ",
    tipoDoc: "Tarjeta de Identidad (TI)",
    numDoc: "1009012345",
    nombres: "Daniel Esteban",
    apellidos: "Parra",
    genero: "Masculino",
    fechaNacimiento: "2009-12-05",
    avatarUrl: "https://api.dicebear.com/9.x/notionists/svg?seed=danielparra&backgroundColor=c0aede",
    fechaRegistro: "25/09/2026",
    grado: "11° B (Halterofilia & Potencia)",
    peso: "76.5",
    talla: "1.75"
  },
  {
    id: "usr-10",
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
    grado: "Instructor Titular SENA"
  },
  {
    id: "usr-11",
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
    grado: "Coordinadora Bienestar al Aprendiz"
  },
  {
    id: "usr-12",
    email: "carlos.arboleda@sena.edu.co",
    rol: "ADMINISTRADOR",
    tipoDoc: "Cédula de Ciudadanía (CC)",
    numDoc: "71345678",
    nombres: "Carlos Mario",
    apellidos: "Arboleda",
    genero: "Masculino",
    fechaNacimiento: "1985-03-21",
    avatarUrl: "https://api.dicebear.com/9.x/bottts-neutral/svg?seed=carlosarboleda&backgroundColor=b6e3f4",
    fechaRegistro: "10/01/2026",
    grado: "Médico Deportólogo Institucional"
  }
];

export const userService = {
  // Obtener lista completa de usuarios
  getUsuarios(): Usuario[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length >= 8) {
          return parsed;
        }
      }
    } catch (e) {
      console.error("Error al leer usuarios de localStorage:", e);
    }
    // Guardar iniciales completos si no hay datos o la lista es muy pequeña
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
