// ─────────────────────────────────────────────────────────────
// Login.tsx — Inicio de Sesión DEPORTEST PRO (Sencillo, Visual y Limpio)
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
  Flame,
  CheckCircle2,
  TrendingUp,
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
        setError("Por favor completa los dos campos para ingresar.");
        return;
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setError("Ingresa un correo válido (ej: usuario@sena.edu.co).");
        return;
      }
      if (password.length < 6) {
        setError("La contraseña debe tener mínimo 6 caracteres.");
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
    }, 600);
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
        gridTemplateColumns: "1.1fr 0.9fr",
        background: "var(--color-bg)",
        position: "relative",
      }}
    >
      {/* ── COLUMNA IZQUIERDA: FORMULARIO LIMPIO ── */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "40px",
          position: "relative",
          zIndex: 2,
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          style={{ width: "100%", maxWidth: 390 }}
        >
          {/* Logo y Nombre */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 32 }}>
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 12,
                background: "linear-gradient(135deg, var(--color-green), #059669)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#ffffff",
                boxShadow: "0 6px 20px rgba(16,185,129,0.3)",
              }}
            >
              <Activity size={22} />
            </div>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <h1 style={{ fontSize: "1.2rem", fontWeight: 800, letterSpacing: "-0.02em" }}>
                  DEPORTEST
                </h1>
                <span
                  style={{
                    fontSize: "0.65rem",
                    padding: "2px 7px",
                    borderRadius: 99,
                    background: "rgba(16, 185, 129, 0.15)",
                    color: "var(--color-green)",
                    fontWeight: 700,
                  }}
                >
                  SENA
                </span>
              </div>
              <p style={{ fontSize: "0.74rem", color: "var(--color-text-secondary)" }}>
                Plataforma Deportiva Escolar
              </p>
            </div>
          </div>

          <div style={{ marginBottom: 24 }}>
            <h2 style={{ fontSize: "1.5rem", fontWeight: 800, letterSpacing: "-0.02em", color: "#ffffff", marginBottom: 4 }}>
              Iniciar Sesión
            </h2>
            <p style={{ fontSize: "0.82rem", color: "var(--color-text-secondary)" }}>
              Ingresa al sistema para gestionar o consultar registros.
            </p>
          </div>

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {error && (
              <div
                style={{
                  background: "rgba(244, 63, 94, 0.1)",
                  border: "1px solid rgba(244, 63, 94, 0.3)",
                  borderRadius: 8,
                  padding: "10px 12px",
                  color: "var(--color-rose)",
                  fontSize: "0.78rem",
                  fontWeight: 600,
                }}
              >
                {error}
              </div>
            )}

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
                <span>Ingresando...</span>
              ) : (
                <>
                  Entrar a la Plataforma <ArrowRight size={15} />
                </>
              )}
            </button>
          </form>

          {/* Accesos rápidos de prueba */}
          <div style={{ marginTop: 28, paddingTop: 18, borderTop: "1px solid var(--color-border)" }}>
            <span style={{ fontSize: "0.7rem", color: "var(--color-text-muted)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", display: "block", marginBottom: 10 }}>
              Acceso Rápido (Demostración)
            </span>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              <button
                onClick={() => handleQuickLogin("ENTRENADOR")}
                className="btn btn-secondary"
                style={{ justifyContent: "center", fontSize: "0.78rem", padding: "8px 12px" }}
                disabled={loading}
              >
                <User size={13} color="var(--color-green)" /> Rol Entrenador
              </button>
              <button
                onClick={() => handleQuickLogin("APRENDIZ")}
                className="btn btn-secondary"
                style={{ justifyContent: "center", fontSize: "0.78rem", padding: "8px 12px" }}
                disabled={loading}
              >
                <User size={13} color="var(--color-text-secondary)" /> Rol Aprendiz
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ── COLUMNA DERECHA: TARJETA VISUAL ATRACTIVA (CERO TEXTOS LARGOS) ── */}
      <div
        style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "40px",
          borderLeft: "1px solid var(--color-border)",
          background: "linear-gradient(135deg, #090e1a 0%, #060911 100%)",
          overflow: "hidden",
        }}
      >
        {/* Glow sutil */}
        <div
          style={{
            position: "absolute",
            width: 380,
            height: 380,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(16,185,129,0.12) 0%, transparent 70%)",
            filter: "blur(50px)",
            pointerEvents: "none",
          }}
        />

        {/* Tarjeta de Atleta / Ficha de Ejemplo (Visual, limpia y atractiva) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="glass-elevated"
          style={{
            width: "100%",
            maxWidth: 380,
            padding: "28px",
            borderRadius: 20,
            border: "1px solid rgba(16, 185, 129, 0.25)",
            boxShadow: "0 16px 40px rgba(0, 0, 0, 0.4), 0 0 30px rgba(16, 185, 129, 0.08)",
            display: "flex",
            flexDirection: "column",
            gap: 20,
            position: "relative",
            zIndex: 1,
          }}
        >
          {/* Header de la tarjeta */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #10b981, #06b6d4)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#070a12",
                  fontWeight: 800,
                  fontSize: "1rem",
                }}
              >
                JR
              </div>
              <div>
                <h3 style={{ fontSize: "0.95rem", fontWeight: 700, color: "#ffffff" }}>
                  Juan Camilo R.
                </h3>
                <p style={{ fontSize: "0.72rem", color: "var(--color-text-secondary)" }}>
                  Grado 10°B · Atletismo Escolar
                </p>
              </div>
            </div>

            <span
              style={{
                fontSize: "0.68rem",
                padding: "3px 8px",
                borderRadius: 99,
                background: "rgba(16, 185, 129, 0.15)",
                color: "var(--color-green)",
                fontWeight: 700,
                border: "1px solid rgba(16, 185, 129, 0.3)",
              }}
            >
              Apto ✓
            </span>
          </div>

          {/* Puntaje Grande y Visual */}
          <div
            style={{
              padding: "16px 20px",
              borderRadius: 14,
              background: "rgba(255, 255, 255, 0.03)",
              border: "1px solid rgba(255, 255, 255, 0.07)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <span style={{ fontSize: "0.7rem", color: "var(--color-text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", fontWeight: 600 }}>
                Aptitud Física General
              </span>
              <div style={{ fontSize: "1.85rem", fontWeight: 900, color: "#ffffff", letterSpacing: "-0.02em", marginTop: 2 }}>
                88 <span style={{ fontSize: "1rem", color: "var(--color-green)", fontWeight: 700 }}>/ 100 pts</span>
              </div>
            </div>

            <div
              style={{
                width: 42,
                height: 42,
                borderRadius: 12,
                background: "rgba(16, 185, 129, 0.12)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--color-green)",
              }}
            >
              <TrendingUp size={20} />
            </div>
          </div>

          {/* 3 Métricas Claras y Fáciles de Leer */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
            <div
              style={{
                padding: "12px 10px",
                borderRadius: 10,
                background: "rgba(255, 255, 255, 0.02)",
                border: "1px solid rgba(255, 255, 255, 0.05)",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: "1.05rem", fontWeight: 800, color: "#ffffff" }}>2.450m</div>
              <div style={{ fontSize: "0.65rem", color: "var(--color-text-muted)", marginTop: 2 }}>Resistencia</div>
            </div>

            <div
              style={{
                padding: "12px 10px",
                borderRadius: 10,
                background: "rgba(255, 255, 255, 0.02)",
                border: "1px solid rgba(255, 255, 255, 0.05)",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: "1.05rem", fontWeight: 800, color: "#ffffff" }}>48 reps</div>
              <div style={{ fontSize: "0.65rem", color: "var(--color-text-muted)", marginTop: 2 }}>Flexiones</div>
            </div>

            <div
              style={{
                padding: "12px 10px",
                borderRadius: 10,
                background: "rgba(255, 255, 255, 0.02)",
                border: "1px solid rgba(255, 255, 255, 0.05)",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: "1.05rem", fontWeight: 800, color: "var(--color-green)" }}>21.0</div>
              <div style={{ fontSize: "0.65rem", color: "var(--color-text-muted)", marginTop: 2 }}>IMC Saludable</div>
            </div>
          </div>

          {/* Pie de la tarjeta */}
          <div
            style={{
              paddingTop: 14,
              borderTop: "1px solid rgba(255, 255, 255, 0.06)",
              display: "flex",
              alignItems: "center",
              gap: 8,
              fontSize: "0.74rem",
              color: "var(--color-text-secondary)",
            }}
          >
            <CheckCircle2 size={14} color="var(--color-green)" />
            <span>Ficha antropométrica y pruebas al día (2026)</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
