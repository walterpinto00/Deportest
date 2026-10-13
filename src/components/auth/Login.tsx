// ─────────────────────────────────────────────────────────────
// Login.tsx — Inicio de Sesión Institucional DEPORTEST PRO
// Rediseño de alta gama, sobrio, confiable y profesional
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
  FileText,
  Award,
  Sparkles,
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
        setError("Por favor completa las credenciales de acceso.");
        return;
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setError("Ingresa un correo institucional válido (ej: usuario@sena.edu.co).");
        return;
      }
      if (password.length < 6) {
        setError("La contraseña debe tener un mínimo de 6 caracteres.");
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
    }, 700);
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
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        background: "var(--color-bg)",
        position: "relative",
      }}
    >
      {/* ── COLUMNA IZQUIERDA: FORMULARIO DE ACCESO ── */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "48px 32px",
          position: "relative",
          zIndex: 2,
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          style={{ width: "100%", maxWidth: 410 }}
        >
          {/* Cabecera / Identidad */}
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 36 }}>
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 12,
                background: "linear-gradient(135deg, rgba(16,185,129,0.2), rgba(16,185,129,0.06))",
                border: "1px solid rgba(16,185,129,0.3)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--color-green)",
                boxShadow: "0 6px 20px rgba(16,185,129,0.15)",
              }}
            >
              <Activity size={22} />
            </div>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <h1 style={{ fontSize: "1.25rem", fontWeight: 800, letterSpacing: "-0.03em" }}>
                  DEPORTEST
                </h1>
                <span
                  style={{
                    fontSize: "0.65rem",
                    padding: "2px 7px",
                    borderRadius: 99,
                    background: "rgba(16, 185, 129, 0.12)",
                    color: "var(--color-green)",
                    fontWeight: 700,
                    letterSpacing: "0.06em",
                    border: "1px solid rgba(16, 185, 129, 0.25)",
                  }}
                >
                  PRO
                </span>
              </div>
              <p style={{ fontSize: "0.72rem", color: "var(--color-text-secondary)", letterSpacing: "0.02em" }}>
                Plataforma de Alto Rendimiento · SENA
              </p>
            </div>
          </div>

          <div style={{ marginBottom: 28 }}>
            <h2 style={{ fontSize: "1.65rem", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: 6 }}>
              Iniciar Sesión
            </h2>
            <p style={{ fontSize: "0.83rem", color: "var(--color-text-secondary)" }}>
              Ingresa tus credenciales autorizadas para acceder al portal.
            </p>
          </div>

          {/* Formulario */}
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                style={{
                  background: "rgba(244, 63, 94, 0.08)",
                  border: "1px solid rgba(244, 63, 94, 0.25)",
                  borderRadius: 10,
                  padding: "10px 14px",
                  color: "var(--color-rose)",
                  fontSize: "0.78rem",
                  fontWeight: 600,
                }}
              >
                {error}
              </motion.div>
            )}

            <div>
              <label className="dp-label">Correo Electrónico Institucional</label>
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
                <a href="#" style={{ fontSize: "0.72rem", color: "var(--color-green)", textDecoration: "none", fontWeight: 600 }}>
                  ¿Olvidaste tu contraseña?
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
                marginTop: 6,
                fontSize: "0.88rem",
              }}
            >
              {loading ? (
                <span>Validando credenciales...</span>
              ) : (
                <>
                  Entrar a la Plataforma <ArrowRight size={15} />
                </>
              )}
            </button>
          </form>

          {/* Acceso Rápido / Roles de Prueba */}
          <div style={{ marginTop: 32, paddingTop: 20, borderTop: "1px solid var(--color-border)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 12 }}>
              <ShieldCheck size={14} color="var(--color-green)" />
              <span style={{ fontSize: "0.72rem", color: "var(--color-text-muted)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em" }}>
                Accesos de Demostración Rápida
              </span>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              <button
                onClick={() => handleQuickLogin("ENTRENADOR")}
                className="btn btn-secondary"
                style={{
                  justifyContent: "center",
                  fontSize: "0.78rem",
                  padding: "9px 12px",
                }}
                disabled={loading}
              >
                <User size={13} color="var(--color-green)" /> Rol Entrenador
              </button>
              <button
                onClick={() => handleQuickLogin("APRENDIZ")}
                className="btn btn-secondary"
                style={{
                  justifyContent: "center",
                  fontSize: "0.78rem",
                  padding: "9px 12px",
                }}
                disabled={loading}
              >
                <User size={13} color="var(--color-text-secondary)" /> Rol Aprendiz
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ── COLUMNA DERECHA: PANEL INSTITUCIONAL Y DE CONFIANZA ── */}
      <div
        style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "48px",
          borderLeft: "1px solid var(--color-border)",
          background: "linear-gradient(135deg, #090e1a 0%, #070a12 100%)",
          overflow: "hidden",
        }}
      >
        {/* Glow ambiental de fondo */}
        <div
          style={{
            position: "absolute",
            width: 450,
            height: 450,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(16,185,129,0.08) 0%, transparent 70%)",
            filter: "blur(60px)",
            pointerEvents: "none",
          }}
        />

        {/* Tarjeta central ejecutiva */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="glass-elevated"
          style={{
            maxWidth: 460,
            padding: 36,
            borderRadius: 20,
            position: "relative",
            zIndex: 1,
            display: "flex",
            flexDirection: "column",
            gap: 24,
          }}
        >
          <div>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                padding: "4px 10px",
                borderRadius: 99,
                background: "rgba(16, 185, 129, 0.1)",
                border: "1px solid rgba(16, 185, 129, 0.2)",
                fontSize: "0.72rem",
                color: "var(--color-green)",
                fontWeight: 600,
                marginBottom: 16,
              }}
            >
              <Sparkles size={12} />
              <span>Sistema Oficial de Acondicionamiento Físico</span>
            </div>

            <h3 style={{ fontSize: "1.65rem", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.25, marginBottom: 12 }}>
              Precisión Atlética y Salud Integral para Aprendices
            </h3>

            <p style={{ fontSize: "0.84rem", color: "var(--color-text-secondary)", lineHeight: 1.65 }}>
              Centraliza las evaluaciones antropométricas, pruebas físicas estandarizadas y pautas de nutrición en un entorno clínico digital diseñado para instructores y deportistas.
            </p>
          </div>

          {/* Indicadores institucionales */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {[
              {
                icon: FileText,
                titulo: "Fichas Antropométricas Clínicas",
                desc: "Medición de perímetros, pliegues y cálculo automático de IMC según la OMS.",
              },
              {
                icon: Award,
                titulo: "Baremos y Pruebas Físicas",
                desc: "Evaluación continua de tests atléticos (Cooper, Ruffier, Velocidad y Salto).",
              },
              {
                icon: CheckCircle2,
                titulo: "Reportes Exportables para Padres y Directivas",
                desc: "Generación de informes estructurados listos para imprimir o archivar en PDF.",
              },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 14,
                    padding: "12px 14px",
                    borderRadius: 10,
                    background: "rgba(255, 255, 255, 0.02)",
                    border: "1px solid rgba(255, 255, 255, 0.05)",
                  }}
                >
                  <div
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: 8,
                      background: "rgba(16, 185, 129, 0.1)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "var(--color-green)",
                      flexShrink: 0,
                    }}
                  >
                    <Icon size={16} />
                  </div>
                  <div>
                    <div style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--color-text-primary)" }}>
                      {item.titulo}
                    </div>
                    <div style={{ fontSize: "0.73rem", color: "var(--color-text-muted)", marginTop: 2 }}>
                      {item.desc}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
