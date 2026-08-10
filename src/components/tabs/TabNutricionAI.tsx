// ─────────────────────────────────────────────
// Tab: IA - Nutrición y Ejercicio
// ─────────────────────────────────────────────
import React, { useState } from "react";
import { BrainCircuit, Save, RefreshCw, Sparkles } from "lucide-react";
import { Input } from "../ui/Input";
import { Select } from "../ui/Select";

interface TabNutricionAIProps {
  onSave: () => void;
}

const PLAN_MOCK = `╔══════════════════════════════════════════════════════════╗
║    PLAN INTEGRAL · NUTRICIÓN Y EJERCICIO (IA DEPORTEST)   ║
╚══════════════════════════════════════════════════════════╝

PERFIL DEL ATLETA
─────────────────
• Somatotipo    : Ectomorfo
• Peso actual   : 60.5 kg
• Test Cooper   : Bajo (1.800 m)
• Flexiones     : Medio (30 reps)
• Objetivo      : Ganancia muscular + mejora cardiovascular

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. PLAN DE ENTRENAMIENTO
──────────────────────────
Frecuencia : 4 días/semana
Enfoque    : Hipertrofia + acondicionamiento aeróbico

▸ LUNES & JUEVES — Tren Superior
  ✦ Calentamiento articular ........... 10 min
  ✦ Flexiones de pecho ................ 4 × al fallo
  ✦ Dominadas / Remo invertido ........ 3 × 8-10 reps
  ✦ Press militar (con equipo) ......... 3 × 10 reps
  ✦ Curl de bíceps ..................... 3 × 12 reps

▸ MARTES & VIERNES — Tren Inferior + Cardio
  ✦ Sentadillas (prep. Ruffier) ........ 4 × 15 reps
  ✦ Zancadas alternadas ................ 3 × 12 c/pierna
  ✦ Cardio continuo (Cooper) ........... 15-20 min
  ✦ Plancha abdominal .................. 3 × 45 s

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

2. PLAN NUTRICIONAL
───────────────────
Meta calórica diaria : 3.200 kcal
Distribución macros  : 50 % Carbohidratos | 25 % Proteínas | 25 % Grasas

▸ DESAYUNO — 750 kcal
  • 4 huevos revueltos
  • 2 tazas de avena con leche, plátano y crema de maní

▸ ALMUERZO — 900 kcal
  • 200 g pechuga de pollo a la plancha
  • 2 tazas de arroz integral
  • 1 taza de brócoli con aceite de oliva

▸ CENA — 800 kcal
  • 200 g de carne magra
  • 300 g de papa al horno
  • Ensalada abundante con aguacate

▸ SNACKS — 750 kcal
  • Batido de proteína post-entrenamiento
  • Puñado de frutos secos (almendras/nueces)
  • 1 fruta entera

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

RECOMENDACIONES GENERALES
──────────────────────────
★ Hidratación: mínimo 3 L de agua diarios.
★ Sueño: 7-8 horas para óptima recuperación muscular.
★ Reevaluar cada 4 semanas y ajustar calorías según progreso.
`;

export function TabNutricionAI({ onSave }: TabNutricionAIProps) {
  const [generating, setGenerating] = useState(false);
  const [plan, setPlan] = useState("");

  const handleGenerate = () => {
    setGenerating(true);
    setPlan("");
    setTimeout(() => {
      setPlan(PLAN_MOCK);
      setGenerating(false);
    }, 2200);
  };

  return (
    <div className="animate-fade-in" style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
      {/* Sidebar */}
      <div
        className="glass-elevated"
        style={{ width: 300, flexShrink: 0, padding: 28, display: "flex", flexDirection: "column", gap: 20 }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 38, height: 38, borderRadius: 10, background: "rgba(168,85,247,0.15)", border: "1px solid rgba(168,85,247,0.3)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <BrainCircuit size={18} color="var(--color-purple)" />
          </div>
          <div>
            <h2 style={{ fontSize: "0.95rem", fontWeight: 700 }}>IA · Nutrición</h2>
            <p style={{ fontSize: "0.68rem", color: "var(--color-purple)", fontWeight: 600 }}>& Ejercicio</p>
          </div>
        </div>

        <p style={{ fontSize: "0.78rem", color: "var(--color-text-secondary)", lineHeight: 1.7 }}>
          Genera planes personalizados de alimentación y rutinas de ejercicio basados en el somatotipo y resultados de los tests físicos.
        </p>

        <Input label="ID del Usuario" placeholder="1001234567" defaultValue="1001234567" />

        {/* Datos detectados */}
        <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid var(--color-border)", borderRadius: 10, padding: 16 }}>
          <p className="section-title" style={{ marginBottom: 12 }}>Datos Detectados</p>
          {[
            { label: "Somatotipo",  value: "Ectomorfo",    color: "var(--color-teal)" },
            { label: "Peso actual", value: "60.5 kg",      color: "var(--color-text-primary)" },
            { label: "Test Cooper", value: "Bajo (1800m)", color: "var(--color-rose)" },
            { label: "Flexiones",   value: "Medio (30)",   color: "var(--color-amber)" },
          ].map((d) => (
            <div key={d.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "6px 0", borderBottom: "1px solid var(--color-border)" }}>
              <span style={{ fontSize: "0.78rem", color: "var(--color-text-secondary)" }}>{d.label}</span>
              <span style={{ fontSize: "0.78rem", fontWeight: 700, color: d.color }}>{d.value}</span>
            </div>
          ))}
        </div>

        <Select label="Objetivo Principal">
          <option>Aumento de masa muscular (Superávit)</option>
          <option>Definición / Pérdida de grasa (Déficit)</option>
          <option>Mejora de resistencia cardiovascular</option>
          <option>Rendimiento deportivo general</option>
        </Select>

        <button
          className="btn btn-primary"
          style={{ background: "linear-gradient(135deg, #7c3aed, #a855f7)", boxShadow: "0 4px 16px rgba(168,85,247,0.3)", justifyContent: "center", padding: "14px 20px" }}
          onClick={handleGenerate}
          disabled={generating}
        >
          {generating ? (
            <>
              <RefreshCw size={15} style={{ animation: "spin 1s linear infinite" }} /> Analizando...
            </>
          ) : (
            <>
              <Sparkles size={15} /> Generar Plan Integral
            </>
          )}
        </button>
      </div>

      {/* Output */}
      <div className="glass-elevated" style={{ flex: 1, minWidth: 300, padding: 28, display: "flex", flexDirection: "column" }}>
        {plan ? (
          <>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <h3 style={{ fontSize: "0.9rem", fontWeight: 700, display: "flex", alignItems: "center", gap: 8 }}>
                <Sparkles size={15} color="var(--color-purple)" />
                Plan Generado por IA
              </h3>
              <button className="btn btn-secondary" style={{ fontSize: "0.78rem" }} onClick={onSave}>
                <Save size={13} /> Guardar en BD
              </button>
            </div>
            <textarea
              readOnly
              value={plan}
              style={{
                flex: 1,
                minHeight: 480,
                background: "rgba(0,0,0,0.3)",
                border: "1px solid var(--color-border)",
                borderRadius: 10,
                padding: 20,
                fontFamily: "var(--font-mono)",
                fontSize: "0.78rem",
                color: "var(--color-green-light)",
                lineHeight: 1.8,
                resize: "none",
                outline: "none",
              }}
            />
          </>
        ) : (
          <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16, opacity: 0.35 }}>
            <BrainCircuit size={64} color="var(--color-purple)" />
            <p style={{ fontSize: "0.85rem", color: "var(--color-text-secondary)", textAlign: "center", maxWidth: 320, lineHeight: 1.7 }}>
              Configura los parámetros del atleta y presiona "Generar Plan" para obtener una rutina y dieta personalizada apoyada por inteligencia artificial.
            </p>
          </div>
        )}
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
