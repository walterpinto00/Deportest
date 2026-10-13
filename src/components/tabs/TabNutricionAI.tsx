// ─────────────────────────────────────────────────────────────
// TabNutricionAI.tsx — Orientación Nutricional & Hábitos Saludables
// Diseño vivo, interactivo, fácil, atractivo y de alto impacto visual (Estilo Apple Health / Whoop)
// ─────────────────────────────────────────────────────────────
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Save,
  RefreshCw,
  CheckCircle2,
  Clock,
  Heart,
  Droplets,
  Moon,
  Activity,
  Dumbbell,
  FileText,
  Printer,
  ChevronRight,
  ShieldCheck,
  Flame,
  Check,
  SlidersHorizontal,
  Zap,
} from "lucide-react";
import { Select } from "../ui/Select";
import { Input } from "../ui/Input";

interface TabNutricionAIProps {
  onSave: () => void;
}

// Datos completos conservados (sin quitar ninguna función)
const PLAN_DATA = {
  perfil: {
    nombre: "Juan Camilo Rodríguez",
    grado: "Grado 10° - Grupo B",
    somatotipo: "Mesomorfo",
    peso: "62.0 kg",
    talla: "1.72 m",
    imc: "21.0 (Rango Saludable)",
    evaluacionFisica: {
      navette: { label: "Aceptable", valor: "Período 6.5" },
      flexibilidad: { label: "Bueno", valor: "+3 cm (Wells)" },
      abdominales: { label: "Satisfactorio", valor: "28 reps / min" },
    },
    objetivo: "Hábitos Saludables & Rendimiento Escolar",
    calorias: 2200,
    macros: { carbs: 55, protein: 20, fat: 25 },
  },
  nutricion: {
    calorias: 2200,
    distribucion: [
      { macro: "Carbohidratos", pct: 55, gramos: "302 g", color: "#10b981" },
      { macro: "Proteínas", pct: 20, gramos: "110 g", color: "#06b6d4" },
      { macro: "Grasas Saludables", pct: 25, gramos: "61 g", color: "#3b82f6" },
    ],
    comidas: [
      {
        id: "desayuno",
        momento: "Desayuno en Casa",
        hora: "06:30 am",
        kcal: 500,
        enfoque: "Energía sostenida y concentración en clase",
        alimentos: [
          "Porción de avena cocida en leche descremada con canela",
          "1 huevo revuelto o cocido con poco aceite",
          "1 porción de fruta fresca (banano, papaya o manzana)",
          "Vaso grande de agua natural",
        ],
      },
      {
        id: "lonchera",
        momento: "Refrigerio / Lonchera Escolar",
        hora: "09:45 am",
        kcal: 250,
        enfoque: "Pausa activa saludable (sin ultraprocesados)",
        alimentos: [
          "1 fruta entera de temporada lavada (manzana o pera)",
          "Puñado de frutos secos naturales (maní sin sal, almendras)",
          "Botella de agua (500 ml) para recargar en la jornada",
        ],
      },
      {
        id: "almuerzo",
        momento: "Almuerzo Balanceado",
        hora: "01:15 pm",
        kcal: 750,
        enfoque: "Plato del Buen Comer (50% vegetales, 25% proteína, 25% carbohidratos)",
        alimentos: [
          "120 g de pechuga de pollo, pescado o carne magra a la plancha",
          "1 taza mediana de arroz o papa cocida",
          "Ensalada fresca abundante (tomate, zanahoria, pepino y limón)",
          "Porción de legumbres (frijoles o lentejas, 2 a 3 veces por semana)",
        ],
      },
      {
        id: "merienda",
        momento: "Merienda Pre-Actividad",
        hora: "04:30 pm",
        kcal: 250,
        enfoque: "Energía antes de entrenar o jugar",
        alimentos: [
          "1 yogur natural o vaso de leche descremada",
          "1 tostada o galleta integral con queso bajo en grasa",
          "Hidratación continua con agua pura",
        ],
      },
      {
        id: "cena",
        momento: "Cena Ligera",
        hora: "07:30 pm",
        kcal: 450,
        enfoque: "Digestión fácil para un sueño reparador",
        alimentos: [
          "Tortilla francesa de 2 huevos con espinacas o champiñones",
          "Porción generosa de vegetales al vapor o ensalada verde",
          "Infusión aromática natural tibia (sin azúcar añadida)",
        ],
      },
    ],
  },
  actividadFisica: {
    frecuencia: "3 a 4 días por semana",
    enfoque: "Educación Física Formativa & Fuerza Funcional",
    sesiones: [
      {
        dia: "Sesión 1",
        nombre: "Movilidad & Coordinación",
        duracion: "45 min",
        intensidad: 65,
        actividades: [
          { ej: "Calentamiento articular dinámico", detalle: "10 min — tobillos, rodillas, cadera y hombros" },
          { ej: "Escalera de agilidad y coordinación", detalle: "3 series × 4 repeticiones a ritmo moderado" },
          { ej: "Juegos deportivos cooperativos (fútbol, baloncesto)", detalle: "20 min continuos" },
          { ej: "Vuelta a la calma y estiramiento muscular", detalle: "5 min — respiración guiada" },
        ],
      },
      {
        dia: "Sesión 2",
        nombre: "Fuerza con Peso Corporal (Calistenia)",
        duracion: "40 min",
        intensidad: 80,
        actividades: [
          { ej: "Sentadillas libres con técnica guiada", detalle: "3 series × 12 repeticiones" },
          { ej: "Flexiones de pecho (apoyo en rodillas si se requiere)", detalle: "3 series × 8-10 repeticiones" },
          { ej: "Plancha estática isométrica", detalle: "3 series × 30 segundos de contracción" },
          { ej: "Zancadas alternadas en el sitio", detalle: "3 series × 10 por pierna" },
        ],
      },
      {
        dia: "Sesión 3",
        nombre: "Capacidad Aeróbica & Recreación",
        duracion: "50 min",
        intensidad: 75,
        actividades: [
          { ej: "Trote suave continuo o marcha deportiva", detalle: "15 min a ritmo conversacional" },
          { ej: "Prueba formativa de velocidad 30 metros", detalle: "3 repeticiones con recuperación amplia" },
          { ej: "Deporte recreativo al aire libre", detalle: "25 min de juego continuo" },
        ],
      },
    ],
  },
  pautasSaludables: [
    {
      titulo: "Hidratación Constante con Agua",
      descripcion: "Consumir al menos 2 litros de agua pura al día. Evitar gaseosas, bebidas energizantes y refrescos azucarados.",
      icono: Droplets,
      meta: "2.0 Litros / Día",
    },
    {
      titulo: "Higiene del Sueño Escolar",
      descripcion: "Dormir de 8 a 9 horas diarias es fundamental para la memoria, la concentración en clase y el crecimiento físico.",
      icono: Moon,
      meta: "8.5 Horas / Noche",
    },
    {
      titulo: "Control de Tiempo en Pantallas",
      descripcion: "Limitar el uso recreativo de celular, televisión y videojuegos a un máximo de 2 horas al día para evitar el sedentarismo.",
      icono: Activity,
      meta: "Máx. 2 Horas / Día",
    },
    {
      titulo: "Control Periódico de Salud",
      descripcion: "Verificar peso, talla y perímetro abdominal al cierre de cada período académico para asegurar una curva positiva.",
      icono: Heart,
      meta: "Cada Período",
    },
  ],
};

export function TabNutricionAI({ onSave }: TabNutricionAIProps) {
  const [generating, setGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState<"nutricion" | "actividad" | "habitos">("nutricion");
  const [showConfig, setShowConfig] = useState(false);
  const [savedOk, setSavedOk] = useState(false);
  const [activeSesion, setActiveSesion] = useState(0);
  const [completedMeals, setCompletedMeals] = useState<Record<string, boolean>>({
    desayuno: true,
    lonchera: true,
  });

  const plan = PLAN_DATA;

  const toggleMeal = (id: string) => {
    setCompletedMeals((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleGenerate = () => {
    setGenerating(true);
    setTimeout(() => {
      setGenerating(false);
    }, 1000);
  };

  const handleSave = () => {
    onSave();
    setSavedOk(true);
    setTimeout(() => setSavedOk(false), 2500);
  };

  return (
    <div className="animate-fade-in" style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {/* ── 1. HERO BANNER VIVO: DASHBOARD DE BIENESTAR & CALORÍAS (Estilo Apple Fitness / Whoop) ── */}
      <div
        className="glass-elevated"
        style={{
          padding: "24px 28px",
          borderRadius: 20,
          background: "linear-gradient(135deg, rgba(16, 185, 129, 0.08) 0%, rgba(6, 182, 212, 0.04) 50%, rgba(13, 18, 31, 0.95) 100%)",
          border: "1px solid rgba(16, 185, 129, 0.2)",
          boxShadow: "0 12px 36px rgba(0, 0, 0, 0.35), 0 0 24px rgba(16, 185, 129, 0.08)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Glow de fondo */}
        <div
          style={{
            position: "absolute",
            top: -60,
            right: 40,
            width: 260,
            height: 260,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(16, 185, 129, 0.15) 0%, transparent 70%)",
            filter: "blur(40px)",
            pointerEvents: "none",
          }}
        />

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 20, position: "relative", zIndex: 1 }}>
          {/* Identidad del Atleta / Estudiante */}
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: 16,
                background: "linear-gradient(135deg, var(--color-green), #059669)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#ffffff",
                boxShadow: "0 8px 24px rgba(16, 185, 129, 0.35)",
                flexShrink: 0,
              }}
            >
              <Zap size={28} />
            </div>

            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                <h2 style={{ fontSize: "1.35rem", fontWeight: 800, letterSpacing: "-0.02em" }}>
                  {plan.perfil.nombre}
                </h2>
                <span
                  style={{
                    fontSize: "0.7rem",
                    padding: "3px 10px",
                    borderRadius: 99,
                    background: "rgba(16, 185, 129, 0.15)",
                    color: "var(--color-green)",
                    fontWeight: 700,
                    border: "1px solid rgba(16, 185, 129, 0.3)",
                  }}
                >
                  {plan.perfil.grado}
                </span>
                <span
                  style={{
                    fontSize: "0.7rem",
                    padding: "3px 10px",
                    borderRadius: 99,
                    background: "rgba(255, 255, 255, 0.05)",
                    color: "var(--color-text-secondary)",
                    fontWeight: 600,
                  }}
                >
                  {plan.perfil.somatotipo} · {plan.perfil.peso}
                </span>
              </div>

              <p style={{ fontSize: "0.82rem", color: "var(--color-text-secondary)", marginTop: 4 }}>
                Diagnóstico OMS: <strong style={{ color: "var(--color-green)" }}>{plan.perfil.imc}</strong> · Objetivo: <strong>{plan.perfil.objetivo}</strong>
              </p>
            </div>
          </div>

          {/* Medidores Vivos (Calorías & Macros en tarjeta visual compacta) */}
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            {/* Medidor Circular de Energía */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                padding: "10px 18px",
                borderRadius: 14,
                background: "rgba(255, 255, 255, 0.03)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
              }}
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 12,
                  background: "rgba(16, 185, 129, 0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--color-green)",
                }}
              >
                <Flame size={22} />
              </div>
              <div>
                <div style={{ fontSize: "1.45rem", fontWeight: 800, color: "#ffffff", lineHeight: 1 }}>
                  ~{plan.nutricion.calorias.toLocaleString()}
                </div>
                <div style={{ fontSize: "0.68rem", color: "var(--color-text-muted)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", marginTop: 2 }}>
                  kcal recomendadas / día
                </div>
              </div>
            </div>

            {/* Botón para abrir configuración de parámetros */}
            <button
              className="btn btn-secondary"
              onClick={() => setShowConfig(!showConfig)}
              style={{
                padding: "10px 16px",
                fontSize: "0.8rem",
                borderRadius: 10,
                borderColor: showConfig ? "var(--color-green)" : "rgba(255, 255, 255, 0.1)",
                color: showConfig ? "var(--color-green)" : "var(--color-text-primary)",
              }}
            >
              <SlidersHorizontal size={14} />
              <span>{showConfig ? "Ocultar Parámetros" : "Ajustar Parámetros"}</span>
            </button>
          </div>
        </div>

        {/* Barra de Distribución Nutricional Viva (Carbs, Proteína, Grasas) */}
        <div style={{ marginTop: 20, paddingTop: 18, borderTop: "1px solid rgba(255, 255, 255, 0.06)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
            <span style={{ fontSize: "0.74rem", fontWeight: 700, color: "var(--color-text-secondary)", letterSpacing: "0.04em", textTransform: "uppercase" }}>
              Balance Óptimo de Macronutrientes
            </span>
            <div style={{ display: "flex", gap: 16 }}>
              {plan.nutricion.distribucion.map((m) => (
                <div key={m.macro} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: "0.74rem" }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: m.color }} />
                  <span style={{ color: "var(--color-text-secondary)" }}>{m.macro}:</span>
                  <strong style={{ color: "#ffffff" }}>{m.pct}% ({m.gramos})</strong>
                </div>
              ))}
            </div>
          </div>

          {/* Barra segmentada brillante */}
          <div style={{ height: 8, borderRadius: 99, background: "rgba(255, 255, 255, 0.06)", display: "flex", overflow: "hidden" }}>
            <div style={{ width: "55%", background: "linear-gradient(90deg, #059669, #10b981)", transition: "width 0.4s ease" }} />
            <div style={{ width: "20%", background: "linear-gradient(90deg, #0891b2, #06b6d4)", transition: "width 0.4s ease" }} />
            <div style={{ width: "25%", background: "linear-gradient(90deg, #2563eb, #3b82f6)", transition: "width 0.4s ease" }} />
          </div>
        </div>
      </div>

      {/* ── PANEL DESPLEGABLE DE AJUSTE (Si el usuario quiere editar) ── */}
      <AnimatePresence>
        {showConfig && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="glass"
            style={{
              padding: "20px 24px",
              borderRadius: 16,
              border: "1px solid rgba(16, 185, 129, 0.25)",
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr auto",
              gap: 16,
              alignItems: "flex-end",
            }}
          >
            <div>
              <Input label="Código del Estudiante" defaultValue="1001234567" />
            </div>
            <div>
              <Select label="Objetivo Formativo">
                <option>Hábitos Saludables & Rendimiento Escolar</option>
                <option>Acondicionamiento Físico General</option>
                <option>Prevención de Sedentarismo (Pausas Activas)</option>
                <option>Preparación Torneos Intercolegiados</option>
              </Select>
            </div>
            <div>
              <Select label="Nivel de Actividad Semanal">
                <option>Moderado (Clases regulares + recreación)</option>
                <option>Ligero (Baja actividad fuera del aula)</option>
                <option>Activo (Entrena 3+ días extracurriculares)</option>
              </Select>
            </div>
            <div>
              <button
                className="btn btn-primary"
                onClick={handleGenerate}
                disabled={generating}
                style={{ padding: "10px 18px", fontSize: "0.82rem" }}
              >
                {generating ? (
                  <RefreshCw size={14} style={{ animation: "spin 1s linear infinite" }} />
                ) : (
                  <Sparkles size={14} />
                )}
                <span>Recalcular Plan</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── 2. SELECTOR DE PESTAÑAS TIPO SEGMENTED CONTROL (Sencillo, limpio, fácil) ── */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 12,
        }}
      >
        <div
          style={{
            display: "inline-flex",
            background: "rgba(255, 255, 255, 0.04)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            borderRadius: 12,
            padding: 4,
            gap: 4,
          }}
        >
          {[
            { id: "nutricion", label: "Horarios & Lonchera Saludable", icon: Heart },
            { id: "actividad", label: "Plan de Actividad Física Escolar", icon: Dumbbell },
            { id: "habitos", label: "Pautas de Salud & Bienestar", icon: ShieldCheck },
          ].map((tab) => {
            const Icon = tab.icon;
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "9px 18px",
                  borderRadius: 8,
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.82rem",
                  fontWeight: isSelected ? 700 : 500,
                  background: isSelected ? "var(--color-green)" : "transparent",
                  color: isSelected ? "#070a12" : "var(--color-text-secondary)",
                  boxShadow: isSelected ? "0 4px 14px rgba(16, 185, 129, 0.3)" : "none",
                  transition: "all 0.2s ease",
                }}
              >
                <Icon size={14} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Acciones Rápidas */}
        <div style={{ display: "flex", gap: 10 }}>
          <button
            className="btn btn-ghost"
            onClick={handleSave}
            style={{
              padding: "8px 14px",
              fontSize: "0.78rem",
              borderRadius: 8,
              color: savedOk ? "var(--color-green)" : "var(--color-text-secondary)",
              borderColor: savedOk ? "var(--color-green)" : "rgba(255, 255, 255, 0.08)",
            }}
          >
            {savedOk ? <CheckCircle2 size={13} /> : <Save size={13} />}
            <span>{savedOk ? "Ficha Guardada" : "Guardar Ficha"}</span>
          </button>

          <button
            className="btn btn-ghost"
            onClick={() => window.print()}
            style={{
              padding: "8px 14px",
              fontSize: "0.78rem",
              borderRadius: 8,
            }}
            title="Imprimir informe oficial para padres o acudientes"
          >
            <Printer size={13} />
            <span>Imprimir Boletín</span>
          </button>
        </div>
      </div>

      {/* ── 3. CONTENIDO: SECCIÓN DE ALIMENTACIÓN & LONCHERA (Visual, limpia, interactiva) ── */}
      {activeTab === "nutricion" && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 16 }}>
          {plan.nutricion.comidas.map((comida, idx) => {
            const isDone = completedMeals[comida.id];
            return (
              <motion.div
                key={comida.id}
                whileHover={{ y: -2 }}
                transition={{ duration: 0.15 }}
                className="glass"
                style={{
                  padding: "20px 22px",
                  borderRadius: 16,
                  border: isDone ? "1px solid rgba(16, 185, 129, 0.25)" : "1px solid rgba(255, 255, 255, 0.06)",
                  background: isDone ? "linear-gradient(135deg, rgba(16, 185, 129, 0.03), rgba(13, 18, 31, 0.8))" : "rgba(13, 18, 31, 0.7)",
                  display: "flex",
                  flexDirection: "column",
                  gap: 14,
                  position: "relative",
                }}
              >
                {/* Cabecera de la Comida */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 10 }}>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3 }}>
                      <span style={{ fontSize: "0.7rem", color: "var(--color-green)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                        Momento {idx + 1}
                      </span>
                      <span style={{ fontSize: "0.7rem", color: "var(--color-text-muted)" }}>•</span>
                      <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: "0.7rem", color: "var(--color-text-muted)" }}>
                        <Clock size={11} /> {comida.hora}
                      </span>
                    </div>

                    <h4 style={{ fontSize: "0.95rem", fontWeight: 700, color: "#ffffff" }}>
                      {comida.momento}
                    </h4>
                    <p style={{ fontSize: "0.74rem", color: "var(--color-text-secondary)", marginTop: 2 }}>
                      {comida.enfoque}
                    </p>
                  </div>

                  <div
                    style={{
                      padding: "4px 10px",
                      borderRadius: 8,
                      background: "rgba(16, 185, 129, 0.1)",
                      border: "1px solid rgba(16, 185, 129, 0.2)",
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      color: "var(--color-green)",
                      flexShrink: 0,
                    }}
                  >
                    ~{comida.kcal} kcal
                  </div>
                </div>

                {/* Lista de Alimentos Claros en Bloques Limpios */}
                <div style={{ display: "flex", flexDirection: "column", gap: 8, paddingTop: 4 }}>
                  {comida.alimentos.map((alim, i) => (
                    <div
                      key={i}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: 10,
                        padding: "8px 12px",
                        borderRadius: 8,
                        background: "rgba(255, 255, 255, 0.02)",
                        fontSize: "0.77rem",
                        color: "var(--color-text-secondary)",
                      }}
                    >
                      <ChevronRight size={13} color="var(--color-green)" style={{ flexShrink: 0, marginTop: 2 }} />
                      <span style={{ lineHeight: 1.4 }}>{alim}</span>
                    </div>
                  ))}
                </div>

                {/* Botón de cumplimiento interactivo */}
                <div style={{ marginTop: "auto", paddingTop: 8, display: "flex", justifyContent: "flex-end" }}>
                  <button
                    onClick={() => toggleMeal(comida.id)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      background: isDone ? "rgba(16, 185, 129, 0.12)" : "rgba(255, 255, 255, 0.03)",
                      border: "1px solid",
                      borderColor: isDone ? "rgba(16, 185, 129, 0.3)" : "rgba(255, 255, 255, 0.08)",
                      color: isDone ? "var(--color-green)" : "var(--color-text-muted)",
                      padding: "6px 12px",
                      borderRadius: 6,
                      fontSize: "0.72rem",
                      fontWeight: 600,
                      cursor: "pointer",
                      transition: "all 0.15s ease",
                    }}
                  >
                    <Check size={12} />
                    <span>{isDone ? "Pauta Cumplida" : "Marcar como Guía Activa"}</span>
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* ── 4. CONTENIDO: SECCIÓN DE ACTIVIDAD FÍSICA ESCOLAR (Dinámica & Visual) ── */}
      {activeTab === "actividad" && (
        <div style={{ display: "grid", gridTemplateColumns: "240px 1fr", gap: 20 }}>
          {/* Selector de Sesiones */}
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <span style={{ fontSize: "0.72rem", fontWeight: 700, color: "var(--color-text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", paddingLeft: 4 }}>
              Sesiones de la Semana
            </span>
            {plan.actividadFisica.sesiones.map((ses, i) => {
              const isSelected = activeSesion === i;
              return (
                <button
                  key={ses.dia}
                  onClick={() => setActiveSesion(i)}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    padding: "14px 16px",
                    borderRadius: 12,
                    border: "1px solid",
                    borderColor: isSelected ? "var(--color-green)" : "rgba(255, 255, 255, 0.06)",
                    background: isSelected ? "rgba(16, 185, 129, 0.08)" : "rgba(255, 255, 255, 0.02)",
                    cursor: "pointer",
                    textAlign: "left",
                    transition: "all 0.15s ease",
                    fontFamily: "var(--font-sans)",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", width: "100%", alignItems: "center" }}>
                    <span style={{ fontSize: "0.7rem", fontWeight: 700, color: isSelected ? "var(--color-green)" : "var(--color-text-muted)", textTransform: "uppercase" }}>
                      {ses.dia}
                    </span>
                    <span style={{ fontSize: "0.68rem", color: "var(--color-text-muted)" }}>
                      {ses.duracion}
                    </span>
                  </div>
                  <span style={{ fontSize: "0.82rem", fontWeight: 600, color: isSelected ? "#ffffff" : "var(--color-text-secondary)", marginTop: 4 }}>
                    {ses.nombre}
                  </span>
                </button>
              );
            })}

            <div
              style={{
                marginTop: 10,
                padding: "14px 16px",
                borderRadius: 12,
                background: "rgba(255, 255, 255, 0.02)",
                border: "1px solid rgba(255, 255, 255, 0.05)",
                fontSize: "0.74rem",
                color: "var(--color-text-secondary)",
                lineHeight: 1.6,
              }}
            >
              <strong style={{ color: "var(--color-text-primary)" }}>Frecuencia recomendada:</strong><br />
              {plan.actividadFisica.frecuencia} de actividad física guiada.
            </div>
          </div>

          {/* Detalle de la Sesión Seleccionada */}
          <div
            className="glass"
            style={{
              padding: "24px 28px",
              borderRadius: 16,
              display: "flex",
              flexDirection: "column",
              gap: 20,
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid rgba(255, 255, 255, 0.06)", paddingBottom: 16 }}>
              <div>
                <span style={{ fontSize: "0.7rem", color: "var(--color-green)", fontWeight: 700, textTransform: "uppercase" }}>
                  {plan.actividadFisica.sesiones[activeSesion].dia}
                </span>
                <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#ffffff", marginTop: 2 }}>
                  {plan.actividadFisica.sesiones[activeSesion].nombre}
                </h3>
              </div>

              <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                <span
                  style={{
                    padding: "4px 10px",
                    borderRadius: 6,
                    background: "rgba(255, 255, 255, 0.04)",
                    fontSize: "0.74rem",
                    color: "var(--color-text-secondary)",
                    fontWeight: 600,
                  }}
                >
                  Duración: {plan.actividadFisica.sesiones[activeSesion].duracion}
                </span>
                <span
                  style={{
                    padding: "4px 10px",
                    borderRadius: 6,
                    background: "rgba(16, 185, 129, 0.12)",
                    color: "var(--color-green)",
                    fontSize: "0.74rem",
                    fontWeight: 700,
                  }}
                >
                  Intensidad: {plan.actividadFisica.sesiones[activeSesion].intensidad}%
                </span>
              </div>
            </div>

            {/* Lista de Actividades de la Sesión */}
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {plan.actividadFisica.sesiones[activeSesion].actividades.map((act, idx) => (
                <div
                  key={idx}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "12px 16px",
                    borderRadius: 10,
                    background: "rgba(255, 255, 255, 0.02)",
                    border: "1px solid rgba(255, 255, 255, 0.05)",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div
                      style={{
                        width: 24,
                        height: 24,
                        borderRadius: 6,
                        background: "rgba(16, 185, 129, 0.15)",
                        color: "var(--color-green)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "0.72rem",
                        fontWeight: 700,
                      }}
                    >
                      {idx + 1}
                    </div>
                    <div>
                      <div style={{ fontSize: "0.82rem", fontWeight: 600, color: "var(--color-text-primary)" }}>
                        {act.ej}
                      </div>
                      <div style={{ fontSize: "0.72rem", color: "var(--color-text-muted)", marginTop: 2 }}>
                        {act.detalle}
                      </div>
                    </div>
                  </div>

                  <span style={{ fontSize: "0.68rem", color: "var(--color-green)", fontWeight: 600 }}>
                    Guiado
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── 5. CONTENIDO: SECCIÓN DE PAUTAS DE SALUD & HÁBITOS ── */}
      {activeTab === "habitos" && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          {plan.pautasSaludables.map((pauta) => {
            const Icon = pauta.icono;
            return (
              <div
                key={pauta.titulo}
                className="glass"
                style={{
                  padding: "22px 24px",
                  borderRadius: 16,
                  border: "1px solid rgba(255, 255, 255, 0.06)",
                  display: "flex",
                  gap: 16,
                  alignItems: "flex-start",
                }}
              >
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    background: "rgba(16, 185, 129, 0.1)",
                    border: "1px solid rgba(16, 185, 129, 0.25)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--color-green)",
                    flexShrink: 0,
                  }}
                >
                  <Icon size={20} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                    <h4 style={{ fontSize: "0.88rem", fontWeight: 700, color: "#ffffff" }}>
                      {pauta.titulo}
                    </h4>
                    <span
                      style={{
                        fontSize: "0.68rem",
                        padding: "2px 8px",
                        borderRadius: 6,
                        background: "rgba(16, 185, 129, 0.12)",
                        color: "var(--color-green)",
                        fontWeight: 700,
                      }}
                    >
                      {pauta.meta}
                    </span>
                  </div>
                  <p style={{ fontSize: "0.78rem", color: "var(--color-text-secondary)", lineHeight: 1.6 }}>
                    {pauta.descripcion}
                  </p>
                </div>
              </div>
            );
          })}

          {/* Tarjeta de Resumen Pedagógico */}
          <div
            className="glass"
            style={{
              gridColumn: "1 / -1",
              padding: "20px 24px",
              borderRadius: 14,
              background: "rgba(16, 185, 129, 0.04)",
              border: "1px solid rgba(16, 185, 129, 0.18)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 16,
            }}
          >
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                <CheckCircle2 size={16} color="var(--color-green)" />
                <h4 style={{ fontSize: "0.88rem", fontWeight: 700, color: "var(--color-green-light)" }}>
                  Recomendaciones para el Docente e Informe a Padres
                </h4>
              </div>
              <p style={{ fontSize: "0.76rem", color: "var(--color-text-secondary)" }}>
                Estas pautas formativas están preparadas para ser emitidas en el boletín escolar oficial y socializadas en comités de evaluación.
              </p>
            </div>

            <button
              className="btn btn-primary"
              onClick={() => window.print()}
              style={{ fontSize: "0.78rem", padding: "8px 16px" }}
            >
              <FileText size={14} />
              <span>Emitir Informe Oficial</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
