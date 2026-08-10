// ─────────────────────────────────────────────
// UI: Select Component
// ─────────────────────────────────────────────
import React from "react";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  children: React.ReactNode;
}

export function Select({ label, className = "", children, ...props }: SelectProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      {label && <label className="dp-label">{label}</label>}
      <select className={`dp-select ${className}`} {...props}>
        {children}
      </select>
    </div>
  );
}
