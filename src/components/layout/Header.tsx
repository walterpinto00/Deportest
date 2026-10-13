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
              width: 38,
              height: 38,
              borderRadius: 10,
              background: "linear-gradient(135deg, var(--color-green-dark), var(--color-green))",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 4px 16px rgba(16, 185, 129, 0.25)",
              color: "#ffffff",
              flexShrink: 0,
            }}
          >
            <Activity size={20} />
          </div>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <h1 style={{ fontSize: "1.05rem", fontWeight: 800, letterSpacing: "-0.02em" }}>
                DEPORTEST PRO
              </h1>
              <span
                style={{
                  fontSize: "0.62rem",
                  padding: "1px 6px",
                  borderRadius: 99,
                  background: "rgba(16, 185, 129, 0.12)",
                  color: "var(--color-green)",
                  fontWeight: 700,
                  border: "1px solid rgba(16, 185, 129, 0.25)",
                }}
              >
                SENA
              </span>
            </div>
            <p style={{ fontSize: "0.68rem", color: "var(--color-text-muted)" }}>
              Sistema Institucional de Rendimiento Atlético
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
              background: "rgba(255, 255, 255, 0.03)",
              border: "1px solid var(--color-border)",
              borderRadius: 999,
              padding: "4px 12px",
            }}
          >
            <ShieldCheck size={14} color="var(--color-green)" />
            <span style={{ fontSize: "0.72rem", color: "var(--color-text-muted)", fontWeight: 600 }}>
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
                fontWeight: 600,
                fontSize: "0.78rem",
                cursor: "pointer",
                outline: "none",
              }}
            >
              <option value="ENTRENADOR" style={{ background: "#0d121f" }}>
                Entrenador / Instructor
              </option>
              <option value="APRENDIZ" style={{ background: "#0d121f" }}>
                Aprendiz / Deportista
              </option>
            </select>
          </div>

          {/* Botón Salir */}
          <button
            onClick={onLogout}
            style={{
              background: "rgba(244, 63, 94, 0.08)",
              border: "1px solid rgba(244, 63, 94, 0.2)",
              color: "var(--color-rose)",
              cursor: "pointer",
              padding: "7px 12px",
              borderRadius: 8,
              fontSize: "0.75rem",
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              gap: 6,
              transition: "all 0.2s ease",
            }}
            title="Cerrar sesión"
          >
            <LogOut size={13} />
            <span>Salir</span>
          </button>
        </div>
      </div>
    </header>
  );
}
