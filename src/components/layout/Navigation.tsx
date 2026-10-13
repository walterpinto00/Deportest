// ─────────────────────────────────────────────────────────────
// Navigation.tsx — Barra de navegación por pestañas unificada
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
        background: "rgba(13, 18, 31, 0.75)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderBottom: "1px solid var(--color-border)",
        overflowX: "auto",
      }}
    >
      <div
        style={{
          maxWidth: 1320,
          margin: "0 auto",
          padding: "0 24px",
          display: "flex",
          gap: 6,
        }}
      >
        {visible.map((tab) => {
          const active = activeTab === tab.id;
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "12px 16px",
                fontSize: "0.82rem",
                fontWeight: active ? 600 : 500,
                fontFamily: "var(--font-sans)",
                color: active ? "#ffffff" : "var(--color-text-secondary)",
                background: active ? "rgba(255, 255, 255, 0.06)" : "transparent",
                border: "none",
                borderBottom: `2px solid ${active ? "var(--color-green)" : "transparent"}`,
                cursor: "pointer",
                transition: "all 0.15s ease",
                whiteSpace: "nowrap",
                borderRadius: "6px 6px 0 0",
              }}
              onMouseEnter={(e) => {
                if (!active) {
                  (e.currentTarget as HTMLButtonElement).style.color = "var(--color-text-primary)";
                  (e.currentTarget as HTMLButtonElement).style.background = "rgba(255, 255, 255, 0.02)";
                }
              }}
              onMouseLeave={(e) => {
                if (!active) {
                  (e.currentTarget as HTMLButtonElement).style.color = "var(--color-text-secondary)";
                  (e.currentTarget as HTMLButtonElement).style.background = "transparent";
                }
              }}
            >
              <Icon
                size={15}
                color={active ? "var(--color-green)" : "currentColor"}
              />
              {tab.label}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
