// ─────────────────────────────────────────────────────────────
// TabPruebas.tsx — Pruebas Físicas & Calificación Instantánea de Baremos
// Diseño amigable para docentes: claro, con botones visibles y escala explicativa
// ─────────────────────────────────────────────────────────────
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Activity,
  Award,
  Save,
  CheckCircle2,
  TrendingUp,
  Minus,
  Plus,
} from "lucide-react";
import { Input } from "../ui/Input";

interface TabPruebasProps {
  role: string;
  onSave: () => void;
}

// Batería de pruebas con sus cortes de baremo oficiales explicados
const PRUEBAS_DISPONIBLES = [
  {
    id: "cooper",
    nombre: "Test Cooper",
    sub: "Resistencia Aeróbica (12 min)",
    unidad: "metros",
    placeholder: "Ej: 2400",
    color: "#d97706",
    step: 50,
    min: 1000,
    max: 3200,
    escalas: [
      { nivel: "Excelente / Sobresaliente", rango: "≥ 2.500 m", pts: 95, color: "#10b981" },
      { nivel: "Bueno / Saludable", rango: "2.200 - 2.499 m", pts: 85, color: "#059669" },
      { nivel: "Aceptable / Promedio", rango: "1.800 - 2.199 m", pts: 70, color: "#d97706" },
      { nivel: "Bajo / En Acondicionamiento", rango: "< 1.800 m", pts: 50, color: "#e11d48" },
    ],
    evaluar: (m: number) => {
      if (m >= 2500) return { pts: 95, nivel: "Excelente / Sobresaliente", color: "#10b981", index: 0 };
      if (m >= 2200) return { pts: 85, nivel: "Bueno / Saludable", color: "#059669", index: 1 };
      if (m >= 1800) return { pts: 70, nivel: "Aceptable / Promedio", color: "#d97706", index: 2 };
      return { pts: 50, nivel: "Bajo / Requiere Acondicionamiento", color: "#e11d48", index: 3 };
    },
  },
  {
    id: "navette",
    nombre: "Course-Navette",
    sub: "Resistencia Escolar (20m)",
    unidad: "períodos (paliers)",
    placeholder: "Ej: 7.5",
    color: "#10b981",
    step: 0.5,
    min: 2,
    max: 14,
    escalas: [
      { nivel: "Excelente / Élite Escolar", rango: "≥ Palier 9.0", pts: 95, color: "#10b981" },
      { nivel: "Bueno / Zona Saludable", rango: "Palier 7.0 - 8.5", pts: 85, color: "#059669" },
      { nivel: "Aceptable", rango: "Palier 5.0 - 6.5", pts: 70, color: "#d97706" },
      { nivel: "Bajo", rango: "< Palier 5.0", pts: 50, color: "#e11d48" },
    ],
    evaluar: (m: number) => {
      if (m >= 9) return { pts: 95, nivel: "Excelente / Élite Escolar", color: "#10b981", index: 0 };
      if (m >= 7) return { pts: 85, nivel: "Bueno / Zona Saludable", color: "#059669", index: 1 };
      if (m >= 5) return { pts: 70, nivel: "Aceptable", color: "#d97706", index: 2 };
      return { pts: 50, nivel: "Bajo", color: "#e11d48", index: 3 };
    },
  },
  {
    id: "flexiones",
    nombre: "Flexiones de Brazo",
    sub: "Fuerza Tren Superior (1 min)",
    unidad: "repeticiones",
    placeholder: "Ej: 35",
    color: "#0891b2",
    step: 1,
    min: 0,
    max: 60,
    escalas: [
      { nivel: "Excelente", rango: "≥ 40 repeticiones", pts: 95, color: "#10b981" },
      { nivel: "Bueno / Aceptable", rango: "28 - 39 repeticiones", pts: 85, color: "#059669" },
      { nivel: "Aceptable / Promedio", rango: "18 - 27 repeticiones", pts: 70, color: "#d97706" },
      { nivel: "Bajo", rango: "< 18 repeticiones", pts: 45, color: "#e11d48" },
    ],
    evaluar: (m: number) => {
      if (m >= 40) return { pts: 95, nivel: "Excelente", color: "#10b981", index: 0 };
      if (m >= 28) return { pts: 85, nivel: "Bueno", color: "#059669", index: 1 };
      if (m >= 18) return { pts: 70, nivel: "Aceptable", color: "#d97706", index: 2 };
      return { pts: 45, nivel: "Bajo", color: "#e11d48", index: 3 };
    },
  },
  {
    id: "velocidad",
    nombre: "Velocidad 50 Metros",
    sub: "Rapidez y Aceleración",
    unidad: "segundos (s)",
    placeholder: "Ej: 7.8",
    color: "#ea580c",
    step: 0.1,
    min: 5.5,
    max: 12.0,
    escalas: [
      { nivel: "Muy Rápido / Élite", rango: "≤ 7.2 s", pts: 95, color: "#10b981" },
      { nivel: "Bueno / Promedio Alto", rango: "7.3 - 8.2 s", pts: 85, color: "#059669" },
      { nivel: "Aceptable", rango: "8.3 - 9.4 s", pts: 70, color: "#d97706" },
      { nivel: "Lento / En Proceso", rango: "> 9.4 s", pts: 45, color: "#e11d48" },
    ],
    evaluar: (m: number) => {
      if (m <= 7.2) return { pts: 95, nivel: "Muy Rápido / Élite", color: "#10b981", index: 0 };
      if (m <= 8.2) return { pts: 85, nivel: "Bueno / Promedio Alto", color: "#059669", index: 1 };
      if (m <= 9.4) return { pts: 70, nivel: "Aceptable", color: "#d97706", index: 2 };
      return { pts: 45, nivel: "Lento / En Proceso", color: "#e11d48", index: 3 };
    },
  },
  {
    id: "salto",
    nombre: "Salto Largo sin Impulso",
    sub: "Potencia Tren Inferior",
    unidad: "centímetros (cm)",
    placeholder: "Ej: 210",
    color: "#7c3aed",
    step: 5,
    min: 100,
    max: 280,
    escalas: [
      { nivel: "Excelente", rango: "≥ 220 cm", pts: 95, color: "#10b981" },
      { nivel: "Bueno", rango: "190 - 219 cm", pts: 85, color: "#059669" },
      { nivel: "Promedio", rango: "160 - 189 cm", pts: 70, color: "#d97706" },
      { nivel: "Bajo", rango: "< 160 cm", pts: 45, color: "#e11d48" },
    ],
    evaluar: (m: number) => {
      if (m >= 220) return { pts: 95, nivel: "Excelente", color: "#10b981", index: 0 };
      if (m >= 190) return { pts: 85, nivel: "Bueno", color: "#059669", index: 1 };
      if (m >= 160) return { pts: 70, nivel: "Promedio", color: "#d97706", index: 2 };
      return { pts: 45, nivel: "Bajo", color: "#e11d48", index: 3 };
    },
  },
  {
    id: "flexibilidad",
    nombre: "Flexibilidad (Wells)",
    sub: "Elasticidad Isquiotibial",
    unidad: "cm (+ / -)",
    placeholder: "Ej: +4",
    color: "#0d9488",
    step: 1,
    min: -15,
    max: 20,
    escalas: [
      { nivel: "Muy Flexible", rango: "≥ +6 cm", pts: 95, color: "#10b981" },
      { nivel: "Normal / Bueno", rango: "+1 a +5 cm", pts: 85, color: "#059669" },
      { nivel: "Límite Aceptable", rango: "-4 a 0 cm", pts: 70, color: "#d97706" },
      { nivel: "Baja Flexibilidad", rango: "< -4 cm", pts: 45, color: "#e11d48" },
    ],
    evaluar: (m: number) => {
      if (m >= 6) return { pts: 95, nivel: "Muy Flexible", color: "#10b981", index: 0 };
      if (m >= 1) return { pts: 85, nivel: "Normal / Bueno", color: "#059669", index: 1 };
      if (m >= -4) return { pts: 70, nivel: "Límite Aceptable", color: "#d97706", index: 2 };
      return { pts: 45, nivel: "Baja Flexibilidad", color: "#e11d48", index: 3 };
    },
  },
];

const REGISTROS_EJEMPLO = [
  { id: 1, alumno: "Juan Camilo Rodríguez", prueba: "Test Cooper", marca: "2.450 m", pts: 88, estado: "Destacado" },
  { id: 2, alumno: "Valentina Gómez", prueba: "Flexiones", marca: "32 reps", pts: 90, estado: "Excelente" },
  { id: 3, alumno: "Andrés Felipe Muñoz", prueba: "Course-Navette", marca: "Palier 7.0", pts: 85, estado: "Bueno" },
  { id: 4, alumno: "Sofía Martínez", prueba: "Velocidad 50m", marca: "7.8 s", pts: 86, estado: "Bueno" },
];

export function TabPruebas({ role, onSave }: TabPruebasProps) {
  const [pruebaId, setPruebaId] = useState("flexiones");
  const [marcaStr, setMarcaStr] = useState("35");
  const [alumno, setAlumno] = useState("1001234567 — Juan Camilo Rodríguez");
  const [registros, setRegistros] = useState(REGISTROS_EJEMPLO);
  const [savedOk, setSavedOk] = useState(false);

  const pruebaActiva = PRUEBAS_DISPONIBLES.find((p) => p.id === pruebaId) || PRUEBAS_DISPONIBLES[2];
  const marcaNum = parseFloat(marcaStr) || 0;
  const resultado = pruebaActiva.evaluar(marcaNum);

  const handleGuardar = () => {
    onSave();
    const nuevo = {
      id: Date.now(),
      alumno: alumno.split("—")[1]?.trim() || "Estudiante Evaluado",
      prueba: pruebaActiva.nombre,
      marca: `${marcaStr} ${pruebaActiva.unidad}`,
      pts: resultado.pts,
      estado: resultado.nivel.split("/")[0].trim(),
    };
    setRegistros([nuevo, ...registros]);
    setSavedOk(true);
    setTimeout(() => setSavedOk(false), 2000);
  };

  const ajustarMarca = (delta: number) => {
    const val = parseFloat(marcaStr) || 0;
    const nuevo = Math.round((val + delta) * 10) / 10;
    setMarcaStr(String(nuevo));
  };

  return (
    <div className="animate-fade-in" style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {/* ── 1. SELECTOR DE PRUEBA ATLÉTICA ESPACIOSO ── */}
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <span style={{ fontSize: "0.85rem", fontWeight: 800, color: "var(--color-text-primary)", textTransform: "uppercase", letterSpacing: "0.04em" }}>
            Batería de Pruebas Físicas Oficiales
          </span>
          <span style={{ fontSize: "0.82rem", color: "var(--color-text-muted)" }}>
            Selecciona la prueba a evaluar en clase
          </span>
        </div>

        <div
          style={{
            display: "flex",
            gap: 12,
            overflowX: "auto",
            paddingBottom: 6,
          }}
        >
          {PRUEBAS_DISPONIBLES.map((p) => {
            const isSelected = pruebaId === p.id;
            return (
              <button
                key={p.id}
                onClick={() => {
                  setPruebaId(p.id);
                  if (p.id === "flexiones") setMarcaStr("35");
                  else if (p.id === "navette") setMarcaStr("7.5");
                  else if (p.id === "velocidad") setMarcaStr("7.8");
                  else if (p.id === "salto") setMarcaStr("210");
                  else if (p.id === "flexibilidad") setMarcaStr("4");
                  else setMarcaStr("2450");
                }}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  padding: "13px 18px",
                  borderRadius: 14,
                  background: isSelected ? `${p.color}18` : "var(--color-bg-surface)",
                  border: "1.5px solid",
                  borderColor: isSelected ? p.color : "var(--color-border)",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  transition: "all 0.15s ease",
                  fontFamily: "var(--font-sans)",
                  minWidth: 160,
                }}
              >
                <span style={{ fontSize: "0.94rem", fontWeight: 800, color: isSelected ? p.color : "var(--color-text-primary)" }}>
                  {p.nombre}
                </span>
                <span style={{ fontSize: "0.78rem", color: "var(--color-text-muted)", marginTop: 2, fontWeight: 600 }}>
                  {p.sub}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── 2. GRID PRINCIPAL: FORMULARIO Y BAREMO EN VIVO ── */}
      <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1.3fr", gap: 26, alignItems: "stretch" }}>
        {/* Panel Izquierdo: Formulario de Toma de Marca */}
        <div
          className="glass-elevated"
          style={{
            padding: "26px 30px",
            borderRadius: 20,
            display: "flex",
            flexDirection: "column",
            gap: 20,
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid var(--color-border)", paddingBottom: 14 }}>
            <div>
              <span style={{ fontSize: "0.78rem", color: pruebaActiva.color, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                Registro en Tiempo Real
              </span>
              <h3 style={{ fontSize: "1.3rem", fontWeight: 800, color: "var(--color-text-primary)", marginTop: 2 }}>
                {pruebaActiva.nombre}
              </h3>
            </div>
            <span
              style={{
                fontSize: "0.82rem",
                padding: "5px 12px",
                borderRadius: 8,
                background: `${pruebaActiva.color}15`,
                border: `1px solid ${pruebaActiva.color}40`,
                color: pruebaActiva.color,
                fontWeight: 800,
              }}
            >
              Unidad: {pruebaActiva.unidad}
            </span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <div>
              <Input
                label="Estudiante a Calificar"
                value={alumno}
                onChange={(e) => setAlumno(e.target.value)}
              />
            </div>

            {/* Input de Marca Grande con Botones Rápidos (Colores nítidos) */}
            <div>
              <label className="dp-label">Marca Lograda ({pruebaActiva.unidad})</label>
              <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                <button
                  type="button"
                  onClick={() => ajustarMarca(-pruebaActiva.step)}
                  className="btn btn-secondary"
                  style={{ padding: "12px 16px", borderRadius: 10, color: "var(--color-text-primary)" }}
                  title="Disminuir marca"
                >
                  <Minus size={16} />
                </button>

                <input
                  className="dp-input"
                  type="number"
                  step={pruebaActiva.step}
                  placeholder={pruebaActiva.placeholder}
                  value={marcaStr}
                  onChange={(e) => setMarcaStr(e.target.value)}
                  style={{ fontSize: "1.4rem", fontWeight: 800, textAlign: "center" }}
                />

                <button
                  type="button"
                  onClick={() => ajustarMarca(pruebaActiva.step)}
                  className="btn btn-secondary"
                  style={{ padding: "12px 16px", borderRadius: 10, color: "var(--color-text-primary)" }}
                  title="Aumentar marca"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            <div>
              <Input label="Fecha de Toma" type="date" defaultValue="2026-10-13" />
            </div>
          </div>

          {/* Botón de Guardar Calificación */}
          <div style={{ marginTop: "auto", paddingTop: 8 }}>
            <button
              className="btn btn-primary"
              onClick={handleGuardar}
              style={{ width: "100%", justifyContent: "center", padding: "14px", fontSize: "0.95rem" }}
            >
              {savedOk ? <CheckCircle2 size={18} /> : <Save size={18} />}
              <span>{savedOk ? "✓ ¡Calificación Guardada con Éxito!" : "Registrar y Guardar Calificación"}</span>
            </button>
          </div>
        </div>

        {/* Panel Derecho: Baremo Calculado & Tabla de Referencia */}
        <div
          className="glass-elevated"
          style={{
            padding: "26px 30px",
            borderRadius: 20,
            display: "flex",
            flexDirection: "column",
            gap: 20,
            borderLeft: `4px solid ${resultado.color}`,
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", borderBottom: "1px solid var(--color-border)", paddingBottom: 14 }}>
            <div>
              <span style={{ fontSize: "0.78rem", color: "var(--color-text-muted)", textTransform: "uppercase", fontWeight: 700, letterSpacing: "0.04em" }}>
                Puntuación de Baremo Asignada
              </span>
              <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginTop: 4 }}>
                <span style={{ fontSize: "3.2rem", fontWeight: 900, color: "var(--color-text-primary)", lineHeight: 1 }}>
                  {resultado.pts}
                </span>
                <span style={{ fontSize: "1.1rem", color: "var(--color-text-muted)", fontWeight: 700 }}>
                  / 100 pts
                </span>
              </div>
            </div>

            <div
              style={{
                padding: "8px 16px",
                borderRadius: 12,
                background: "var(--color-bg-surface)",
                color: resultado.color,
                fontSize: "0.92rem",
                fontWeight: 900,
                border: `2px solid ${resultado.color}`,
              }}
            >
              {resultado.nivel}
            </div>
          </div>

          {/* Barra de Progreso Visual */}
          <div>
            <div style={{ height: 10, borderRadius: 99, background: "var(--color-border)", overflow: "hidden" }}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${resultado.pts}%` }}
                transition={{ duration: 0.3 }}
                style={{
                  height: "100%",
                  background: `linear-gradient(90deg, ${resultado.color}, #10b981)`,
                  borderRadius: 99,
                }}
              />
            </div>
          </div>

          {/* Tabla de Baremos Oficiales */}
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <span style={{ fontSize: "0.82rem", fontWeight: 800, color: "var(--color-text-secondary)", textTransform: "uppercase", letterSpacing: "0.04em" }}>
              Escala de Baremos Oficiales ({pruebaActiva.nombre})
            </span>

            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {pruebaActiva.escalas.map((esc, idx) => {
                const esFilaActual = resultado.index === idx;
                return (
                  <div
                    key={idx}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "10px 14px",
                      borderRadius: 10,
                      background: esFilaActual ? `${esc.color}15` : "var(--color-bg-card)",
                      border: "1.5px solid",
                      borderColor: esFilaActual ? esc.color : "var(--color-border)",
                      transition: "all 0.15s ease",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div style={{ width: 8, height: 8, borderRadius: "50%", background: esc.color }} />
                      <span style={{ fontSize: "0.88rem", fontWeight: esFilaActual ? 800 : 600, color: esFilaActual ? esc.color : "var(--color-text-primary)" }}>
                        {esc.nivel}
                      </span>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                      <span style={{ fontSize: "0.86rem", color: "var(--color-text-secondary)", fontWeight: 700 }}>
                        {esc.rango}
                      </span>
                      <span
                        style={{
                          fontSize: "0.8rem",
                          fontWeight: 800,
                          color: esc.color,
                          padding: "2px 8px",
                          borderRadius: 6,
                          background: `${esc.color}15`,
                        }}
                      >
                        {esc.pts} pts
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* ── 3. HISTORIAL RÁPIDO DE CLASE ── */}
      <div className="glass-elevated" style={{ padding: "22px 26px", borderRadius: 18, display: "flex", flexDirection: "column", gap: 14 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Award size={18} color="var(--color-green)" />
            <h4 style={{ fontSize: "1.02rem", fontWeight: 800, color: "var(--color-text-primary)" }}>
              Últimas Pruebas Registradas en Clase
            </h4>
          </div>
          <span style={{ fontSize: "0.8rem", color: "var(--color-text-muted)", fontWeight: 600 }}>
            {registros.length} evaluaciones registradas
          </span>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 12 }}>
          {registros.slice(0, 4).map((r) => (
            <div
              key={r.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "12px 16px",
                borderRadius: 12,
                background: "var(--color-bg-card)",
                border: "1px solid var(--color-border)",
              }}
            >
              <div>
                <div style={{ fontSize: "0.92rem", fontWeight: 700, color: "var(--color-text-primary)" }}>{r.alumno}</div>
                <div style={{ fontSize: "0.8rem", color: "var(--color-text-muted)", marginTop: 2 }}>
                  {r.prueba} · <strong style={{ color: "var(--color-green)" }}>{r.marca}</strong>
                </div>
              </div>

              <span
                style={{
                  padding: "4px 10px",
                  borderRadius: 8,
                  background: "rgba(16, 185, 129, 0.12)",
                  color: "var(--color-green)",
                  fontWeight: 800,
                  fontSize: "0.82rem",
                  border: "1px solid rgba(16, 185, 129, 0.25)",
                }}
              >
                {r.pts} pts
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
