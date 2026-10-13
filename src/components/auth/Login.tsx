// ─────────────────────────────────────────────────────────────
// Login.tsx — Inicio de Sesión Centrado, Limpio y Seguro (Sin Datos Sensibles)
// Diseño elegante, enfocado y profesional estilo SaaS moderno
// ─────────────────────────────────────────────────────────────
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Lock,
  Mail,
  ArrowRight,
  ShieldCheck,
  User,
  Activity,
  CheckCircle2,
} from "lucide-react";

interface LoginProps {
  onLogin: (role: "ENTRENADOR" | "APRENDIZ") => void;
}

export function Login({ onLogin }: LoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e?: React.FormEvent, forceRole?: "ENTRENADOR" | "APRENDIZ") => {
    if (e) e.preventDefault();
    setError("");

    if (!forceRole) {
      if (!email || !password) {
        setError("Por favor ingresa tu correo y contraseña.");
        return;
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setError("Ingresa un correo válido (ej: usuario@sena.edu.co).");
        return;
      }
      if (password.length < 6) {
        setError("La contraseña debe tener al menos 6 caracteres.");
        return;
      }
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      if (forceRole) {
        onLogin(forceRole);
      } else if (email.includes("entrenador") || email.includes("admin")) {
        onLogin("ENTRENADOR");
      } else {
        onLogin("APRENDIZ");
      }
    }, 500);
  };

  const handleQuickLogin = (role: "ENTRENADOR" | "APRENDIZ") => {
    setEmail(role === "ENTRENADOR" ? "entrenador@deportest.com" : "aprendiz@deportest.com");
    setPassword("123456");
    handleSubmit(undefined, role);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--color-bg)",
        position: "relative",
        padding: "24px",
        overflow: "hidden",
      }}
    >
      {/* Halo de luz ambiental centrado y sutil */}
      <div
        style={{
          position: "absolute",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(16, 185, 129, 0.1) 0%, transparent 70%)",
          filter: "blur(60px)",
          pointerEvents: "none",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="glass-elevated"
        style={{
          width: "100%",
          maxWidth: 440,
          padding: "36px 36px 32px",
          borderRadius: 24,
          border: "1px solid rgba(255, 255, 255, 0.09)",
          boxShadow: "0 24px 60px rgba(0, 0, 0, 0.5), 0 0 40px rgba(16, 185, 129, 0.08)",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Encabezado e Identidad */}
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: 14,
              background: "linear-gradient(135deg, var(--color-green), #059669)",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#ffffff",
              boxShadow: "0 8px 24px rgba(16, 185, 129, 0.35)",
              marginBottom: 16,
            }}
          >
            <Activity size={26} />
          </div>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 4 }}>
            <h1 style={{ fontSize: "1.45rem", fontWeight: 800, letterSpacing: "-0.03em" }}>
              DEPORTEST PRO
            </h1>
            <span
              style={{
                fontSize: "0.68rem",
                padding: "2px 8px",
                borderRadius: 99,
                background: "rgba(16, 185, 129, 0.15)",
                color: "var(--color-green)",
                fontWeight: 700,
                border: "1px solid rgba(16, 185, 129, 0.3)",
              }}
            >
              SENA
            </span>
          </div>

          <p style={{ fontSize: "0.82rem", color: "var(--color-text-secondary)" }}>
            Plataforma de Valoración Atlética & Salud Escolar
          </p>
        </div>

        {/* Mensaje de error si aplica */}
        {error && (
          <div
            style={{
              background: "rgba(244, 63, 94, 0.1)",
              border: "1px solid rgba(244, 63, 94, 0.3)",
              borderRadius: 10,
              padding: "10px 14px",
              color: "var(--color-rose)",
              fontSize: "0.78rem",
              fontWeight: 600,
              marginBottom: 16,
            }}
          >
            {error}
          </div>
        )}

        {/* Formulario de Login */}
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div>
            <label className="dp-label" style={{ marginBottom: 6 }}>Correo Institucional</label>
            <div style={{ position: "relative" }}>
              <div style={{ position: "absolute", left: 14, top: 12, color: "var(--color-text-muted)" }}>
                <Mail size={16} />
              </div>
              <input
                className="dp-input"
                type="email"
                placeholder="ejemplo@sena.edu.co"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                style={{ paddingLeft: 42 }}
              />
            </div>
          </div>

          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
              <label className="dp-label" style={{ marginBottom: 0 }}>Contraseña</label>
              <a href="#" style={{ fontSize: "0.72rem", color: "var(--color-green)", textDecoration: "none" }}>
                ¿Olvidaste tu clave?
              </a>
            </div>
            <div style={{ position: "relative" }}>
              <div style={{ position: "absolute", left: 14, top: 12, color: "var(--color-text-muted)" }}>
                <Lock size={16} />
              </div>
              <input
                className="dp-input"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                style={{ paddingLeft: 42 }}
              />
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading}
            style={{
              width: "100%",
              padding: "12px",
              justifyContent: "center",
              fontSize: "0.9rem",
              marginTop: 6,
            }}
          >
            {loading ? (
              <span>Iniciando sesión...</span>
            ) : (
              <>
                Ingresar al Sistema <ArrowRight size={16} />
              </>
            )}
          </button>
        </form>

        {/* Accesos de Demostración Rápida */}
        <div style={{ marginTop: 28, paddingTop: 20, borderTop: "1px solid var(--color-border)" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, marginBottom: 12 }}>
            <ShieldCheck size={14} color="var(--color-green)" />
            <span style={{ fontSize: "0.72rem", color: "var(--color-text-muted)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Accesos de Prueba Rápida
            </span>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            <button
              onClick={() => handleQuickLogin("ENTRENADOR")}
              className="btn btn-secondary"
              style={{ justifyContent: "center", fontSize: "0.8rem", padding: "10px" }}
              disabled={loading}
            >
              <User size={14} color="var(--color-green)" /> Rol Entrenador
            </button>
            <button
              onClick={() => handleQuickLogin("APRENDIZ")}
              className="btn btn-secondary"
              style={{ justifyContent: "center", fontSize: "0.8rem", padding: "10px" }}
              disabled={loading}
            >
              <User size={14} color="var(--color-text-secondary)" /> Rol Aprendiz
            </button>
          </div>
        </div>

        {/* Pie de seguridad institucional */}
        <div style={{ textAlign: "center", marginTop: 20, fontSize: "0.7rem", color: "var(--color-text-muted)" }}>
          Sistema seguro con protección de datos institucionales
        </div>
      </motion.div>
    </div>
  );
}
