// ─────────────────────────────────────────────
// Tab: Gráficas de Salud
// ─────────────────────────────────────────────
import React, { useState } from "react";
import { BarChart2, Activity, Users, TrendingUp, Search } from "lucide-react";
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Area, AreaChart, Legend,
} from "recharts";
import { Input } from "../ui/Input";

interface TabGraficasProps {
  role: string;
}

const PRUEBA_DATA = [
  { fecha: "Ene 2023", cooper: 1800, flexiones: 25, velocidad: 9.5 },
  { fecha: "Abr 2023", cooper: 1950, flexiones: 32, velocidad: 9.0 },
  { fecha: "Jul 2023", cooper: 2100, flexiones: 38, velocidad: 8.5 },
  { fecha: "Oct 2023", cooper: 2300, flexiones: 45, velocidad: 8.0 },
  { fecha: "Ene 2024", cooper: 2450, flexiones: 50, velocidad: 7.8 },
];

const ANTRO_DATA = [
  { fecha: "Ene 2023", peso: 75.5, cintura: 88, grasa: 22 },
  { fecha: "Abr 2023", peso: 74.0, cintura: 85, grasa: 20 },
  { fecha: "Jul 2023", peso: 72.5, cintura: 82, grasa: 18 },
  { fecha: "Oct 2023", peso: 71.0, cintura: 80, grasa: 16 },
  { fecha: "Ene 2024", peso: 70.2, cintura: 78, grasa: 14 },
];

const tooltipStyle = {
  contentStyle: {
    background: "#1a2236",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: 10,
    fontFamily: "var(--font-sans)",
    fontSize: "0.8rem",
    boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
  },
  labelStyle: { color: "#94a3b8", marginBottom: 4, fontWeight: 600 },
  itemStyle: { color: "#f1f5f9" },
};

export function TabGraficas({ role }: TabGraficasProps) {
  const [metricaPrueba, setMetricaPrueba] = useState("cooper");
  const [metricaAntropo, setMetricaAntropo] = useState("peso");

  return (
    <div className="animate-fade-in" style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {/* Busqueda entrenador */}
      {role === "ENTRENADOR" && (
        <div className="glass" style={{ padding: 20, display: "flex", alignItems: "flex-end", gap: 12 }}>
          <Input label="Documento del Aprendiz" placeholder="Ingrese la identificación a consultar..." style={{ maxWidth: 320 }} />
          <button className="btn btn-primary">
            <Search size={14} /> Cargar Historial
          </button>
        </div>
      )}

      {/* KPI Summary */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 16 }}>
        {[
          { icon: TrendingUp, label: "Progreso Cooper",    value: "+28%",   sub: "Últimos 12 meses",   color: "var(--color-rose)" },
          { icon: Activity,   label: "Mejor Flexiones",   value: "50",     sub: "Repeticiones",        color: "var(--color-green)" },
          { icon: Users,      label: "% Grasa Reducido",  value: "−8%",    sub: "Desde Enero 2023",    color: "var(--color-teal)" },
          { icon: BarChart2,  label: "Evaluaciones",       value: "5",      sub: "Periodos registrados",color: "var(--color-purple)" },
        ].map((s) => (
          <div key={s.label} className="glass" style={{ padding: 20 }}>
            <s.icon size={18} color={s.color} />
            <div style={{ fontSize: "1.8rem", fontWeight: 900, color: s.color, marginTop: 8 }}>{s.value}</div>
            <div style={{ fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--color-text-muted)", marginTop: 4 }}>{s.label}</div>
            <div style={{ fontSize: "0.7rem", color: "var(--color-text-secondary)", marginTop: 2 }}>{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))", gap: 24 }}>
        {/* Pruebas Físicas */}
        <div className="glass-elevated" style={{ padding: 28 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
            <h3 style={{ fontSize: "0.9rem", fontWeight: 700, display: "flex", alignItems: "center", gap: 8 }}>
              <Activity size={16} color="var(--color-rose)" />
              Evolución · Pruebas Físicas
            </h3>
            <select
              value={metricaPrueba}
              onChange={(e) => setMetricaPrueba(e.target.value)}
              className="dp-select"
              style={{ width: "auto", padding: "6px 32px 6px 12px", fontSize: "0.75rem" }}
            >
              <option value="cooper">Test Cooper (m)</option>
              <option value="flexiones">Flexiones (reps)</option>
              <option value="velocidad">Velocidad 50m (s)</option>
            </select>
          </div>
          <div style={{ height: 260 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={PRUEBA_DATA}>
                <defs>
                  <linearGradient id="colorPrueba" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#f43f5e" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="fecha" tick={{ fill: "#475569", fontSize: 11 }} axisLine={false} tickLine={false} dy={8} />
                <YAxis tick={{ fill: "#475569", fontSize: 11 }} axisLine={false} tickLine={false} dx={-4} domain={["auto", "auto"]} />
                <Tooltip {...tooltipStyle} />
                <Area type="monotone" dataKey={metricaPrueba} stroke="#f43f5e" strokeWidth={2.5} fill="url(#colorPrueba)" dot={{ r: 4, fill: "#f43f5e", strokeWidth: 2, stroke: "#1a2236" }} activeDot={{ r: 6 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Antropometría */}
        <div className="glass-elevated" style={{ padding: 28 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
            <h3 style={{ fontSize: "0.9rem", fontWeight: 700, display: "flex", alignItems: "center", gap: 8 }}>
              <Users size={16} color="var(--color-teal)" />
              Evolución · Antropometría
            </h3>
            <select
              value={metricaAntropo}
              onChange={(e) => setMetricaAntropo(e.target.value)}
              className="dp-select"
              style={{ width: "auto", padding: "6px 32px 6px 12px", fontSize: "0.75rem" }}
            >
              <option value="peso">Peso (kg)</option>
              <option value="cintura">Cintura (cm)</option>
              <option value="grasa">% Grasa</option>
            </select>
          </div>
          <div style={{ height: 260 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={ANTRO_DATA}>
                <defs>
                  <linearGradient id="colorAntropo" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#14b8a6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="fecha" tick={{ fill: "#475569", fontSize: 11 }} axisLine={false} tickLine={false} dy={8} />
                <YAxis tick={{ fill: "#475569", fontSize: 11 }} axisLine={false} tickLine={false} dx={-4} domain={["auto", "auto"]} />
                <Tooltip {...tooltipStyle} />
                <Area type="monotone" dataKey={metricaAntropo} stroke="#14b8a6" strokeWidth={2.5} fill="url(#colorAntropo)" dot={{ r: 4, fill: "#14b8a6", strokeWidth: 2, stroke: "#1a2236" }} activeDot={{ r: 6 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Comparativa Barras */}
        <div className="glass-elevated" style={{ padding: 28, gridColumn: "1 / -1" }}>
          <h3 style={{ fontSize: "0.9rem", fontWeight: 700, display: "flex", alignItems: "center", gap: 8, marginBottom: 24 }}>
            <BarChart2 size={16} color="var(--color-purple)" />
            Comparativa de Rendimiento — Todas las Pruebas
          </h3>
          <div style={{ height: 240 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={PRUEBA_DATA} barSize={14}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="fecha" tick={{ fill: "#475569", fontSize: 11 }} axisLine={false} tickLine={false} dy={8} />
                <YAxis tick={{ fill: "#475569", fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip {...tooltipStyle} />
                <Legend wrapperStyle={{ fontSize: "0.75rem", color: "#94a3b8", paddingTop: 16 }} />
                <Bar dataKey="flexiones" name="Flexiones" fill="#22c55e" radius={[4, 4, 0, 0]} />
                <Bar dataKey="velocidad" name="Velocidad (×10)" fill="#a855f7" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
