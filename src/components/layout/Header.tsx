// ─────────────────────────────────────────────────────────────
// Header.tsx — Barra de navegación superior ejecutiva e institucional
// Diseñada para docentes: incluye selector de tema (Claro/Oscuro) y acceso directo a Google Gemini
// ─────────────────────────────────────────────────────────────
import React from "react";
import { Activity, ShieldCheck, LogOut, Sun, Moon, Sparkles } from "lucide-react";

type Role = "ENTRENADOR" | "APRENDIZ";

interface HeaderProps {
  role: Role;
  onRoleChange: (r: Role) => void;
  onLogout: () => void;
  theme: "light" | "dark";
  onToggleTheme: () => void;
  onOpenGemini: () => void;
}

export function Header({
  role,
  onRoleChange,
  onLogout,
  theme,
  onToggleTheme,
  onOpenGemini,
}: HeaderProps) {
  return (
    <header
      style={{
        background: "var(--color-bg-surface)",
        borderBottom: "1px solid var(--color-border)",
        position: "sticky",
        top: 0,
        zIndex: 100,
        boxShadow: "var(--shadow-sm)",
      }}
    >
      <div
        style={{
          maxWidth: 1320,
          margin: "0 auto",
          padding: "0 24px",
          height: 66,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 12,
        }}
      >
        {/* Identidad / Marca SENA */}
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 12,
              background: "linear-gradient(135deg, var(--color-green-dark), var(--color-green))",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 4px 16px rgba(16, 185, 129, 0.35)",
              color: "#ffffff",
              flexShrink: 0,
            }}
          >
            <Activity size={24} />
          </div>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <h1
                style={{
                  fontSize: "1.2rem",
                  fontWeight: 800,
                  letterSpacing: "-0.02em",
                  color: "var(--color-text-primary)",
                }}
              >
                DEPORTEST PRO
              </h1>
              <span
                style={{
                  fontSize: "0.72rem",
                  padding: "2px 8px",
                  borderRadius: 99,
                  background: "rgba(16, 185, 129, 0.15)",
                  color: "var(--color-green)",
                  fontWeight: 800,
                  border: "1px solid rgba(16, 185, 129, 0.35)",
                  letterSpacing: "0.05em",
                }}
              >
                SENA
              </span>
            </div>
            <p style={{ fontSize: "0.78rem", color: "var(--color-text-muted)", fontWeight: 500 }}>
              Sistema Institucional de Rendimiento Atlético & Salud
            </p>
          </div>
        </div>

        {/* Acciones de la Barra Superior */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
          {/* Botón Destacado: Asistente Google Gemini / AI Studio */}
          <button
            onClick={onOpenGemini}
            className="btn"
            style={{
              background: "linear-gradient(135deg, #4285F4 0%, #9B51E0 50%, #34A853 100%)",
              color: "#ffffff",
              padding: "8px 16px",
              fontSize: "0.82rem",
              borderRadius: 10,
              boxShadow: "0 4px 14px rgba(66, 133, 244, 0.3)",
              gap: 6,
            }}
            title="Abrir Asistente Pedagógico con Google Gemini"
          >
            <Sparkles size={16} />
            <span>Asistente IA Docente</span>
          </button>

          {/* Selector de Tema Claro / Oscuro */}
          <button
            onClick={onToggleTheme}
            className="btn btn-secondary"
            style={{
              padding: "8px 14px",
              borderRadius: 10,
              fontSize: "0.82rem",
              gap: 6,
              cursor: "pointer",
            }}
            title={theme === "light" ? "Cambiar a Modo Oscuro" : "Cambiar a Modo Claro"}
          >
            {theme === "light" ? (
              <>
                <Moon size={15} color="#64748b" />
                <span>Modo Oscuro</span>
              </>
            ) : (
              <>
                <Sun size={15} color="#f59e0b" />
                <span>Modo Claro</span>
              </>
            )}
          </button>

          {/* Selector de Rol */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              background: "var(--color-bg-card)",
              border: "1px solid var(--color-border)",
              borderRadius: 10,
              padding: "6px 12px",
            }}
          >
            <ShieldCheck size={16} color="var(--color-green)" />
            <span style={{ fontSize: "0.76rem", color: "var(--color-text-muted)", fontWeight: 700 }}>
              ROL:
            </span>
            <select
              value={role}
              onChange={(e) => onRoleChange(e.target.value as Role)}
              style={{
                background: "transparent",
                border: "none",
                color: "var(--color-text-primary)",
                fontFamily: "var(--font-sans)",
                fontWeight: 700,
                fontSize: "0.82rem",
                cursor: "pointer",
                outline: "none",
              }}
            >
              <option value="ENTRENADOR">Entrenador / Instructor</option>
              <option value="APRENDIZ">Aprendiz / Deportista</option>
            </select>
          </div>

          {/* Botón Salir */}
          <button
            onClick={onLogout}
            style={{
              background: "rgba(244, 63, 94, 0.1)",
              border: "1px solid rgba(244, 63, 94, 0.25)",
              color: "#e11d48",
              cursor: "pointer",
              padding: "8px 14px",
              borderRadius: 10,
              fontSize: "0.82rem",
              fontWeight: 700,
              display: "flex",
              alignItems: "center",
              gap: 6,
              transition: "all 0.2s ease",
            }}
            title="Cerrar sesión"
          >
            <LogOut size={15} />
            <span>Salir</span>
          </button>
        </div>
      </div>
    </header>
  );
}
