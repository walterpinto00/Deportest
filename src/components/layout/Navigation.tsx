// ─────────────────────────────────────────────────────────────
// Navigation.tsx — Barra de navegación por pestañas unificada
// Adaptable automáticamente a Modo Claro y Modo Oscuro
// ─────────────────────────────────────────────────────────────
import React from "react";
import { LucideIcon } from "lucide-react";

export interface TabConfig {
  id: string;
  icon: LucideIcon;
  label: string;
  color: string;
  allowedRoles: string[];
}

interface NavigationProps {
  tabs: TabConfig[];
  activeTab: string;
  role: string;
  onTabChange: (id: string) => void;
}

export function Navigation({ tabs, activeTab, role, onTabChange }: NavigationProps) {
  const visible = tabs.filter((t) => t.allowedRoles.includes(role));

  return (
    <nav
      style={{
        background: "var(--color-bg-surface)",
        borderBottom: "1px solid var(--color-border)",
        overflowX: "auto",
        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.03)",
      }}
    >
      <div
        style={{
          maxWidth: 1320,
          margin: "0 auto",
          padding: "0 20px",
          display: "flex",
          gap: 6,
        }}
      >
        {visible.map((tab) => {
          const active = activeTab === tab.id;
          const Icon = tab.icon;
          const tabColor = tab.color || "#10b981";
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "14px 18px",
                fontSize: "0.92rem",
                fontWeight: active ? 800 : 600,
                fontFamily: "var(--font-sans)",
                color: active ? tabColor : "var(--color-text-secondary)",
                background: active ? `${tabColor}12` : "transparent",
                border: "none",
                borderBottom: `3px solid ${active ? tabColor : "transparent"}`,
                cursor: "pointer",
                transition: "all 0.2s ease",
                whiteSpace: "nowrap",
                borderRadius: "8px 8px 0 0",
              }}
              onMouseEnter={(e) => {
                if (!active) {
                  (e.currentTarget as HTMLButtonElement).style.background = "var(--color-bg-card)";
                  (e.currentTarget as HTMLButtonElement).style.color = "var(--color-text-primary)";
                }
              }}
              onMouseLeave={(e) => {
                if (!active) {
                  (e.currentTarget as HTMLButtonElement).style.background = "transparent";
                  (e.currentTarget as HTMLButtonElement).style.color = "var(--color-text-secondary)";
                }
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: active ? tabColor : "currentColor",
                }}
              >
                <Icon size={19} />
              </div>
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
