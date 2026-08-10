// ─────────────────────────────────────────────
// Layout: Navigation Component
// ─────────────────────────────────────────────
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
        background: "rgba(17, 24, 39, 0.6)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderBottom: "1px solid var(--color-border)",
        overflowX: "auto",
      }}
    >
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "0 24px",
          display: "flex",
          gap: 2,
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
                padding: "14px 18px",
                fontSize: "0.82rem",
                fontWeight: active ? 700 : 500,
                fontFamily: "var(--font-sans)",
                color: active ? tab.color : "var(--color-text-muted)",
                background: active ? `${tab.color}12` : "transparent",
                border: "none",
                borderBottom: `2px solid ${active ? tab.color : "transparent"}`,
                cursor: "pointer",
                transition: "all 0.2s",
                whiteSpace: "nowrap",
                letterSpacing: active ? "-0.01em" : "normal",
              }}
              onMouseEnter={(e) => {
                if (!active) {
                  (e.currentTarget as HTMLButtonElement).style.color = "var(--color-text-secondary)";
                  (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.03)";
                }
              }}
              onMouseLeave={(e) => {
                if (!active) {
                  (e.currentTarget as HTMLButtonElement).style.color = "var(--color-text-muted)";
                  (e.currentTarget as HTMLButtonElement).style.background = "transparent";
                }
              }}
            >
              <Icon size={15} />
              {tab.label}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
