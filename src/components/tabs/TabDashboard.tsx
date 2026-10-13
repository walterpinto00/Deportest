// ─────────────────────────────────────────────────────────────
// TabDashboard.tsx — Panel de Control y Métricas de Alto Rendimiento
// ─────────────────────────────────────────────────────────────
import React from "react";
import {
  Users,
  Activity,
  TrendingUp,
  FileText,
  ShieldCheck,
  BarChart2,
  CheckCircle2,
  ArrowUpRight,
  ChevronRight,
} from "lucide-react";
import { motion, Variants } from "framer-motion";

export function TabDashboard() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 12 },
    show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
  };

  return (
    <motion.div
      className="animate-fade-in"
      variants={containerVariants}
      initial="hidden"
      animate="show"
      style={{ display: "flex", flexDirection: "column", gap: 20 }}
    >
      {/* ── Resumen de Indicadores Clave (KPIs) ── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: 16,
        }}
      >
        {[
          {
            label: "Aprendices Registrados",
            value: "248",
            meta: "+18 nuevas fichas",
            icon: Users,
            badge: "Activos",
          },
          {
            label: "Evaluaciones Clínicas",
            value: "186",
            meta: "Completadas este ciclo",
            icon: FileText,
            badge: "92% al día",
          },
          {
            label: "Pruebas Físicas Validadas",
            value: "412",
            meta: "Baremos calculados",
            icon: Activity,
            badge: "Oficiales",
          },
          {
            label: "Condición Saludable (OMS)",
            value: "76.4%",
            meta: "En percentil normal",
            icon: ShieldCheck,
            badge: "+4.2% mejora",
          },
        ].map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={i}
              variants={itemVariants}
              className="glass"
              style={{
                padding: "20px 22px",
                display: "flex",
                flexDirection: "column",
                gap: 12,
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "0.74rem", fontWeight: 600, color: "var(--color-text-secondary)", letterSpacing: "0.02em" }}>
                  {stat.label}
                </span>
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 8,
                    background: "rgba(255, 255, 255, 0.04)",
                    border: "1px solid rgba(255, 255, 255, 0.07)",
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
                <div style={{ fontSize: "2rem", fontWeight: 800, letterSpacing: "-0.03em", color: "#ffffff" }}>
                  {stat.value}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 4 }}>
                  <span
                    style={{
                      fontSize: "0.68rem",
                      padding: "2px 6px",
                      borderRadius: 4,
                      background: "rgba(16, 185, 129, 0.12)",
                      color: "var(--color-green)",
                      fontWeight: 700,
                    }}
                  >
                    {stat.badge}
                  </span>
                  <span style={{ fontSize: "0.73rem", color: "var(--color-text-muted)" }}>
                    {stat.meta}
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* ── Gráficas y Métricas Detalladas ── */}
      <div style={{ display: "grid", gridTemplateColumns: "1.7fr 1.3fr", gap: 20 }}>
        {/* Rendimiento por Disciplina Deportiva */}
        <motion.div variants={itemVariants} className="glass-elevated" style={{ padding: "24px 28px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
            <div>
              <h3 style={{ fontSize: "0.95rem", fontWeight: 700, letterSpacing: "-0.01em" }}>
                Aptitud Física por Disciplina
              </h3>
              <p style={{ fontSize: "0.72rem", color: "var(--color-text-muted)", marginTop: 2 }}>
                Promedio general de cumplimiento de marcas de rendimiento
              </p>
            </div>
            <span
              style={{
                fontSize: "0.7rem",
                padding: "3px 8px",
                borderRadius: 6,
                background: "rgba(255, 255, 255, 0.04)",
                color: "var(--color-text-secondary)",
                fontWeight: 600,
              }}
            >
              Período Activo
            </span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {[
              { disciplina: "Fútbol Formativo", pct: 91, atletas: "64 evaluados" },
              { disciplina: "Atletismo & Velocidad", pct: 88, atletas: "42 evaluados" },
              { disciplina: "Baloncesto Juvenil", pct: 82, atletas: "50 evaluados" },
              { disciplina: "Voleibol Escolar", pct: 79, atletas: "48 evaluados" },
              { disciplina: "Acondicionamiento General", pct: 85, atletas: "44 evaluados" },
            ].map((dep, i) => (
              <div key={i}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontSize: "0.82rem", fontWeight: 600, color: "var(--color-text-primary)" }}>
                      {dep.disciplina}
                    </span>
                    <span style={{ fontSize: "0.7rem", color: "var(--color-text-muted)" }}>
                      ({dep.atletas})
                    </span>
                  </div>
                  <span style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--color-green)" }}>
                    {dep.pct}%
                  </span>
                </div>
                {/* Barra de progreso unificada y elegante */}
                <div
                  style={{
                    height: 6,
                    background: "rgba(255, 255, 255, 0.05)",
                    borderRadius: 99,
                    overflow: "hidden",
                  }}
                >
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${dep.pct}%` }}
                    transition={{ duration: 0.8, delay: 0.15 + i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                      height: "100%",
                      background: "linear-gradient(90deg, var(--color-green-dark), var(--color-green))",
                      borderRadius: 99,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Clasificación Nutricional y Semáforo OMS */}
        <motion.div variants={itemVariants} className="glass-elevated" style={{ padding: "24px 28px", display: "flex", flexDirection: "column" }}>
          <div style={{ marginBottom: 20 }}>
            <h3 style={{ fontSize: "0.95rem", fontWeight: 700, letterSpacing: "-0.01em" }}>
              Clasificación Nutricional (OMS)
            </h3>
            <p style={{ fontSize: "0.72rem", color: "var(--color-text-muted)", marginTop: 2 }}>
              Distribución corporal de la población evaluada
            </p>
          </div>

          <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-around", gap: 12 }}>
            {[
              {
                estado: "Peso Adecuado / Saludable",
                porcentaje: "76.4%",
                alumnos: "189 aprendices",
                indicador: "var(--color-green)",
              },
              {
                estado: "Sobrepeso Leve (Monitoreo)",
                porcentaje: "14.2%",
                alumnos: "35 aprendices",
                indicador: "var(--color-amber)",
              },
              {
                estado: "Bajo Peso (Orientación)",
                porcentaje: "6.8%",
                alumnos: "17 aprendices",
                indicador: "var(--color-blue)",
              },
              {
                estado: "Riesgo de Obesidad",
                porcentaje: "2.6%",
                alumnos: "7 aprendices",
                indicador: "var(--color-rose)",
              },
            ].map((row, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "12px 14px",
                  borderRadius: 10,
                  background: "rgba(255, 255, 255, 0.02)",
                  border: "1px solid rgba(255, 255, 255, 0.05)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      background: row.indicador,
                      boxShadow: `0 0 8px ${row.indicador}66`,
                    }}
                  />
                  <div>
                    <div style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--color-text-primary)" }}>
                      {row.estado}
                    </div>
                    <div style={{ fontSize: "0.68rem", color: "var(--color-text-muted)" }}>
                      {row.alumnos}
                    </div>
                  </div>
                </div>

                <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "#ffffff" }}>
                  {row.porcentaje}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
