// ─────────────────────────────────────────────
// UI: Input Component
// ─────────────────────────────────────────────
import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export function Input({ label, className = "", ...props }: InputProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      {label && <label className="dp-label">{label}</label>}
      <input className={`dp-input ${className}`} {...props} />
    </div>
  );
}
