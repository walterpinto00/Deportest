// ─────────────────────────────────────────────────────────────
// TabDashboard.tsx — Centro de Mando Atlético & Acciones Rápidas
// Diseñado para Docentes: Limpio, Ultra Legible, Sin Textos Invisibles
// Compatible 100% con Modo Claro Institucional y Modo Oscuro
// ─────────────────────────────────────────────────────────────
import React from "react";
import {
  Users,
  Activity,
  FileText,
  ShieldCheck,
  Heart,
  TrendingUp,
  CheckCircle2,
  Calendar,
  Award,
} from "lucide-react";
import { motion, Variants } from "framer-motion";

interface TabDashboardProps {
  onNavigate?: (tab: string) => void;
}

export function TabDashboard({ onNavigate }: TabDashboardProps) {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.05 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 8 },
    show: { opacity: 1, y: 0, transition: { duration: 0.25, ease: "easeOut" } },
  };

  return (
    <motion.div
      className="animate-fade-in"
      variants={containerVariants}
      initial="hidden"
      animate="show"
      style={{ display: "flex", flexDirection: "column", gap: 24 }}
    >
      {/* ── 1. BANNER HERO LIMPIO Y CLARO (Acciones Rápidas para el Docente) ── */}
      <div
        className="glass-elevated"
        style={{
          padding: "26px 32px",
          borderRadius: 20,
          background: "linear-gradient(135deg, rgba(16, 185, 129, 0.08) 0%, rgba(59, 130, 246, 0.05) 50%, var(--color-bg-surface) 100%)",
          border: "1px solid var(--color-border)",
          boxShadow: "var(--shadow-elevated)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 20,
        }}
      >
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: "var(--color-green)",
                boxShadow: "0 0 10px var(--color-green)",
              }}
            />
            <span
              style={{
                fontSize: "0.78rem",
                color: "var(--color-green)",
                fontWeight: 800,
                textTransform: "uppercase",
                letterSpacing: "0.06em",
              }}
            >
              Panel Activo · Período Académico 2026
            </span>
          </div>

          <h2
            style={{
              fontSize: "1.55rem",
              fontWeight: 800,
              color: "var(--color-text-primary)",
              letterSpacing: "-0.02em",
            }}
          >
            Bienvenido, Entrenador / Instructor SENA
          </h2>

          <p
            style={{
              fontSize: "0.92rem",
              color: "var(--color-text-secondary)",
              marginTop: 4,
              fontWeight: 500,
            }}
          >
            Monitorea el estado físico de los aprendices y califica valoraciones en tiempo real sin complicaciones.
          </p>
        </div>

        {/* Botones de acción rápida con 1 clic (colores visibles y letra contrastante) */}
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <button
            className="btn btn-primary"
            onClick={() => onNavigate && onNavigate("pruebas")}
            style={{ fontSize: "0.9rem", padding: "11px 18px" }}
          >
            <Activity size={17} />
            <span>Calificar Prueba Física</span>
          </button>

          <button
            className="btn btn-secondary"
            onClick={() => onNavigate && onNavigate("antropometria")}
            style={{
              fontSize: "0.9rem",
              padding: "11px 18px",
              color: "var(--color-text-primary)",
            }}
          >
            <FileText size={17} color="#d97706" />
            <span>Ficha Antropométrica</span>
          </button>

          <button
            className="btn btn-secondary"
            onClick={() => onNavigate && onNavigate("ia")}
            style={{
              fontSize: "0.9rem",
              padding: "11px 18px",
              color: "var(--color-text-primary)",
            }}
          >
            <Heart size={17} color="#0891b2" />
            <span>Nutrición & Lonchera</span>
          </button>
        </div>
      </div>

      {/* ── 2. CUATRO TARJETAS KPI DE RESUMEN (Limpias, con Números Grandes y Claros) ── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: 18,
        }}
      >
        {[
          {
            label: "Aprendices Registrados",
            valor: "248",
            nota: "+18 nuevas fichas este ciclo",
            icon: Users,
            color: "#2563eb", // Azul
            bgIcon: "rgba(37, 99, 235, 0.12)",
          },
          {
            label: "Evaluaciones Antropométricas",
            valor: "186",
            nota: "Completadas con protocolo OMS",
            icon: FileText,
            color: "#d97706", // Ámbar
            bgIcon: "rgba(217, 119, 6, 0.12)",
          },
          {
            label: "Pruebas Físicas Calificadas",
            valor: "412",
            nota: "Baremos oficiales asignados",
            icon: Activity,
            color: "#ea580c", // Naranja
            bgIcon: "rgba(234, 88, 12, 0.12)",
          },
          {
            label: "En Zona Saludable (OMS)",
            valor: "76.4%",
            nota: "Percentil óptimo juvenil",
            icon: ShieldCheck,
            color: "#10b981", // Verde SENA
            bgIcon: "rgba(16, 185, 129, 0.12)",
          },
        ].map((kpi, i) => {
          const Icon = kpi.icon;
          return (
            <motion.div
              key={i}
              variants={itemVariants}
              whileHover={{ y: -3 }}
              style={{
                padding: "22px 24px",
                borderRadius: 18,
                background: "var(--color-bg-surface)",
                border: "1px solid var(--color-border)",
                borderTop: `4px solid ${kpi.color}`,
                boxShadow: "var(--shadow-card)",
                display: "flex",
                flexDirection: "column",
                gap: 12,
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span
                  style={{
                    fontSize: "0.82rem",
                    fontWeight: 700,
                    color: "var(--color-text-secondary)",
                    textTransform: "uppercase",
                    letterSpacing: "0.03em",
                  }}
                >
                  {kpi.label}
                </span>
                <div
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: 10,
                    background: kpi.bgIcon,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: kpi.color,
                  }}
                >
                  <Icon size={19} />
                </div>
              </div>

              <div>
                <div
                  style={{
                    fontSize: "2.3rem",
                    fontWeight: 900,
                    color: "var(--color-text-primary)",
                    letterSpacing: "-0.03em",
                    lineHeight: 1.1,
                  }}
                >
                  {kpi.valor}
                </div>
                <div
                  style={{
                    fontSize: "0.82rem",
                    color: "var(--color-text-muted)",
                    marginTop: 6,
                    fontWeight: 500,
                  }}
                >
                  {kpi.nota}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* ── 3. RENDIMIENTO POR DISCIPLINA & ESTADO NUTRICIONAL OMS ── */}
      <div style={{ display: "grid", gridTemplateColumns: "1.3fr 1.5fr", gap: 24 }}>
        {/* Rendimiento por Deporte */}
        <motion.div
          variants={itemVariants}
          className="glass-elevated"
          style={{ padding: "26px 28px", borderRadius: 20 }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
            <div>
              <h3 style={{ fontSize: "1.15rem", fontWeight: 800, color: "var(--color-text-primary)" }}>
                Cumplimiento por Disciplina Deportiva
              </h3>
              <p style={{ fontSize: "0.84rem", color: "var(--color-text-muted)", marginTop: 2 }}>
                Porcentaje de aprendices en marcas y metas óptimas
              </p>
            </div>
            <span
              style={{
                fontSize: "0.78rem",
                padding: "4px 10px",
                borderRadius: 8,
                background: "var(--color-bg-card)",
                color: "var(--color-text-secondary)",
                fontWeight: 700,
                border: "1px solid var(--color-border)",
              }}
            >
              Período 2026
            </span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {[
              { dep: "Fútbol Formativo", pct: 91, count: "64 alumnos", color: "#10b981" },
              { dep: "Atletismo & Velocidad", pct: 88, count: "42 alumnos", color: "#0891b2" },
              { dep: "Baloncesto Juvenil", pct: 82, count: "50 alumnos", color: "#d97706" },
              { dep: "Voleibol Escolar", pct: 79, count: "48 alumnos", color: "#7c3aed" },
              { dep: "Acondicionamiento General", pct: 85, count: "44 alumnos", color: "#059669" },
            ].map((d, i) => (
              <div key={i}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.9rem", marginBottom: 6 }}>
                  <span style={{ fontWeight: 700, color: "var(--color-text-primary)" }}>
                    {d.dep} <span style={{ color: "var(--color-text-muted)", fontSize: "0.8rem", fontWeight: 500 }}>({d.count})</span>
                  </span>
                  <span style={{ fontWeight: 800, color: d.color }}>
                    {d.pct}%
                  </span>
                </div>
                <div style={{ height: 8, borderRadius: 99, background: "var(--color-border)", overflow: "hidden" }}>
                  <div style={{ width: `${d.pct}%`, height: "100%", background: d.color, borderRadius: 99 }} />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Clasificación Nutricional (Semáforo Escolar OMS) */}
        <motion.div
          variants={itemVariants}
          className="glass-elevated"
          style={{ padding: "26px 28px", borderRadius: 20 }}
        >
          <div style={{ marginBottom: 20 }}>
            <h3 style={{ fontSize: "1.15rem", fontWeight: 800, color: "var(--color-text-primary)" }}>
              Estado Nutricional del Grupo (OMS)
            </h3>
            <p style={{ fontSize: "0.84rem", color: "var(--color-text-muted)", marginTop: 2 }}>
              Detección preventiva según percentiles de IMC juvenil
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {[
              {
                rango: "Peso Saludable / Adecuado",
                pct: "76.4%",
                alumnos: "189 aprendices",
                color: "#10b981",
                bg: "rgba(16, 185, 129, 0.08)",
              },
              {
                rango: "Sobrepeso Leve (Monitoreo)",
                pct: "14.2%",
                alumnos: "35 aprendices",
                color: "#d97706",
                bg: "rgba(217, 119, 6, 0.08)",
              },
              {
                rango: "Bajo Peso (Orientación)",
                pct: "6.8%",
                alumnos: "17 aprendices",
                color: "#2563eb",
                bg: "rgba(37, 99, 235, 0.08)",
              },
              {
                rango: "Riesgo de Obesidad",
                pct: "2.6%",
                alumnos: "7 aprendices",
                color: "#e11d48",
                bg: "rgba(225, 29, 72, 0.08)",
              },
            ].map((st, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "13px 16px",
                  borderRadius: 14,
                  background: st.bg,
                  border: `1px solid ${st.color}35`,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 10, height: 10, borderRadius: "50%", background: st.color, boxShadow: `0 0 8px ${st.color}` }} />
                  <div>
                    <div style={{ fontSize: "0.92rem", fontWeight: 700, color: "var(--color-text-primary)" }}>
                      {st.rango}
                    </div>
                    <div style={{ fontSize: "0.78rem", color: "var(--color-text-muted)", marginTop: 2 }}>
                      {st.alumnos}
                    </div>
                  </div>
                </div>

                <div style={{ fontSize: "1.05rem", fontWeight: 800, color: st.color }}>
                  {st.pct}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
