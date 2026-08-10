// ─────────────────────────────────────────────
// Tab: Usuarios & Roles
// ─────────────────────────────────────────────
import React, { useState } from "react";
import { Users, Save, RefreshCw } from "lucide-react";
import { Input } from "../ui/Input";
import { Select } from "../ui/Select";

interface TabUsuariosProps {
  onSave: () => void;
}

const AVATAR_STYLES = [
  { value: "dylan",            label: "Dylan (Profesional)" },
  { value: "avataaars-neutral",label: "Avataaars Neutro" },
  { value: "miniavs",          label: "Miniavs (Minimalista)" },
  { value: "pixel-art",        label: "Pixel Art (Retro)" },
  { value: "fun-emoji",        label: "Emojis Divertidos" },
  { value: "bottts-neutral",   label: "Robots (Bottts)" },
  { value: "initials",         label: "Iniciales (Corporativo)" },
];

export function TabUsuarios({ onSave }: TabUsuariosProps) {
  const [seed, setSeed]   = useState("deportest");
  const [style, setStyle] = useState("dylan");

  const avatarUrl = `https://api.dicebear.com/9.x/${style}/svg?seed=${seed}&backgroundColor=c0aede,b6e3f4,ffdfbf`;

  return (
    <div className="animate-fade-in" style={{ display: "flex", flexDirection: "column", gap: 24 }}>

      {/* Stats row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 16 }}>
        {[
          { label: "Usuarios Totales", value: "48", sub: "Activos este mes" },
          { label: "Instructores",     value: "6",  sub: "Roles asignados" },
          { label: "Aprendices",       value: "42", sub: "Programas SENA" },
        ].map((s) => (
          <div key={s.label} className="glass" style={{ padding: 20 }}>
            <div style={{ fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", color: "var(--color-text-muted)" }}>{s.label}</div>
            <div style={{ fontSize: "2rem", fontWeight: 900, color: "var(--color-green)", marginTop: 4 }}>{s.value}</div>
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
                <option>INSTRUCTOR</option>
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

          {/* Avatar */}
          <div style={{ gridColumn: "1 / -1" }}>
            <p className="section-title">Personalizar Avatar</p>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 32,
                background: "rgba(34,197,94,0.05)",
                border: "1px solid rgba(34,197,94,0.15)",
                borderRadius: 14,
                padding: 24,
              }}
            >
              <div
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: "50%",
                  overflow: "hidden",
                  border: "3px solid rgba(34,197,94,0.4)",
                  background: "#1e2d3d",
                  flexShrink: 0,
                  boxShadow: "0 0 30px rgba(34,197,94,0.2)",
                }}
              >
                <img src={avatarUrl} alt="Avatar" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
              <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 12 }}>
                <Select label="Estilo de Avatar" value={style} onChange={(e) => setStyle(e.target.value)}>
                  {AVATAR_STYLES.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
                </Select>
                <div>
                  <label className="dp-label">Descripción para generar avatar</label>
                  <div style={{ display: "flex", gap: 8 }}>
                    <input
                      className="dp-input"
                      style={{ flex: 1 }}
                      value={seed}
                      onChange={(e) => setSeed(e.target.value)}
                      placeholder="Escribe un nombre o descripción..."
                    />
                    <button
                      className="btn btn-ghost"
                      onClick={() => setSeed(Math.random().toString(36).slice(2, 8))}
                      title="Avatar aleatorio"
                    >
                      <RefreshCw size={14} />
                    </button>
                  </div>
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
