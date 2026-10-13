// ─────────────────────────────────────────────────────────────
// TabNutricionAI.tsx — Orientación Nutricional & Hábitos Saludables
// Rediseño institucional, sobrio, profesional y adaptado a colegios/SENA
// ─────────────────────────────────────────────────────────────
import React, { useState } from "react";
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
  UserCheck,
  Flame,
  ShieldCheck,
  ChevronRight,
  Printer
} from "lucide-react";
import { Select } from "../ui/Select";
import { Input } from "../ui/Input";

interface TabNutricionAIProps {
  onSave: () => void;
}

// ── Datos estructurados realistas (Enfoque Escolar / Formativo) ──────
const PLAN_DATA = {
  perfil: {
    nombre: "Juan Camilo Rodríguez",
    grado: "Grado 10° - Grupo B",
    somatotipo: "Mesomorfo",
    peso: "62.0 kg",
    talla: "1.72 m",
    imc: "21.0 (Saludable)",
    evaluacionFisica: {
      navette: { label: "Aceptable", valor: "Período 6.5", estado: "normal" },
      flexibilidad: { label: "Bueno", valor: "+3 cm (Wells)", estado: "bueno" },
      abdominales: { label: "Satisfactorio", valor: "28 en 1 min", estado: "bueno" },
    },
    objetivo: "Hábitos Saludables y Condición Física Escolar",
    calorias: 2200,
    macros: { carbs: 55, protein: 20, fat: 25 },
  },
  nutricion: {
    calorias: 2200,
    distribucion: [
      { macro: "Carbohidratos complejos", pct: 55, gramos: "302 g", nota: "Avena, frutas, arroz, legumbres" },
      { macro: "Proteínas naturales", pct: 20, gramos: "110 g", nota: "Huevos, pescado, pollo, lácteos" },
      { macro: "Grasas saludables", pct: 25, gramos: "61 g", nota: "Aguacate, frutos secos, aceite de oliva" },
    ],
    comidas: [
      {
        momento: "Desayuno en Casa",
        hora: "06:30 am",
        kcal: 500,
        enfoque: "Energía sostenida y concentración escolar",
        alimentos: [
          "Porción de avena cocida en leche descremada con canela",
          "1 huevo revuelto o cocido (preparado con poco aceite)",
          "1 porción de fruta fresca (papaya, banano o manzana)",
          "Vaso de agua natural",
        ],
      },
      {
        momento: "Refrigerio / Lonchera Escolar",
        hora: "09:45 am",
        kcal: 250,
        enfoque: "Pausa activa saludable (sin ultraprocesados)",
        alimentos: [
          "1 fruta entera de temporada con piel lavada",
          "Puñado pequeño de frutos secos naturales (maní, nueces)",
          "Botella de agua (500 ml) para recargar en la jornada",
        ],
      },
      {
        momento: "Almuerzo Balanceado",
        hora: "01:15 pm",
        kcal: 750,
        enfoque: "Plato del Buen Comer (1/2 vegetales, 1/4 proteína, 1/4 carbohidrato)",
        alimentos: [
          "120 g de pechuga de pollo, pescado o carne magra a la plancha",
          "1 taza mediana de arroz o papa cocida con cáscara",
          "Ensalada fresca abundante (zanahoria, tomate, pepino con limón)",
          "Porción de legumbres (lentejas o frijoles, 2-3 veces por semana)",
        ],
      },
      {
        momento: "Merienda Pre-Actividad",
        hora: "04:30 pm",
        kcal: 250,
        enfoque: "Energía antes de educación física o recreación",
        alimentos: [
          "1 yogur natural o leche descremada",
          "1 tostada o galleta integral con queso bajo en grasa",
          "Hidratación continua con agua",
        ],
      },
      {
        momento: "Cena Ligera",
        hora: "07:30 pm",
        kcal: 450,
        enfoque: "Digestión fácil para un sueño profundo y reparador",
        alimentos: [
          "Tortilla francesa de 2 huevos con espinacas o champiñones",
          "Porción moderada de vegetales al vapor o ensalada verde",
          "Infusión aromática natural tibia (sin azúcar añadida)",
        ],
      },
    ],
  },
  actividadFisica: {
    frecuencia: "3 a 4 días / semana",
    enfoque: "Educación Física Formativa, Resistencia & Fuerza Funcional",
    sesiones: [
      {
        dia: "Sesión 1 — Movilidad & Coordinación",
        categoria: "Acondicionamiento General",
        duracion: "45 min",
        actividades: [
          { nombre: "Calentamiento articular dinámico", detalle: "10 min — tobillos, rodillas, cadera, hombros" },
          { nombre: "Circuito de coordinación y escalera de agilidad", detalle: "3 series × 4 repeticiones a ritmo moderado" },
          { nombre: "Juegos deportivos grupales (fútbol, baloncesto)", detalle: "20 min continuos" },
          { nombre: "Vuelta a la calma y estiramiento muscular", detalle: "5 min — respiración consciente" },
        ],
      },
      {
        dia: "Sesión 2 — Fuerza con Peso Corporal (Calistenia)",
        categoria: "Desarrollo Muscular Formativo",
        duracion: "40 min",
        actividades: [
          { nombre: "Sentadillas libres con técnica guiada", detalle: "3 series × 12 repeticiones" },
          { nombre: "Flexiones de pecho (apoyo en rodillas si se requiere)", detalle: "3 series × 8-10 repeticiones" },
          { nombre: "Plancha estática isométrica", detalle: "3 series × 30 segundos de contracción abdominal" },
          { nombre: "Zancadas alternadas en el sitio", detalle: "3 series × 10 por pierna" },
        ],
      },
      {
        dia: "Sesión 3 — Capacidad Aeróbica & Recreación",
        categoria: "Salud Cardiovascular",
        duracion: "50 min",
        actividades: [
          { nombre: "Trote suave continuo o marcha deportiva", detalle: "15 min a ritmo conversacional" },
          { nombre: "Prueba formativa de velocidad 30 metros", detalle: "3 repeticiones con recuperación amplia" },
          { nombre: "Deporte recreativo al aire libre", detalle: "25 min de actividad continua" },
        ],
      },
    ],
  },
  pautasSaludables: [
    {
      titulo: "Hidratación Constante con Agua",
      descripcion: "Consumir al menos 2 litros de agua potable al día. Evitar bebidas energizantes, gaseosas y jugos ultraprocesados de caja.",
      icono: Droplets,
    },
    {
      titulo: "Higiene del Sueño (8 a 9 horas)",
      descripcion: "Dormir lo suficiente es vital para el crecimiento, la memoria escolar y la recuperación neuromuscular.",
      icono: Moon,
    },
    {
      titulo: "Límite de Tiempo en Pantallas",
      descripcion: "Limitar el uso de celular y videojuegos a un máximo de 2 horas recreativas al día para reducir el sedentarismo.",
      icono: Activity,
    },
    {
      titulo: "Revisión y Seguimiento Periódico",
      descripcion: "Medir peso y talla al final de cada período académico para asegurar una curva de crecimiento saludable.",
      icono: Heart,
    },
  ],
};

export function TabNutricionAI({ onSave }: TabNutricionAIProps) {
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState(true); // Inicializado listo para mostrar directamente
  const [activeTab, setActiveTab] = useState<"nutricion" | "actividad" | "habitos">("nutricion");
  const [savedOk, setSavedOk] = useState(false);

  const handleGenerate = () => {
    setGenerating(true);
    setTimeout(() => {
      setGenerating(false);
      setGenerated(true);
    }, 1200);
  };

  const handleSave = () => {
    onSave();
    setSavedOk(true);
    setTimeout(() => setSavedOk(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  const plan = PLAN_DATA;

  return (
    <div className="animate-fade-in" style={{ display: "flex", gap: 24, alignItems: "flex-start" }}>

      {/* ─── PANEL LATERAL: CONFIGURACIÓN Y PERFIL ─── */}
      <div
        className="glass-elevated"
        style={{
          width: 310,
          flexShrink: 0,
          display: "flex",
          flexDirection: "column",
          gap: 18,
          padding: 22,
          borderRadius: 14,
          border: "1px solid rgba(255, 255, 255, 0.08)",
        }}
      >
        {/* Encabezado del módulo */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{
              width: 38,
              height: 38,
              borderRadius: 10,
              background: "rgba(34, 197, 94, 0.12)",
              border: "1px solid rgba(34, 197, 94, 0.25)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ShieldCheck size={20} color="var(--color-green)" />
          </div>
          <div>
            <h2 style={{ fontSize: "0.95rem", fontWeight: 700, letterSpacing: "-0.01em" }}>
              Orientación y Salud
            </h2>
            <p style={{ fontSize: "0.72rem", color: "var(--color-text-secondary)" }}>
              Guía de Hábitos & Actividad
            </p>
          </div>
        </div>

        <p style={{ fontSize: "0.78rem", color: "var(--color-text-secondary)", lineHeight: 1.6 }}>
          Asistente inteligente para la generación de pautas saludables y actividad física en entorno escolar y formativo.
        </p>

        {/* Búsqueda / Selección de Alumno */}
        <div>
          <Input label="Identificación / Código Estudiantil" defaultValue="1001234567" />
        </div>

        {/* Ficha Resumen del Estudiante */}
        <div
          style={{
            background: "rgba(255, 255, 255, 0.02)",
            border: "1px solid rgba(255, 255, 255, 0.06)",
            borderRadius: 10,
            padding: "14px 16px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
            <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--color-text-primary)" }}>
              {plan.perfil.nombre}
            </span>
            <span
              style={{
                fontSize: "0.68rem",
                padding: "2px 8px",
                borderRadius: 99,
                background: "rgba(34, 197, 94, 0.15)",
                color: "var(--color-green)",
                fontWeight: 600,
              }}
            >
              {plan.perfil.grado}
            </span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 6, fontSize: "0.75rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "var(--color-text-muted)" }}>Peso / Talla:</span>
              <span style={{ fontWeight: 600 }}>{plan.perfil.peso} · {plan.perfil.talla}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "var(--color-text-muted)" }}>Diagnóstico IMC:</span>
              <span style={{ fontWeight: 600, color: "var(--color-green)" }}>{plan.perfil.imc}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "var(--color-text-muted)" }}>Test Navette:</span>
              <span style={{ fontWeight: 600 }}>{plan.perfil.evaluacionFisica.navette.valor}</span>
            </div>
          </div>
        </div>

        {/* Selectores de configuración */}
        <Select label="Objetivo Pedagógico / Físico">
          <option>Hábitos Saludables y Condición General</option>
          <option>Acondicionamiento Físico Escolar</option>
          <option>Prevención de Sedentarismo (Pausas Activas)</option>
          <option>Rendimiento en Torneos Intercolegiados</option>
        </Select>

        <Select label="Nivel de Actividad en la Semana">
          <option>Moderado (Clases de educación física + recreación)</option>
          <option>Ligero (Mayormente sedentario fuera de clases)</option>
          <option>Activo (Entrenamientos extracurriculares 3+ días)</option>
        </Select>

        {/* Botón de Asistente Inteligente */}
        <button
          className="btn"
          style={{
            background: "rgba(34, 197, 94, 0.15)",
            border: "1px solid rgba(34, 197, 94, 0.35)",
            color: "var(--color-green-light)",
            justifyContent: "center",
            padding: "11px 16px",
            fontSize: "0.85rem",
            fontWeight: 600,
            borderRadius: 8,
            transition: "all 0.2s",
          }}
          onClick={handleGenerate}
          disabled={generating}
        >
          {generating ? (
            <>
              <RefreshCw size={15} style={{ animation: "spin 1s linear infinite" }} />
              Actualizando recomendaciones...
            </>
          ) : (
            <>
              <Sparkles size={15} />
              Reevaluar Pautas con Asistente
            </>
          )}
        </button>

        {/* Botones de acción */}
        <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
          <button
            className="btn btn-ghost"
            style={{
              flex: 1,
              justifyContent: "center",
              fontSize: "0.78rem",
              padding: "9px 12px",
              border: savedOk ? "1px solid var(--color-green)" : "1px solid rgba(255, 255, 255, 0.08)",
              color: savedOk ? "var(--color-green)" : "var(--color-text-secondary)",
            }}
            onClick={handleSave}
          >
            {savedOk ? (
              <><CheckCircle2 size={13} /> Guardado</>
            ) : (
              <><Save size={13} /> Guardar Ficha</>
            )}
          </button>

          <button
            className="btn btn-ghost"
            style={{
              flex: 1,
              justifyContent: "center",
              fontSize: "0.78rem",
              padding: "9px 12px",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              color: "var(--color-text-secondary)",
            }}
            onClick={handlePrint}
            title="Imprimir boletín escolar"
          >
            <Printer size={13} /> Imprimir
          </button>
        </div>
      </div>

      {/* ─── PANEL CENTRAL DE CONTENIDO ─── */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 18, minWidth: 0 }}>

        {/* Resumen Principal Superior */}
        <div
          className="glass-elevated"
          style={{
            padding: "20px 24px",
            borderRadius: 14,
            border: "1px solid rgba(255, 255, 255, 0.08)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 16,
          }}
        >
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
              <span
                style={{
                  display: "inline-block",
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: "var(--color-green)",
                }}
              />
              <h3 style={{ fontSize: "1rem", fontWeight: 700, letterSpacing: "-0.01em" }}>
                Guía de Bienestar & Rendimiento Integral
              </h3>
            </div>
            <p style={{ fontSize: "0.78rem", color: "var(--color-text-secondary)" }}>
              Enfoque pedagógico: <strong style={{ color: "var(--color-text-primary)" }}>{plan.perfil.objetivo}</strong> · Requerimiento estimado: <strong>~{plan.nutricion.calorias} kcal/día</strong>
            </p>
          </div>

          {/* Balance de Macronutrientes Limpio y Sobrio */}
          <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
            {plan.nutricion.distribucion.map((m) => (
              <div
                key={m.macro}
                style={{
                  padding: "8px 14px",
                  borderRadius: 8,
                  background: "rgba(255, 255, 255, 0.03)",
                  border: "1px solid rgba(255, 255, 255, 0.06)",
                  textAlign: "center",
                }}
              >
                <div style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--color-text-primary)" }}>
                  {m.pct}%
                </div>
                <div style={{ fontSize: "0.68rem", color: "var(--color-text-muted)", marginTop: 2 }}>
                  {m.macro.split(" ")[0]} ({m.gramos})
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pestañas de Navegación del Módulo */}
        <div
          style={{
            display: "flex",
            gap: 6,
            background: "rgba(255, 255, 255, 0.02)",
            padding: 4,
            borderRadius: 10,
            border: "1px solid rgba(255, 255, 255, 0.06)",
          }}
        >
          {[
            { id: "nutricion", label: "Horarios & Hábitos de Alimentación", icon: Heart },
            { id: "actividad", label: "Plan de Educación Física & Movimiento", icon: Dumbbell },
            { id: "habitos", label: "Pautas de Salud Escolar", icon: ShieldCheck },
          ].map((tab) => {
            const Icon = tab.icon;
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                style={{
                  flex: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                  padding: "10px 14px",
                  borderRadius: 8,
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.82rem",
                  fontWeight: isSelected ? 600 : 500,
                  background: isSelected ? "rgba(255, 255, 255, 0.08)" : "transparent",
                  color: isSelected ? "var(--color-text-primary)" : "var(--color-text-secondary)",
                  transition: "all 0.15s ease",
                }}
              >
                <Icon size={15} color={isSelected ? "var(--color-green)" : "currentColor"} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* ── SECCIÓN 1: ALIMENTACIÓN Y LONCHERA ── */}
        {activeTab === "nutricion" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {plan.nutricion.comidas.map((comida, idx) => (
              <div
                key={comida.momento}
                className="glass"
                style={{
                  padding: "16px 20px",
                  borderRadius: 12,
                  border: "1px solid rgba(255, 255, 255, 0.06)",
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                }}
              >
                {/* Cabecera de la comida */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 8 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div
                      style={{
                        width: 24,
                        height: 24,
                        borderRadius: "50%",
                        background: "rgba(255, 255, 255, 0.06)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "0.72rem",
                        fontWeight: 700,
                        color: "var(--color-text-muted)",
                      }}
                    >
                      {idx + 1}
                    </div>
                    <div>
                      <h4 style={{ fontSize: "0.88rem", fontWeight: 700 }}>
                        {comida.momento}
                      </h4>
                      <p style={{ fontSize: "0.72rem", color: "var(--color-text-secondary)" }}>
                        {comida.enfoque}
                      </p>
                    </div>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: "0.72rem", color: "var(--color-text-muted)" }}>
                      <Clock size={12} /> {comida.hora}
                    </span>
                    <span
                      style={{
                        padding: "3px 10px",
                        borderRadius: 6,
                        background: "rgba(255, 255, 255, 0.04)",
                        border: "1px solid rgba(255, 255, 255, 0.08)",
                        fontSize: "0.72rem",
                        fontWeight: 600,
                        color: "var(--color-text-secondary)",
                      }}
                    >
                      ~{comida.kcal} kcal
                    </span>
                  </div>
                </div>

                {/* Lista de alimentos sugeridos */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                    gap: "8px 16px",
                    background: "rgba(255, 255, 255, 0.01)",
                    padding: "10px 14px",
                    borderRadius: 8,
                    border: "1px solid rgba(255, 255, 255, 0.04)",
                  }}
                >
                  {comida.alimentos.map((alim, i) => (
                    <div
                      key={i}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: 8,
                        fontSize: "0.77rem",
                        color: "var(--color-text-secondary)",
                      }}
                    >
                      <ChevronRight size={13} color="var(--color-green)" style={{ flexShrink: 0, marginTop: 2 }} />
                      <span>{alim}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── SECCIÓN 2: PLAN DE EDUCACIÓN FÍSICA Y MOVIMIENTO ── */}
        {activeTab === "actividad" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div
              style={{
                padding: "12px 18px",
                borderRadius: 10,
                background: "rgba(34, 197, 94, 0.05)",
                border: "1px solid rgba(34, 197, 94, 0.15)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                fontSize: "0.78rem",
              }}
            >
              <span style={{ color: "var(--color-text-secondary)" }}>
                Frecuencia sugerida: <strong style={{ color: "var(--color-text-primary)" }}>{plan.actividadFisica.frecuencia}</strong>
              </span>
              <span style={{ color: "var(--color-green)", fontWeight: 600 }}>
                {plan.actividadFisica.enfoque}
              </span>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {plan.actividadFisica.sesiones.map((sesion, idx) => (
                <div
                  key={sesion.dia}
                  className="glass"
                  style={{
                    padding: "18px 20px",
                    borderRadius: 12,
                    border: "1px solid rgba(255, 255, 255, 0.06)",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                    <div>
                      <h4 style={{ fontSize: "0.88rem", fontWeight: 700 }}>
                        {sesion.dia}
                      </h4>
                      <p style={{ fontSize: "0.72rem", color: "var(--color-text-muted)" }}>
                        {sesion.categoria}
                      </p>
                    </div>
                    <span
                      style={{
                        padding: "3px 10px",
                        borderRadius: 6,
                        background: "rgba(255, 255, 255, 0.04)",
                        fontSize: "0.72rem",
                        fontWeight: 600,
                        color: "var(--color-text-secondary)",
                      }}
                    >
                      {sesion.duracion}
                    </span>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {sesion.actividades.map((act, i) => (
                      <div
                        key={i}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          padding: "8px 12px",
                          borderRadius: 6,
                          background: "rgba(255, 255, 255, 0.02)",
                          fontSize: "0.77rem",
                        }}
                      >
                        <span style={{ fontWeight: 600, color: "var(--color-text-primary)" }}>
                          {act.nombre}
                        </span>
                        <span style={{ color: "var(--color-text-muted)", fontSize: "0.73rem" }}>
                          {act.detalle}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── SECCIÓN 3: PAUTAS Y HÁBITOS DE SALUD ESCOLAR ── */}
        {activeTab === "habitos" && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            {plan.pautasSaludables.map((pauta) => {
              const Icon = pauta.icono;
              return (
                <div
                  key={pauta.titulo}
                  className="glass"
                  style={{
                    padding: "20px 22px",
                    borderRadius: 12,
                    border: "1px solid rgba(255, 255, 255, 0.06)",
                    display: "flex",
                    gap: 16,
                    alignItems: "flex-start",
                  }}
                >
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 10,
                      background: "rgba(255, 255, 255, 0.05)",
                      border: "1px solid rgba(255, 255, 255, 0.08)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <Icon size={18} color="var(--color-green)" />
                  </div>
                  <div>
                    <h4 style={{ fontSize: "0.85rem", fontWeight: 700, marginBottom: 6 }}>
                      {pauta.titulo}
                    </h4>
                    <p style={{ fontSize: "0.76rem", color: "var(--color-text-secondary)", lineHeight: 1.6 }}>
                      {pauta.descripcion}
                    </p>
                  </div>
                </div>
              );
            })}

            {/* Cuadro Institucional para el Docente / Orientador */}
            <div
              className="glass"
              style={{
                gridColumn: "1 / -1",
                padding: "18px 22px",
                borderRadius: 12,
                background: "rgba(34, 197, 94, 0.04)",
                border: "1px solid rgba(34, 197, 94, 0.18)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: 12,
              }}
            >
              <div>
                <h4 style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--color-green-light)", marginBottom: 4 }}>
                  Recomendación para el Docente / Instructor
                </h4>
                <p style={{ fontSize: "0.76rem", color: "var(--color-text-secondary)" }}>
                  Este informe puede ser socializado con los padres de familia y el departamento de bienestar escolar para dar seguimiento formativo.
                </p>
              </div>
              <button
                className="btn btn-ghost"
                style={{
                  fontSize: "0.76rem",
                  padding: "7px 14px",
                  border: "1px solid rgba(34, 197, 94, 0.3)",
                  color: "var(--color-green-light)",
                }}
                onClick={handlePrint}
              >
                <FileText size={14} /> Descargar Informe Escolar
              </button>
            </div>
          </div>
        )}

      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
