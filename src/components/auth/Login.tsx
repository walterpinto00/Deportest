import React, { useState } from "react";
import { motion } from "framer-motion";
import { Lock, Mail, Activity, ArrowRight, ShieldCheck } from "lucide-react";
import { Input } from "../ui/Input";

interface LoginProps {
  onLogin: (role: "ENTRENADOR" | "APRENDIZ") => void;
}

export function Login({ onLogin }: LoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Por favor completa ambos campos.");
      return;
    }

    setLoading(true);

    // Simulación de delay de red para efecto premium
    setTimeout(() => {
      setLoading(false);
      // Lógica super simple para demostración de flujo:
      if (email.includes("entrenador") || email.includes("admin")) {
        onLogin("ENTRENADOR");
      } else {
        onLogin("APRENDIZ");
      }
    }, 1500);
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
      }}
    >
      {/* Background Decorators */}
      <div
        style={{
          position: "absolute",
          top: "10%",
          left: "20%",
          width: 400,
          height: 400,
          background: "radial-gradient(circle, rgba(34,197,94,0.15) 0%, rgba(0,0,0,0) 70%)",
          filter: "blur(60px)",
          borderRadius: "50%",
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "10%",
          right: "20%",
          width: 500,
          height: 500,
          background: "radial-gradient(circle, rgba(168,85,247,0.1) 0%, rgba(0,0,0,0) 70%)",
          filter: "blur(80px)",
          borderRadius: "50%",
          zIndex: 0,
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="glass-elevated"
        style={{
          width: "100%",
          maxWidth: 420,
          padding: 40,
          position: "relative",
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          gap: 32,
        }}
      >
        {/* Header / Logo */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: 16 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 16,
              background: "linear-gradient(135deg, rgba(34,197,94,0.2), rgba(16,185,129,0.1))",
              border: "1px solid rgba(34,197,94,0.3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 8px 32px rgba(34,197,94,0.2)",
            }}
          >
            <Activity size={28} color="var(--color-green)" />
          </div>
          <div>
            <h1 style={{ fontSize: "1.5rem", fontWeight: 800, letterSpacing: "-0.02em" }}>
              Deportest <span style={{ color: "var(--color-green)" }}>Pro</span>
            </h1>
            <p style={{ fontSize: "0.85rem", color: "var(--color-text-secondary)", marginTop: 4 }}>
              Sistema de control y seguimiento deportivo SENA
            </p>
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {error && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              style={{
                background: "rgba(244, 63, 94, 0.1)",
                border: "1px solid rgba(244, 63, 94, 0.3)",
                borderRadius: 10,
                padding: "10px 14px",
                color: "var(--color-rose)",
                fontSize: "0.8rem",
                fontWeight: 600,
                textAlign: "center",
              }}
            >
              {error}
            </motion.div>
          )}

          <div>
            <label className="dp-label" style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
              <Mail size={14} /> Correo Electrónico
            </label>
            <input
              className="dp-input"
              type="email"
              placeholder="usuario@sena.edu.co"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              style={{ padding: "12px 16px" }}
            />
          </div>

          <div>
            <label className="dp-label" style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
              <Lock size={14} /> Contraseña
            </label>
            <input
              className="dp-input"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              style={{ padding: "12px 16px" }}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading}
            style={{
              marginTop: 8,
              padding: "14px 24px",
              justifyContent: "center",
              fontSize: "0.95rem",
              background: loading
                ? "rgba(34,197,94,0.3)"
                : "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
              boxShadow: loading ? "none" : "0 8px 24px rgba(34,197,94,0.3)",
              border: "none",
            }}
          >
            {loading ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                style={{ width: 18, height: 18, border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "#fff", borderRadius: "50%" }}
              />
            ) : (
              <>
                Ingresar al Sistema <ArrowRight size={16} />
              </>
            )}
          </button>
        </form>

        {/* Footer info */}
        <div style={{ textAlign: "center", marginTop: 8 }}>
          <p style={{ fontSize: "0.75rem", color: "var(--color-text-muted)", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
            <ShieldCheck size={14} /> Acceso Seguro
          </p>
          <p style={{ fontSize: "0.7rem", color: "var(--color-text-muted)", marginTop: 12, opacity: 0.6 }}>
            Tip: usa "entrenador" en el correo para entrar como Entrenador.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
