// ─────────────────────────────────────────────────────────────
// TabPruebas.tsx — Pruebas Físicas & Calificación Instantánea de Baremos
// Diseño espacioso, sin elementos pegados, con tabla de baremos explicativa
// ─────────────────────────────────────────────────────────────
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Activity,
  Award,
  Save,
  CheckCircle2,
  TrendingUp,
  User,
  Clock,
  Sparkles,
  Search,
  PlusCircle,
  HelpCircle,
  ChevronRight,
  Flame,
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
    color: "#f59e0b",
    step: 50,
    min: 1000,
    max: 3200,
    escalas: [
      { nivel: "Excelente / Sobresaliente", rango: "≥ 2.500 m", pts: 95, color: "#10b981" },
      { nivel: "Bueno / Saludable", rango: "2.200 - 2.499 m", pts: 85, color: "#34d399" },
      { nivel: "Aceptable / Promedio", rango: "1.800 - 2.199 m", pts: 70, color: "#f59e0b" },
      { nivel: "Bajo / En Acondicionamiento", rango: "< 1.800 m", pts: 50, color: "#f43f5e" },
    ],
    evaluar: (m: number) => {
      if (m >= 2500) return { pts: 95, nivel: "Excelente / Sobresaliente", color: "#10b981", index: 0 };
      if (m >= 2200) return { pts: 85, nivel: "Bueno / Saludable", color: "#34d399", index: 1 };
      if (m >= 1800) return { pts: 70, nivel: "Aceptable / Promedio", color: "#f59e0b", index: 2 };
      return { pts: 50, nivel: "Bajo / Requiere Acondicionamiento", color: "#f43f5e", index: 3 };
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
      { nivel: "Bueno / Zona Saludable", rango: "Palier 7.0 - 8.5", pts: 85, color: "#34d399" },
      { nivel: "Aceptable", rango: "Palier 5.0 - 6.5", pts: 70, color: "#f59e0b" },
      { nivel: "Bajo", rango: "< Palier 5.0", pts: 50, color: "#f43f5e" },
    ],
    evaluar: (m: number) => {
      if (m >= 9) return { pts: 95, nivel: "Excelente / Élite Escolar", color: "#10b981", index: 0 };
      if (m >= 7) return { pts: 85, nivel: "Bueno / Zona Saludable", color: "#34d399", index: 1 };
      if (m >= 5) return { pts: 70, nivel: "Aceptable", color: "#f59e0b", index: 2 };
      return { pts: 50, nivel: "Bajo", color: "#f43f5e", index: 3 };
    },
  },
  {
    id: "flexiones",
    nombre: "Flexiones de Brazo",
    sub: "Fuerza Tren Superior (1 min)",
    unidad: "repeticiones",
    placeholder: "Ej: 35",
    color: "#06b6d4",
    step: 1,
    min: 0,
    max: 60,
    escalas: [
      { nivel: "Excelente", rango: "≥ 40 repeticiones", pts: 95, color: "#10b981" },
      { nivel: "Bueno / Aceptable", rango: "28 - 39 repeticiones", pts: 85, color: "#34d399" },
      { nivel: "Aceptable / Promedio", rango: "18 - 27 repeticiones", pts: 70, color: "#f59e0b" },
      { nivel: "Bajo", rango: "< 18 repeticiones", pts: 45, color: "#f43f5e" },
    ],
    evaluar: (m: number) => {
      if (m >= 40) return { pts: 95, nivel: "Excelente", color: "#10b981", index: 0 };
      if (m >= 28) return { pts: 85, nivel: "Bueno", color: "#34d399", index: 1 };
      if (m >= 18) return { pts: 70, nivel: "Aceptable", color: "#f59e0b", index: 2 };
      return { pts: 45, nivel: "Bajo", color: "#f43f5e", index: 3 };
    },
  },
  {
    id: "velocidad",
    nombre: "Velocidad 50 Metros",
    sub: "Aceleración y Potencia",
    unidad: "segundos",
    placeholder: "Ej: 7.5",
    color: "#f97316",
    step: 0.1,
    min: 6,
    max: 12,
    escalas: [
      { nivel: "Excelente / Muy Rápido", rango: "≤ 7.2 segundos", pts: 95, color: "#10b981" },
      { nivel: "Bueno / Aceptable", rango: "7.3 - 8.2 segundos", pts: 85, color: "#34d399" },
      { nivel: "Promedio", rango: "8.3 - 9.2 segundos", pts: 70, color: "#f59e0b" },
      { nivel: "Lento", rango: "> 9.2 segundos", pts: 50, color: "#f43f5e" },
    ],
    evaluar: (m: number) => {
      if (m <= 7.2) return { pts: 95, nivel: "Excelente / Muy Rápido", color: "#10b981", index: 0 };
      if (m <= 8.2) return { pts: 85, nivel: "Bueno / Aceptable", color: "#34d399", index: 1 };
      if (m <= 9.2) return { pts: 70, nivel: "Promedio", color: "#f59e0b", index: 2 };
      return { pts: 50, nivel: "Lento", color: "#f43f5e", index: 3 };
    },
  },
  {
    id: "salto",
    nombre: "Salto Largo",
    sub: "Potencia de Tren Inferior",
    unidad: "centímetros",
    placeholder: "Ej: 210",
    color: "#8b5cf6",
    step: 5,
    min: 100,
    max: 280,
    escalas: [
      { nivel: "Excelente", rango: "≥ 220 cm", pts: 95, color: "#10b981" },
      { nivel: "Bueno", rango: "190 - 219 cm", pts: 85, color: "#34d399" },
      { nivel: "Promedio", rango: "160 - 189 cm", pts: 70, color: "#f59e0b" },
      { nivel: "Bajo", rango: "< 160 cm", pts: 45, color: "#f43f5e" },
    ],
    evaluar: (m: number) => {
      if (m >= 220) return { pts: 95, nivel: "Excelente", color: "#10b981", index: 0 };
      if (m >= 190) return { pts: 85, nivel: "Bueno", color: "#34d399", index: 1 };
      if (m >= 160) return { pts: 70, nivel: "Promedio", color: "#f59e0b", index: 2 };
      return { pts: 45, nivel: "Bajo", color: "#f43f5e", index: 3 };
    },
  },
  {
    id: "flexibilidad",
    nombre: "Flexibilidad (Wells)",
    sub: "Elasticidad Isquiotibial",
    unidad: "cm (+ / -)",
    placeholder: "Ej: +4",
    color: "#14b8a6",
    step: 1,
    min: -15,
    max: 20,
    escalas: [
      { nivel: "Muy Flexible", rango: "≥ +6 cm", pts: 95, color: "#10b981" },
      { nivel: "Normal / Bueno", rango: "+1 a +5 cm", pts: 85, color: "#34d399" },
      { nivel: "Límite Aceptable", rango: "-4 a 0 cm", pts: 70, color: "#f59e0b" },
      { nivel: "Baja Flexibilidad", rango: "< -4 cm", pts: 45, color: "#f43f5e" },
    ],
    evaluar: (m: number) => {
      if (m >= 6) return { pts: 95, nivel: "Muy Flexible", color: "#10b981", index: 0 };
      if (m >= 1) return { pts: 85, nivel: "Normal / Bueno", color: "#34d399", index: 1 };
      if (m >= -4) return { pts: 70, nivel: "Límite Aceptable", color: "#f59e0b", index: 2 };
      return { pts: 45, nivel: "Baja Flexibilidad", color: "#f43f5e", index: 3 };
    },
  },
];

// Registros de ejemplo recientes
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
      {/* ── 1. SELECTOR DE PRUEBA ATLÉTICA ESPACIOSO (En pastillas claras) ── */}
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <span style={{ fontSize: "0.85rem", fontWeight: 800, color: "#ffffff", textTransform: "uppercase", letterSpacing: "0.05em" }}>
            Batería de Pruebas Físicas Oficiales
          </span>
          <span style={{ fontSize: "0.82rem", color: "#cbd5e1" }}>
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
                  padding: "14px 20px",
                  borderRadius: 14,
                  background: isSelected ? `${p.color}25` : "rgba(255, 255, 255, 0.04)",
                  border: "1px solid",
                  borderColor: isSelected ? p.color : "rgba(255, 255, 255, 0.1)",
                  boxShadow: isSelected ? `0 4px 18px ${p.color}35` : "none",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  transition: "all 0.15s ease",
                  fontFamily: "var(--font-sans)",
                  minWidth: 160,
                }}
              >
                <span style={{ fontSize: "0.96rem", fontWeight: 800, color: isSelected ? "#ffffff" : "#e2e8f0" }}>
                  {p.nombre}
                </span>
                <span style={{ fontSize: "0.82rem", color: isSelected ? p.color : "#cbd5e1", marginTop: 3, fontWeight: 600 }}>
                  {p.sub}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── 2. GRID PRINCIPAL: FORMULARIO Y BAREMO EN VIVO CON TABLA DE REFERENCIA ── */}
      <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1.3fr", gap: 26, alignItems: "stretch" }}>
        {/* Panel Izquierdo: Formulario de Toma de Marca con Espacio Cómodo */}
        <div
          className="glass-elevated"
          style={{
            padding: "28px 32px",
            borderRadius: 20,
            display: "flex",
            flexDirection: "column",
            gap: 22,
          }}
        >
          {/* Encabezado del Formulario */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid rgba(255, 255, 255, 0.08)", paddingBottom: 16 }}>
            <div>
              <span style={{ fontSize: "0.82rem", color: pruebaActiva.color, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.06em" }}>
                Registro en Tiempo Real
              </span>
              <h3 style={{ fontSize: "1.35rem", fontWeight: 800, color: "#ffffff", marginTop: 2 }}>
                {pruebaActiva.nombre}
              </h3>
            </div>
            <span
              style={{
                fontSize: "0.85rem",
                padding: "6px 14px",
                borderRadius: 10,
                background: `${pruebaActiva.color}20`,
                border: `1px solid ${pruebaActiva.color}45`,
                color: "#ffffff",
                fontWeight: 700,
              }}
            >
              Unidad: {pruebaActiva.unidad}
            </span>
          </div>

          {/* Campos con Espaciado Generoso (Sin amontonamiento) */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div>
              <Input
                label="Estudiante a Calificar"
                value={alumno}
                onChange={(e) => setAlumno(e.target.value)}
              />
            </div>

            {/* Input de Marca Grande con Botones Rápidos */}
            <div>
              <label className="dp-label">Marca Lograda ({pruebaActiva.unidad})</label>
              <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                <button
                  type="button"
                  onClick={() => ajustarMarca(-pruebaActiva.step)}
                  className="btn btn-secondary"
                  style={{ padding: "12px 16px", borderRadius: 10, color: "#ffffff" }}
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
                  style={{ fontSize: "1.4rem", fontWeight: 800, color: "#ffffff", textAlign: "center" }}
                />

                <button
                  type="button"
                  onClick={() => ajustarMarca(pruebaActiva.step)}
                  className="btn btn-secondary"
                  style={{ padding: "12px 16px", borderRadius: 10, color: "#ffffff" }}
                  title="Aumentar marca"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            <div>
              <Input label="Fecha de Toma" type="date" defaultValue="2026-10-12" />
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

        {/* Panel Derecho: Baremo Calculado & Tabla de Referencia Pedagógica */}
        <div
          className="glass-elevated"
          style={{
            padding: "28px 32px",
            borderRadius: 20,
            display: "flex",
            flexDirection: "column",
            gap: 22,
            border: `1px solid ${pruebaActiva.color}35`,
          }}
        >
          {/* Puntaje Grande y Nivel */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", borderBottom: "1px solid rgba(255, 255, 255, 0.08)", paddingBottom: 16 }}>
            <div>
              <span style={{ fontSize: "0.82rem", color: "#cbd5e1", textTransform: "uppercase", fontWeight: 700, letterSpacing: "0.05em" }}>
                Puntuación de Baremo Asignada
              </span>
              <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginTop: 4 }}>
                <span style={{ fontSize: "3.2rem", fontWeight: 900, color: "#ffffff", lineHeight: 1 }}>
                  {resultado.pts}
                </span>
                <span style={{ fontSize: "1.1rem", color: "#cbd5e1", fontWeight: 700 }}>
                  / 100 pts
                </span>
              </div>
            </div>

            <div
              style={{
                padding: "8px 16px",
                borderRadius: 12,
                background: `${resultado.color}25`,
                color: resultado.color,
                fontSize: "0.92rem",
                fontWeight: 800,
                border: `1px solid ${resultado.color}55`,
              }}
            >
              {resultado.nivel}
            </div>
          </div>

          {/* Barra de Progreso Visual */}
          <div>
            <div style={{ height: 10, borderRadius: 99, background: "rgba(255, 255, 255, 0.08)", overflow: "hidden" }}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${resultado.pts}%` }}
                transition={{ duration: 0.4 }}
                style={{
                  height: "100%",
                  background: `linear-gradient(90deg, ${resultado.color}, #34d399)`,
                  borderRadius: 99,
                }}
              />
            </div>
          </div>

          {/* Tabla de Baremos Oficiales (Elimina toda confusión) */}
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <span style={{ fontSize: "0.84rem", fontWeight: 800, color: "#ffffff", textTransform: "uppercase", letterSpacing: "0.04em" }}>
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
                      background: esFilaActual ? `${esc.color}20` : "rgba(255, 255, 255, 0.03)",
                      border: "1px solid",
                      borderColor: esFilaActual ? esc.color : "rgba(255, 255, 255, 0.06)",
                      transition: "all 0.2s ease",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div style={{ width: 8, height: 8, borderRadius: "50%", background: esc.color }} />
                      <span style={{ fontSize: "0.88rem", fontWeight: esFilaActual ? 800 : 600, color: esFilaActual ? "#ffffff" : "#cbd5e1" }}>
                        {esc.nivel}
                      </span>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                      <span style={{ fontSize: "0.86rem", color: "#e2e8f0", fontWeight: 700 }}>
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

      {/* ── 3. HISTORIAL RÁPIDO DE CLASE (Compacto y sin desbordar la pantalla) ── */}
      <div className="glass-elevated" style={{ padding: "24px 28px", borderRadius: 18, display: "flex", flexDirection: "column", gap: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Award size={18} color="#10b981" />
            <h4 style={{ fontSize: "1.05rem", fontWeight: 800, color: "#ffffff" }}>
              Últimas Pruebas Registradas en Clase
            </h4>
          </div>
          <span style={{ fontSize: "0.82rem", color: "#cbd5e1", fontWeight: 600 }}>
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
                background: "rgba(255, 255, 255, 0.04)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
              }}
            >
              <div>
                <div style={{ fontSize: "0.92rem", fontWeight: 700, color: "#ffffff" }}>{r.alumno}</div>
                <div style={{ fontSize: "0.8rem", color: "#cbd5e1", marginTop: 2 }}>
                  {r.prueba} · <strong style={{ color: "#34d399" }}>{r.marca}</strong>
                </div>
              </div>

              <span
                style={{
                  padding: "4px 10px",
                  borderRadius: 8,
                  background: "rgba(16, 185, 129, 0.15)",
                  color: "#34d399",
                  fontWeight: 800,
                  fontSize: "0.82rem",
                  border: "1px solid rgba(16, 185, 129, 0.3)",
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
