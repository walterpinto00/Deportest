// ─────────────────────────────────────────────
// Tab: Usuarios & Roles
// ─────────────────────────────────────────────
import React, { useState } from "react";
import { Users, Save, Shuffle, Check, Palette, Type } from "lucide-react";
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

  const avatarUrl = `https://api.dicebear.com/9.x/${style}/svg?seed=${seed}&backgroundColor=${bgColor}`;

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
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 16 }}>
        {[
          { label: "Usuarios Totales", value: "48", sub: "Activos este mes",   color: "var(--color-green)"  },
          { label: "Entrenadores",     value: "6",  sub: "Roles asignados",    color: "var(--color-teal)"   },
          { label: "Aprendices",       value: "42", sub: "Programas SENA",     color: "var(--color-purple)" },
        ].map((s) => (
          <div key={s.label} className="glass" style={{ padding: 20 }}>
            <div style={{ fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", color: "var(--color-text-muted)" }}>{s.label}</div>
            <div style={{ fontSize: "2rem", fontWeight: 900, color: s.color, marginTop: 4 }}>{s.value}</div>
            <div style={{ fontSize: "0.72rem", color: "var(--color-text-secondary)", marginTop: 2 }}>{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Form */}
      <div className="glass-elevated" style={{ padding: 32 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 28 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(34,197,94,0.15)", border: "1px solid rgba(34,197,94,0.3)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Users size={18} color="var(--color-green)" />
          </div>
          <div>
            <h2 style={{ fontSize: "1rem", fontWeight: 700 }}>Registro de Usuario</h2>
            <p style={{ fontSize: "0.75rem", color: "var(--color-text-secondary)", marginTop: 2 }}>Crea un nuevo usuario y personaliza su perfil.</p>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px 32px" }}>
          {/* Credenciales */}
          <div style={{ gridColumn: "1 / -1" }}>
            <p className="section-title">Credenciales de Acceso</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
              <Input label="Correo Electrónico" type="email" placeholder="usuario@correo.com" />
              <Input label="Contraseña" type="password" placeholder="••••••••" />
              <Select label="Rol en el Sistema">
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
              <Select label="Tipo de Identificación">
                <option>Cédula de Ciudadanía (CC)</option>
                <option>Tarjeta de Identidad (TI)</option>
                <option>Cédula de Extranjería (CE)</option>
              </Select>
              <Input label="Número de Identificación" placeholder="Ej: 1001234567" />
              <Input label="Nombres" placeholder="Ej: Juan" />
              <Input label="Apellidos" placeholder="Ej: Pérez" />
              <Select label="Género">
                <option>Masculino</option>
                <option>Femenino</option>
                <option>Otro</option>
              </Select>
              <Input label="Fecha de Nacimiento" type="date" />
            </div>
          </div>

          {/* ── AVATAR PICKER MEJORADO ── */}
          <div style={{ gridColumn: "1 / -1" }}>
            <p className="section-title">Personalizar Avatar</p>

            <div style={{
              display: "grid",
              gridTemplateColumns: "200px 1fr",
              gap: 28,
              background: "rgba(255,255,255,0.02)",
              border: "1px solid var(--color-border)",
              borderRadius: 18,
              overflow: "hidden",
            }}>

              {/* Preview panel izquierdo */}
              <div style={{
                display: "flex", flexDirection: "column", alignItems: "center",
                justifyContent: "center", gap: 20,
                padding: 28,
                background: `#${bgColor}22`,
                borderRight: "1px solid var(--color-border)",
                position: "relative",
              }}>
                {/* Avatar grande */}
                <div style={{
                  width: 128, height: 128, borderRadius: "50%",
                  background: `#${bgColor}`,
                  border: "4px solid rgba(255,255,255,0.15)",
                  overflow: "hidden",
                  boxShadow: `0 0 0 8px #${bgColor}44, 0 16px 48px rgba(0,0,0,0.4)`,
                  transition: "box-shadow 0.3s",
                }}>
                  <img
                    src={avatarUrl}
                    alt="Avatar Preview"
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </div>

                {/* Botón aleatorio */}
                <button
                  onClick={randomize}
                  className="btn btn-ghost"
                  style={{ width: "100%", justifyContent: "center", fontSize: "0.78rem" }}
                >
                  <Shuffle size={13} /> Aleatorio
                </button>

                {/* Seed actual */}
                <div style={{
                  fontSize: "0.65rem", color: "var(--color-text-muted)",
                  textAlign: "center", wordBreak: "break-all",
                  fontFamily: "var(--font-mono)",
                  background: "rgba(0,0,0,0.2)",
                  padding: "4px 10px", borderRadius: 6,
                }}>
                  seed: {seed}
                </div>
              </div>

              {/* Panel derecho de configuración */}
              <div style={{ padding: 28, display: "flex", flexDirection: "column", gap: 24 }}>

                {/* Galería de estilos */}
                <div>
                  <label className="dp-label" style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 12 }}>
                    <Palette size={12} /> Estilo del Avatar
                  </label>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(80px, 1fr))", gap: 10 }}>
                    {AVATAR_STYLES.map((s) => {
                      const previewUrl = `https://api.dicebear.com/9.x/${s.value}/svg?seed=${seed}&backgroundColor=${bgColor}`;
                      const active = style === s.value;
                      return (
                        <button
                          key={s.value}
                          onClick={() => setStyle(s.value)}
                          title={s.label}
                          style={{
                            display: "flex", flexDirection: "column", alignItems: "center", gap: 6,
                            padding: "10px 6px", borderRadius: 12, cursor: "pointer", border: "none",
                            background: active ? "rgba(34,197,94,0.12)" : "rgba(255,255,255,0.03)",
                            outline: active ? "2px solid var(--color-green)" : "1px solid rgba(255,255,255,0.06)",
                            outlineOffset: active ? 2 : 0,
                            transition: "all 0.2s",
                            position: "relative",
                          }}
                        >
                          {active && (
                            <div style={{
                              position: "absolute", top: 4, right: 4,
                              width: 16, height: 16, borderRadius: "50%",
                              background: "var(--color-green)",
                              display: "flex", alignItems: "center", justifyContent: "center",
                            }}>
                              <Check size={9} color="#fff" strokeWidth={3} />
                            </div>
                          )}
                          <div style={{
                            width: 48, height: 48, borderRadius: "50%",
                            overflow: "hidden", background: `#${bgColor}`,
                            border: `2px solid ${active ? "var(--color-green)" : "rgba(255,255,255,0.1)"}`,
                            flexShrink: 0,
                          }}>
                            <img src={previewUrl} alt={s.label} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                          </div>
                          <span style={{
                            fontSize: "0.62rem", fontWeight: active ? 700 : 500,
                            color: active ? "var(--color-green)" : "var(--color-text-muted)",
                            letterSpacing: "0.02em",
                          }}>
                            {s.label}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Selector de color de fondo */}
                <div>
                  <label className="dp-label" style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 12 }}>
                    <Palette size={12} /> Color de Fondo
                  </label>
                  <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                    {BG_COLORS.map((c) => (
                      <button
                        key={c.hex}
                        onClick={() => setBgColor(c.hex)}
                        title={c.label}
                        style={{
                          width: 32, height: 32, borderRadius: "50%",
                          background: `#${c.hex}`,
                          border: "none", cursor: "pointer",
                          outline: bgColor === c.hex ? "3px solid var(--color-green)" : "2px solid rgba(255,255,255,0.1)",
                          outlineOffset: bgColor === c.hex ? 2 : 0,
                          transition: "all 0.15s",
                          transform: bgColor === c.hex ? "scale(1.2)" : "scale(1)",
                          boxShadow: bgColor === c.hex ? `0 0 16px #${c.hex}88` : "none",
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* Seed / nombre */}
                <div>
                  <label className="dp-label" style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
                    <Type size={12} /> Nombre o Descripción
                  </label>
                  <div style={{ display: "flex", gap: 8 }}>
                    <input
                      className="dp-input"
                      style={{ flex: 1 }}
                      value={seed}
                      onChange={(e) => setSeed(e.target.value)}
                      placeholder="Escribe un nombre para generar el avatar..."
                    />
                    <button
                      className="btn btn-ghost"
                      onClick={randomize}
                      title="Generar aleatorio"
                      style={{ flexShrink: 0 }}
                    >
                      <Shuffle size={14} />
                    </button>
                  </div>
                  <p style={{ fontSize: "0.7rem", color: "var(--color-text-muted)", marginTop: 6 }}>
                    El avatar cambia en tiempo real según el texto que escribas.
                  </p>
                </div>

              </div>
            </div>
          </div>
        </div>

        <div style={{ marginTop: 32, paddingTop: 24, borderTop: "1px solid var(--color-border)", display: "flex", justifyContent: "flex-end" }}>
          <button className="btn btn-primary" onClick={onSave}>
            <Save size={15} />
            Registrar Usuario
          </button>
        </div>
      </div>
    </div>
  );
}
