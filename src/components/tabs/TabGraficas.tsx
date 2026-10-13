// ─────────────────────────────────────────────────────────────
// TabGraficas.tsx — Gráficas y Evolución de Rendimiento y Salud
// ─────────────────────────────────────────────────────────────
import React, { useState } from "react";
import { BarChart2, Activity, Users, TrendingUp, Search, Calendar, Printer } from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
  Legend,
} from "recharts";
import { Input } from "../ui/Input";

interface TabGraficasProps {
  role: string;
}

const PRUEBA_DATA = [
  { fecha: "Ene 2024", cooper: 1950, flexiones: 26, velocidad: 9.1 },
  { fecha: "Abr 2024", cooper: 2100, flexiones: 31, velocidad: 8.7 },
  { fecha: "Jul 2024", cooper: 2250, flexiones: 37, velocidad: 8.3 },
  { fecha: "Oct 2024", cooper: 2380, flexiones: 42, velocidad: 7.9 },
  { fecha: "Ene 2025", cooper: 2480, flexiones: 48, velocidad: 7.5 },
];

const ANTRO_DATA = [
  { fecha: "Ene 2024", peso: 68.5, cintura: 82, grasa: 19.5 },
  { fecha: "Abr 2024", peso: 67.2, cintura: 80, grasa: 18.2 },
  { fecha: "Jul 2024", peso: 66.0, cintura: 78, grasa: 16.8 },
  { fecha: "Oct 2024", peso: 65.1, cintura: 77, grasa: 15.6 },
  { fecha: "Ene 2025", peso: 64.5, cintura: 75, grasa: 14.8 },
];

const tooltipStyle = {
  contentStyle: {
    background: "#0d121f",
    border: "1px solid rgba(255, 255, 255, 0.12)",
    borderRadius: 8,
    fontFamily: "var(--font-sans)",
    fontSize: "0.78rem",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5)",
  },
  labelStyle: { color: "#94a3b8", marginBottom: 4, fontWeight: 600 },
  itemStyle: { color: "#f8fafc" },
};

export function TabGraficas({ role }: TabGraficasProps) {
  const [metricaPrueba, setMetricaPrueba] = useState("cooper");
  const [metricaAntropo, setMetricaAntropo] = useState("peso");

  return (
    <div className="animate-fade-in" style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {/* Barra de Filtro para Entrenador / Docente */}
      {role === "ENTRENADOR" && (
        <div
          className="glass-elevated"
          style={{
            padding: "16px 24px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <div style={{ display: "flex", alignItems: "flex-end", gap: 10, flexWrap: "wrap" }}>
            <div style={{ width: 240 }}>
              <Input label="Aprendiz a Consultar" defaultValue="1001234567 — Juan Rodríguez" />
            </div>
            <button className="btn btn-secondary" style={{ padding: "9px 14px", fontSize: "0.78rem" }}>
              <Search size={13} /> Filtrar Histórico
            </button>
          </div>

          <button
            className="btn btn-ghost"
            onClick={() => window.print()}
            style={{ padding: "9px 14px", fontSize: "0.78rem" }}
          >
            <Printer size={13} /> Exportar Gráficas
          </button>
        </div>
      )}

      {/* Tarjetas de Resumen KPI */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
        {[
          {
            icon: TrendingUp,
            label: "Progreso Test Cooper",
            value: "+27.1%",
            sub: "Mejora sostenida en 12 meses",
          },
          {
            icon: Activity,
            label: "Fuerza Resistencia",
            value: "48 reps",
            sub: "Flexiones consecutivas",
          },
          {
            icon: Users,
            label: "Grasa Corporal",
            value: "14.8%",
            sub: "Dentro de rango atlético",
          },
          {
            icon: Calendar,
            label: "Ciclos Registrados",
            value: "5 tomas",
            sub: "Seguimiento institucional",
          },
        ].map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="glass" style={{ padding: "18px 20px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "0.72rem", color: "var(--color-text-muted)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.04em" }}>
                  {s.label}
                </span>
                <div
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: 6,
                    background: "rgba(16, 185, 129, 0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--color-green)",
                  }}
                >
                  <Icon size={14} />
                </div>
              </div>
              <div style={{ fontSize: "1.75rem", fontWeight: 800, color: "var(--color-text-primary)", marginTop: 8, letterSpacing: "-0.02em" }}>
                {s.value}
              </div>
              <div style={{ fontSize: "0.72rem", color: "var(--color-text-secondary)", marginTop: 2 }}>
                {s.sub}
              </div>
            </div>
          );
        })}
      </div>

      {/* Gráficas Detalladas */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(420px, 1fr))", gap: 20 }}>
        {/* Curva de Pruebas Físicas */}
        <div className="glass-elevated" style={{ padding: "24px 28px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
            <div>
              <h3 style={{ fontSize: "0.92rem", fontWeight: 700, letterSpacing: "-0.01em" }}>
                Evolución de Pruebas Físicas
              </h3>
              <p style={{ fontSize: "0.72rem", color: "var(--color-text-muted)" }}>
                Registro longitudinal de rendimiento
              </p>
            </div>
            <select
              value={metricaPrueba}
              onChange={(e) => setMetricaPrueba(e.target.value)}
              className="dp-select"
              style={{ width: "auto", padding: "6px 32px 6px 12px", fontSize: "0.75rem" }}
            >
              <option value="cooper">Test Cooper (metros)</option>
              <option value="flexiones">Flexiones (repeticiones)</option>
              <option value="velocidad">Velocidad 50 m (segundos)</option>
            </select>
          </div>
          <div style={{ height: 260 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={PRUEBA_DATA}>
                <defs>
                  <linearGradient id="colorPrueba" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="fecha" tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} dy={8} />
                <YAxis tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} dx={-4} domain={["auto", "auto"]} />
                <Tooltip {...tooltipStyle} />
                <Area
                  type="monotone"
                  dataKey={metricaPrueba}
                  stroke="#10b981"
                  strokeWidth={2}
                  fill="url(#colorPrueba)"
                  dot={{ r: 3, fill: "#10b981", strokeWidth: 2, stroke: "#070a12" }}
                  activeDot={{ r: 5 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Curva Antropométrica */}
        <div className="glass-elevated" style={{ padding: "24px 28px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
            <div>
              <h3 style={{ fontSize: "0.92rem", fontWeight: 700, letterSpacing: "-0.01em" }}>
                Evolución de Composición Corporal
              </h3>
              <p style={{ fontSize: "0.72rem", color: "var(--color-text-muted)" }}>
                Curva de peso, grasa y perímetros
              </p>
            </div>
            <select
              value={metricaAntropo}
              onChange={(e) => setMetricaAntropo(e.target.value)}
              className="dp-select"
              style={{ width: "auto", padding: "6px 32px 6px 12px", fontSize: "0.75rem" }}
            >
              <option value="peso">Peso Corporal (kg)</option>
              <option value="cintura">Cintura (cm)</option>
              <option value="grasa">Porcentaje de Grasa (%)</option>
            </select>
          </div>
          <div style={{ height: 260 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={ANTRO_DATA}>
                <defs>
                  <linearGradient id="colorAntropo" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="fecha" tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} dy={8} />
                <YAxis tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} dx={-4} domain={["auto", "auto"]} />
                <Tooltip {...tooltipStyle} />
                <Area
                  type="monotone"
                  dataKey={metricaAntropo}
                  stroke="#06b6d4"
                  strokeWidth={2}
                  fill="url(#colorAntropo)"
                  dot={{ r: 3, fill: "#06b6d4", strokeWidth: 2, stroke: "#070a12" }}
                  activeDot={{ r: 5 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Comparativa General en Barras */}
        <div className="glass-elevated" style={{ padding: "24px 28px", gridColumn: "1 / -1" }}>
          <h3 style={{ fontSize: "0.92rem", fontWeight: 700, letterSpacing: "-0.01em", marginBottom: 20 }}>
            Comparativa Periódica de Fuerza y Velocidad
          </h3>
          <div style={{ height: 220 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={PRUEBA_DATA} barSize={16}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="fecha" tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} dy={8} />
                <YAxis tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip {...tooltipStyle} />
                <Legend wrapperStyle={{ fontSize: "0.75rem", color: "#94a3b8", paddingTop: 12 }} />
                <Bar dataKey="flexiones" name="Flexiones (reps)" fill="#10b981" radius={[4, 4, 0, 0]} />
                <Bar dataKey="velocidad" name="Velocidad (segundos × 10)" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
