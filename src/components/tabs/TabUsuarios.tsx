// ─────────────────────────────────────────────────────────────
// TabUsuarios.tsx — Gestión Oficial de Usuarios, Roles & Directorio
// Diseñado para Docentes SENA e Instructores:
// - Registro 100% Funcional con persistencia en localStorage
// - Generador de Avatar IA Visualmente Impecable (Claro/Oscuro)
// - Directorio de Usuarios con Búsqueda en Vivo, Filtros y Eliminación
// - Selector de Fecha y Calendario Pedagógico con cálculo de edad
// ─────────────────────────────────────────────────────────────
import React, { useState, useEffect } from "react";
import {
  Users,
  Save,
  Shuffle,
  Check,
  Palette,
  Type,
  Sparkles,
  Search,
  Trash2,
  UserPlus,
  Calendar,
  Shield,
  Copy,
  ExternalLink,
  Filter,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "../ui/Input";
import { Select } from "../ui/Select";
import { userService, Usuario } from "../../services/userService";

interface TabUsuariosProps {
  onSave?: (msg?: string) => void;
}

const AVATAR_STYLES = [
  { value: "notionists",       label: "Notionists",  emoji: "✏️", desc: "Minimalista & Elegante" },
  { value: "dylan",             label: "Dylan",       emoji: "🧑", desc: "Ilustración Moderna" },
  { value: "avataaars-neutral", label: "Avataaars",   emoji: "👤", desc: "Clásico y Amigable" },
  { value: "miniavs",          label: "Miniavs",     emoji: "🎭", desc: "Expresiones Juveniles" },
  { value: "pixel-art",        label: "Pixel Art",   emoji: "🕹️", desc: "Estilo Retro / Gamer" },
  { value: "fun-emoji",        label: "Emoji",       emoji: "😄", desc: "Divertido & Expresivo" },
  { value: "bottts-neutral",   label: "Robot",       emoji: "🤖", desc: "Avatar Tecnológico" },
  { value: "lorelei",          label: "Lorelei",     emoji: "🌸", desc: "Artístico Estilizado" },
  { value: "initials",         label: "Iniciales",   emoji: "🔤", desc: "Monograma Formal" },
];

const BG_COLORS = [
  { hex: "b6e3f4", label: "Azul Suave",   name: "Celeste" },
  { hex: "c0aede", label: "Lavanda",      name: "Lavanda" },
  { hex: "ffdfbf", label: "Durazno",      name: "Durazno" },
  { hex: "d1f4e0", label: "Menta",        name: "Menta" },
  { hex: "ffd6e0", label: "Rosa Pastel",  name: "Rosa" },
  { hex: "ffeaa7", label: "Amarillo Sol", name: "Amarillo" },
  { hex: "a8edea", label: "Aqua",         name: "Aqua" },
  { hex: "fed7aa", label: "Naranja Claro",name: "Naranja" },
];

export function TabUsuarios({ onSave }: TabUsuariosProps) {
  // Estado de lista de usuarios persistentes
  const [usuarios, setUsuarios] = useState<Usuario[]>(() => userService.getUsuarios());
  const [filtroRol, setFiltroRol] = useState<string>("TODOS");
  const [busqueda, setBusqueda] = useState<string>("");

  // Estado del generador de Avatar
  const [seed, setSeed]       = useState("deportest");
  const [style, setStyle]     = useState("notionists");
  const [bgColor, setBgColor] = useState("b6e3f4");
  const [copied, setCopied]   = useState(false);

  // Estado del formulario de registro
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rol: "APRENDIZ" as Usuario["rol"],
    tipoDoc: "Cédula de Ciudadanía (CC)",
    numDoc: "",
    nombres: "",
    apellidos: "",
    genero: "Masculino",
    fechaNacimiento: "2009-05-15",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [exitoMsg, setExitoMsg] = useState<string | null>(null);

  // Cargar usuarios y suscribirse a actualizaciones
  useEffect(() => {
    const recargar = () => setUsuarios(userService.getUsuarios());
    const unsub = userService.subscribe(recargar);
    return () => unsub();
  }, []);

  const avatarUrl = `https://api.dicebear.com/9.x/${style}/svg?seed=${encodeURIComponent(seed || "deportest")}&backgroundColor=${bgColor}`;

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
    // Si cambia el nombre y la semilla sigue siendo por defecto o el nombre previo, sincronizar avatar
    if (field === "nombres" && value.trim().length > 0) {
      setSeed(value.trim().toLowerCase().replace(/\s+/g, ""));
    }
  };

  const randomizeAvatar = () => {
    const randomSeed  = Math.random().toString(36).slice(2, 9);
    const randomStyle = AVATAR_STYLES[Math.floor(Math.random() * AVATAR_STYLES.length)].value;
    const randomColor = BG_COLORS[Math.floor(Math.random() * BG_COLORS.length)].hex;
    setSeed(randomSeed);
    setStyle(randomStyle);
    setBgColor(randomColor);
  };

  const copyAvatarUrl = () => {
    navigator.clipboard.writeText(avatarUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Validación y Registro Persistente
  const handleSave = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!formData.nombres.trim()) newErrors.nombres = "El nombre es obligatorio";
    if (!formData.apellidos.trim()) newErrors.apellidos = "El apellido es obligatorio";
    if (!formData.numDoc.trim()) {
      newErrors.numDoc = "El número de documento es obligatorio";
    } else if (!/^\d+$/.test(formData.numDoc.trim())) {
      newErrors.numDoc = "El documento debe contener únicamente números";
    }

    if (!formData.email.trim()) {
      newErrors.email = "El correo electrónico es obligatorio";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = "Ingresa un correo electrónico válido (ejemplo: usuario@correo.com)";
    }

    if (!formData.password || formData.password.length < 6) {
      newErrors.password = "La contraseña debe tener mínimo 6 caracteres";
    }

    if (!formData.fechaNacimiento) {
      newErrors.fechaNacimiento = "Selecciona la fecha de nacimiento";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      // Desplazar hacia arriba suavemente si hay errores
      window.scrollTo({ top: 300, behavior: "smooth" });
      return;
    }

    // Guardar usuario en el servicio persistente
    const nuevoUsuario = userService.guardarUsuario({
      email: formData.email.trim(),
      rol: formData.rol,
      tipoDoc: formData.tipoDoc,
      numDoc: formData.numDoc.trim(),
      nombres: formData.nombres.trim(),
      apellidos: formData.apellidos.trim(),
      genero: formData.genero,
      fechaNacimiento: formData.fechaNacimiento,
      avatarUrl: avatarUrl,
    });

    // Actualizar lista local inmediatamente
    setUsuarios(userService.getUsuarios());

    // Mensaje de éxito visible para el docente
    const mensaje = `¡Usuario "${nuevoUsuario.nombres} ${nuevoUsuario.apellidos}" (${nuevoUsuario.rol}) registrado y guardado exitosamente!`;
    setExitoMsg(mensaje);
    if (onSave) onSave(mensaje);

    // Limpiar formulario y regenerar semilla
    setFormData({
      email: "",
      password: "",
      rol: "APRENDIZ",
      tipoDoc: "Cédula de Ciudadanía (CC)",
      numDoc: "",
      nombres: "",
      apellidos: "",
      genero: "Masculino",
      fechaNacimiento: "2009-05-15",
    });
    setSeed(Math.random().toString(36).slice(2, 8));

    // Auto-ocultar banner de éxito tras 6 segundos
    setTimeout(() => {
      setExitoMsg(null);
    }, 6000);
  };

  const handleEliminar = (id: string, nombreCompleto: string) => {
    if (window.confirm(`¿Estás seguro de eliminar al usuario "${nombreCompleto}" del sistema? Esta acción no se puede deshacer.`)) {
      userService.eliminarUsuario(id);
      setUsuarios(userService.getUsuarios());
    }
  };

  // Cálculo de edad en tiempo real para el formulario
  const edadCalculada = userService.calcularEdad(formData.fechaNacimiento);

  // Filtrado de usuarios para la tabla
  const usuariosFiltrados = usuarios.filter((u) => {
    const coincideRol = filtroRol === "TODOS" || u.rol === filtroRol;
    const termino = busqueda.toLowerCase().trim();
    const coincideBusqueda =
      termino === "" ||
      u.nombres.toLowerCase().includes(termino) ||
      u.apellidos.toLowerCase().includes(termino) ||
      u.numDoc.includes(termino) ||
      u.email.toLowerCase().includes(termino) ||
      u.rol.toLowerCase().includes(termino);
    return coincideRol && coincideBusqueda;
  });

  // Conteos dinámicos
  const totalUsuarios = usuarios.length;
  const totalEntrenadores = usuarios.filter((u) => u.rol === "ENTRENADOR").length;
  const totalAprendices = usuarios.filter((u) => u.rol === "APRENDIZ").length;
  const totalOtros = usuarios.filter((u) => u.rol === "ADMINISTRADOR" || u.rol === "BIENESTAR").length;

  return (
    <div className="animate-fade-in" style={{ display: "flex", flexDirection: "column", gap: 28 }}>

      {/* ── 1. KPI STATS DINÁMICOS EN TIEMPO REAL ── */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16 }}>
        {[
          {
            label: "Usuarios en el Sistema",
            value: totalUsuarios,
            sub: "Total de cuentas activas",
            color: "var(--color-green)",
            bg: "rgba(16, 185, 129, 0.08)",
          },
          {
            label: "Entrenadores / Docentes",
            value: totalEntrenadores,
            sub: "Instructores autorizados SENA",
            color: "var(--color-blue)",
            bg: "rgba(59, 130, 246, 0.08)",
          },
          {
            label: "Aprendices Deportistas",
            value: totalAprendices,
            sub: "Fichas técnicas y escolares",
            color: "var(--color-purple)",
            bg: "rgba(139, 92, 246, 0.08)",
          },
          {
            label: "Personal Administrativo",
            value: totalOtros,
            sub: "Bienestar y administradores",
            color: "#f59e0b",
            bg: "rgba(245, 158, 11, 0.08)",
          },
        ].map((s) => (
          <div
            key={s.label}
            className="glass-elevated"
            style={{
              padding: "20px 22px",
              borderRadius: 16,
              background: s.bg,
              border: `1.5px solid ${s.color}33`,
              display: "flex",
              flexDirection: "column",
              gap: 4,
            }}
          >
            <div style={{ fontSize: "0.76rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.04em", color: "var(--color-text-muted)" }}>
              {s.label}
            </div>
            <div style={{ fontSize: "2rem", fontWeight: 800, color: s.color, letterSpacing: "-0.02em" }}>
              {s.value}
            </div>
            <div style={{ fontSize: "0.75rem", color: "var(--color-text-secondary)", fontWeight: 500 }}>
              {s.sub}
            </div>
          </div>
        ))}
      </div>

      {/* ── NOTIFICACIÓN DE ÉXITO VISIBLE TRAS REGISTRAR ── */}
      <AnimatePresence>
        {exitoMsg && (
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            style={{
              padding: "16px 20px",
              borderRadius: 14,
              background: "rgba(16, 185, 129, 0.12)",
              border: "1.5px solid var(--color-green)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 16,
              boxShadow: "0 8px 24px rgba(16, 185, 129, 0.15)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <CheckCircle2 size={24} color="var(--color-green)" />
              <div>
                <p style={{ fontWeight: 800, color: "var(--color-text-primary)", fontSize: "0.95rem" }}>
                  ¡Registro Guardado con Éxito!
                </p>
                <p style={{ fontSize: "0.82rem", color: "var(--color-text-secondary)", marginTop: 2 }}>
                  {exitoMsg} Puedes verlo reflejado en la tabla del Directorio de abajo y en las fichas antropométricas.
                </p>
              </div>
            </div>
            <button
              onClick={() => setExitoMsg(null)}
              className="btn btn-ghost"
              style={{ fontSize: "0.78rem", padding: "6px 12px", borderRadius: 8 }}
            >
              Cerrar
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── 2. FORMULARIO DE REGISTRO INSTITUCIONAL ── */}
      <div className="glass-elevated" style={{ padding: "30px 34px", borderRadius: 20 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 26 }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 12,
              background: "rgba(16, 185, 129, 0.12)",
              border: "1.5px solid rgba(16, 185, 129, 0.3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--color-green)",
            }}
          >
            <UserPlus size={22} />
          </div>
          <div>
            <h2 style={{ fontSize: "1.2rem", fontWeight: 800, letterSpacing: "-0.01em", color: "var(--color-text-primary)" }}>
              Registro de Usuario Oficial & Identidad Visual
            </h2>
            <p style={{ fontSize: "0.82rem", color: "var(--color-text-secondary)", marginTop: 2 }}>
              Crea aprendices, docentes o administradores. Quedarán guardados en el sistema permanentemente.
            </p>
          </div>
        </div>

        <form onSubmit={handleSave} style={{ display: "flex", flexDirection: "column", gap: 26 }}>

          {/* Bloque 1: Datos Personales */}
          <div>
            <p className="section-title" style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <Users size={16} color="var(--color-blue)" /> 1. Datos Personales del Usuario
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16 }}>
              <Input
                label="Nombres *"
                placeholder="Ej: Juan Camilo"
                value={formData.nombres}
                onChange={(e) => handleChange("nombres", e.target.value)}
                error={errors.nombres}
              />
              <Input
                label="Apellidos *"
                placeholder="Ej: Rodríguez Pérez"
                value={formData.apellidos}
                onChange={(e) => handleChange("apellidos", e.target.value)}
                error={errors.apellidos}
              />
              <Select
                label="Tipo de Identificación *"
                value={formData.tipoDoc}
                onChange={(e) => handleChange("tipoDoc", e.target.value)}
              >
                <option>Cédula de Ciudadanía (CC)</option>
                <option>Tarjeta de Identidad (TI)</option>
                <option>Cédula de Extranjería (CE)</option>
                <option>Permiso Especial de Permanencia (PEP)</option>
              </Select>
              <Input
                label="Número de Identificación *"
                placeholder="Ej: 1001234567 (Solo números)"
                value={formData.numDoc}
                onChange={(e) => handleChange("numDoc", e.target.value)}
                error={errors.numDoc}
              />
              <Select
                label="Género"
                value={formData.genero}
                onChange={(e) => handleChange("genero", e.target.value)}
              >
                <option>Masculino</option>
                <option>Femenino</option>
                <option>Otro</option>
              </Select>

              {/* Selector de Fecha de Nacimiento Mejorado con Cálculo de Edad */}
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                  <label className="dp-label" style={{ display: "flex", alignItems: "center", gap: 6, margin: 0 }}>
                    <Calendar size={13} color="var(--color-green)" /> Fecha de Nacimiento *
                  </label>
                  {edadCalculada !== null && (
                    <span
                      style={{
                        fontSize: "0.74rem",
                        fontWeight: 700,
                        color: "var(--color-green)",
                        background: "rgba(16, 185, 129, 0.12)",
                        padding: "2px 8px",
                        borderRadius: 6,
                      }}
                    >
                      🎂 {edadCalculada} años
                    </span>
                  )}
                </div>
                <input
                  type="date"
                  className="dp-input"
                  value={formData.fechaNacimiento}
                  onChange={(e) => handleChange("fechaNacimiento", e.target.value)}
                  style={errors.fechaNacimiento ? { borderColor: "var(--color-rose)" } : {}}
                />
                {errors.fechaNacimiento && (
                  <span style={{ color: "var(--color-rose)", fontSize: "0.75rem", fontWeight: 600, marginTop: 4, display: "block" }}>
                    {errors.fechaNacimiento}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Bloque 2: Credenciales y Rol */}
          <div>
            <p className="section-title" style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <Shield size={16} color="var(--color-purple)" /> 2. Credenciales & Rol Institucional
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16 }}>
              <Input
                label="Correo Institucional *"
                type="email"
                placeholder="ejemplo@sena.edu.co"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                error={errors.email}
              />
              <Input
                label="Contraseña de Acceso *"
                type="password"
                placeholder="Mínimo 6 caracteres"
                value={formData.password}
                onChange={(e) => handleChange("password", e.target.value)}
                error={errors.password}
              />
              <Select
                label="Rol en el Sistema *"
                value={formData.rol}
                onChange={(e) => handleChange("rol", e.target.value as Usuario["rol"])}
              >
                <option value="APRENDIZ">APRENDIZ (Estudiante evaluado)</option>
                <option value="ENTRENADOR">ENTRENADOR / DOCENTE (Evaluador)</option>
                <option value="ADMINISTRADOR">ADMINISTRADOR (Gestor del sistema)</option>
                <option value="BIENESTAR">BIENESTAR AL APRENDIZ (Monitoreo)</option>
              </Select>
            </div>
          </div>

          {/* ── 3. GENERADOR DE AVATAR IA REDISEÑADO (Limpio, Moderno, Adaptativo) ── */}
          <div style={{ marginTop: 8 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
              <p className="section-title" style={{ display: "flex", alignItems: "center", gap: 8, margin: 0 }}>
                <Sparkles size={16} color="var(--color-green)" /> 3. Generador de Avatar IA para el Perfil
              </p>
              <span style={{ fontSize: "0.76rem", color: "var(--color-text-muted)" }}>
                Personaliza la foto de perfil en tiempo real
              </span>
            </div>

            {/* Contenedor Principal del Generador con Fondo Limpio y Adaptativo */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "minmax(260px, 320px) 1fr",
                gap: 24,
                background: "var(--color-bg-card)",
                border: "1.5px solid var(--color-border)",
                borderRadius: 20,
                padding: 20,
                boxShadow: "var(--shadow-card)",
              }}
            >
              {/* Panel Izquierdo: Vista Previa Grande */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 20,
                  padding: "28px 20px",
                  background: `linear-gradient(135deg, #${bgColor}40 0%, var(--color-bg-surface) 100%)`,
                  borderRadius: 16,
                  border: `1.5px solid #${bgColor}80`,
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* Glow decorativo de fondo */}
                <motion.div
                  animate={{ scale: [1, 1.15, 1], rotate: [0, 45, 0] }}
                  transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                  style={{
                    position: "absolute",
                    width: 220,
                    height: 220,
                    borderRadius: "50%",
                    background: `radial-gradient(circle, #${bgColor}60 0%, transparent 70%)`,
                    filter: "blur(30px)",
                    zIndex: 0,
                  }}
                />

                {/* Avatar Preview Grande */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={avatarUrl}
                    initial={{ scale: 0.85, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.85, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 350, damping: 22 }}
                    style={{
                      width: 140,
                      height: 140,
                      borderRadius: "50%",
                      background: `#${bgColor}`,
                      border: "4px solid #ffffff",
                      boxShadow: `0 10px 25px rgba(0,0,0,0.12), 0 0 0 4px #${bgColor}60`,
                      overflow: "hidden",
                      zIndex: 1,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <img
                      src={avatarUrl}
                      alt="Avatar seleccionado"
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Controles rápidos de previsualización */}
                <div style={{ zIndex: 1, display: "flex", flexDirection: "column", gap: 10, width: "100%" }}>
                  <button
                    type="button"
                    onClick={randomizeAvatar}
                    className="btn btn-primary"
                    style={{
                      width: "100%",
                      justifyContent: "center",
                      fontSize: "0.85rem",
                      padding: "10px 14px",
                      borderRadius: 10,
                      fontWeight: 700,
                      background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                      color: "#ffffff",
                    }}
                  >
                    <Shuffle size={15} /> Combinación Aleatoria
                  </button>

                  <div style={{ display: "flex", gap: 8 }}>
                    <button
                      type="button"
                      onClick={copyAvatarUrl}
                      className="btn btn-secondary"
                      style={{
                        flex: 1,
                        justifyContent: "center",
                        fontSize: "0.75rem",
                        padding: "8px 10px",
                        borderRadius: 8,
                      }}
                      title="Copiar enlace del SVG del avatar"
                    >
                      {copied ? <Check size={13} color="var(--color-green)" /> : <Copy size={13} />}
                      {copied ? "¡Copiado!" : "Copiar SVG"}
                    </button>
                    <a
                      href={avatarUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn-ghost"
                      style={{
                        padding: "8px 10px",
                        borderRadius: 8,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                      title="Ver avatar en tamaño completo"
                    >
                      <ExternalLink size={13} />
                    </a>
                  </div>

                  <div
                    style={{
                      fontSize: "0.72rem",
                      color: "var(--color-text-secondary)",
                      textAlign: "center",
                      fontFamily: "var(--font-mono)",
                      background: "var(--color-bg-surface)",
                      padding: "6px 10px",
                      borderRadius: 8,
                      border: "1px solid var(--color-border)",
                    }}
                  >
                    Semilla: <span style={{ fontWeight: 700, color: "var(--color-text-primary)" }}>{seed}</span>
                  </div>
                </div>
              </div>

              {/* Panel Derecho: Selección de Estilos, Colores y Semilla */}
              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

                {/* 1. Galería de Estilos de Avatar */}
                <div>
                  <label className="dp-label" style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                    <Palette size={14} color="var(--color-green)" /> Elige el Estilo Visual
                  </label>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fill, minmax(105px, 1fr))",
                      gap: 10,
                    }}
                  >
                    {AVATAR_STYLES.map((s) => {
                      const isActivo = style === s.value;
                      const previewUrl = `https://api.dicebear.com/9.x/${s.value}/svg?seed=${encodeURIComponent(seed)}&backgroundColor=${bgColor}`;
                      return (
                        <button
                          type="button"
                          key={s.value}
                          onClick={() => setStyle(s.value)}
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            gap: 8,
                            padding: "10px 6px",
                            borderRadius: 14,
                            cursor: "pointer",
                            background: isActivo ? "rgba(16, 185, 129, 0.12)" : "var(--color-bg-surface)",
                            border: `2px solid ${isActivo ? "var(--color-green)" : "var(--color-border)"}`,
                            boxShadow: isActivo ? "0 4px 12px rgba(16, 185, 129, 0.15)" : "none",
                            transition: "all 0.15s ease",
                            position: "relative",
                          }}
                        >
                          {isActivo && (
                            <div
                              style={{
                                position: "absolute",
                                top: 4,
                                right: 4,
                                width: 16,
                                height: 16,
                                borderRadius: "50%",
                                background: "var(--color-green)",
                                color: "#ffffff",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              <Check size={10} strokeWidth={3} />
                            </div>
                          )}
                          <div
                            style={{
                              width: 44,
                              height: 44,
                              borderRadius: "50%",
                              overflow: "hidden",
                              background: `#${bgColor}`,
                              border: "1.5px solid rgba(0,0,0,0.06)",
                            }}
                          >
                            <img src={previewUrl} alt={s.label} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                          </div>
                          <span
                            style={{
                              fontSize: "0.74rem",
                              fontWeight: isActivo ? 800 : 600,
                              color: isActivo ? "var(--color-green)" : "var(--color-text-primary)",
                            }}
                          >
                            {s.label}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 2. Selector de Tono de Fondo y Generador de Patrón */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, alignItems: "start" }}>

                  {/* Selector de Tonos Pastel */}
                  <div>
                    <label className="dp-label" style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 10 }}>
                      <Palette size={13} color="var(--color-blue)" /> Tono de Fondo Pastel
                    </label>
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                      {BG_COLORS.map((c) => {
                        const isColorActivo = bgColor === c.hex;
                        return (
                          <button
                            type="button"
                            key={c.hex}
                            onClick={() => setBgColor(c.hex)}
                            title={c.label}
                            style={{
                              width: 34,
                              height: 34,
                              borderRadius: "50%",
                              background: `#${c.hex}`,
                              border: isColorActivo ? "2.5px solid var(--color-green)" : "1.5px solid rgba(0,0,0,0.12)",
                              boxShadow: isColorActivo
                                ? "0 0 0 3px rgba(16, 185, 129, 0.3), 0 4px 8px rgba(0,0,0,0.1)"
                                : "0 2px 4px rgba(0,0,0,0.06)",
                              cursor: "pointer",
                              transform: isColorActivo ? "scale(1.15)" : "scale(1)",
                              transition: "all 0.15s ease",
                            }}
                          />
                        );
                      })}
                    </div>
                  </div>

                  {/* Generador de Patrón por Texto */}
                  <div>
                    <label className="dp-label" style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 10 }}>
                      <Type size={13} color="var(--color-purple)" /> Semilla o Nombre Único
                    </label>
                    <div style={{ display: "flex", gap: 8 }}>
                      <input
                        className="dp-input"
                        value={seed}
                        onChange={(e) => setSeed(e.target.value)}
                        placeholder="Escribe un nombre..."
                        style={{ fontSize: "0.88rem", padding: "10px 14px" }}
                      />
                      <button
                        type="button"
                        onClick={randomizeAvatar}
                        className="btn btn-secondary"
                        style={{ padding: "10px 12px", borderRadius: 10 }}
                        title="Cambiar semilla aleatoria"
                      >
                        <Shuffle size={15} />
                      </button>
                    </div>
                    <p style={{ fontSize: "0.72rem", color: "var(--color-text-muted)", marginTop: 6 }}>
                      Cada palabra o nombre genera rasgos y expresiones faciales distintas.
                    </p>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* Botón de Guardado y Registro Final */}
          <div
            style={{
              paddingTop: 20,
              borderTop: "1px solid var(--color-border)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 12,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8, color: "var(--color-text-secondary)", fontSize: "0.82rem" }}>
              <CheckCircle2 size={16} color="var(--color-green)" />
              Los usuarios registrados se almacenan de forma permanente y están disponibles en las fichas.
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              style={{
                fontSize: "0.95rem",
                padding: "13px 28px",
                borderRadius: 12,
                gap: 10,
                fontWeight: 800,
                background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                boxShadow: "0 6px 20px rgba(16, 185, 129, 0.35)",
              }}
            >
              <Save size={18} />
              Registrar Usuario Oficial
            </button>
          </div>
        </form>
      </div>

      {/* ── 4. DIRECTORIO OFICIAL DE USUARIOS REGISTRADOS ── */}
      <div className="glass-elevated" style={{ padding: "28px 32px", borderRadius: 20 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 16,
            marginBottom: 20,
          }}
        >
          <div>
            <h3 style={{ fontSize: "1.15rem", fontWeight: 800, color: "var(--color-text-primary)", letterSpacing: "-0.01em" }}>
              Directorio de Usuarios Registrados ({usuariosFiltrados.length})
            </h3>
            <p style={{ fontSize: "0.8rem", color: "var(--color-text-secondary)", marginTop: 2 }}>
              Listado general institucional. Todos los usuarios guardados se conservan en el sistema.
            </p>
          </div>

          {/* Barra de Búsqueda en Vivo */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 280 }}>
            <div style={{ position: "relative", width: "100%" }}>
              <input
                className="dp-input"
                placeholder="Buscar por nombre, documento o correo..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                style={{
                  padding: "10px 14px 10px 36px",
                  fontSize: "0.85rem",
                  borderRadius: 10,
                }}
              />
              <Search
                size={16}
                color="var(--color-text-muted)"
                style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)" }}
              />
            </div>
          </div>
        </div>

        {/* Pestañas de Filtro por Rol */}
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 20, borderBottom: "1px solid var(--color-border)", paddingBottom: 14 }}>
          {[
            { id: "TODOS", label: "Todos", count: totalUsuarios },
            { id: "APRENDIZ", label: "Aprendices", count: totalAprendices },
            { id: "ENTRENADOR", label: "Entrenadores", count: totalEntrenadores },
            { id: "ADMINISTRADOR", label: "Administradores", count: usuarios.filter(u => u.rol === "ADMINISTRADOR").length },
            { id: "BIENESTAR", label: "Bienestar", count: usuarios.filter(u => u.rol === "BIENESTAR").length },
          ].map((tab) => {
            const isSel = filtroRol === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setFiltroRol(tab.id)}
                className="btn"
                style={{
                  fontSize: "0.8rem",
                  padding: "7px 14px",
                  borderRadius: 8,
                  fontWeight: isSel ? 800 : 600,
                  background: isSel ? "rgba(16, 185, 129, 0.12)" : "transparent",
                  color: isSel ? "var(--color-green)" : "var(--color-text-secondary)",
                  border: `1.5px solid ${isSel ? "var(--color-green)" : "var(--color-border)"}`,
                }}
              >
                {tab.label} <span style={{ opacity: 0.7, fontSize: "0.75rem" }}>({tab.count})</span>
              </button>
            );
          })}
        </div>

        {/* Tabla de Usuarios Registrados */}
        {usuariosFiltrados.length === 0 ? (
          <div
            style={{
              padding: "40px 20px",
              textAlign: "center",
              borderRadius: 14,
              background: "var(--color-bg-surface)",
              border: "1px dashed var(--color-border)",
            }}
          >
            <AlertCircle size={32} color="var(--color-text-muted)" style={{ margin: "0 auto 10px" }} />
            <p style={{ fontWeight: 700, color: "var(--color-text-primary)", fontSize: "0.95rem" }}>
              No se encontraron usuarios con ese criterio de búsqueda
            </p>
            <p style={{ fontSize: "0.8rem", color: "var(--color-text-muted)", marginTop: 4 }}>
              Intenta cambiar los términos de búsqueda o registra un nuevo usuario en el formulario superior.
            </p>
          </div>
        ) : (
          <div style={{ overflowX: "auto", borderRadius: 14, border: "1px solid var(--color-border)" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "0.85rem" }}>
              <thead>
                <tr style={{ background: "var(--color-bg-surface)", borderBottom: "1.5px solid var(--color-border)" }}>
                  <th style={{ padding: "14px 16px", fontWeight: 700, color: "var(--color-text-muted)" }}>Perfil</th>
                  <th style={{ padding: "14px 16px", fontWeight: 700, color: "var(--color-text-muted)" }}>Nombre Completo</th>
                  <th style={{ padding: "14px 16px", fontWeight: 700, color: "var(--color-text-muted)" }}>Rol Institucional</th>
                  <th style={{ padding: "14px 16px", fontWeight: 700, color: "var(--color-text-muted)" }}>Documento</th>
                  <th style={{ padding: "14px 16px", fontWeight: 700, color: "var(--color-text-muted)" }}>Correo Electrónico</th>
                  <th style={{ padding: "14px 16px", fontWeight: 700, color: "var(--color-text-muted)" }}>Edad / Nacimiento</th>
                  <th style={{ padding: "14px 16px", fontWeight: 700, color: "var(--color-text-muted)" }}>F. Registro</th>
                  <th style={{ padding: "14px 16px", fontWeight: 700, color: "var(--color-text-muted)", textAlign: "center" }}>Acción</th>
                </tr>
              </thead>
              <tbody>
                {usuariosFiltrados.map((u, idx) => {
                  const edad = userService.calcularEdad(u.fechaNacimiento);
                  const rolBadgeColor =
                    u.rol === "ENTRENADOR"
                      ? { bg: "rgba(59, 130, 246, 0.12)", text: "var(--color-blue)", border: "rgba(59, 130, 246, 0.3)" }
                      : u.rol === "APRENDIZ"
                      ? { bg: "rgba(16, 185, 129, 0.12)", text: "var(--color-green)", border: "rgba(16, 185, 129, 0.3)" }
                      : u.rol === "ADMINISTRADOR"
                      ? { bg: "rgba(139, 92, 246, 0.12)", text: "var(--color-purple)", border: "rgba(139, 92, 246, 0.3)" }
                      : { bg: "rgba(245, 158, 11, 0.12)", text: "#d97706", border: "rgba(245, 158, 11, 0.3)" };

                  return (
                    <tr
                      key={u.id}
                      style={{
                        borderBottom: idx === usuariosFiltrados.length - 1 ? "none" : "1px solid var(--color-border)",
                        background: idx % 2 === 0 ? "transparent" : "rgba(100, 116, 139, 0.02)",
                        transition: "background 0.15s ease",
                      }}
                    >
                      {/* Avatar */}
                      <td style={{ padding: "12px 16px" }}>
                        <div
                          style={{
                            width: 40,
                            height: 40,
                            borderRadius: "50%",
                            overflow: "hidden",
                            background: "var(--color-bg-surface)",
                            border: "1.5px solid var(--color-border)",
                            boxShadow: "0 2px 6px rgba(0,0,0,0.06)",
                          }}
                        >
                          <img
                            src={u.avatarUrl}
                            alt={u.nombres}
                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                            onError={(e) => {
                              // Fallback si falla la red externa
                              (e.target as HTMLElement).style.display = "none";
                            }}
                          />
                        </div>
                      </td>

                      {/* Nombres */}
                      <td style={{ padding: "12px 16px" }}>
                        <div style={{ fontWeight: 700, color: "var(--color-text-primary)" }}>
                          {u.nombres} {u.apellidos}
                        </div>
                        <div style={{ fontSize: "0.74rem", color: "var(--color-text-muted)" }}>
                          {u.genero} {u.grado ? `• ${u.grado}` : ""}
                        </div>
                      </td>

                      {/* Rol */}
                      <td style={{ padding: "12px 16px" }}>
                        <span
                          style={{
                            display: "inline-block",
                            padding: "3px 10px",
                            borderRadius: 99,
                            fontSize: "0.72rem",
                            fontWeight: 800,
                            background: rolBadgeColor.bg,
                            color: rolBadgeColor.text,
                            border: `1px solid ${rolBadgeColor.border}`,
                          }}
                        >
                          {u.rol}
                        </span>
                      </td>

                      {/* Documento */}
                      <td style={{ padding: "12px 16px", fontFamily: "var(--font-mono)", fontSize: "0.82rem", color: "var(--color-text-primary)" }}>
                        <div style={{ fontWeight: 600 }}>{u.numDoc}</div>
                        <div style={{ fontSize: "0.7rem", color: "var(--color-text-muted)" }}>{u.tipoDoc.split(" ")[0]}</div>
                      </td>

                      {/* Email */}
                      <td style={{ padding: "12px 16px", color: "var(--color-text-secondary)" }}>
                        {u.email}
                      </td>

                      {/* Edad / Nacimiento */}
                      <td style={{ padding: "12px 16px" }}>
                        <div style={{ fontWeight: 700, color: "var(--color-text-primary)" }}>
                          {edad !== null ? `${edad} años` : "—"}
                        </div>
                        <div style={{ fontSize: "0.74rem", color: "var(--color-text-muted)" }}>
                          {u.fechaNacimiento || "No registrada"}
                        </div>
                      </td>

                      {/* Fecha de Registro */}
                      <td style={{ padding: "12px 16px", fontSize: "0.78rem", color: "var(--color-text-muted)" }}>
                        {u.fechaRegistro}
                      </td>

                      {/* Botón Eliminar */}
                      <td style={{ padding: "12px 16px", textAlign: "center" }}>
                        <button
                          onClick={() => handleEliminar(u.id, `${u.nombres} ${u.apellidos}`)}
                          className="btn btn-ghost"
                          style={{
                            padding: "6px 8px",
                            borderRadius: 8,
                            color: "var(--color-rose)",
                            border: "1px solid rgba(244, 63, 94, 0.2)",
                          }}
                          title="Eliminar usuario del sistema"
                        >
                          <Trash2 size={15} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
}
