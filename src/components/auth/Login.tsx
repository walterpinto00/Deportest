import React, { useState } from "react";
import { motion } from "framer-motion";
import { Lock, Mail, Activity, ArrowRight, ShieldCheck, User } from "lucide-react";

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
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
        position: "relative",
        overflow: "hidden",
        background: "linear-gradient(to bottom right, #0f172a, #020617)",
      }}
    >
      {/* Animated Orbs Background */}
      <motion.div
        animate={{
          x: [0, 50, 0],
          y: [0, 30, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        style={{
          position: "absolute",
          top: "15%",
          left: "25%",
          width: 450,
          height: 450,
          background: "radial-gradient(circle, rgba(34,197,94,0.12) 0%, rgba(0,0,0,0) 70%)",
          filter: "blur(60px)",
          borderRadius: "50%",
          zIndex: 0,
        }}
      />
      <motion.div
        animate={{
          x: [0, -40, 0],
          y: [0, -50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        style={{
          position: "absolute",
          bottom: "10%",
          right: "20%",
          width: 600,
          height: 600,
          background: "radial-gradient(circle, rgba(168,85,247,0.1) 0%, rgba(0,0,0,0) 70%)",
          filter: "blur(80px)",
          borderRadius: "50%",
          zIndex: 0,
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{
          width: "100%",
          maxWidth: 440,
          padding: 48,
          position: "relative",
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          gap: 32,
          background: "rgba(15, 23, 42, 0.6)",
          backdropFilter: "blur(30px)",
          borderRadius: 24,
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255,255,255,0.1)",
        }}
      >
        {/* Header / Logo */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: 16 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 20,
              background: "linear-gradient(135deg, rgba(34,197,94,0.15), rgba(16,185,129,0.05))",
              border: "1px solid rgba(34,197,94,0.4)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 0 40px rgba(34,197,94,0.2), inset 0 2px 0 rgba(255,255,255,0.1)",
            }}
          >
            <Activity size={32} color="var(--color-green)" strokeWidth={2.5} />
          </div>
          <div>
            <h1 style={{ fontSize: "1.75rem", fontWeight: 800, letterSpacing: "-0.03em" }}>
              Deportest <span style={{ color: "var(--color-green)" }}>Pro</span>
            </h1>
            <p style={{ fontSize: "0.9rem", color: "var(--color-text-secondary)", marginTop: 6 }}>
              Sistema inteligente de seguimiento deportivo
            </p>
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          {error && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              style={{
                background: "rgba(244, 63, 94, 0.1)",
                border: "1px solid rgba(244, 63, 94, 0.3)",
                borderRadius: 12,
                padding: "12px 16px",
                color: "var(--color-rose)",
                fontSize: "0.85rem",
                fontWeight: 600,
                textAlign: "center",
              }}
            >
              {error}
            </motion.div>
          )}

          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div>
              <label className="dp-label" style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8, color: "var(--color-text-secondary)" }}>
                <Mail size={14} /> Correo Electrónico
              </label>
              <input
                className="dp-input"
                type="email"
                placeholder="usuario@sena.edu.co"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                style={{ padding: "14px 18px", fontSize: "0.95rem", borderRadius: 12, background: "rgba(0,0,0,0.2)" }}
              />
            </div>

            <div>
              <label className="dp-label" style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8, color: "var(--color-text-secondary)" }}>
                <Lock size={14} /> Contraseña
              </label>
              <input
                className="dp-input"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                style={{ padding: "14px 18px", fontSize: "0.95rem", borderRadius: 12, background: "rgba(0,0,0,0.2)" }}
              />
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading}
            style={{
              padding: "16px 24px",
              justifyContent: "center",
              fontSize: "1rem",
              borderRadius: 12,
              background: loading
                ? "rgba(34,197,94,0.3)"
                : "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
              boxShadow: loading ? "none" : "0 8px 32px rgba(34,197,94,0.3)",
              border: "none",
              marginTop: 8,
            }}
          >
            {loading ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                style={{ width: 20, height: 20, border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "#fff", borderRadius: "50%" }}
              />
            ) : (
              <>
                Ingresar al Sistema <ArrowRight size={18} />
              </>
            )}
          </button>
        </form>

        {/* Quick Access / Footer */}
        <div style={{ marginTop: 8, borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 24 }}>
          <p style={{ fontSize: "0.75rem", color: "var(--color-text-muted)", display: "flex", alignItems: "center", justifyContent: "center", gap: 6, marginBottom: 16 }}>
            <ShieldCheck size={14} /> Acceso Rápido (Demo)
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <button
              onClick={() => handleQuickLogin("ENTRENADOR")}
              className="btn btn-ghost"
              style={{ justifyContent: "center", padding: "10px", fontSize: "0.8rem", background: "rgba(255,255,255,0.03)" }}
              disabled={loading}
            >
              <User size={14} /> Entrenador
            </button>
            <button
              onClick={() => handleQuickLogin("APRENDIZ")}
              className="btn btn-ghost"
              style={{ justifyContent: "center", padding: "10px", fontSize: "0.8rem", background: "rgba(255,255,255,0.03)" }}
              disabled={loading}
            >
              <User size={14} /> Aprendiz
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
