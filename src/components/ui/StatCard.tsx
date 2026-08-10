// ─────────────────────────────────────────────
// UI: StatCard Component
// ─────────────────────────────────────────────
import React from "react";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  sub?: string;
  color: string;
}

export function StatCard({ icon: Icon, label, value, sub, color }: StatCardProps) {
  return (
    <div
      className="glass"
      style={{
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        gap: 8,
        transition: "transform 0.2s, box-shadow 0.2s",
        cursor: "default",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.transform = "translateY(-3px)";
        (e.currentTarget as HTMLDivElement).style.boxShadow = `0 12px 40px rgba(0,0,0,0.5)`;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
        (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
      }}
    >
      <div
        style={{
          width: 40,
          height: 40,
          borderRadius: 10,
          background: `${color}22`,
          border: `1px solid ${color}44`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Icon size={20} color={color} />
      </div>
      <div style={{ fontSize: "0.75rem", color: "var(--color-text-muted)", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase" }}>{label}</div>
      <div style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--color-text-primary)" }}>{value}</div>
      {sub && <div style={{ fontSize: "0.75rem", color: "var(--color-text-secondary)" }}>{sub}</div>}
    </div>
  );
}
