// ─────────────────────────────────────────────────────────────
// TabDashboard.tsx — Centro de Mando Atlético & Acciones Rápidas
// ─────────────────────────────────────────────────────────────
import React from "react";
import {
  Users,
  Activity,
  FileText,
  ShieldCheck,
  TrendingUp,
  ArrowRight,
  PlusCircle,
  Heart,
  Clock,
  Sparkles,
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
      style={{ display: "flex", flexDirection: "column", gap: 20 }}
    >
      {/* ── BANNER HERO DE ACCIONES RÁPIDAS (Lo que un profesor necesita hacer en 1 clic) ── */}
      <div
        className="glass-elevated"
        style={{
          padding: "24px 28px",
          borderRadius: 20,
          background: "linear-gradient(135deg, rgba(16, 185, 129, 0.08) 0%, rgba(13, 18, 31, 0.95) 100%)",
          border: "1px solid rgba(16, 185, 129, 0.2)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 16,
        }}
      >
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--color-green)", boxShadow: "0 0 10px var(--color-green)" }} />
            <span style={{ fontSize: "0.72rem", color: "var(--color-green)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Panel Activo · Período 2026
            </span>
          </div>
          <h2 style={{ fontSize: "1.35rem", fontWeight: 800, color: "#ffffff", letterSpacing: "-0.02em" }}>
            Bienvenido, Entrenador / Instructor
          </h2>
          <p style={{ fontSize: "0.8rem", color: "var(--color-text-secondary)", marginTop: 2 }}>
            Monitorea el estado físico de los aprendices y registra valoraciones en tiempo real.
          </p>
        </div>

        {/* Botones de acción rápida con 1 clic */}
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <button
            className="btn btn-primary"
            onClick={() => onNavigate && onNavigate("pruebas")}
            style={{ fontSize: "0.82rem", padding: "10px 16px" }}
          >
            <Activity size={15} />
            <span>Calificar Prueba Física</span>
          </button>

          <button
            className="btn btn-secondary"
            onClick={() => onNavigate && onNavigate("antropometria")}
            style={{ fontSize: "0.82rem", padding: "10px 16px" }}
          >
            <FileText size={15} color="var(--color-green)" />
            <span>Nueva Ficha Antropométrica</span>
          </button>

          <button
            className="btn btn-ghost"
            onClick={() => onNavigate && onNavigate("ia")}
            style={{ fontSize: "0.82rem", padding: "10px 16px" }}
          >
            <Heart size={15} color="var(--color-green)" />
            <span>Nutrición & Hábitos</span>
          </button>
        </div>
      </div>

      {/* ── 4 TARJETAS KPI DE RESUMEN ── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 16,
        }}
      >
        {[
          {
            label: "Aprendices Registrados",
            valor: "248",
            nota: "+18 nuevas fichas este ciclo",
            icon: Users,
            color: "var(--color-green)",
          },
          {
            label: "Evaluaciones Antropométricas",
            valor: "186",
            nota: "Completadas con protocolo OMS",
            icon: FileText,
            color: "var(--color-green)",
          },
          {
            label: "Pruebas Físicas Calificadas",
            valor: "412",
            nota: "Baremos oficiales asignados",
            icon: Activity,
            color: "var(--color-green)",
          },
          {
            label: "En Zona Saludable (OMS)",
            valor: "76.4%",
            nota: "Percentil óptimo juvenil",
            icon: ShieldCheck,
            color: "var(--color-green)",
          },
        ].map((kpi, i) => {
          const Icon = kpi.icon;
          return (
            <motion.div
              key={i}
              variants={itemVariants}
              className="glass"
              style={{ padding: "20px 22px", display: "flex", flexDirection: "column", gap: 10 }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "0.72rem", fontWeight: 600, color: "var(--color-text-secondary)", textTransform: "uppercase", letterSpacing: "0.04em" }}>
                  {kpi.label}
                </span>
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
                  }}
                >
                  <Icon size={16} />
                </div>
              </div>

              <div>
                <div style={{ fontSize: "2rem", fontWeight: 800, color: "#ffffff", letterSpacing: "-0.03em", lineHeight: 1.1 }}>
                  {kpi.valor}
                </div>
                <div style={{ fontSize: "0.72rem", color: "var(--color-text-muted)", marginTop: 6 }}>
                  {kpi.nota}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* ── RENDIMIENTO POR DISCIPLINA & SEMÁFORO OMS ── */}
      <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1.5fr", gap: 20 }}>
        {/* Rendimiento por Deporte */}
        <motion.div variants={itemVariants} className="glass" style={{ padding: "24px 28px", borderRadius: 18 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
            <div>
              <h3 style={{ fontSize: "0.95rem", fontWeight: 700, color: "#ffffff" }}>
                Cumplimiento por Disciplina Deportiva
              </h3>
              <p style={{ fontSize: "0.72rem", color: "var(--color-text-muted)" }}>
                Porcentaje de aprendices en marcas óptimas
              </p>
            </div>
            <span style={{ fontSize: "0.7rem", padding: "3px 8px", borderRadius: 6, background: "rgba(255, 255, 255, 0.04)", color: "var(--color-text-secondary)" }}>
              Período Actual
            </span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {[
              { dep: "Fútbol Formativo", pct: 91, count: "64 alumnos" },
              { dep: "Atletismo & Velocidad", pct: 88, count: "42 alumnos" },
              { dep: "Baloncesto Juvenil", pct: 82, count: "50 alumnos" },
              { dep: "Voleibol Escolar", pct: 79, count: "48 alumnos" },
              { dep: "Acondicionamiento General", pct: 85, count: "44 alumnos" },
            ].map((d, i) => (
              <div key={i}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.8rem", marginBottom: 6 }}>
                  <span style={{ fontWeight: 600, color: "var(--color-text-primary)" }}>
                    {d.dep} <span style={{ color: "var(--color-text-muted)", fontSize: "0.7rem" }}>({d.count})</span>
                  </span>
                  <span style={{ fontWeight: 700, color: "var(--color-green)" }}>
                    {d.pct}%
                  </span>
                </div>
                <div style={{ height: 6, borderRadius: 99, background: "rgba(255, 255, 255, 0.05)", overflow: "hidden" }}>
                  <div style={{ width: `${d.pct}%`, height: "100%", background: "var(--color-green)", borderRadius: 99 }} />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Clasificación Nutricional (Semáforo Escolar OMS) */}
        <motion.div variants={itemVariants} className="glass" style={{ padding: "24px 28px", borderRadius: 18 }}>
          <div style={{ marginBottom: 20 }}>
            <h3 style={{ fontSize: "0.95rem", fontWeight: 700, color: "#ffffff" }}>
              Estado Nutricional del Grupo (OMS)
            </h3>
            <p style={{ fontSize: "0.72rem", color: "var(--color-text-muted)" }}>
              Detección preventiva según percentiles de IMC
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {[
              {
                rango: "Peso Saludable / Adecuado",
                pct: "76.4%",
                alumnos: "189 aprendices",
                color: "var(--color-green)",
              },
              {
                rango: "Sobrepeso Leve (Monitoreo)",
                pct: "14.2%",
                alumnos: "35 aprendices",
                color: "var(--color-amber)",
              },
              {
                rango: "Bajo Peso (Orientación)",
                pct: "6.8%",
                alumnos: "17 aprendices",
                color: "var(--color-blue)",
              },
              {
                rango: "Riesgo de Obesidad",
                pct: "2.6%",
                alumnos: "7 aprendices",
                color: "var(--color-rose)",
              },
            ].map((st, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "12px 14px",
                  borderRadius: 10,
                  background: "rgba(255, 255, 255, 0.02)",
                  border: "1px solid rgba(255, 255, 255, 0.05)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: st.color, boxShadow: `0 0 8px ${st.color}66` }} />
                  <div>
                    <div style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--color-text-primary)" }}>
                      {st.rango}
                    </div>
                    <div style={{ fontSize: "0.68rem", color: "var(--color-text-muted)" }}>
                      {st.alumnos}
                    </div>
                  </div>
                </div>

                <div style={{ fontSize: "0.88rem", fontWeight: 800, color: "#ffffff" }}>
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
