// ─────────────────────────────────────────────────────────────
// TabDashboard.tsx — Centro de Mando Atlético & Acciones Rápidas
// Colores vivos, alta legibilidad, accesos directos y datos pedagógicos claros
// ─────────────────────────────────────────────────────────────
import React from "react";
import {
  Users,
  Activity,
  FileText,
  ShieldCheck,
  Heart,
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
      transition: { staggerChildren: 0.06 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
  };

  return (
    <motion.div
      className="animate-fade-in"
      variants={containerVariants}
      initial="hidden"
      animate="show"
      style={{ display: "flex", flexDirection: "column", gap: 24 }}
    >
      {/* ── BANNER HERO DE ACCIONES RÁPIDAS (Lo que un profesor necesita hacer en 1 clic) ── */}
      <div
        className="glass-elevated"
        style={{
          padding: "26px 30px",
          borderRadius: 22,
          background: "linear-gradient(135deg, rgba(16, 185, 129, 0.12) 0%, rgba(15, 23, 42, 0.98) 100%)",
          border: "1px solid rgba(16, 185, 129, 0.35)",
          boxShadow: "0 16px 40px rgba(0, 0, 0, 0.45)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 18,
        }}
      >
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
            <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#10b981", boxShadow: "0 0 12px #10b981" }} />
            <span style={{ fontSize: "0.82rem", color: "#34d399", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.06em" }}>
              Panel Activo · Período Académico 2026
            </span>
          </div>
          <h2 style={{ fontSize: "1.55rem", fontWeight: 800, color: "#ffffff", letterSpacing: "-0.02em" }}>
            Bienvenido, Entrenador / Instructor SENA
          </h2>
          <p style={{ fontSize: "0.95rem", color: "#e2e8f0", marginTop: 4, fontWeight: 500 }}>
            Monitorea el estado físico de los aprendices y califica valoraciones en tiempo real sin complicaciones.
          </p>
        </div>

        {/* Botones de acción rápida con 1 clic y letra grande */}
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <button
            className="btn btn-primary"
            onClick={() => onNavigate && onNavigate("pruebas")}
            style={{ fontSize: "0.92rem", padding: "12px 20px" }}
          >
            <Activity size={17} />
            <span>Calificar Prueba Física</span>
          </button>

          <button
            className="btn btn-secondary"
            onClick={() => onNavigate && onNavigate("antropometria")}
            style={{ fontSize: "0.92rem", padding: "12px 20px", color: "#ffffff" }}
          >
            <FileText size={17} color="#f59e0b" />
            <span>Nueva Ficha Antropométrica</span>
          </button>

          <button
            className="btn btn-ghost"
            onClick={() => onNavigate && onNavigate("ia")}
            style={{ fontSize: "0.92rem", padding: "12px 20px", color: "#ffffff" }}
          >
            <Heart size={17} color="#06b6d4" />
            <span>Nutrición & Lonchera</span>
          </button>
        </div>
      </div>

      {/* ── 4 TARJETAS KPI DE RESUMEN CON COLORES VIVOS Y LETRA GRANDE ── */}
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
            color: "#3b82f6", // Royal Blue
            bg: "linear-gradient(145deg, rgba(59, 130, 246, 0.12) 0%, rgba(15, 23, 42, 0.95) 100%)",
            border: "rgba(59, 130, 246, 0.35)",
            glow: "rgba(59, 130, 246, 0.2)",
          },
          {
            label: "Evaluaciones Antropométricas",
            valor: "186",
            nota: "Completadas con protocolo OMS",
            icon: FileText,
            color: "#f59e0b", // Amber Gold
            bg: "linear-gradient(145deg, rgba(245, 158, 11, 0.12) 0%, rgba(15, 23, 42, 0.95) 100%)",
            border: "rgba(245, 158, 11, 0.35)",
            glow: "rgba(245, 158, 11, 0.2)",
          },
          {
            label: "Pruebas Físicas Calificadas",
            valor: "412",
            nota: "Baremos oficiales asignados",
            icon: Activity,
            color: "#f97316", // Athletic Orange
            bg: "linear-gradient(145deg, rgba(249, 115, 22, 0.12) 0%, rgba(15, 23, 42, 0.95) 100%)",
            border: "rgba(249, 115, 22, 0.35)",
            glow: "rgba(249, 115, 22, 0.2)",
          },
          {
            label: "En Zona Saludable (OMS)",
            valor: "76.4%",
            nota: "Percentil óptimo juvenil",
            icon: ShieldCheck,
            color: "#10b981", // Emerald Green
            bg: "linear-gradient(145deg, rgba(16, 185, 129, 0.12) 0%, rgba(15, 23, 42, 0.95) 100%)",
            border: "rgba(16, 185, 129, 0.35)",
            glow: "rgba(16, 185, 129, 0.2)",
          },
        ].map((kpi, i) => {
          const Icon = kpi.icon;
          return (
            <motion.div
              key={i}
              variants={itemVariants}
              whileHover={{ y: -3 }}
              style={{
                padding: "24px 26px",
                borderRadius: 18,
                background: kpi.bg,
                border: `1px solid ${kpi.border}`,
                boxShadow: `0 8px 24px rgba(0, 0, 0, 0.35), 0 0 16px ${kpi.glow}`,
                display: "flex",
                flexDirection: "column",
                gap: 14,
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "#ffffff", textTransform: "uppercase", letterSpacing: "0.04em" }}>
                  {kpi.label}
                </span>
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 10,
                    background: `${kpi.color}25`,
                    border: `1px solid ${kpi.color}45`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: kpi.color,
                  }}
                >
                  <Icon size={20} />
                </div>
              </div>

              <div>
                <div style={{ fontSize: "2.3rem", fontWeight: 800, color: "#ffffff", letterSpacing: "-0.03em", lineHeight: 1.1 }}>
                  {kpi.valor}
                </div>
                <div style={{ fontSize: "0.84rem", color: "#cbd5e1", marginTop: 6, fontWeight: 500 }}>
                  {kpi.nota}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* ── RENDIMIENTO POR DISCIPLINA & SEMÁFORO OMS ── */}
      <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1.6fr", gap: 24 }}>
        {/* Rendimiento por Deporte */}
        <motion.div
          variants={itemVariants}
          className="glass-elevated"
          style={{ padding: "26px 30px", borderRadius: 20 }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 22 }}>
            <div>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 800, color: "#ffffff" }}>
                Cumplimiento por Disciplina Deportiva
              </h3>
              <p style={{ fontSize: "0.86rem", color: "#cbd5e1", marginTop: 2 }}>
                Porcentaje de aprendices en marcas y metas óptimas
              </p>
            </div>
            <span style={{ fontSize: "0.8rem", padding: "4px 10px", borderRadius: 8, background: "rgba(255, 255, 255, 0.08)", color: "#ffffff", fontWeight: 700 }}>
              Período Actual
            </span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {[
              { dep: "Fútbol Formativo", pct: 91, count: "64 alumnos", color: "#10b981" },
              { dep: "Atletismo & Velocidad", pct: 88, count: "42 alumnos", color: "#06b6d4" },
              { dep: "Baloncesto Juvenil", pct: 82, count: "50 alumnos", color: "#f59e0b" },
              { dep: "Voleibol Escolar", pct: 79, count: "48 alumnos", color: "#8b5cf6" },
              { dep: "Acondicionamiento General", pct: 85, count: "44 alumnos", color: "#34d399" },
            ].map((d, i) => (
              <div key={i}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.92rem", marginBottom: 6 }}>
                  <span style={{ fontWeight: 700, color: "#ffffff" }}>
                    {d.dep} <span style={{ color: "#cbd5e1", fontSize: "0.82rem", fontWeight: 500 }}>({d.count})</span>
                  </span>
                  <span style={{ fontWeight: 800, color: d.color }}>
                    {d.pct}%
                  </span>
                </div>
                <div style={{ height: 8, borderRadius: 99, background: "rgba(255, 255, 255, 0.08)", overflow: "hidden" }}>
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
          style={{ padding: "26px 30px", borderRadius: 20 }}
        >
          <div style={{ marginBottom: 22 }}>
            <h3 style={{ fontSize: "1.2rem", fontWeight: 800, color: "#ffffff" }}>
              Estado Nutricional del Grupo (OMS)
            </h3>
            <p style={{ fontSize: "0.86rem", color: "#cbd5e1", marginTop: 2 }}>
              Detección preventiva según percentiles de IMC juvenil
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {[
              {
                rango: "Peso Saludable / Adecuado",
                pct: "76.4%",
                alumnos: "189 aprendices",
                color: "#10b981",
              },
              {
                rango: "Sobrepeso Leve (Monitoreo)",
                pct: "14.2%",
                alumnos: "35 aprendices",
                color: "#f59e0b",
              },
              {
                rango: "Bajo Peso (Orientación)",
                pct: "6.8%",
                alumnos: "17 aprendices",
                color: "#3b82f6",
              },
              {
                rango: "Riesgo de Obesidad",
                pct: "2.6%",
                alumnos: "7 aprendices",
                color: "#f43f5e",
              },
            ].map((st, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "14px 18px",
                  borderRadius: 14,
                  background: "rgba(255, 255, 255, 0.04)",
                  border: `1px solid ${st.color}35`,
                  boxShadow: `0 4px 12px ${st.color}15`,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 10, height: 10, borderRadius: "50%", background: st.color, boxShadow: `0 0 10px ${st.color}` }} />
                  <div>
                    <div style={{ fontSize: "0.95rem", fontWeight: 700, color: "#ffffff" }}>
                      {st.rango}
                    </div>
                    <div style={{ fontSize: "0.82rem", color: "#cbd5e1", marginTop: 2 }}>
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
