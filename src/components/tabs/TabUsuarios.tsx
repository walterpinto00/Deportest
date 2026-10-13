// ─────────────────────────────────────────────
// Tab: Usuarios & Roles
// ─────────────────────────────────────────────
import React, { useState } from "react";
import { Users, Save, Shuffle, Check, Palette, Type, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "../ui/Input";
import { Select } from "../ui/Select";

interface TabUsuariosProps {
  onSave: () => void;
}

const AVATAR_STYLES = [
  { value: "dylan",             label: "Dylan",       emoji: "🧑" },
  { value: "avataaars-neutral", label: "Avataaars",   emoji: "👤" },
  { value: "miniavs",          label: "Miniavs",     emoji: "🎭" },
  { value: "pixel-art",        label: "Pixel Art",   emoji: "🕹️" },
  { value: "fun-emoji",        label: "Emoji",       emoji: "😄" },
  { value: "bottts-neutral",   label: "Robot",       emoji: "🤖" },
  { value: "initials",         label: "Iniciales",   emoji: "🔤" },
  { value: "lorelei",          label: "Lorelei",     emoji: "🌸" },
  { value: "notionists",       label: "Notionists",  emoji: "✏️" },
];

const BG_COLORS = [
  { hex: "b6e3f4", label: "Azul suave"   },
  { hex: "c0aede", label: "Lavanda"      },
  { hex: "ffdfbf", label: "Durazno"      },
  { hex: "d1f4e0", label: "Menta"        },
  { hex: "ffd6e0", label: "Rosa"         },
  { hex: "ffeaa7", label: "Amarillo"     },
  { hex: "a8edea", label: "Aqua"         },
  { hex: "e2b4bd", label: "Rosa oscuro"  },
];

export function TabUsuarios({ onSave }: TabUsuariosProps) {
  const [seed, setSeed]       = useState("deportest");
  const [style, setStyle]     = useState("dylan");
  const [bgColor, setBgColor] = useState("b6e3f4");
  const [copied, setCopied]   = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    email: "", password: "", rol: "APRENDIZ", 
    tipoDoc: "Cédula de Ciudadanía (CC)", numDoc: "", 
    nombres: "", apellidos: "", genero: "Masculino", fechaNacimiento: ""
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const avatarUrl = `https://api.dicebear.com/9.x/${style}/svg?seed=${seed}&backgroundColor=${bgColor}`;

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const handleSave = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Correo inválido";
    if (!formData.password || formData.password.length < 6) newErrors.password = "Mínimo 6 caracteres";
    if (!formData.numDoc || !/^\d+$/.test(formData.numDoc)) newErrors.numDoc = "Solo números requeridos";
    if (!formData.nombres) newErrors.nombres = "Campo requerido";
    if (!formData.apellidos) newErrors.apellidos = "Campo requerido";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    // Si todo es válido
    onSave();
  };

  const randomize = () => {
    const randomSeed  = Math.random().toString(36).slice(2, 10);
    const randomStyle = AVATAR_STYLES[Math.floor(Math.random() * AVATAR_STYLES.length)].value;
    const randomColor = BG_COLORS[Math.floor(Math.random() * BG_COLORS.length)].hex;
    setSeed(randomSeed);
    setStyle(randomStyle);
    setBgColor(randomColor);
  };

  return (
    <div className="animate-fade-in" style={{ display: "flex", flexDirection: "column", gap: 24 }}>

      {/* Stats row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
        {[
          { label: "Usuarios Totales", value: "248", sub: "Comunidad activa SENA" },
          { label: "Entrenadores / Docentes", value: "14", sub: "Instructores autorizados" },
          { label: "Aprendices Deportistas", value: "234", sub: "Fichas técnicas y escolares" },
        ].map((s) => (
          <div key={s.label} className="glass" style={{ padding: "18px 20px" }}>
            <div style={{ fontSize: "0.72rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.04em", color: "var(--color-text-muted)" }}>{s.label}</div>
            <div style={{ fontSize: "1.85rem", fontWeight: 800, color: "#ffffff", marginTop: 4, letterSpacing: "-0.02em" }}>{s.value}</div>
            <div style={{ fontSize: "0.72rem", color: "var(--color-text-secondary)", marginTop: 2 }}>{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Form */}
      <div className="glass-elevated" style={{ padding: "28px 32px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
          <div style={{ width: 38, height: 38, borderRadius: 10, background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.25)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--color-green)" }}>
            <Users size={18} />
          </div>
          <div>
            <h2 style={{ fontSize: "1.05rem", fontWeight: 700, letterSpacing: "-0.01em" }}>Registro de Usuario Institucional</h2>
            <p style={{ fontSize: "0.74rem", color: "var(--color-text-secondary)", marginTop: 2 }}>Crea un nuevo usuario, asigna roles de acceso y personaliza su identidad visual.</p>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px 32px" }}>
          {/* Credenciales */}
          <div style={{ gridColumn: "1 / -1" }}>
            <p className="section-title">Credenciales de Acceso</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
              <Input label="Correo Electrónico" type="email" placeholder="usuario@correo.com" value={formData.email} onChange={(e) => handleChange("email", e.target.value)} error={errors.email} />
              <Input label="Contraseña" type="password" placeholder="••••••••" value={formData.password} onChange={(e) => handleChange("password", e.target.value)} error={errors.password} />
              <Select label="Rol en el Sistema" value={formData.rol} onChange={(e) => handleChange("rol", e.target.value)}>
                <option>APRENDIZ</option>
                <option>ENTRENADOR</option>
                <option>ADMINISTRADOR</option>
                <option>BIENESTAR</option>
              </Select>
            </div>
          </div>

          {/* Datos Personales */}
          <div style={{ gridColumn: "1 / -1" }}>
            <p className="section-title">Datos Personales</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
              <Select label="Tipo de Identificación" value={formData.tipoDoc} onChange={(e) => handleChange("tipoDoc", e.target.value)}>
                <option>Cédula de Ciudadanía (CC)</option>
                <option>Tarjeta de Identidad (TI)</option>
                <option>Cédula de Extranjería (CE)</option>
              </Select>
              <Input label="Número de Identificación" placeholder="Ej: 1001234567" value={formData.numDoc} onChange={(e) => handleChange("numDoc", e.target.value)} error={errors.numDoc} />
              <Input label="Nombres" placeholder="Ej: Juan" value={formData.nombres} onChange={(e) => handleChange("nombres", e.target.value)} error={errors.nombres} />
              <Input label="Apellidos" placeholder="Ej: Pérez" value={formData.apellidos} onChange={(e) => handleChange("apellidos", e.target.value)} error={errors.apellidos} />
              <Select label="Género" value={formData.genero} onChange={(e) => handleChange("genero", e.target.value)}>
                <option>Masculino</option>
                <option>Femenino</option>
                <option>Otro</option>
              </Select>
              <Input label="Fecha de Nacimiento" type="date" value={formData.fechaNacimiento} onChange={(e) => handleChange("fechaNacimiento", e.target.value)} />
            </div>
          </div>

          {/* ── AVATAR PICKER MEJORADO ── */}
          <div style={{ gridColumn: "1 / -1", marginTop: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
              <Sparkles size={16} color="var(--color-green)" />
              <p className="section-title" style={{ marginBottom: 0 }}>Generador de Avatar IA</p>
            </div>

            <div style={{
              display: "grid",
              gridTemplateColumns: "minmax(240px, 1fr) 2fr",
              gap: 24,
              background: "rgba(15,23,42,0.4)",
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: 24,
              padding: 6,
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.05), 0 20px 40px rgba(0,0,0,0.4)",
            }}>

              {/* Preview panel izquierdo */}
              <div style={{
                display: "flex", flexDirection: "column", alignItems: "center",
                justifyContent: "center", gap: 24,
                padding: "32px 24px",
                background: `linear-gradient(135deg, #${bgColor}11, #${bgColor}33)`,
                borderRadius: 20,
                position: "relative",
                overflow: "hidden",
                border: "1px solid rgba(255,255,255,0.03)",
              }}>
                {/* Decoración fondo */}
                <motion.div
                  animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                  style={{
                    position: "absolute", width: 300, height: 300,
                    background: `radial-gradient(circle, #${bgColor}44 0%, transparent 70%)`,
                    filter: "blur(40px)", zIndex: 0
                  }}
                />

                {/* Avatar grande animado */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={avatarUrl}
                    initial={{ scale: 0.8, opacity: 0, rotate: -10 }}
                    animate={{ scale: 1, opacity: 1, rotate: 0 }}
                    exit={{ scale: 0.8, opacity: 0, rotate: 10 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    style={{
                      width: 140, height: 140, borderRadius: "50%",
                      background: `#${bgColor}`,
                      border: "4px solid rgba(255,255,255,0.2)",
                      overflow: "hidden",
                      boxShadow: `0 0 0 10px #${bgColor}22, 0 20px 40px rgba(0,0,0,0.5), inset 0 4px 12px rgba(255,255,255,0.4)`,
                      zIndex: 1,
                      display: "flex", alignItems: "center", justifyContent: "center"
                    }}
                  >
                    <img
                      src={avatarUrl}
                      alt="Avatar Preview"
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  </motion.div>
                </AnimatePresence>

                <div style={{ zIndex: 1, display: "flex", flexDirection: "column", gap: 12, width: "100%" }}>
                  <button
                    onClick={randomize}
                    className="btn btn-primary"
                    style={{ width: "100%", justifyContent: "center", fontSize: "0.8rem", padding: "10px", background: "rgba(255,255,255,0.1)", color: "#fff", border: "1px solid rgba(255,255,255,0.1)", boxShadow: "none" }}
                  >
                    <Shuffle size={14} /> Mix Aleatorio
                  </button>
                  <div style={{
                    fontSize: "0.65rem", color: "rgba(255,255,255,0.5)",
                    textAlign: "center", wordBreak: "break-all",
                    fontFamily: "var(--font-mono)", background: "rgba(0,0,0,0.3)",
                    padding: "6px 12px", borderRadius: 8, border: "1px solid rgba(255,255,255,0.05)"
                  }}>
                    ID: {seed}
                  </div>
                </div>
              </div>

              {/* Panel derecho de configuración */}
              <div style={{ padding: "32px 32px 32px 16px", display: "flex", flexDirection: "column", gap: 28 }}>
                
                {/* Galería de estilos */}
                <div>
                  <label className="dp-label" style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
                    <Palette size={14} color="var(--color-green)" /> Elige un Estilo Base
                  </label>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(90px, 1fr))", gap: 12 }}>
                    {AVATAR_STYLES.map((s) => {
                      const previewUrl = `https://api.dicebear.com/9.x/${s.value}/svg?seed=${seed}&backgroundColor=${bgColor}`;
                      const active = style === s.value;
                      return (
                        <motion.button
                          whileHover={{ scale: 1.05, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                          key={s.value}
                          onClick={() => setStyle(s.value)}
                          title={s.label}
                          style={{
                            display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
                            padding: "12px 8px", borderRadius: 16, cursor: "pointer", border: "none",
                            background: active ? "rgba(34,197,94,0.1)" : "rgba(255,255,255,0.02)",
                            boxShadow: active ? "inset 0 0 0 2px var(--color-green), 0 8px 16px rgba(34,197,94,0.15)" : "inset 0 0 0 1px rgba(255,255,255,0.05)",
                            position: "relative", overflow: "hidden"
                          }}
                        >
                          {active && (
                            <motion.div layoutId="active-style-indicator" style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, background: "linear-gradient(180deg, rgba(34,197,94,0.1) 0%, transparent 100%)", borderRadius: 16 }} />
                          )}
                          <div style={{
                            width: 52, height: 52, borderRadius: "50%",
                            overflow: "hidden", background: `#${bgColor}`,
                            border: `2px solid ${active ? "var(--color-green)" : "rgba(255,255,255,0.1)"}`,
                            flexShrink: 0, position: "relative", zIndex: 1,
                            boxShadow: active ? "0 4px 12px rgba(0,0,0,0.3)" : "none"
                          }}>
                            <img src={previewUrl} alt={s.label} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                          </div>
                          <span style={{
                            fontSize: "0.68rem", fontWeight: active ? 700 : 500,
                            color: active ? "var(--color-green)" : "var(--color-text-muted)",
                            letterSpacing: "0.02em", position: "relative", zIndex: 1
                          }}>
                            {s.label}
                          </span>
                        </motion.button>
                      );
                    })}
                  </div>
                </div>

                <div style={{ display: "flex", gap: 32, flexWrap: "wrap" }}>
                  {/* Selector de color */}
                  <div style={{ flex: 1, minWidth: 200 }}>
                    <label className="dp-label" style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
                      <Palette size={14} color="var(--color-blue)" /> Tono de Fondo
                    </label>
                    <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                      {BG_COLORS.map((c) => (
                        <motion.button
                          whileHover={{ scale: 1.15 }}
                          whileTap={{ scale: 0.9 }}
                          key={c.hex}
                          onClick={() => setBgColor(c.hex)}
                          title={c.label}
                          style={{
                            width: 36, height: 36, borderRadius: "50%",
                            background: `#${c.hex}`, border: "none", cursor: "pointer",
                            boxShadow: bgColor === c.hex ? `0 0 0 3px #0f172a, 0 0 0 5px #${c.hex}, 0 10px 20px #${c.hex}66` : "0 4px 8px rgba(0,0,0,0.3)",
                            transform: bgColor === c.hex ? "scale(1.1)" : "scale(1)",
                            transition: "all 0.2s",
                          }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Seed input */}
                  <div style={{ flex: 1, minWidth: 240 }}>
                    <label className="dp-label" style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
                      <Type size={14} color="var(--color-purple)" /> Generador de Patrón
                    </label>
                    <div style={{ position: "relative" }}>
                      <input
                        className="dp-input"
                        value={seed}
                        onChange={(e) => setSeed(e.target.value)}
                        placeholder="Escribe tu nombre..."
                        style={{ padding: "12px 48px 12px 16px", background: "rgba(0,0,0,0.2)", borderRadius: 12 }}
                      />
                      <button
                        onClick={randomize}
                        style={{
                          position: "absolute", right: 6, top: 6, bottom: 6,
                          width: 32, background: "rgba(255,255,255,0.05)", border: "none", borderRadius: 8,
                          display: "flex", alignItems: "center", justifyContent: "center", color: "var(--color-text-muted)",
                          cursor: "pointer", transition: "all 0.2s"
                        }}
                        title="Randomizar"
                      >
                        <Shuffle size={14} />
                      </button>
                    </div>
                    <p style={{ fontSize: "0.68rem", color: "var(--color-text-muted)", marginTop: 8 }}>
                      Escribe cualquier cosa. La IA generará un rostro único en tiempo real.
                    </p>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>

        <div style={{ marginTop: 32, paddingTop: 24, borderTop: "1px solid var(--color-border)", display: "flex", justifyContent: "flex-end" }}>
          <button className="btn btn-primary" onClick={handleSave}>
            <Save size={15} />
            Registrar Usuario
          </button>
        </div>
      </div>
    </div>
  );
}
