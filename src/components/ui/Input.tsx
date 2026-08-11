// ─────────────────────────────────────────────
// UI: Input Component
// ─────────────────────────────────────────────
import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export function Input({ label, error, className = "", ...props }: InputProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      {label && <label className="dp-label">{label}</label>}
      <input 
        className={`dp-input ${className}`} 
        style={error ? { borderColor: "var(--color-rose)" } : {}}
        {...props} 
      />
      {error && <span style={{ color: "var(--color-rose)", fontSize: "0.75rem", fontWeight: 600 }}>{error}</span>}
    </div>
  );
}
