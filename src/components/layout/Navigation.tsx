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
        background: "rgba(11, 17, 30, 0.88)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderBottom: "1px solid var(--color-border)",
        overflowX: "auto",
      }}
    >
      <div
        style={{
          maxWidth: 1320,
          margin: "0 auto",
          padding: "0 20px",
          display: "flex",
          gap: 8,
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
                fontSize: "0.94rem",
                fontWeight: active ? 700 : 500,
                fontFamily: "var(--font-sans)",
                color: active ? "#ffffff" : "var(--color-text-secondary)",
                background: active ? `linear-gradient(180deg, rgba(255, 255, 255, 0.06) 0%, rgba(${tabColor}, 0.05) 100%)` : "transparent",
                border: "none",
                borderBottom: `3px solid ${active ? tabColor : "transparent"}`,
                boxShadow: active ? `inset 0 -2px 10px ${tabColor}33` : "none",
                cursor: "pointer",
                transition: "all 0.2s ease",
                whiteSpace: "nowrap",
                borderRadius: "8px 8px 0 0",
              }}
              onMouseEnter={(e) => {
                if (!active) {
                  (e.currentTarget as HTMLButtonElement).style.color = "#ffffff";
                  (e.currentTarget as HTMLButtonElement).style.background = "rgba(255, 255, 255, 0.04)";
                }
              }}
              onMouseLeave={(e) => {
                if (!active) {
                  (e.currentTarget as HTMLButtonElement).style.color = "var(--color-text-secondary)";
                  (e.currentTarget as HTMLButtonElement).style.background = "transparent";
                }
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: active ? tabColor : "currentColor",
                  filter: active ? `drop-shadow(0 0 6px ${tabColor}88)` : "none",
                  transition: "all 0.2s ease",
                }}
              >
                <Icon size={18} />
              </div>
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
