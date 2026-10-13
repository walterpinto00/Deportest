// ─────────────────────────────────────────────
// Tab: IA - Nutrición y Ejercicio (REDISEÑADO)
// ─────────────────────────────────────────────
import React, { useState, useEffect, useRef } from "react";
import {
  BrainCircuit, Save, RefreshCw, Sparkles, Zap, Utensils,
  Dumbbell, Droplets, Moon, CheckCircle2, ChevronRight,
  Flame, Apple, Beef, Wheat, Download, Share2,
} from "lucide-react";
import { Select } from "../ui/Select";
import { Input } from "../ui/Input";

interface TabNutricionAIProps {
  onSave: () => void;
}

// ── Datos del plan estructurado ──────────────────────────────
const PLAN_DATA = {
  perfil: {
    somatotipo: "Ectomorfo",
    peso: "60.5 kg",
    cooper: { label: "Bajo", valor: "1.800 m", color: "var(--color-rose)" },
    flexiones: { label: "Medio", valor: "30 reps", color: "var(--color-amber)" },
    objetivo: "Ganancia muscular + cardiovascular",
    calorias: 3200,
    macros: { carbs: 50, protein: 25, fat: 25 },
  },
  nutricion: {
    calorias: 3200,
    comidas: [
      {
        nombre: "Desayuno",
        kcal: 750,
        icon: "🌅",
        hora: "7:00 am",
        color: "#f59e0b",
        alimentos: [
          "4 huevos revueltos",
          "2 tazas de avena con leche entera",
          "1 plátano + 2 cdas crema de maní",
        ],
      },
      {
        nombre: "Snack AM",
        kcal: 200,
        icon: "🍎",
        hora: "10:00 am",
        color: "#22c55e",
        alimentos: ["1 fruta entera (manzana/naranja)", "Puñado de nueces (30 g)"],
      },
      {
        nombre: "Almuerzo",
        kcal: 900,
        icon: "🍗",
        hora: "12:30 pm",
        color: "#3b82f6",
        alimentos: [
          "200 g pechuga de pollo a la plancha",
          "2 tazas de arroz integral",
          "1 taza de brócoli con aceite de oliva",
        ],
      },
      {
        nombre: "Pre-Entreno",
        kcal: 350,
        icon: "⚡",
        hora: "4:30 pm",
        color: "#a855f7",
        alimentos: ["1 taza avena", "1 plátano maduro", "30 g proteína en polvo"],
      },
      {
        nombre: "Cena",
        kcal: 800,
        icon: "🌙",
        hora: "7:30 pm",
        color: "#14b8a6",
        alimentos: [
          "200 g carne magra",
          "300 g papa al horno",
          "Ensalada abundante con aguacate",
        ],
      },
      {
        nombre: "Post-Entreno",
        kcal: 200,
        icon: "💪",
        hora: "9:00 pm",
        color: "#f43f5e",
        alimentos: ["Batido de proteína (30 g)", "1 taza de leche descremada"],
      },
    ],
  },
  entrenamiento: {
    frecuencia: "4 días / semana",
    enfoque: "Hipertrofia + Resistencia aeróbica",
    dias: [
      {
        dia: "Lunes",
        tipo: "Tren Superior",
        color: "#22c55e",
        ejercicios: [
          { nombre: "Calentamiento articular", series: "—", reps: "10 min", intensidad: 30 },
          { nombre: "Flexiones de pecho", series: "4", reps: "Al fallo", intensidad: 90 },
          { nombre: "Dominadas / Remo invertido", series: "3", reps: "8–10", intensidad: 80 },
          { nombre: "Press militar", series: "3", reps: "10", intensidad: 75 },
          { nombre: "Curl de bíceps", series: "3", reps: "12", intensidad: 65 },
        ],
      },
      {
        dia: "Martes",
        tipo: "Tren Inferior + Cardio",
        color: "#3b82f6",
        ejercicios: [
          { nombre: "Sentadillas", series: "4", reps: "15", intensidad: 80 },
          { nombre: "Zancadas alternadas", series: "3", reps: "12 c/pierna", intensidad: 70 },
          { nombre: "Cardio continuo (Cooper)", series: "—", reps: "20 min", intensidad: 65 },
          { nombre: "Plancha abdominal", series: "3", reps: "45 s", intensidad: 60 },
        ],
      },
      {
        dia: "Jueves",
        tipo: "Tren Superior (fuerza)",
        color: "#a855f7",
        ejercicios: [
          { nombre: "Flexiones diamante", series: "4", reps: "Al fallo", intensidad: 85 },
          { nombre: "Remo con mancuerna", series: "3", reps: "10", intensidad: 75 },
          { nombre: "Fondos en paralelas", series: "3", reps: "8–10", intensidad: 80 },
          { nombre: "Elevaciones laterales", series: "3", reps: "15", intensidad: 55 },
        ],
      },
      {
        dia: "Viernes",
        tipo: "Tren Inferior + Core",
        color: "#f43f5e",
        ejercicios: [
          { nombre: "Sentadilla búlgara", series: "3", reps: "10 c/pierna", intensidad: 80 },
          { nombre: "Buenos días", series: "3", reps: "12", intensidad: 70 },
          { nombre: "Abdominales bicicleta", series: "4", reps: "20", intensidad: 60 },
          { nombre: "Intervalos HIIT", series: "—", reps: "15 min", intensidad: 90 },
        ],
      },
    ],
  },
  recomendaciones: [
    { icon: Droplets, texto: "Tomar mínimo 3 L de agua diarios, especialmente antes y después del entreno.", color: "#3b82f6" },
    { icon: Moon, texto: "Dormir 7–8 horas para maximizar la recuperación y síntesis muscular.", color: "#a855f7" },
    { icon: RefreshCw, texto: "Reevaluar métricas cada 4 semanas y ajustar calorías según progreso.", color: "#22c55e" },
    { icon: Zap, texto: "Evitar saltarse el snack pre-entreno para mantener rendimiento óptimo.", color: "#f59e0b" },
  ],
};

// ── Macro ring animado ───────────────────────────────────────
function MacroRing({ label, pct, color, icon: Icon }: { label: string; pct: number; color: string; icon: any }) {
  const r = 28;
  const circ = 2 * Math.PI * r;
  const dash = (pct / 100) * circ;
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
      <div style={{ position: "relative", width: 72, height: 72 }}>
        <svg width="72" height="72" viewBox="0 0 72 72" style={{ transform: "rotate(-90deg)" }}>
          <circle cx="36" cy="36" r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="6" />
          <circle
            cx="36" cy="36" r={r} fill="none"
            stroke={color} strokeWidth="6"
            strokeDasharray={`${dash} ${circ}`}
            strokeLinecap="round"
            style={{ filter: `drop-shadow(0 0 6px ${color}88)` }}
          />
        </svg>
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Icon size={18} color={color} />
        </div>
      </div>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: "1rem", fontWeight: 800, color }}>{pct}%</div>
        <div style={{ fontSize: "0.65rem", color: "var(--color-text-muted)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em" }}>{label}</div>
      </div>
    </div>
  );
}

// ── Barra de intensidad ──────────────────────────────────────
function IntensityBar({ value, color }: { value: number; color: string }) {
  return (
    <div style={{ height: 4, borderRadius: 2, background: "rgba(255,255,255,0.07)", overflow: "hidden", width: 80, flexShrink: 0 }}>
      <div style={{ height: "100%", width: `${value}%`, background: color, borderRadius: 2, boxShadow: `0 0 6px ${color}66` }} />
    </div>
  );
}

// ── Typing animation component ───────────────────────────────
function TypingDots() {
  return (
    <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          style={{
            width: 8, height: 8, borderRadius: "50%",
            background: "var(--color-purple)",
            animation: `bounce 1.4s ease-in-out ${i * 0.2}s infinite`,
          }}
        />
      ))}
      <style>{`@keyframes bounce { 0%,80%,100%{transform:scale(0.7);opacity:0.4} 40%{transform:scale(1);opacity:1} }`}</style>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// COMPONENTE PRINCIPAL
// ═══════════════════════════════════════════════════════════════
export function TabNutricionAI({ onSave }: TabNutricionAIProps) {
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated]   = useState(false);
  const [activeSection, setActiveSection] = useState<"nutricion" | "ejercicio" | "tips">("nutricion");
  const [activeDia, setActiveDia]   = useState(0);
  const [savedOk, setSavedOk]       = useState(false);

  const handleGenerate = () => {
    setGenerating(true);
    setGenerated(false);
    setTimeout(() => {
      setGenerating(false);
      setGenerated(true);
    }, 2800);
  };

  const handleSave = () => {
    onSave();
    setSavedOk(true);
    setTimeout(() => setSavedOk(false), 2500);
  };

  const plan = PLAN_DATA;
  const dia  = plan.entrenamiento.dias[activeDia];

  return (
    <div className="animate-fade-in" style={{ display: "flex", gap: 20, alignItems: "flex-start" }}>

      {/* ─── SIDEBAR CONFIGURACIÓN ─── */}
      <div className="glass-elevated" style={{ width: 290, flexShrink: 0, display: "flex", flexDirection: "column", gap: 20, padding: 24 }}>
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{
            width: 44, height: 44, borderRadius: 12,
            background: "linear-gradient(135deg, rgba(168,85,247,0.25), rgba(168,85,247,0.1))",
            border: "1px solid rgba(168,85,247,0.4)",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 4px 20px rgba(168,85,247,0.2)",
          }}>
            <BrainCircuit size={22} color="#a855f7" />
          </div>
          <div>
            <h2 style={{ fontSize: "1rem", fontWeight: 800, letterSpacing: "-0.02em" }}>IA · Nutrición</h2>
            <p style={{ fontSize: "0.7rem", color: "#a855f7", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase" }}>& Ejercicio</p>
          </div>
        </div>

        <p style={{ fontSize: "0.77rem", color: "var(--color-text-secondary)", lineHeight: 1.7 }}>
          Planes personalizados basados en somatotipo, tests físicos y objetivos del atleta.
        </p>

        {/* Buscar usuario */}
        <div>
          <Input label="ID del Atleta" placeholder="1001234567" defaultValue="1001234567" />
        </div>

        {/* Perfil detectado */}
        <div style={{ background: "rgba(168,85,247,0.06)", border: "1px solid rgba(168,85,247,0.18)", borderRadius: 12, padding: 16 }}>
          <p className="section-title" style={{ marginBottom: 12, color: "#a855f7" }}>Perfil Detectado</p>
          {[
            { label: "Somatotipo", value: plan.perfil.somatotipo, color: "var(--color-teal)" },
            { label: "Peso", value: plan.perfil.peso, color: "var(--color-text-primary)" },
            { label: "Test Cooper", value: `${plan.perfil.cooper.label} — ${plan.perfil.cooper.valor}`, color: plan.perfil.cooper.color },
            { label: "Flexiones", value: `${plan.perfil.flexiones.label} — ${plan.perfil.flexiones.valor}`, color: plan.perfil.flexiones.color },
          ].map((row) => (
            <div key={row.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", padding: "7px 0", borderBottom: "1px solid rgba(255,255,255,0.05)", gap: 8 }}>
              <span style={{ fontSize: "0.75rem", color: "var(--color-text-muted)", flexShrink: 0 }}>{row.label}</span>
              <span style={{ fontSize: "0.75rem", fontWeight: 700, color: row.color, textAlign: "right" }}>{row.value}</span>
            </div>
          ))}
        </div>

        {/* Objetivo */}
        <Select label="Objetivo Principal">
          <option>Ganancia de masa muscular (Superávit)</option>
          <option>Definición / Pérdida de grasa (Déficit)</option>
          <option>Mejora de resistencia cardiovascular</option>
          <option>Rendimiento deportivo general</option>
          <option>Recuperación y bienestar</option>
        </Select>

        <Select label="Nivel de Actividad">
          <option>Principiante (0–6 meses)</option>
          <option>Intermedio (6–24 meses)</option>
          <option>Avanzado (+ 2 años)</option>
        </Select>

        {/* Botón generar */}
        <button
          className="btn"
          style={{
            background: generating
              ? "rgba(168,85,247,0.3)"
              : "linear-gradient(135deg, #7c3aed 0%, #a855f7 60%, #c084fc 100%)",
            color: "#fff",
            boxShadow: generating ? "none" : "0 6px 24px rgba(168,85,247,0.4)",
            justifyContent: "center",
            padding: "13px 20px",
            fontSize: "0.88rem",
            fontWeight: 700,
            transition: "all 0.3s",
            border: "1px solid rgba(168,85,247,0.5)",
          }}
          onClick={handleGenerate}
          disabled={generating}
        >
          {generating ? (
            <><RefreshCw size={15} style={{ animation: "spin 1s linear infinite" }} /> Analizando datos...</>
          ) : generated ? (
            <><Sparkles size={15} /> Regenerar Plan</>
          ) : (
            <><Sparkles size={15} /> Generar Plan Integral</>
          )}
        </button>

        {/* Guardar */}
        {generated && (
          <button
            className="btn btn-ghost"
            style={{ justifyContent: "center", border: savedOk ? "1px solid var(--color-green)" : undefined, color: savedOk ? "var(--color-green)" : undefined }}
            onClick={handleSave}
          >
            {savedOk ? <><CheckCircle2 size={14} /> Guardado</> : <><Save size={14} /> Guardar en base de datos</>}
          </button>
        )}
      </div>

      {/* ─── PANEL PRINCIPAL ─── */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 20, minWidth: 0 }}>

        {/* Estado: esperando */}
        {!generating && !generated && (
          <div className="glass-elevated" style={{ padding: 60, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 20, textAlign: "center" }}>
            <div style={{ position: "relative" }}>
              <div style={{ width: 100, height: 100, borderRadius: "50%", background: "rgba(168,85,247,0.1)", border: "1px solid rgba(168,85,247,0.2)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 60px rgba(168,85,247,0.12)" }}>
                <BrainCircuit size={46} color="#a855f7" strokeWidth={1.5} />
              </div>
              <div style={{ position: "absolute", inset: -8, borderRadius: "50%", border: "1px dashed rgba(168,85,247,0.2)", animation: "rotateRing 8s linear infinite" }} />
            </div>
            <div>
              <h3 style={{ fontSize: "1.15rem", fontWeight: 800, marginBottom: 8, letterSpacing: "-0.02em" }}>Motor de IA listo</h3>
              <p style={{ fontSize: "0.82rem", color: "var(--color-text-secondary)", maxWidth: 360, lineHeight: 1.8 }}>
                Configura el perfil del atleta en el panel izquierdo y presiona <strong style={{ color: "#a855f7" }}>Generar Plan Integral</strong> para obtener una rutina y dieta completamente personalizadas.
              </p>
            </div>
            <div style={{ display: "flex", gap: 16, marginTop: 8 }}>
              {[
                { icon: Utensils,  label: "Plan nutricional",     color: "#f59e0b" },
                { icon: Dumbbell,  label: "Rutina de ejercicio",  color: "#22c55e" },
                { icon: Sparkles,  label: "Recomendaciones IA",   color: "#a855f7" },
              ].map((f) => (
                <div key={f.label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, padding: "14px 20px", background: "rgba(255,255,255,0.03)", border: "1px solid var(--color-border)", borderRadius: 12 }}>
                  <f.icon size={22} color={f.color} />
                  <span style={{ fontSize: "0.72rem", color: "var(--color-text-secondary)", fontWeight: 600 }}>{f.label}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Estado: generando */}
        {generating && (
          <div className="glass-elevated" style={{ padding: 60, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 24 }}>
            <div style={{ width: 80, height: 80, borderRadius: "50%", background: "rgba(168,85,247,0.1)", border: "1px solid rgba(168,85,247,0.3)", display: "flex", alignItems: "center", justifyContent: "center", animation: "pulseGlow 1.5s ease-in-out infinite" }}>
              <BrainCircuit size={36} color="#a855f7" />
            </div>
            <div style={{ textAlign: "center" }}>
              <h3 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: 8 }}>Analizando perfil del atleta...</h3>
              <TypingDots />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, width: "100%", maxWidth: 400 }}>
              {["Leyendo datos antropométricos", "Cruzando con baremos físicos", "Calculando macronutrientes", "Generando rutina personalizada"].map((step, i) => (
                <div key={step} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 16px", background: "rgba(168,85,247,0.06)", borderRadius: 10, animation: `fadeInStep 0.4s ease ${i * 0.4}s both` }}>
                  <div style={{ width: 20, height: 20, borderRadius: "50%", border: "2px solid #a855f7", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#a855f7", animation: "pulse 1s ease infinite" }} />
                  </div>
                  <span style={{ fontSize: "0.8rem", color: "var(--color-text-secondary)" }}>{step}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Estado: plan generado */}
        {generated && !generating && (
          <>
            {/* Header del plan */}
            <div className="glass-elevated" style={{ padding: "20px 28px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2, padding: "8px 16px", background: "rgba(168,85,247,0.1)", borderRadius: 10, border: "1px solid rgba(168,85,247,0.2)" }}>
                  <Flame size={18} color="#a855f7" />
                  <span style={{ fontSize: "1.1rem", fontWeight: 900, color: "#a855f7" }}>{plan.perfil.calorias.toLocaleString()}</span>
                  <span style={{ fontSize: "0.6rem", color: "var(--color-text-muted)", textTransform: "uppercase", letterSpacing: "0.06em" }}>kcal/día</span>
                </div>
                <div>
                  <h3 style={{ fontSize: "1rem", fontWeight: 800, display: "flex", alignItems: "center", gap: 8 }}>
                    <CheckCircle2 size={16} color="var(--color-green)" />
                    Plan generado correctamente
                  </h3>
                  <p style={{ fontSize: "0.75rem", color: "var(--color-text-secondary)", marginTop: 3 }}>
                    Objetivo: <strong style={{ color: "#a855f7" }}>{plan.perfil.objetivo}</strong>
                  </p>
                </div>
              </div>
              {/* Macros */}
              <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
                <MacroRing label="Carbs"    pct={plan.perfil.macros.carbs}   color="#f59e0b" icon={Wheat} />
                <MacroRing label="Proteína" pct={plan.perfil.macros.protein} color="#22c55e" icon={Beef}  />
                <MacroRing label="Grasas"   pct={plan.perfil.macros.fat}     color="#3b82f6" icon={Apple} />
              </div>
            </div>

            {/* Tabs nutricion / ejercicio / tips */}
            <div style={{ display: "flex", gap: 4, borderRadius: 12, overflow: "hidden", background: "rgba(255,255,255,0.03)", border: "1px solid var(--color-border)", padding: 4 }}>
              {([
                { id: "nutricion", label: "Plan Nutricional", icon: Utensils,  color: "#f59e0b" },
                { id: "ejercicio", label: "Rutina de Ejercicio", icon: Dumbbell, color: "#22c55e" },
                { id: "tips",      label: "Recomendaciones", icon: Sparkles,  color: "#a855f7" },
              ] as const).map((t) => (
                <button
                  key={t.id}
                  onClick={() => setActiveSection(t.id)}
                  style={{
                    flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                    padding: "10px 16px", borderRadius: 10,
                    border: "none", cursor: "pointer", fontFamily: "var(--font-sans)",
                    fontSize: "0.82rem", fontWeight: activeSection === t.id ? 700 : 500,
                    background: activeSection === t.id ? `${t.color}18` : "transparent",
                    color: activeSection === t.id ? t.color : "var(--color-text-muted)",
                    transition: "all 0.2s",
                    boxShadow: activeSection === t.id ? `inset 0 0 0 1px ${t.color}35` : "none",
                  }}
                >
                  <t.icon size={14} /> {t.label}
                </button>
              ))}
            </div>

            {/* ── SECCIÓN NUTRICIÓN ── */}
            {activeSection === "nutricion" && (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
                {plan.nutricion.comidas.map((comida) => (
                  <div
                    key={comida.nombre}
                    className="glass"
                    style={{ padding: 20, transition: "transform 0.2s, box-shadow 0.2s", cursor: "default" }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.transform = "translateY(-3px)"; (e.currentTarget as HTMLDivElement).style.boxShadow = `0 12px 40px rgba(0,0,0,0.5)`; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.transform = ""; (e.currentTarget as HTMLDivElement).style.boxShadow = ""; }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <span style={{ fontSize: "1.5rem" }}>{comida.icon}</span>
                        <div>
                          <div style={{ fontSize: "0.85rem", fontWeight: 700 }}>{comida.nombre}</div>
                          <div style={{ fontSize: "0.7rem", color: "var(--color-text-muted)" }}>{comida.hora}</div>
                        </div>
                      </div>
                      <div style={{ padding: "4px 10px", borderRadius: 99, background: `${comida.color}18`, border: `1px solid ${comida.color}35`, fontSize: "0.72rem", fontWeight: 700, color: comida.color }}>
                        {comida.kcal} kcal
                      </div>
                    </div>
                    {/* Barra de calorías */}
                    <div style={{ height: 3, borderRadius: 99, background: "rgba(255,255,255,0.06)", marginBottom: 14, overflow: "hidden" }}>
                      <div style={{ height: "100%", width: `${(comida.kcal / plan.nutricion.calorias) * 100}%`, background: comida.color, borderRadius: 99 }} />
                    </div>
                    <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 7 }}>
                      {comida.alimentos.map((a) => (
                        <li key={a} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: "0.78rem", color: "var(--color-text-secondary)" }}>
                          <ChevronRight size={11} color={comida.color} style={{ flexShrink: 0 }} />
                          {a}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}

            {/* ── SECCIÓN EJERCICIO ── */}
            {activeSection === "ejercicio" && (
              <div style={{ display: "flex", gap: 20 }}>
                {/* Selector de día */}
                <div style={{ display: "flex", flexDirection: "column", gap: 8, flexShrink: 0 }}>
                  {plan.entrenamiento.dias.map((d, i) => (
                    <button
                      key={d.dia}
                      onClick={() => setActiveDia(i)}
                      style={{
                        display: "flex", flexDirection: "column", alignItems: "flex-start",
                        padding: "14px 20px", borderRadius: 12, border: "none", cursor: "pointer",
                        fontFamily: "var(--font-sans)", textAlign: "left", minWidth: 160,
                        background: activeDia === i ? `${d.color}18` : "rgba(255,255,255,0.02)",
                        boxShadow: activeDia === i ? `inset 0 0 0 1px ${d.color}40` : "inset 0 0 0 1px rgba(255,255,255,0.06)",
                        transition: "all 0.2s",
                      }}
                    >
                      <span style={{ fontSize: "0.65rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: activeDia === i ? d.color : "var(--color-text-muted)", marginBottom: 3 }}>{d.dia}</span>
                      <span style={{ fontSize: "0.78rem", fontWeight: 600, color: activeDia === i ? "var(--color-text-primary)" : "var(--color-text-secondary)" }}>{d.tipo}</span>
                    </button>
                  ))}
                  <div style={{ marginTop: 8, padding: "12px 16px", borderRadius: 10, background: "rgba(255,255,255,0.02)", border: "1px solid var(--color-border)", fontSize: "0.72rem", color: "var(--color-text-muted)", lineHeight: 1.7 }}>
                    <strong style={{ color: "var(--color-text-secondary)" }}>Frecuencia:</strong><br/>
                    {plan.entrenamiento.frecuencia}<br />
                    <strong style={{ color: "var(--color-text-secondary)" }}>Enfoque:</strong><br/>
                    {plan.entrenamiento.enfoque}
                  </div>
                </div>

                {/* Ejercicios del día */}
                <div className="glass-elevated" style={{ flex: 1, padding: 24 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
                    <div style={{ width: 10, height: 10, borderRadius: "50%", background: dia.color, boxShadow: `0 0 12px ${dia.color}` }} />
                    <div>
                      <h4 style={{ fontSize: "0.95rem", fontWeight: 800 }}>{dia.dia} — {dia.tipo}</h4>
                      <p style={{ fontSize: "0.72rem", color: "var(--color-text-muted)", marginTop: 2 }}>{dia.ejercicios.length} ejercicios programados</p>
                    </div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {dia.ejercicios.map((ej, i) => (
                      <div
                        key={ej.nombre}
                        style={{
                          display: "flex", alignItems: "center", gap: 16,
                          padding: "14px 18px", borderRadius: 12,
                          background: "rgba(255,255,255,0.03)",
                          border: "1px solid rgba(255,255,255,0.06)",
                          transition: "background 0.2s",
                        }}
                      >
                        <div style={{ width: 28, height: 28, borderRadius: 8, background: `${dia.color}18`, border: `1px solid ${dia.color}30`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: "0.7rem", fontWeight: 800, color: dia.color }}>{i + 1}</div>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: "0.85rem", fontWeight: 600 }}>{ej.nombre}</div>
                          <div style={{ fontSize: "0.72rem", color: "var(--color-text-muted)", marginTop: 2 }}>
                            {ej.series !== "—" && <><strong style={{ color: dia.color }}>{ej.series} series</strong> × </>}
                            <strong style={{ color: "var(--color-text-secondary)" }}>{ej.reps}</strong>
                          </div>
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4, flexShrink: 0 }}>
                          <span style={{ fontSize: "0.65rem", color: "var(--color-text-muted)" }}>Intensidad</span>
                          <IntensityBar value={ej.intensidad} color={dia.color} />
                          <span style={{ fontSize: "0.65rem", color: dia.color, fontWeight: 700 }}>{ej.intensidad}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ── SECCIÓN TIPS ── */}
            {activeSection === "tips" && (
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                {plan.recomendaciones.map((rec, i) => {
                  const Icon = rec.icon;
                  return (
                    <div key={i} className="glass" style={{ padding: 24, display: "flex", gap: 16, alignItems: "flex-start" }}>
                      <div style={{ width: 44, height: 44, borderRadius: 12, background: `${rec.color}15`, border: `1px solid ${rec.color}30`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <Icon size={20} color={rec.color} />
                      </div>
                      <p style={{ fontSize: "0.82rem", color: "var(--color-text-secondary)", lineHeight: 1.8 }}>{rec.texto}</p>
                    </div>
                  );
                })}
                {/* Resumen final */}
                <div className="glass" style={{ padding: 24, gridColumn: "1 / -1", background: "rgba(168,85,247,0.05)", border: "1px solid rgba(168,85,247,0.15)" }}>
                  <h4 style={{ fontSize: "0.85rem", fontWeight: 700, marginBottom: 16, color: "#a855f7", display: "flex", alignItems: "center", gap: 8 }}>
                    <Sparkles size={14} /> Resumen del Plan Integral
                  </h4>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
                    {[
                      { label: "Calorías/día", value: "3.200 kcal", color: "#f59e0b" },
                      { label: "Días entreno", value: "4 / semana", color: "#22c55e" },
                      { label: "Hidratación", value: "3 L / día", color: "#3b82f6" },
                      { label: "Revisión", value: "Cada 4 sem.", color: "#a855f7" },
                    ].map((s) => (
                      <div key={s.label} style={{ textAlign: "center", padding: "14px 10px", borderRadius: 10, background: `${s.color}0d`, border: `1px solid ${s.color}25` }}>
                        <div style={{ fontSize: "1.15rem", fontWeight: 900, color: s.color }}>{s.value}</div>
                        <div style={{ fontSize: "0.65rem", color: "var(--color-text-muted)", marginTop: 4, textTransform: "uppercase", letterSpacing: "0.07em", fontWeight: 600 }}>{s.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      <style>{`
        @keyframes spin        { to { transform: rotate(360deg); } }
        @keyframes rotateRing  { to { transform: rotate(360deg); } }
        @keyframes pulseGlow   { 0%,100%{box-shadow:0 0 20px rgba(168,85,247,0.2)} 50%{box-shadow:0 0 50px rgba(168,85,247,0.5)} }
        @keyframes pulse       { 0%,100%{opacity:0.4;transform:scale(0.8)} 50%{opacity:1;transform:scale(1)} }
        @keyframes fadeInStep  { from{opacity:0;transform:translateX(-8px)} to{opacity:1;transform:none} }
      `}</style>
    </div>
  );
}
