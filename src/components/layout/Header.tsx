// ─────────────────────────────────────────────
// Layout: Header Component
// ─────────────────────────────────────────────
import React from "react";
import { Activity, ShieldCheck } from "lucide-react";

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
        background: "rgba(10, 15, 30, 0.85)",
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
          maxWidth: 1280,
          margin: "0 auto",
          padding: "0 24px",
          height: 64,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Brand */}
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 12,
              background: "linear-gradient(135deg, #16a34a, #22c55e)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 4px 16px rgba(34,197,94,0.35)",
              flexShrink: 0,
            }}
          >
            <Activity size={22} color="#fff" />
          </div>
          <div>
            <h1
              style={{
                fontSize: "1.1rem",
                fontWeight: 800,
                letterSpacing: "-0.02em",
                background: "linear-gradient(135deg, #f1f5f9, #94a3b8)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              DEPORTEST PRO
            </h1>
            <p style={{ fontSize: "0.68rem", color: "var(--color-green)", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>
              Plataforma Atlética · SENA
            </p>
          </div>
        </div>

        {/* Role Switcher */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            background: "rgba(255,255,255,0.04)",
            border: "1px solid var(--color-border)",
            borderRadius: 999,
            padding: "6px 8px 6px 12px",
          }}
        >
          <ShieldCheck size={14} color="var(--color-green)" />
          <span style={{ fontSize: "0.75rem", color: "var(--color-text-muted)", fontWeight: 600 }}>ROL:</span>
          <select
            value={role}
            onChange={(e) => onRoleChange(e.target.value as Role)}
            style={{
              background: "transparent",
              border: "none",
              color: "var(--color-text-primary)",
              fontFamily: "var(--font-sans)",
              fontWeight: 700,
              fontSize: "0.8rem",
              cursor: "pointer",
              outline: "none",
            }}
          >
            <option value="ENTRENADOR" style={{ background: "#1a2236" }}>Entrenador</option>
            <option value="APRENDIZ" style={{ background: "#1a2236" }}>Aprendiz</option>
          </select>
          <button 
            onClick={onLogout}
            style={{
              background: "transparent",
              border: "none",
              color: "var(--color-rose)",
              cursor: "pointer",
              padding: "4px",
              marginLeft: 8,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "50%",
              transition: "background 0.2s"
            }}
            title="Cerrar sesión"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
          </button>
        </div>
      </div>
    </header>
  );
}
