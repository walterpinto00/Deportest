// ─────────────────────────────────────────────────────────────
// TabPruebas.tsx — Pruebas Físicas & Calificación Instantánea de Baremos
// Diseño fácil, dinámico, visual y pensado para uso ágil en clase
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
} from "lucide-react";
import { Input } from "../ui/Input";

interface TabPruebasProps {
  role: string;
  onSave: () => void;
}

// Batería de pruebas simplificada y clara
const PRUEBAS_DISPONIBLES = [
  {
    id: "cooper",
    nombre: "Test Cooper",
    sub: "Resistencia (12 min)",
    unidad: "metros",
    placeholder: "Ej: 2400",
    min: 1000,
    max: 3200,
    evaluar: (m: number) => {
      if (m >= 2500) return { pts: 95, nivel: "Excelente / Sobresaliente", color: "var(--color-green)" };
      if (m >= 2200) return { pts: 85, nivel: "Bueno / Saludable", color: "var(--color-green)" };
      if (m >= 1800) return { pts: 70, nivel: "Aceptable / Promedio", color: "var(--color-amber)" };
      return { pts: 50, nivel: "Bajo / Requiere Acondicionamiento", color: "var(--color-rose)" };
    },
  },
  {
    id: "navette",
    nombre: "Course-Navette",
    sub: "Resistencia Escolar (20m)",
    unidad: "períodos (paliers)",
    placeholder: "Ej: 7.5",
    min: 2,
    max: 14,
    evaluar: (m: number) => {
      if (m >= 9) return { pts: 95, nivel: "Excelente / Élite Escolar", color: "var(--color-green)" };
      if (m >= 7) return { pts: 85, nivel: "Bueno / Zona Saludable", color: "var(--color-green)" };
      if (m >= 5) return { pts: 70, nivel: "Aceptable", color: "var(--color-amber)" };
      return { pts: 50, nivel: "Bajo", color: "var(--color-rose)" };
    },
  },
  {
    id: "flexiones",
    nombre: "Flexiones de Brazo",
    sub: "Fuerza Tren Superior",
    unidad: "repeticiones en 1 min",
    placeholder: "Ej: 35",
    min: 0,
    max: 60,
    evaluar: (m: number) => {
      if (m >= 40) return { pts: 95, nivel: "Excelente", color: "var(--color-green)" };
      if (m >= 28) return { pts: 85, nivel: "Bueno", color: "var(--color-green)" };
      if (m >= 18) return { pts: 70, nivel: "Aceptable", color: "var(--color-amber)" };
      return { pts: 45, nivel: "Bajo", color: "var(--color-rose)" };
    },
  },
  {
    id: "velocidad",
    nombre: "Velocidad 50 Metros",
    sub: "Aceleración",
    unidad: "segundos",
    placeholder: "Ej: 7.5",
    min: 6,
    max: 12,
    evaluar: (m: number) => {
      if (m <= 7.2) return { pts: 95, nivel: "Excelente / Muy Rápido", color: "var(--color-green)" };
      if (m <= 8.2) return { pts: 85, nivel: "Bueno / Aceptable", color: "var(--color-green)" };
      if (m <= 9.2) return { pts: 70, nivel: "Promedio", color: "var(--color-amber)" };
      return { pts: 50, nivel: "Lento", color: "var(--color-rose)" };
    },
  },
  {
    id: "salto",
    nombre: "Salto Largo",
    sub: "Potencia de Piernas",
    unidad: "centímetros",
    placeholder: "Ej: 210",
    min: 100,
    max: 280,
    evaluar: (m: number) => {
      if (m >= 220) return { pts: 95, nivel: "Excelente", color: "var(--color-green)" };
      if (m >= 190) return { pts: 85, nivel: "Bueno", color: "var(--color-green)" };
      if (m >= 160) return { pts: 70, nivel: "Promedio", color: "var(--color-amber)" };
      return { pts: 45, nivel: "Bajo", color: "var(--color-rose)" };
    },
  },
  {
    id: "flexibilidad",
    nombre: "Flexibilidad (Wells)",
    sub: "Elasticidad Isquiotibial",
    unidad: "cm (+ / -)",
    placeholder: "Ej: +4",
    min: -15,
    max: 20,
    evaluar: (m: number) => {
      if (m >= 6) return { pts: 95, nivel: "Muy Flexible", color: "var(--color-green)" };
      if (m >= 1) return { pts: 85, nivel: "Normal / Bueno", color: "var(--color-green)" };
      if (m >= -4) return { pts: 70, nivel: "Límite Aceptable", color: "var(--color-amber)" };
      return { pts: 45, nivel: "Baja Flexibilidad", color: "var(--color-rose)" };
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
  const [pruebaId, setPruebaId] = useState("cooper");
  const [marcaStr, setMarcaStr] = useState("2450");
  const [alumno, setAlumno] = useState("1001234567 — Juan Camilo Rodríguez");
  const [registros, setRegistros] = useState(REGISTROS_EJEMPLO);
  const [savedOk, setSavedOk] = useState(false);

  const pruebaActiva = PRUEBAS_DISPONIBLES.find((p) => p.id === pruebaId) || PRUEBAS_DISPONIBLES[0];
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

  return (
    <div className="animate-fade-in" style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {/* ── 1. SELECTOR SUPERIOR DE PRUEBAS (Píldoras fáciles y táctiles) ── */}
      <div
        style={{
          display: "flex",
          gap: 10,
          overflowX: "auto",
          paddingBottom: 4,
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
                else if (p.id === "velocidad") setMarcaStr("7.9");
                else if (p.id === "salto") setMarcaStr("210");
                else if (p.id === "flexibilidad") setMarcaStr("4");
                else setMarcaStr("2450");
              }}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                padding: "12px 18px",
                borderRadius: 12,
                background: isSelected ? "rgba(16, 185, 129, 0.12)" : "rgba(255, 255, 255, 0.03)",
                border: "1px solid",
                borderColor: isSelected ? "var(--color-green)" : "rgba(255, 255, 255, 0.07)",
                cursor: "pointer",
                whiteSpace: "nowrap",
                transition: "all 0.15s ease",
                fontFamily: "var(--font-sans)",
                minWidth: 150,
              }}
            >
              <span style={{ fontSize: "0.84rem", fontWeight: 700, color: isSelected ? "#ffffff" : "var(--color-text-secondary)" }}>
                {p.nombre}
              </span>
              <span style={{ fontSize: "0.68rem", color: isSelected ? "var(--color-green)" : "var(--color-text-muted)", marginTop: 2 }}>
                {p.sub}
              </span>
            </button>
          );
        })}
      </div>

      {/* ── 2. PANEL DE EVALUACIÓN DINÁMICO & FEEDBACK EN VIVO (Super fácil) ── */}
      <div style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: 20 }}>
        {/* Formulario de Registro Ágil */}
        <div
          className="glass-elevated"
          style={{
            padding: "24px 28px",
            borderRadius: 18,
            display: "flex",
            flexDirection: "column",
            gap: 18,
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <span style={{ fontSize: "0.7rem", color: "var(--color-green)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                Evaluación en Tiempo Real
              </span>
              <h3 style={{ fontSize: "1.15rem", fontWeight: 800, color: "#ffffff", marginTop: 2 }}>
                {pruebaActiva.nombre}
              </h3>
            </div>
            <span
              style={{
                fontSize: "0.72rem",
                padding: "4px 10px",
                borderRadius: 8,
                background: "rgba(255, 255, 255, 0.04)",
                color: "var(--color-text-secondary)",
              }}
            >
              Unidad: {pruebaActiva.unidad}
            </span>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            <div style={{ gridColumn: "1 / -1" }}>
              <Input
                label="Estudiante Seleccionado"
                value={alumno}
                onChange={(e) => setAlumno(e.target.value)}
              />
            </div>

            <div>
              <label className="dp-label">Marca Lograda ({pruebaActiva.unidad})</label>
              <input
                className="dp-input"
                type="number"
                step="0.1"
                placeholder={pruebaActiva.placeholder}
                value={marcaStr}
                onChange={(e) => setMarcaStr(e.target.value)}
                style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--color-green)" }}
              />
            </div>

            <div>
              <Input label="Fecha de Toma" type="date" defaultValue="2026-10-12" />
            </div>
          </div>

          <div style={{ display: "flex", gap: 10, marginTop: 4 }}>
            <button
              className="btn btn-primary"
              onClick={handleGuardar}
              style={{ flex: 1, justifyContent: "center", padding: "12px", fontSize: "0.88rem" }}
            >
              {savedOk ? <CheckCircle2 size={16} /> : <Save size={16} />}
              <span>{savedOk ? "¡Guardado con Éxito!" : "Registrar y Guardar Calificación"}</span>
            </button>
          </div>
        </div>

        {/* Tarjeta de Puntuación Instantánea en Vivo */}
        <div
          className="glass-elevated"
          style={{
            padding: "24px 28px",
            borderRadius: 18,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            background: "linear-gradient(135deg, rgba(16, 185, 129, 0.06), rgba(13, 18, 31, 0.95))",
            border: "1px solid rgba(16, 185, 129, 0.2)",
          }}
        >
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <span style={{ fontSize: "0.72rem", color: "var(--color-text-muted)", textTransform: "uppercase", fontWeight: 600, letterSpacing: "0.05em" }}>
                Baremo Calculado
              </span>
              <Award size={18} color="var(--color-green)" />
            </div>

            {/* Puntaje Grande */}
            <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 8 }}>
              <span style={{ fontSize: "3rem", fontWeight: 900, color: "#ffffff", lineHeight: 1, letterSpacing: "-0.03em" }}>
                {resultado.pts}
              </span>
              <span style={{ fontSize: "1.1rem", color: "var(--color-text-muted)", fontWeight: 700 }}>
                / 100 pts
              </span>
            </div>

            <div
              style={{
                display: "inline-block",
                padding: "4px 12px",
                borderRadius: 8,
                background: "rgba(16, 185, 129, 0.15)",
                color: resultado.color,
                fontSize: "0.78rem",
                fontWeight: 700,
                border: "1px solid rgba(16, 185, 129, 0.3)",
                marginBottom: 16,
              }}
            >
              {resultado.nivel}
            </div>

            {/* Barra de Progreso Visual */}
            <div style={{ height: 8, borderRadius: 99, background: "rgba(255, 255, 255, 0.06)", overflow: "hidden" }}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${resultado.pts}%` }}
                transition={{ duration: 0.4 }}
                style={{
                  height: "100%",
                  background: "linear-gradient(90deg, var(--color-green-dark), var(--color-green))",
                  borderRadius: 99,
                }}
              />
            </div>
          </div>

          <div
            style={{
              paddingTop: 16,
              borderTop: "1px solid rgba(255, 255, 255, 0.06)",
              fontSize: "0.74rem",
              color: "var(--color-text-secondary)",
              lineHeight: 1.5,
            }}
          >
            Al ingresar la marca, el sistema asigna automáticamente el percentil escolar sin necesidad de buscar tablas manuales.
          </div>
        </div>
      </div>

      {/* ── 3. HISTORIAL RÁPIDO DE EVALUACIONES DE LA CLASE (Fácil de ver) ── */}
      <div className="glass" style={{ padding: "20px 24px", borderRadius: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <h4 style={{ fontSize: "0.9rem", fontWeight: 700, color: "#ffffff" }}>
            Últimas Pruebas Registradas en Clase
          </h4>
          <span style={{ fontSize: "0.72rem", color: "var(--color-text-muted)" }}>
            {registros.length} alumnos calificados
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {registros.map((r) => (
            <div
              key={r.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "10px 14px",
                borderRadius: 10,
                background: "rgba(255, 255, 255, 0.02)",
                border: "1px solid rgba(255, 255, 255, 0.05)",
                fontSize: "0.78rem",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: "50%",
                    background: "rgba(16, 185, 129, 0.12)",
                    color: "var(--color-green)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 700,
                    fontSize: "0.72rem",
                  }}
                >
                  {r.alumno.charAt(0)}
                </div>
                <div>
                  <div style={{ fontWeight: 600, color: "#ffffff" }}>{r.alumno}</div>
                  <div style={{ fontSize: "0.68rem", color: "var(--color-text-muted)" }}>{r.prueba}</div>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <span style={{ fontWeight: 600, color: "var(--color-text-secondary)" }}>
                  {r.marca}
                </span>
                <span
                  style={{
                    padding: "2px 8px",
                    borderRadius: 6,
                    background: "rgba(16, 185, 129, 0.12)",
                    color: "var(--color-green)",
                    fontWeight: 700,
                    fontSize: "0.72rem",
                  }}
                >
                  {r.pts} pts ({r.estado})
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
