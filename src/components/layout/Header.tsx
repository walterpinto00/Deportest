// ─────────────────────────────────────────────────────────────
// Header.tsx — Barra de navegación superior ejecutiva
// ─────────────────────────────────────────────────────────────
import React from "react";
import { Activity, ShieldCheck, LogOut } from "lucide-react";

type Role = "ENTRENADOR" | "APRENDIZ";

interface HeaderProps {
  role: Role;
  onRoleChange: (r: Role) => void;
  onLogout: () => void;
}

export function Header({ role, onRoleChange, onLogout }: HeaderProps) {
  return (
    <header
      style={{
        background: "rgba(7, 10, 18, 0.85)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: "1px solid var(--color-border)",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}
    >
      <div
        style={{
          maxWidth: 1320,
          margin: "0 auto",
          padding: "0 24px",
          height: 62,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Identidad / Marca */}
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div
            style={{
              width: 42,
              height: 42,
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
            <Activity size={22} />
          </div>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <h1 style={{ fontSize: "1.15rem", fontWeight: 800, letterSpacing: "-0.02em", color: "#ffffff" }}>
                DEPORTEST PRO
              </h1>
              <span
                style={{
                  fontSize: "0.72rem",
                  padding: "2px 8px",
                  borderRadius: 99,
                  background: "rgba(16, 185, 129, 0.18)",
                  color: "#34d399",
                  fontWeight: 800,
                  border: "1px solid rgba(16, 185, 129, 0.35)",
                  letterSpacing: "0.05em",
                }}
              >
                SENA
              </span>
            </div>
            <p style={{ fontSize: "0.78rem", color: "var(--color-text-secondary)", fontWeight: 500 }}>
              Sistema Institucional de Rendimiento Atlético & Salud
            </p>
          </div>
        </div>

        {/* Panel de Usuario & Rol */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {/* Selector de Rol */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              background: "rgba(255, 255, 255, 0.05)",
              border: "1px solid var(--color-border)",
              borderRadius: 999,
              padding: "6px 14px",
            }}
          >
            <ShieldCheck size={16} color="var(--color-green-light)" />
            <span style={{ fontSize: "0.78rem", color: "var(--color-text-secondary)", fontWeight: 700 }}>
              ROL:
            </span>
            <select
              value={role}
              onChange={(e) => onRoleChange(e.target.value as Role)}
              style={{
                background: "transparent",
                border: "none",
                color: "#ffffff",
                fontFamily: "var(--font-sans)",
                fontWeight: 700,
                fontSize: "0.85rem",
                cursor: "pointer",
                outline: "none",
              }}
            >
              <option value="ENTRENADOR" style={{ background: "#0f172a", color: "#ffffff" }}>
                Entrenador / Instructor
              </option>
              <option value="APRENDIZ" style={{ background: "#0f172a", color: "#ffffff" }}>
                Aprendiz / Deportista
              </option>
            </select>
          </div>

          {/* Botón Salir */}
          <button
            onClick={onLogout}
            style={{
              background: "rgba(244, 63, 94, 0.12)",
              border: "1px solid rgba(244, 63, 94, 0.3)",
              color: "#fda4af",
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
