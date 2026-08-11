import React, { useState } from "react";
import { motion } from "framer-motion";
import { Lock, Mail, Activity, ArrowRight, ShieldCheck, User, Zap } from "lucide-react";

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

    if (!forceRole && (!email || !password)) {
      setError("Por favor completa ambos campos.");
      return;
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
    }, 1200);
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
        background: "#020617",
      }}
    >
      {/* ── LADO IZQUIERDO: FORMULARIO ── */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px",
        position: "relative",
      }}>
        {/* Glow sutil de fondo */}
        <div style={{
          position: "absolute", top: "10%", left: "10%", width: 300, height: 300,
          background: "radial-gradient(circle, rgba(34,197,94,0.08) 0%, rgba(0,0,0,0) 70%)",
          filter: "blur(60px)", borderRadius: "50%", zIndex: 0
        }} />

        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          style={{ width: "100%", maxWidth: 420, zIndex: 1 }}
        >
          {/* Logo Mejorado */}
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 48 }}>
            <div
              style={{
                width: 48, height: 48, borderRadius: 14,
                background: "linear-gradient(135deg, var(--color-green), #059669)",
                display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: "0 8px 24px rgba(34,197,94,0.3)",
                color: "#fff"
              }}
            >
              <Zap size={24} fill="currentColor" />
            </div>
            <div>
              <h1 style={{ fontSize: "1.5rem", fontWeight: 900, letterSpacing: "-0.04em", color: "#fff" }}>
                DEPORTEST
              </h1>
              <div style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--color-green)", letterSpacing: "0.2em", textTransform: "uppercase" }}>
                Pro Edition
              </div>
            </div>
          </div>

          <div>
            <h2 style={{ fontSize: "2rem", fontWeight: 700, color: "#fff", marginBottom: 8, letterSpacing: "-0.02em" }}>
              Bienvenido de nuevo
            </h2>
            <p style={{ color: "var(--color-text-secondary)", marginBottom: 32 }}>
              Ingresa tus credenciales para acceder al sistema.
            </p>
          </div>

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                style={{
                  background: "rgba(244, 63, 94, 0.1)", border: "1px solid rgba(244, 63, 94, 0.3)",
                  borderRadius: 8, padding: "12px", color: "var(--color-rose)",
                  fontSize: "0.85rem", fontWeight: 600,
                }}
              >
                {error}
              </motion.div>
            )}

            <div>
              <label className="dp-label" style={{ marginBottom: 8, color: "var(--color-text-secondary)" }}>
                Correo Electrónico
              </label>
              <div style={{ position: "relative" }}>
                <div style={{ position: "absolute", left: 14, top: 14, color: "var(--color-text-muted)" }}><Mail size={16} /></div>
                <input
                  className="dp-input"
                  type="email"
                  placeholder="usuario@sena.edu.co"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                  style={{ padding: "12px 16px 12px 42px", fontSize: "0.95rem", borderRadius: 10, background: "rgba(255,255,255,0.03)", borderColor: "rgba(255,255,255,0.08)" }}
                />
              </div>
            </div>

            <div>
              <label className="dp-label" style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, color: "var(--color-text-secondary)" }}>
                <span>Contraseña</span>
                <a href="#" style={{ color: "var(--color-green)", fontSize: "0.75rem", textDecoration: "none" }}>¿Olvidaste tu contraseña?</a>
              </label>
              <div style={{ position: "relative" }}>
                <div style={{ position: "absolute", left: 14, top: 14, color: "var(--color-text-muted)" }}><Lock size={16} /></div>
                <input
                  className="dp-input"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                  style={{ padding: "12px 16px 12px 42px", fontSize: "0.95rem", borderRadius: 10, background: "rgba(255,255,255,0.03)", borderColor: "rgba(255,255,255,0.08)" }}
                />
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
              style={{
                padding: "14px", justifyContent: "center", fontSize: "0.95rem", borderRadius: 10,
                background: loading ? "rgba(34,197,94,0.3)" : "var(--color-green)",
                color: "#000", fontWeight: 700,
                boxShadow: loading ? "none" : "0 8px 24px rgba(34,197,94,0.25)",
                border: "none", marginTop: 8,
              }}
            >
              {loading ? (
                <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} style={{ width: 18, height: 18, border: "2px solid rgba(0,0,0,0.2)", borderTopColor: "#000", borderRadius: "50%" }} />
              ) : (
                <>Ingresar al Sistema <ArrowRight size={16} /></>
              )}
            </button>
          </form>

          <div style={{ marginTop: 40, borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 24 }}>
            <p style={{ fontSize: "0.75rem", color: "var(--color-text-muted)", display: "flex", alignItems: "center", gap: 6, marginBottom: 12 }}>
              <ShieldCheck size={14} /> Acceso Rápido (Demo)
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <button
                onClick={() => handleQuickLogin("ENTRENADOR")}
                className="btn btn-ghost"
                style={{ flex: 1, justifyContent: "center", padding: "10px", fontSize: "0.8rem", background: "rgba(255,255,255,0.03)", borderRadius: 8 }}
                disabled={loading}
              >
                <User size={14} /> Entrenador
              </button>
              <button
                onClick={() => handleQuickLogin("APRENDIZ")}
                className="btn btn-ghost"
                style={{ flex: 1, justifyContent: "center", padding: "10px", fontSize: "0.8rem", background: "rgba(255,255,255,0.03)", borderRadius: 8 }}
                disabled={loading}
              >
                <User size={14} /> Aprendiz
              </button>
              <button
                onClick={() => handleQuickLogin("ENTRENADOR")}
                className="btn btn-ghost"
                style={{ flex: 1, justifyContent: "center", padding: "10px", fontSize: "0.8rem", background: "rgba(255,255,255,0.03)", borderRadius: 8 }}
                disabled={loading}
              >
                <ShieldCheck size={14} /> Administrador
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ── LADO DERECHO: IMAGEN DE PORTADA ── */}
      <div style={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        borderLeft: "1px solid rgba(255,255,255,0.05)",
      }}>
        <motion.div
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          style={{ width: "100%", height: "100%" }}
        >
          <img
            src="https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=1470&auto=format&fit=crop"
            alt="Sports Analytics"
            style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.75 }}
          />
          {/* Overlay Gradient para integrar la imagen con el fondo oscuro */}
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to right, #020617 0%, transparent 40%, rgba(2,6,23,0.4) 100%)",
          }} />
        </motion.div>
      </div>
    </div>
  );
}
