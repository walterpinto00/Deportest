// ─────────────────────────────────────────────────────────────
// TabNutricionAI.tsx — Orientación Nutricional & Hábitos Saludables
// Diseño de alto impacto visual, tipografía grande y legible, colores vivos por momento
// ─────────────────────────────────────────────────────────────
import React, { useState, useEffect } from "react";
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
  Sunrise,
  Apple,
  Utensils,
  Coffee,
  User,
} from "lucide-react";
import { Select } from "../ui/Select";
import { Input } from "../ui/Input";
import { userService, Usuario } from "../../services/userService";

interface TabNutricionAIProps {
  onSave: () => void;
}

// Configuración de Identidad Visual y Colores Vivos por Momento de Comida
const THEME_MOMENTOS: Record<
  string,
  {
    color: string;
    lightColor: string;
    cardBg: string;
    border: string;
    borderDone: string;
    glow: string;
    badgeBg: string;
    badgeBorder: string;
    badgeText: string;
    bulletColor: string;
    tagNombre: string;
  }
> = {
  desayuno: {
    color: "#f59e0b", // Ámbar dorado energizante
    lightColor: "#fef3c7",
    cardBg: "linear-gradient(145deg, rgba(245, 158, 11, 0.12) 0%, rgba(15, 23, 42, 0.95) 100%)",
    border: "rgba(245, 158, 11, 0.28)",
    borderDone: "rgba(245, 158, 11, 0.6)",
    glow: "rgba(245, 158, 11, 0.18)",
    badgeBg: "rgba(245, 158, 11, 0.2)",
    badgeBorder: "rgba(245, 158, 11, 0.45)",
    badgeText: "#fbbf24",
    bulletColor: "#f59e0b",
    tagNombre: "ENERGÍA MATUTINA",
  },
  lonchera: {
    color: "#10b981", // Verde esmeralda fresco y natural
    lightColor: "#d1fae5",
    cardBg: "linear-gradient(145deg, rgba(16, 185, 129, 0.12) 0%, rgba(15, 23, 42, 0.95) 100%)",
    border: "rgba(16, 185, 129, 0.28)",
    borderDone: "rgba(16, 185, 129, 0.6)",
    glow: "rgba(16, 185, 129, 0.18)",
    badgeBg: "rgba(16, 185, 129, 0.2)",
    badgeBorder: "rgba(16, 185, 129, 0.45)",
    badgeText: "#34d399",
    bulletColor: "#10b981",
    tagNombre: "LONCHERA ESCOLAR",
  },
  almuerzo: {
    color: "#06b6d4", // Cyan eléctrico de alto rendimiento
    lightColor: "#cffafe",
    cardBg: "linear-gradient(145deg, rgba(6, 182, 212, 0.12) 0%, rgba(15, 23, 42, 0.95) 100%)",
    border: "rgba(6, 182, 212, 0.28)",
    borderDone: "rgba(6, 182, 212, 0.6)",
    glow: "rgba(6, 182, 212, 0.18)",
    badgeBg: "rgba(6, 182, 212, 0.2)",
    badgeBorder: "rgba(6, 182, 212, 0.45)",
    badgeText: "#38bdf8",
    bulletColor: "#06b6d4",
    tagNombre: "PLATO PRINCIPAL",
  },
  merienda: {
    color: "#8b5cf6", // Violeta dinámico para pre-actividad
    lightColor: "#ede9fe",
    cardBg: "linear-gradient(145deg, rgba(139, 92, 246, 0.12) 0%, rgba(15, 23, 42, 0.95) 100%)",
    border: "rgba(139, 92, 246, 0.28)",
    borderDone: "rgba(139, 92, 246, 0.6)",
    glow: "rgba(139, 92, 246, 0.18)",
    badgeBg: "rgba(139, 92, 246, 0.2)",
    badgeBorder: "rgba(139, 92, 246, 0.45)",
    badgeText: "#c084fc",
    bulletColor: "#8b5cf6",
    tagNombre: "PRE-ENTRENO FORMATIVO",
  },
  cena: {
    color: "#14b8a6", // Turquesa / Teal relajante nocturno
    lightColor: "#ccfbf1",
    cardBg: "linear-gradient(145deg, rgba(20, 184, 166, 0.12) 0%, rgba(15, 23, 42, 0.95) 100%)",
    border: "rgba(20, 184, 166, 0.28)",
    borderDone: "rgba(20, 184, 166, 0.6)",
    glow: "rgba(20, 184, 166, 0.18)",
    badgeBg: "rgba(20, 184, 166, 0.2)",
    badgeBorder: "rgba(20, 184, 166, 0.45)",
    badgeText: "#2dd4bf",
    bulletColor: "#14b8a6",
    tagNombre: "CENA REPARADORA",
  },
};

// Datos pedagógicos y clínicos completos conservados
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
      { macro: "Carbohidratos Complejos", pct: 55, gramos: "302 g", color: "#10b981", desc: "Avena, arroz, papa y frutas frescas" },
      { macro: "Proteínas de Alto Valor", pct: 20, gramos: "110 g", color: "#06b6d4", desc: "Huevos, pechuga, pescado y lácteos" },
      { macro: "Grasas Saludables", pct: 25, gramos: "61 g", color: "#f59e0b", desc: "Frutos secos, aguacate y aceite de oliva" },
    ],
    comidas: [
      {
        id: "desayuno",
        momento: "Desayuno en Casa",
        hora: "06:30 am",
        kcal: 500,
        enfoque: "Energía sostenida y concentración en clases matutinas",
        alimentos: [
          "Porción de avena cocida en leche descremada con canela",
          "1 huevo revuelto o cocido con poco aceite",
          "1 porción de fruta fresca (banano, papaya o manzana)",
          "Vaso grande de agua natural fresca",
        ],
      },
      {
        id: "lonchera",
        momento: "Refrigerio / Lonchera Escolar",
        hora: "09:45 am",
        kcal: 250,
        enfoque: "Pausa activa saludable (100% libre de ultraprocesados y paquetes)",
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
        enfoque: "Plato del Buen Comer (50% vegetales frescos, 25% proteína, 25% carbohidratos)",
        alimentos: [
          "120 g de pechuga de pollo, pescado o carne magra a la plancha",
          "1 taza mediana de arroz o papa cocida al vapor",
          "Ensalada fresca abundante (tomate, zanahoria, pepino y limón)",
          "Porción de legumbres (frijoles o lentejas, 2 a 3 veces por semana)",
        ],
      },
      {
        id: "merienda",
        momento: "Merienda Pre-Actividad",
        hora: "04:30 pm",
        kcal: 250,
        enfoque: "Recarga rápida de glucógeno muscular antes de entrenar o jugar",
        alimentos: [
          "1 yogur natural o vaso de leche descremada",
          "1 tostada o galleta integral con queso campesino bajo en grasa",
          "Hidratación continua con agua pura",
        ],
      },
      {
        id: "cena",
        momento: "Cena Ligera",
        hora: "07:30 pm",
        kcal: 450,
        enfoque: "Digestión fácil para inducir un sueño profundo y reparador",
        alimentos: [
          "Tortilla francesa de 2 huevos con espinacas o champiñones",
          "Porción generosa de vegetales al vapor o ensalada verde tibia",
          "Infusión aromática natural tibia (manzanilla o hierbabuena sin azúcar)",
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
        color: "#10b981",
        actividades: [
          { ej: "Calentamiento articular dinámico", detalle: "10 min — movilidad de tobillos, rodillas, cadera y hombros" },
          { ej: "Escalera de agilidad y coordinación", detalle: "3 series × 4 repeticiones a ritmo moderado" },
          { ej: "Juegos deportivos cooperativos (fútbol, baloncesto)", detalle: "20 min continuos" },
          { ej: "Vuelta a la calma y estiramiento muscular", detalle: "5 min — respiración guiada y relajación" },
        ],
      },
      {
        dia: "Sesión 2",
        nombre: "Fuerza con Peso Corporal (Calistenia)",
        duracion: "40 min",
        intensidad: 80,
        color: "#f97316",
        actividades: [
          { ej: "Sentadillas libres con técnica guiada", detalle: "3 series × 12 repeticiones completas" },
          { ej: "Flexiones de pecho (apoyo en rodillas si se requiere)", detalle: "3 series × 8-10 repeticiones" },
          { ej: "Plancha estática isométrica", detalle: "3 series × 30 segundos de contracción abdominal" },
          { ej: "Zancadas alternadas en el sitio", detalle: "3 series × 10 por pierna" },
        ],
      },
      {
        dia: "Sesión 3",
        nombre: "Capacidad Aeróbica & Recreación",
        duracion: "50 min",
        intensidad: 75,
        color: "#06b6d4",
        actividades: [
          { ej: "Trote suave continuo o marcha deportiva", detalle: "15 min a ritmo conversacional cómodo" },
          { ej: "Prueba formativa de velocidad 30 metros", detalle: "3 repeticiones con recuperación amplia" },
          { ej: "Deporte recreativo al aire libre", detalle: "25 min de juego continuo en equipo" },
        ],
      },
    ],
  },
  pautasSaludables: [
    {
      titulo: "Hidratación Constante con Agua",
      descripcion: "Consumir al menos 2 litros de agua pura al día. Evitar gaseosas, bebidas energizantes y refrescos azucarados ultraprocesados.",
      icono: Droplets,
      meta: "2.0 Litros / Día",
      color: "#06b6d4",
    },
    {
      titulo: "Higiene del Sueño Escolar",
      descripcion: "Dormir de 8 a 9 horas diarias es fundamental para la memoria, la concentración en clase y el crecimiento físico durante la adolescencia.",
      icono: Moon,
      meta: "8.5 Horas / Noche",
      color: "#6366f1",
    },
    {
      titulo: "Control de Tiempo en Pantallas",
      descripcion: "Limitar el uso recreativo de celular, televisión y videojuegos a un máximo de 2 horas al día para evitar el sedentarismo.",
      icono: Activity,
      meta: "Máx. 2 Horas / Día",
      color: "#f59e0b",
    },
    {
      titulo: "Control Periódico de Salud",
      descripcion: "Verificar peso, talla y perímetro abdominal al cierre de cada período académico para asegurar una curva de crecimiento óptima.",
      icono: Heart,
      meta: "Cada Período",
      color: "#10b981",
    },
  ],
};

export function TabNutricionAI({ onSave }: TabNutricionAIProps) {
  const [aprendices, setAprendices] = useState(() => userService.getUsuarios().filter((u) => u.rol === "APRENDIZ"));
  const [estudianteId, setEstudianteId] = useState(() => aprendices[0]?.id || "usr-1");
  const [generating, setGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState<"nutricion" | "actividad" | "habitos">("nutricion");
  const [showConfig, setShowConfig] = useState(false);
  const [savedOk, setSavedOk] = useState(false);
  const [activeSesion, setActiveSesion] = useState(0);
  const [completedMeals, setCompletedMeals] = useState<Record<string, boolean>>({
    desayuno: true,
    lonchera: true,
  });

  useEffect(() => {
    const unsub = userService.subscribe(() => {
      const lista = userService.getUsuarios().filter((u) => u.rol === "APRENDIZ");
      setAprendices(lista);
    });
    return () => unsub();
  }, []);

  const alumnoActivo = aprendices.find((a) => a.id === estudianteId) || aprendices[0];
  const pesoNum = alumnoActivo ? parseFloat(alumnoActivo.peso || "62.0") : 62.0;
  const tallaNum = alumnoActivo ? parseFloat(alumnoActivo.talla || "1.72") : 1.72;
  const imcCalculado = pesoNum > 0 && tallaNum > 0 ? (pesoNum / (tallaNum * tallaNum)).toFixed(1) : "21.0";
  const caloriasCalculadas = Math.round(pesoNum * 35.5);

  const plan = {
    ...PLAN_DATA,
    perfil: {
      ...PLAN_DATA.perfil,
      nombre: alumnoActivo ? `${alumnoActivo.nombres} ${alumnoActivo.apellidos}` : PLAN_DATA.perfil.nombre,
      grado: alumnoActivo ? alumnoActivo.grado || "Programa SENA" : PLAN_DATA.perfil.grado,
      peso: `${pesoNum} kg`,
      talla: `${tallaNum} m`,
      imc: `${imcCalculado} (Rango Saludable OMS)`,
      calorias: caloriasCalculadas,
    },
    nutricion: {
      ...PLAN_DATA.nutricion,
      calorias: caloriasCalculadas,
    }
  };

  const toggleMeal = (id: string) => {
    setCompletedMeals((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleGenerate = () => {
    setGenerating(true);
    setTimeout(() => {
      setGenerating(false);
    }, 800);
  };

  const handleSave = () => {
    onSave();
    setSavedOk(true);
    setTimeout(() => setSavedOk(false), 2500);
  };

  return (
    <div className="animate-fade-in" style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {/* ── SELECTOR DE ALUMNO EN TIEMPO REAL ── */}
      <div
        className="glass"
        style={{
          padding: "14px 22px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 12,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <User size={18} color="var(--color-green)" />
          <span style={{ fontSize: "0.88rem", fontWeight: 700, color: "var(--color-text-primary)" }}>
            Atleta o Aprendiz a Orientar:
          </span>
          <select
            className="dp-select"
            value={estudianteId}
            onChange={(e) => setEstudianteId(e.target.value)}
            style={{ width: "auto", minWidth: 260, padding: "8px 36px 8px 14px", fontSize: "0.88rem", fontWeight: 700 }}
          >
            {aprendices.map((ap) => (
              <option key={ap.id} value={ap.id}>
                {ap.nombres} {ap.apellidos} — {ap.grado || "10°"} ({ap.peso} kg, {ap.talla} m)
              </option>
            ))}
          </select>
        </div>
        <span style={{ fontSize: "0.78rem", color: "var(--color-text-muted)", fontWeight: 500 }}>
          💡 El plan adapta calorías y nutrientes según las medidas antropométricas reales.
        </span>
      </div>

      {/* ── 1. HERO BANNER PRINCIPAL: FICHA DEL ESTUDIANTE & CALORÍAS (Limpio y Alto Contraste) ── */}
      <div
        className="glass-elevated"
        style={{
          padding: "26px 30px",
          borderRadius: 20,
          background: "linear-gradient(135deg, rgba(16, 185, 129, 0.08) 0%, rgba(6, 182, 212, 0.05) 50%, var(--color-bg-surface) 100%)",
          border: "1px solid var(--color-border)",
          boxShadow: "var(--shadow-card)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 20, position: "relative", zIndex: 1 }}>
          {/* Identidad del Atleta / Estudiante */}
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: 16,
                background: "linear-gradient(135deg, #10b981, #059669)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#ffffff",
                boxShadow: "0 6px 20px rgba(16, 185, 129, 0.3)",
                flexShrink: 0,
              }}
            >
              <Zap size={28} />
            </div>

            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                <h2 style={{ fontSize: "1.4rem", fontWeight: 800, letterSpacing: "-0.02em", color: "var(--color-text-primary)" }}>
                  {plan.perfil.nombre}
                </h2>
                <span
                  style={{
                    fontSize: "0.8rem",
                    padding: "3px 10px",
                    borderRadius: 99,
                    background: "rgba(16, 185, 129, 0.15)",
                    color: "var(--color-green)",
                    fontWeight: 800,
                    border: "1px solid rgba(16, 185, 129, 0.35)",
                  }}
                >
                  {plan.perfil.grado}
                </span>
                <span
                  style={{
                    fontSize: "0.8rem",
                    padding: "3px 10px",
                    borderRadius: 99,
                    background: "var(--color-bg-card)",
                    color: "var(--color-text-secondary)",
                    fontWeight: 700,
                    border: "1px solid var(--color-border)",
                  }}
                >
                  {plan.perfil.somatotipo} · {plan.perfil.peso} · {plan.perfil.talla}
                </span>
              </div>

              <p style={{ fontSize: "0.9rem", color: "var(--color-text-secondary)", marginTop: 6, fontWeight: 500 }}>
                Diagnóstico OMS: <strong style={{ color: "var(--color-green)", fontWeight: 800 }}>{plan.perfil.imc}</strong> · Objetivo: <strong style={{ color: "var(--color-text-primary)" }}>{plan.perfil.objetivo}</strong>
              </p>
            </div>
          </div>

          {/* Medidores Vivos de Calorías & Configuración */}
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "10px 18px",
                borderRadius: 14,
                background: "var(--color-bg-surface)",
                border: "1.5px solid rgba(245, 158, 11, 0.3)",
                boxShadow: "var(--shadow-sm)",
              }}
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 12,
                  background: "rgba(245, 158, 11, 0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#d97706",
                }}
              >
                <Flame size={24} />
              </div>
              <div>
                <div style={{ fontSize: "1.6rem", fontWeight: 900, color: "var(--color-text-primary)", lineHeight: 1 }}>
                  ~{plan.nutricion.calorias.toLocaleString()}
                </div>
                <div style={{ fontSize: "0.74rem", color: "#d97706", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.04em", marginTop: 2 }}>
                  kcal diarias recomendadas
                </div>
              </div>
            </div>

            <button
              className="btn btn-secondary"
              onClick={() => setShowConfig(!showConfig)}
              style={{
                padding: "11px 16px",
                fontSize: "0.88rem",
                borderRadius: 12,
                color: "var(--color-text-primary)",
                border: "1.5px solid var(--color-border)",
                fontWeight: 700,
              }}
            >
              <SlidersHorizontal size={16} color="var(--color-green)" />
              <span>{showConfig ? "Ocultar Parámetros" : "Ajustar Parámetros"}</span>
            </button>
          </div>
        </div>

        {/* Barra de Distribución Nutricional Clara y Colorida */}
        <div style={{ marginTop: 20, paddingTop: 16, borderTop: "1px solid var(--color-border)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8, flexWrap: "wrap", gap: 10 }}>
            <span style={{ fontSize: "0.82rem", fontWeight: 800, color: "var(--color-text-secondary)", letterSpacing: "0.04em", textTransform: "uppercase" }}>
              Distribución de Macronutrientes por Día
            </span>
            <div style={{ display: "flex", gap: 18, flexWrap: "wrap" }}>
              {plan.nutricion.distribucion.map((m) => (
                <div key={m.macro} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: "0.86rem" }}>
                  <div style={{ width: 9, height: 9, borderRadius: "50%", background: m.color }} />
                  <span style={{ color: "var(--color-text-muted)", fontWeight: 600 }}>{m.macro}:</span>
                  <strong style={{ color: "var(--color-text-primary)", fontWeight: 800 }}>{m.pct}% ({m.gramos})</strong>
                </div>
              ))}
            </div>
          </div>

          {/* Barra segmentada */}
          <div style={{ height: 10, borderRadius: 99, background: "var(--color-border)", display: "flex", overflow: "hidden" }}>
            <div style={{ width: "55%", background: "linear-gradient(90deg, #059669, #10b981)" }} title="55% Carbohidratos" />
            <div style={{ width: "20%", background: "linear-gradient(90deg, #0891b2, #06b6d4)" }} title="20% Proteínas" />
            <div style={{ width: "25%", background: "linear-gradient(90deg, #d97706, #f59e0b)" }} title="25% Grasas Saludables" />
          </div>
        </div>
      </div>

      {/* ── PANEL DESPLEGABLE DE AJUSTE (Si el docente desea recalcular) ── */}
      <AnimatePresence>
        {showConfig && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="glass"
            style={{
              padding: "24px 28px",
              borderRadius: 18,
              border: "1px solid rgba(16, 185, 129, 0.35)",
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr auto",
              gap: 18,
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
                style={{ padding: "12px 20px", fontSize: "0.92rem" }}
              >
                {generating ? (
                  <RefreshCw size={16} style={{ animation: "spin 1s linear infinite" }} />
                ) : (
                  <Sparkles size={16} />
                )}
                <span>Recalcular Plan</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── 2. BARRA DE PESTAÑAS INTERNAS & ACCIONES RÁPIDAS (Grande y visible) ── */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 14,
        }}
      >
        <div
          style={{
            display: "inline-flex",
            background: "rgba(255, 255, 255, 0.05)",
            border: "1px solid rgba(255, 255, 255, 0.12)",
            borderRadius: 14,
            padding: 5,
            gap: 6,
          }}
        >
          {[
            { id: "nutricion", label: "Horarios & Lonchera Saludable", icon: Heart, activeColor: "#06b6d4" },
            { id: "actividad", label: "Plan de Actividad Física Escolar", icon: Dumbbell, activeColor: "#f97316" },
            { id: "habitos", label: "Pautas de Salud & Bienestar", icon: ShieldCheck, activeColor: "#8b5cf6" },
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
                  gap: 10,
                  padding: "11px 22px",
                  borderRadius: 10,
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.95rem",
                  fontWeight: isSelected ? 800 : 600,
                  background: isSelected ? tab.activeColor : "transparent",
                  color: isSelected ? "#ffffff" : "var(--color-text-secondary)",
                  boxShadow: isSelected ? `0 4px 16px ${tab.activeColor}55` : "none",
                  transition: "all 0.2s ease",
                }}
              >
                <Icon size={17} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Acciones Rápidas (Guardar e Imprimir) */}
        <div style={{ display: "flex", gap: 12 }}>
          <button
            className="btn btn-ghost"
            onClick={handleSave}
            style={{
              padding: "10px 18px",
              fontSize: "0.9rem",
              borderRadius: 10,
              color: savedOk ? "#34d399" : "#ffffff",
              borderColor: savedOk ? "#10b981" : "rgba(255, 255, 255, 0.15)",
              background: savedOk ? "rgba(16, 185, 129, 0.15)" : "transparent",
              fontWeight: 700,
            }}
          >
            {savedOk ? <CheckCircle2 size={16} /> : <Save size={16} />}
            <span>{savedOk ? "✓ Ficha Guardada" : "Guardar Ficha"}</span>
          </button>

          <button
            className="btn btn-secondary"
            onClick={() => window.print()}
            style={{
              padding: "10px 18px",
              fontSize: "0.9rem",
              borderRadius: 10,
              fontWeight: 700,
            }}
            title="Imprimir boletín oficial para padres de familia"
          >
            <Printer size={16} />
            <span>Imprimir Boletín</span>
          </button>
        </div>
      </div>

      {/* ── 3. CONTENIDO: SECCIÓN DE ALIMENTACIÓN & LONCHERA (Colores Vivos por Momento & Letra Grande) ── */}
      {activeTab === "nutricion" && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))", gap: 20 }}>
          {plan.nutricion.comidas.map((comida, idx) => {
            const isDone = completedMeals[comida.id];
            const theme = THEME_MOMENTOS[comida.id] || THEME_MOMENTOS.desayuno;

            return (
              <motion.div
                key={comida.id}
                whileHover={{ y: -3 }}
                transition={{ duration: 0.15 }}
                style={{
                  padding: "24px 26px",
                  borderRadius: 18,
                  border: isDone ? `2px solid ${theme.borderDone}` : `1px solid ${theme.border}`,
                  background: theme.cardBg,
                  boxShadow: isDone ? `0 12px 32px ${theme.glow}, 0 0 20px ${theme.glow}` : "0 8px 24px rgba(0, 0, 0, 0.4)",
                  display: "flex",
                  flexDirection: "column",
                  gap: 16,
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* Indicador de acento superior de color */}
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 4,
                    background: `linear-gradient(90deg, ${theme.color}, ${theme.lightColor})`,
                  }}
                />

                {/* Cabecera de la Comida (Con Badge de Color Vivo y Hora Grande) */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                      <span
                        style={{
                          fontSize: "0.82rem",
                          color: theme.badgeText,
                          background: theme.badgeBg,
                          border: `1px solid ${theme.badgeBorder}`,
                          padding: "3px 10px",
                          borderRadius: 8,
                          fontWeight: 800,
                          textTransform: "uppercase",
                          letterSpacing: "0.05em",
                        }}
                      >
                        Momento {idx + 1} · {theme.tagNombre}
                      </span>
                      <span
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 5,
                          fontSize: "0.86rem",
                          color: "#ffffff",
                          fontWeight: 700,
                        }}
                      >
                        <Clock size={14} color={theme.color} /> {comida.hora}
                      </span>
                    </div>

                    <h4 style={{ fontSize: "1.25rem", fontWeight: 800, color: "#ffffff", letterSpacing: "-0.01em" }}>
                      {comida.momento}
                    </h4>
                    <p style={{ fontSize: "0.92rem", color: "#e2e8f0", marginTop: 4, lineHeight: 1.45, fontWeight: 500 }}>
                      {comida.enfoque}
                    </p>
                  </div>

                  {/* Badge de Calorías con Color Vivo */}
                  <div
                    style={{
                      padding: "6px 14px",
                      borderRadius: 10,
                      background: theme.badgeBg,
                      border: `1px solid ${theme.badgeBorder}`,
                      fontSize: "0.92rem",
                      fontWeight: 800,
                      color: "#ffffff",
                      flexShrink: 0,
                      boxShadow: `0 2px 10px ${theme.glow}`,
                    }}
                  >
                    ~{comida.kcal} kcal
                  </div>
                </div>

                {/* Lista de Alimentos: Claros, Con Fondo Nítido y Letra Grande (0.96rem) */}
                <div style={{ display: "flex", flexDirection: "column", gap: 9, paddingTop: 4 }}>
                  {comida.alimentos.map((alim, i) => (
                    <div
                      key={i}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: 12,
                        padding: "10px 14px",
                        borderRadius: 10,
                        background: "rgba(255, 255, 255, 0.05)",
                        border: "1px solid rgba(255, 255, 255, 0.08)",
                        fontSize: "0.96rem",
                        color: "#ffffff",
                        fontWeight: 500,
                        lineHeight: 1.4,
                      }}
                    >
                      <ChevronRight
                        size={17}
                        color={theme.color}
                        style={{ flexShrink: 0, marginTop: 2 }}
                      />
                      <span>{alim}</span>
                    </div>
                  ))}
                </div>

                {/* Botón de Cumplimiento Interactivo y Claro */}
                <div style={{ marginTop: "auto", paddingTop: 10, display: "flex", justifyContent: "flex-end" }}>
                  <button
                    onClick={() => toggleMeal(comida.id)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      background: isDone ? theme.badgeBg : "rgba(255, 255, 255, 0.06)",
                      border: "1px solid",
                      borderColor: isDone ? theme.borderDone : "rgba(255, 255, 255, 0.16)",
                      color: isDone ? "#ffffff" : "#cbd5e1",
                      padding: "8px 16px",
                      borderRadius: 10,
                      fontSize: "0.88rem",
                      fontWeight: 700,
                      cursor: "pointer",
                      transition: "all 0.15s ease",
                      boxShadow: isDone ? `0 2px 12px ${theme.glow}` : "none",
                    }}
                  >
                    <Check size={16} color={isDone ? theme.color : "currentColor"} />
                    <span>{isDone ? "✓ Pauta Cumplida" : "Marcar como Guía Activa"}</span>
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* ── 4. CONTENIDO: SECCIÓN DE ACTIVIDAD FÍSICA ESCOLAR (Grande, Clara y Dinámica) ── */}
      {activeTab === "actividad" && (
        <div style={{ display: "grid", gridTemplateColumns: "280px 1fr", gap: 24 }}>
          {/* Selector de Sesiones */}
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <span style={{ fontSize: "0.82rem", fontWeight: 800, color: "#ffffff", textTransform: "uppercase", letterSpacing: "0.05em", paddingLeft: 4 }}>
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
                    padding: "16px 18px",
                    borderRadius: 14,
                    border: "1px solid",
                    borderColor: isSelected ? ses.color : "rgba(255, 255, 255, 0.1)",
                    background: isSelected ? `${ses.color}22` : "rgba(255, 255, 255, 0.03)",
                    boxShadow: isSelected ? `0 4px 18px ${ses.color}33` : "none",
                    cursor: "pointer",
                    textAlign: "left",
                    transition: "all 0.15s ease",
                    fontFamily: "var(--font-sans)",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", width: "100%", alignItems: "center" }}>
                    <span style={{ fontSize: "0.84rem", fontWeight: 800, color: isSelected ? ses.color : "#cbd5e1", textTransform: "uppercase" }}>
                      {ses.dia}
                    </span>
                    <span style={{ fontSize: "0.82rem", color: "#e2e8f0", fontWeight: 600 }}>
                      {ses.duracion}
                    </span>
                  </div>
                  <span style={{ fontSize: "0.98rem", fontWeight: 700, color: isSelected ? "#ffffff" : "#cbd5e1", marginTop: 4 }}>
                    {ses.nombre}
                  </span>
                </button>
              );
            })}

            <div
              style={{
                marginTop: 12,
                padding: "16px 18px",
                borderRadius: 14,
                background: "rgba(255, 255, 255, 0.04)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                fontSize: "0.88rem",
                color: "#e2e8f0",
                lineHeight: 1.6,
              }}
            >
              <strong style={{ color: "#34d399" }}>Frecuencia recomendada:</strong><br />
              {plan.actividadFisica.frecuencia} de actividad física guiada y supervisada.
            </div>
          </div>

          {/* Detalle de la Sesión Seleccionada */}
          <div
            className="glass-elevated"
            style={{
              padding: "26px 30px",
              borderRadius: 18,
              display: "flex",
              flexDirection: "column",
              gap: 22,
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid rgba(255, 255, 255, 0.1)", paddingBottom: 18, flexWrap: "wrap", gap: 12 }}>
              <div>
                <span style={{ fontSize: "0.84rem", color: plan.actividadFisica.sesiones[activeSesion].color, fontWeight: 800, textTransform: "uppercase" }}>
                  {plan.actividadFisica.sesiones[activeSesion].dia}
                </span>
                <h3 style={{ fontSize: "1.35rem", fontWeight: 800, color: "#ffffff", marginTop: 2 }}>
                  {plan.actividadFisica.sesiones[activeSesion].nombre}
                </h3>
              </div>

              <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
                <span
                  style={{
                    padding: "6px 12px",
                    borderRadius: 8,
                    background: "rgba(255, 255, 255, 0.06)",
                    fontSize: "0.88rem",
                    color: "#ffffff",
                    fontWeight: 700,
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                  }}
                >
                  Duración: {plan.actividadFisica.sesiones[activeSesion].duracion}
                </span>
                <span
                  style={{
                    padding: "6px 14px",
                    borderRadius: 8,
                    background: `${plan.actividadFisica.sesiones[activeSesion].color}25`,
                    color: plan.actividadFisica.sesiones[activeSesion].color,
                    fontSize: "0.88rem",
                    fontWeight: 800,
                    border: `1px solid ${plan.actividadFisica.sesiones[activeSesion].color}55`,
                  }}
                >
                  Intensidad: {plan.actividadFisica.sesiones[activeSesion].intensidad}%
                </span>
              </div>
            </div>

            {/* Lista de Actividades de la Sesión con Letra Grande */}
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {plan.actividadFisica.sesiones[activeSesion].actividades.map((act, idx) => (
                <div
                  key={idx}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "14px 18px",
                    borderRadius: 12,
                    background: "rgba(255, 255, 255, 0.04)",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                    <div
                      style={{
                        width: 30,
                        height: 30,
                        borderRadius: 8,
                        background: `${plan.actividadFisica.sesiones[activeSesion].color}25`,
                        color: plan.actividadFisica.sesiones[activeSesion].color,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "0.86rem",
                        fontWeight: 800,
                        border: `1px solid ${plan.actividadFisica.sesiones[activeSesion].color}44`,
                      }}
                    >
                      {idx + 1}
                    </div>
                    <div>
                      <div style={{ fontSize: "0.96rem", fontWeight: 700, color: "#ffffff" }}>
                        {act.ej}
                      </div>
                      <div style={{ fontSize: "0.85rem", color: "#cbd5e1", marginTop: 3 }}>
                        {act.detalle}
                      </div>
                    </div>
                  </div>

                  <span
                    style={{
                      fontSize: "0.8rem",
                      color: plan.actividadFisica.sesiones[activeSesion].color,
                      fontWeight: 800,
                      background: "rgba(255, 255, 255, 0.05)",
                      padding: "4px 10px",
                      borderRadius: 6,
                    }}
                  >
                    Guiado
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── 5. CONTENIDO: SECCIÓN DE PAUTAS DE SALUD & HÁBITOS (Tarjetas con Colores Vivos) ── */}
      {activeTab === "habitos" && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          {plan.pautasSaludables.map((pauta) => {
            const Icon = pauta.icono;
            return (
              <div
                key={pauta.titulo}
                className="glass"
                style={{
                  padding: "26px 28px",
                  borderRadius: 18,
                  border: `1px solid ${pauta.color}44`,
                  background: `linear-gradient(145deg, ${pauta.color}15 0%, rgba(15, 23, 42, 0.95) 100%)`,
                  display: "flex",
                  gap: 18,
                  alignItems: "flex-start",
                  boxShadow: `0 8px 24px ${pauta.color}22`,
                }}
              >
                <div
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: 14,
                    background: `${pauta.color}25`,
                    border: `1px solid ${pauta.color}55`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: pauta.color,
                    flexShrink: 0,
                    boxShadow: `0 4px 16px ${pauta.color}33`,
                  }}
                >
                  <Icon size={24} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8, flexWrap: "wrap", gap: 8 }}>
                    <h4 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#ffffff" }}>
                      {pauta.titulo}
                    </h4>
                    <span
                      style={{
                        fontSize: "0.82rem",
                        padding: "3px 10px",
                        borderRadius: 8,
                        background: `${pauta.color}25`,
                        color: "#ffffff",
                        fontWeight: 800,
                        border: `1px solid ${pauta.color}55`,
                      }}
                    >
                      {pauta.meta}
                    </span>
                  </div>
                  <p style={{ fontSize: "0.92rem", color: "#e2e8f0", lineHeight: 1.6, fontWeight: 500 }}>
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
              padding: "24px 28px",
              borderRadius: 16,
              background: "linear-gradient(135deg, rgba(16, 185, 129, 0.12) 0%, rgba(15, 23, 42, 0.95) 100%)",
              border: "1px solid rgba(16, 185, 129, 0.35)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 18,
            }}
          >
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                <CheckCircle2 size={20} color="#34d399" />
                <h4 style={{ fontSize: "1.05rem", fontWeight: 800, color: "#34d399" }}>
                  Recomendaciones para el Docente e Informe a Padres
                </h4>
              </div>
              <p style={{ fontSize: "0.92rem", color: "#e2e8f0", fontWeight: 500 }}>
                Estas pautas formativas están preparadas para ser emitidas en el boletín escolar oficial y socializadas en comités de evaluación.
              </p>
            </div>

            <button
              className="btn btn-primary"
              onClick={() => window.print()}
              style={{ fontSize: "0.92rem", padding: "12px 22px" }}
            >
              <FileText size={16} />
              <span>Emitir Informe Oficial</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
