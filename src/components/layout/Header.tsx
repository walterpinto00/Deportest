// ─────────────────────────────────────────────────────────────
// Header.tsx — Barra de navegación superior ejecutiva e institucional
// Diseñada para docentes: ultracompacta, 100% responsiva, sin traslapes
// ─────────────────────────────────────────────────────────────
import React from "react";
import { Activity, ShieldCheck, LogOut, Sun, Moon, Sparkles, Search } from "lucide-react";

type Role = "ENTRENADOR" | "APRENDIZ";

interface HeaderProps {
  role: Role;
  onRoleChange: (r: Role) => void;
  onLogout: () => void;
  theme: "light" | "dark";
  onToggleTheme: () => void;
  onOpenGemini: () => void;
  onOpenSearch?: () => void;
}

export function Header({
  role,
  onRoleChange,
  onLogout,
  theme,
  onToggleTheme,
  onOpenGemini,
  onOpenSearch,
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
        height: 64,
        display: "flex",
        alignItems: "center",
      }}
    >
      <div
        style={{
          maxWidth: 1320,
          margin: "0 auto",
          padding: "0 20px",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "nowrap",
          gap: 12,
        }}
      >
        {/* 1. Marca SENA & Logo (Compacto) */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
          <div
            style={{
              width: 38,
              height: 38,
              borderRadius: 10,
              background: "linear-gradient(135deg, var(--color-green-dark), var(--color-green))",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 4px 12px rgba(16, 185, 129, 0.35)",
              color: "#ffffff",
              flexShrink: 0,
            }}
          >
            <Activity size={20} />
          </div>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span
                style={{
                  fontSize: "1.05rem",
                  fontWeight: 900,
                  letterSpacing: "-0.02em",
                  color: "var(--color-text-primary)",
                  whiteSpace: "nowrap",
                }}
              >
                DEPORTEST PRO
              </span>
              <span
                style={{
                  fontSize: "0.68rem",
                  padding: "1px 6px",
                  borderRadius: 6,
                  background: "rgba(16, 185, 129, 0.15)",
                  color: "var(--color-green)",
                  fontWeight: 800,
                  border: "1px solid rgba(16, 185, 129, 0.35)",
                  letterSpacing: "0.04em",
                }}
              >
                SENA
              </span>
            </div>
            <p
              style={{
                fontSize: "0.7rem",
                color: "var(--color-text-muted)",
                fontWeight: 500,
                margin: 0,
                whiteSpace: "nowrap",
                lineHeight: 1.1,
              }}
            >
              Rendimiento Atlético & Salud
            </p>
          </div>
        </div>

        {/* 2. Buscador Inteligente Global (Compacto y Central) */}
        <div style={{ flex: "0 1 240px", minWidth: 150 }}>
          <button
            type="button"
            onClick={onOpenSearch}
            className="btn btn-secondary"
            style={{
              width: "100%",
              justifyContent: "space-between",
              padding: "7px 12px",
              borderRadius: 10,
              background: "var(--color-bg-card)",
              border: "1.5px solid var(--color-border)",
              boxShadow: "none",
              cursor: "pointer",
            }}
            title="Abrir Buscador Inteligente (Ctrl + K)"
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <Search size={14} color="var(--color-green)" />
              <span style={{ fontSize: "0.78rem", color: "var(--color-text-secondary)", fontWeight: 600, whiteSpace: "nowrap" }}>
                Buscar...
              </span>
            </div>
            <kbd
              style={{
                fontSize: "0.65rem",
                padding: "1px 5px",
                borderRadius: 4,
                background: "var(--color-bg-surface)",
                border: "1px solid var(--color-border)",
                color: "var(--color-text-muted)",
                fontFamily: "var(--font-mono)",
                fontWeight: 700,
              }}
            >
              Ctrl K
            </kbd>
          </button>
        </div>

        {/* 3. Acciones de la Barra Superior (Fila Única, Nunca se traslapa) */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0, flexWrap: "nowrap" }}>
          {/* Botón Asistente Google Gemini */}
          <button
            onClick={onOpenGemini}
            className="btn"
            style={{
              background: "linear-gradient(135deg, #4285F4 0%, #9B51E0 50%, #34A853 100%)",
              color: "#ffffff",
              padding: "7px 12px",
              fontSize: "0.78rem",
              borderRadius: 10,
              boxShadow: "0 3px 10px rgba(66, 133, 244, 0.25)",
              gap: 6,
              whiteSpace: "nowrap",
            }}
            title="Abrir Asistente Pedagógico con Google Gemini"
          >
            <Sparkles size={14} />
            <span>Asistente IA</span>
          </button>

          {/* Selector de Tema Claro / Oscuro */}
          <button
            onClick={onToggleTheme}
            className="btn btn-secondary"
            style={{
              padding: "7px 10px",
              borderRadius: 10,
              fontSize: "0.78rem",
              gap: 5,
              cursor: "pointer",
              whiteSpace: "nowrap",
            }}
            title={theme === "light" ? "Cambiar a Modo Oscuro" : "Cambiar a Modo Claro"}
          >
            {theme === "light" ? (
              <>
                <Moon size={14} color="#64748b" />
                <span style={{ display: "inline-block" }}>Oscuro</span>
              </>
            ) : (
              <>
                <Sun size={14} color="#f59e0b" />
                <span style={{ display: "inline-block" }}>Claro</span>
              </>
            )}
          </button>

          {/* Selector de Rol */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              background: "var(--color-bg-card)",
              border: "1px solid var(--color-border)",
              borderRadius: 10,
              padding: "5px 10px",
              whiteSpace: "nowrap",
            }}
          >
            <ShieldCheck size={14} color="var(--color-green)" />
            <select
              value={role}
              onChange={(e) => onRoleChange(e.target.value as Role)}
              style={{
                background: "transparent",
                border: "none",
                color: "var(--color-text-primary)",
                fontFamily: "var(--font-sans)",
                fontWeight: 700,
                fontSize: "0.78rem",
                cursor: "pointer",
                outline: "none",
              }}
            >
              <option value="ENTRENADOR">Entrenador</option>
              <option value="APRENDIZ">Aprendiz</option>
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
              padding: "7px 10px",
              borderRadius: 10,
              fontSize: "0.78rem",
              fontWeight: 700,
              display: "flex",
              alignItems: "center",
              gap: 5,
              whiteSpace: "nowrap",
              transition: "all 0.2s ease",
            }}
            title="Cerrar sesión"
          >
            <LogOut size={14} />
            <span>Salir</span>
          </button>
        </div>
      </div>
    </header>
  );
}
