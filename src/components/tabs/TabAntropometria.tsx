// ─────────────────────────────────────────────────────────────
// TabAntropometria.tsx — Ficha Antropométrica y Evaluación Clínica
// Diseño espacioso, sin elementos pegados, alta legibilidad y semáforo OMS claro
// ─────────────────────────────────────────────────────────────
import React, { useState } from "react";
import {
  FileText,
  Save,
  Search,
  User,
  Ruler,
  Weight,
  HeartPulse,
  Activity,
  Printer,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Sparkles,
  Info,
  ChevronRight,
  TrendingUp,
} from "lucide-react";
import { Input } from "../ui/Input";
import { Select } from "../ui/Select";

interface TabAntropometriaProps {
  role: string;
  onSave: () => void;
}

type SubTab = "datos" | "perimetros" | "pliegues" | "clinico";

const SUB_TABS: { id: SubTab; label: string; icon: any; color: string }[] = [
  { id: "datos",      label: "Composición & IMC",        icon: Weight,     color: "#f59e0b" },
  { id: "perimetros", label: "Perímetros Corporales",     icon: Ruler,      color: "#06b6d4" },
  { id: "pliegues",   label: "Pliegues Cutáneos",        icon: Activity,   color: "#10b981" },
  { id: "clinico",    label: "Evaluación Médica",        icon: HeartPulse, color: "#8b5cf6" },
];

export function TabAntropometria({ role, onSave }: TabAntropometriaProps) {
  const [subTab, setSubTab] = useState<SubTab>("datos");
  const [savedOk, setSavedOk] = useState(false);

  // Estado para cálculo dinámico de IMC
  const [peso, setPeso] = useState("64.5");
  const [talla, setTalla] = useState("1.74");

  const pesoNum = parseFloat(peso);
  const tallaNum = parseFloat(talla);
  let imc = 0;
  if (pesoNum > 0 && tallaNum > 0) {
    imc = parseFloat((pesoNum / (tallaNum * tallaNum)).toFixed(1));
  }

  let imcClass = "Sin datos";
  let imcColor = "#cbd5e1";
  let imcBg = "rgba(255,255,255,0.06)";
  let imcDesc = "Ingresa estatura y peso para clasificar.";
  let imcPct = 50; // Para el marcador del espectro visual

  if (imc > 0) {
    if (imc < 18.5) {
      imcClass = "Bajo Peso";
      imcColor = "#3b82f6";
      imcBg = "rgba(59, 130, 246, 0.18)";
      imcDesc = "Por debajo del percentil de masa corporal. Requiere refuerzo nutricional.";
      imcPct = Math.min(Math.max(((imc - 14) / 4.5) * 25, 5), 23);
    } else if (imc < 25) {
      imcClass = "Rango Saludable (Normal) OMS";
      imcColor = "#10b981";
      imcBg = "rgba(16, 185, 129, 0.18)";
      imcDesc = "Composición corporal equilibrada y óptima para el rendimiento deportivo escolar.";
      imcPct = 25 + Math.min(Math.max(((imc - 18.5) / 6.5) * 25, 0), 24);
    } else if (imc < 30) {
      imcClass = "Sobrepeso Leve";
      imcColor = "#f59e0b";
      imcBg = "rgba(245, 158, 11, 0.18)";
      imcDesc = "Monitorear balance de ingesta calórica y aumentar actividad física semanal.";
      imcPct = 50 + Math.min(Math.max(((imc - 25) / 5) * 25, 0), 24);
    } else {
      imcClass = "Riesgo de Obesidad";
      imcColor = "#f43f5e";
      imcBg = "rgba(244, 63, 94, 0.18)";
      imcDesc = "Alerta preventiva escolar. Se recomienda valoración médica institucional.";
      imcPct = 75 + Math.min(Math.max(((imc - 30) / 10) * 25, 0), 23);
    }
  }

  const handleSave = () => {
    onSave();
    setSavedOk(true);
    setTimeout(() => setSavedOk(false), 2500);
  };

  return (
    <div className="animate-fade-in" style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {/* ── 1. FICHA OFICIAL & RESUMEN DEL APRENDIZ (Espacioso y con aire) ── */}
      <div
        className="glass-elevated"
        style={{
          padding: "26px 32px",
          borderRadius: 22,
          background: "linear-gradient(135deg, rgba(245, 158, 11, 0.1) 0%, rgba(16, 185, 129, 0.05) 50%, rgba(15, 23, 42, 0.98) 100%)",
          border: "1px solid rgba(245, 158, 11, 0.35)",
          boxShadow: "0 16px 40px rgba(0, 0, 0, 0.45)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 20,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 58,
              height: 58,
              borderRadius: 16,
              background: "linear-gradient(135deg, #f59e0b, #d97706)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#ffffff",
              boxShadow: "0 8px 24px rgba(245, 158, 11, 0.35)",
              flexShrink: 0,
            }}
          >
            <FileText size={28} />
          </div>

          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
              <h2 style={{ fontSize: "1.45rem", fontWeight: 800, color: "#ffffff", letterSpacing: "-0.02em" }}>
                Ficha Antropométrica Oficial
              </h2>
              <span
                style={{
                  fontSize: "0.82rem",
                  padding: "4px 12px",
                  borderRadius: 99,
                  background: "rgba(245, 158, 11, 0.2)",
                  color: "#fbbf24",
                  fontWeight: 800,
                  border: "1px solid rgba(245, 158, 11, 0.4)",
                }}
              >
                Protocolo OMS & ISAK
              </span>
            </div>
            <p style={{ fontSize: "0.94rem", color: "#e2e8f0", marginTop: 4, fontWeight: 500 }}>
              Estudiante: <strong style={{ color: "#ffffff" }}>Juan Camilo Rodríguez</strong> · Documento: <strong>1001234567</strong> · Grado 10° B
            </p>
          </div>
        </div>

        {/* Acciones Rápidas del Encabezado */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
          <button
            className="btn btn-secondary"
            onClick={() => window.print()}
            style={{ padding: "11px 18px", fontSize: "0.9rem", color: "#ffffff" }}
            title="Imprimir informe clínico oficial en PDF"
          >
            <Printer size={16} />
            <span>Imprimir Ficha PDF</span>
          </button>

          <button
            className="btn btn-primary"
            onClick={handleSave}
            style={{ padding: "11px 22px", fontSize: "0.92rem" }}
          >
            {savedOk ? <CheckCircle2 size={17} /> : <Save size={17} />}
            <span>{savedOk ? "✓ Ficha Guardada" : "Guardar Ficha Oficial"}</span>
          </button>
        </div>
      </div>

      {/* ── 2. SELECTOR DE SUB-PESTAÑAS CÓMODO Y AMPLIO (Botones claros con icono) ── */}
      <div
        style={{
          display: "flex",
          gap: 12,
          overflowX: "auto",
          paddingBottom: 4,
        }}
      >
        {SUB_TABS.map((t) => {
          const active = subTab === t.id;
          const Icon = t.icon;
          return (
            <button
              key={t.id}
              onClick={() => setSubTab(t.id)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "13px 22px",
                fontSize: "0.95rem",
                fontWeight: active ? 800 : 600,
                color: active ? "#ffffff" : "#cbd5e1",
                background: active ? `${t.color}25` : "rgba(255, 255, 255, 0.04)",
                border: "1px solid",
                borderColor: active ? t.color : "rgba(255, 255, 255, 0.1)",
                borderRadius: 14,
                boxShadow: active ? `0 4px 18px ${t.color}35` : "none",
                cursor: "pointer",
                transition: "all 0.2s ease",
                whiteSpace: "nowrap",
                fontFamily: "var(--font-sans)",
              }}
            >
              <Icon size={18} color={active ? t.color : "currentColor"} />
              <span>{t.label}</span>
            </button>
          );
        })}
      </div>

      {/* ── 3. CONTENIDO PRINCIPAL: ESPACIOSO, SIN APRETUJAR CAMPOS ── */}
      {subTab === "datos" && (
        <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1.4fr", gap: 26, alignItems: "stretch" }}>
          {/* Panel Izquierdo: Datos de la Sesión & Evaluador */}
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
            <div style={{ display: "flex", alignItems: "center", gap: 12, borderBottom: "1px solid rgba(255, 255, 255, 0.08)", paddingBottom: 16 }}>
              <div
                style={{
                  width: 42,
                  height: 42,
                  borderRadius: 12,
                  background: "rgba(59, 130, 246, 0.18)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#3b82f6",
                  border: "1px solid rgba(59, 130, 246, 0.35)",
                }}
              >
                <User size={22} />
              </div>
              <div>
                <h3 style={{ fontSize: "1.2rem", fontWeight: 800, color: "#ffffff" }}>
                  Datos Generales de la Valoración
                </h3>
                <p style={{ fontSize: "0.85rem", color: "#cbd5e1", marginTop: 2 }}>
                  Información administrativa y del evaluador responsable
                </p>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              <div>
                <Input label="Docente / Evaluador a Cargo" defaultValue="Prof. Walter Pinto" />
              </div>

              <div>
                <Input label="Fecha de Registro" type="date" defaultValue="2026-10-12" />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
                <div>
                  <Input label="Edad Registrada (Años)" type="number" min="5" max="30" defaultValue="16" />
                </div>
                <div>
                  <Select label="Sexo Biológico">
                    <option>Masculino</option>
                    <option>Femenino</option>
                  </Select>
                </div>
              </div>
            </div>
          </div>

          {/* Panel Derecho: Medición Física & Semáforo OMS (Sin cajas apretadas) */}
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
            <div style={{ display: "flex", alignItems: "center", gap: 12, borderBottom: "1px solid rgba(255, 255, 255, 0.08)", paddingBottom: 16 }}>
              <div
                style={{
                  width: 42,
                  height: 42,
                  borderRadius: 12,
                  background: "rgba(245, 158, 11, 0.18)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#f59e0b",
                  border: "1px solid rgba(245, 158, 11, 0.35)",
                }}
              >
                <Weight size={22} />
              </div>
              <div>
                <h3 style={{ fontSize: "1.2rem", fontWeight: 800, color: "#ffffff" }}>
                  Medición Corporal & Cálculo de IMC
                </h3>
                <p style={{ fontSize: "0.85rem", color: "#cbd5e1", marginTop: 2 }}>
                  Cálculo automático de masa corporal con diagnóstico OMS en tiempo real
                </p>
              </div>
            </div>

            {/* Fila de Medidas: Talla y Peso en bloques grandes */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
              <div>
                <label className="dp-label">Estatura / Talla (Metros)</label>
                <input
                  className="dp-input"
                  type="number"
                  step="0.01"
                  min="0.8"
                  max="2.5"
                  placeholder="Ej: 1.74"
                  value={talla}
                  onChange={(e) => setTalla(e.target.value)}
                  style={{ fontSize: "1.15rem", fontWeight: 800, color: "#ffffff" }}
                />
              </div>

              <div>
                <label className="dp-label">Peso Corporal (Kilogramos)</label>
                <input
                  className="dp-input"
                  type="number"
                  step="0.1"
                  min="20"
                  max="200"
                  placeholder="Ej: 64.5"
                  value={peso}
                  onChange={(e) => setPeso(e.target.value)}
                  style={{ fontSize: "1.15rem", fontWeight: 800, color: "#ffffff" }}
                />
              </div>
            </div>

            {/* Tarjeta de Diagnóstico Clínico de IMC (Semáforo Horizontal OMS Claro) */}
            <div
              style={{
                padding: "22px 24px",
                borderRadius: 16,
                background: "rgba(255, 255, 255, 0.04)",
                border: `1px solid ${imcColor}45`,
                boxShadow: `0 8px 24px ${imcColor}18`,
                display: "flex",
                flexDirection: "column",
                gap: 16,
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
                <div>
                  <span style={{ fontSize: "0.82rem", color: "#cbd5e1", textTransform: "uppercase", fontWeight: 700, letterSpacing: "0.05em" }}>
                    Índice de Masa Corporal Calculado
                  </span>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginTop: 4 }}>
                    <span style={{ fontSize: "2.8rem", fontWeight: 900, color: "#ffffff", lineHeight: 1 }}>
                      {imc > 0 ? imc : "--"}
                    </span>
                    <span style={{ fontSize: "1rem", color: "#cbd5e1", fontWeight: 600 }}>kg/m²</span>
                  </div>
                </div>

                <div
                  style={{
                    padding: "8px 18px",
                    borderRadius: 12,
                    background: imcBg,
                    border: `1px solid ${imcColor}66`,
                    color: imcColor,
                    fontSize: "0.95rem",
                    fontWeight: 800,
                  }}
                >
                  {imcClass}
                </div>
              </div>

              {/* Semáforo Gráfico Visual de la OMS (Clasificación Inmediata sin Dudas) */}
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.78rem", fontWeight: 700, marginBottom: 8 }}>
                  <span style={{ color: "#3b82f6" }}>Bajo Peso (&lt;18.5)</span>
                  <span style={{ color: "#10b981" }}>Saludable (18.5 - 24.9)</span>
                  <span style={{ color: "#f59e0b" }}>Sobrepeso (25 - 29.9)</span>
                  <span style={{ color: "#f43f5e" }}>Obesidad (&ge;30)</span>
                </div>

                {/* Barra segmentada */}
                <div style={{ position: "relative", height: 12, borderRadius: 99, background: "rgba(255, 255, 255, 0.08)", overflow: "hidden", display: "flex" }}>
                  <div style={{ width: "25%", background: "#3b82f6" }} title="Bajo Peso" />
                  <div style={{ width: "25%", background: "#10b981" }} title="Normal / Saludable" />
                  <div style={{ width: "25%", background: "#f59e0b" }} title="Sobrepeso" />
                  <div style={{ width: "25%", background: "#f43f5e" }} title="Obesidad" />
                </div>

                <p style={{ fontSize: "0.88rem", color: "#e2e8f0", marginTop: 10, lineHeight: 1.5, fontWeight: 500 }}>
                  {imcDesc}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── 4. SUB-PESTAÑA: PERÍMETROS CORPORALES (Espacioso y por Regiones) ── */}
      {subTab === "perimetros" && (
        <div className="glass-elevated" style={{ padding: "30px 34px", borderRadius: 22, display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid rgba(255, 255, 255, 0.08)", paddingBottom: 16 }}>
            <div>
              <h3 style={{ fontSize: "1.25rem", fontWeight: 800, color: "#ffffff" }}>
                Registro de Perímetros Corporales (ISAK)
              </h3>
              <p style={{ fontSize: "0.88rem", color: "#cbd5e1", marginTop: 2 }}>
                Medición con cinta métrica flexible en centímetros (cm)
              </p>
            </div>
            <span style={{ fontSize: "0.85rem", padding: "6px 14px", borderRadius: 10, background: "rgba(6, 182, 212, 0.15)", color: "#38bdf8", fontWeight: 700, border: "1px solid rgba(6, 182, 212, 0.3)" }}>
              Unidad: Centímetros (cm)
            </span>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20 }}>
            {[
              { reg: "Hombros / Biacromial", val: "104.5", desc: "Perímetro total superior" },
              { reg: "Tórax / Pecho", val: "88.0", desc: "Nivel de la 4ta costilla" },
              { reg: "Cintura Mínima", val: "72.5", desc: "Punto más estrecho del abdomen" },
              { reg: "Cadera Máxima", val: "94.0", desc: "Nivel de sínfisis púbica" },
              { reg: "Brazo Relajado", val: "27.5", desc: "Punto medio acromion-radial" },
              { reg: "Brazo Flexionado", val: "29.8", desc: "Máxima contracción bíceps" },
              { reg: "Muslo Superior", val: "52.0", desc: "Debajo del pliegue glúteo" },
              { reg: "Muslo Medio", val: "48.5", desc: "Punto medio trocánter-tibial" },
              { reg: "Pantorrilla Máxima", val: "34.0", desc: "Mayor circunferencia gemelos" },
            ].map((p, i) => (
              <div
                key={i}
                style={{
                  padding: "18px 20px",
                  borderRadius: 14,
                  background: "rgba(255, 255, 255, 0.04)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "0.92rem", fontWeight: 700, color: "#ffffff" }}>{p.reg}</span>
                  <span style={{ fontSize: "0.78rem", color: "#38bdf8", fontWeight: 700 }}>cm</span>
                </div>
                <input
                  className="dp-input"
                  type="number"
                  step="0.1"
                  defaultValue={p.val}
                  style={{ fontSize: "1.1rem", fontWeight: 800, color: "#ffffff" }}
                />
                <span style={{ fontSize: "0.78rem", color: "#cbd5e1" }}>{p.desc}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── 5. SUB-PESTAÑA: PLIEGUES CUTÁNEOS (Espacioso y con aire) ── */}
      {subTab === "pliegues" && (
        <div className="glass-elevated" style={{ padding: "30px 34px", borderRadius: 22, display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid rgba(255, 255, 255, 0.08)", paddingBottom: 16 }}>
            <div>
              <h3 style={{ fontSize: "1.25rem", fontWeight: 800, color: "#ffffff" }}>
                Grosor de Pliegues Cutáneos (Adipometría)
              </h3>
              <p style={{ fontSize: "0.88rem", color: "#cbd5e1", marginTop: 2 }}>
                Estimación de grasa subcutánea con plicómetro en milímetros (mm)
              </p>
            </div>
            <span style={{ fontSize: "0.85rem", padding: "6px 14px", borderRadius: 10, background: "rgba(16, 185, 129, 0.15)", color: "#34d399", fontWeight: 700, border: "1px solid rgba(16, 185, 129, 0.3)" }}>
              Unidad: Milímetros (mm)
            </span>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20 }}>
            {[
              { pliegue: "Pliegue Tricipital", val: "10.5", desc: "Cara posterior del brazo" },
              { pliegue: "Pliegue Bicipital", val: "5.0", desc: "Cara anterior sobre el bíceps" },
              { pliegue: "Pliegue Subescapular", val: "9.2", desc: "Ángulo inferior de la escápula" },
              { pliegue: "Pliegue Suprailiaco", val: "11.0", desc: "Sobre la cresta iliaca anterior" },
              { pliegue: "Pliegue Abdominal", val: "14.5", desc: "5 cm lateral al ombligo" },
              { pliegue: "Pliegue Muslo Anterior", val: "13.0", desc: "Punto medio eje femoral" },
              { pliegue: "Pliegue Pantorrilla Medial", val: "8.5", desc: "Cara interna del gemelo" },
            ].map((p, i) => (
              <div
                key={i}
                style={{
                  padding: "18px 20px",
                  borderRadius: 14,
                  background: "rgba(255, 255, 255, 0.04)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "0.92rem", fontWeight: 700, color: "#ffffff" }}>{p.pliegue}</span>
                  <span style={{ fontSize: "0.78rem", color: "#34d399", fontWeight: 700 }}>mm</span>
                </div>
                <input
                  className="dp-input"
                  type="number"
                  step="0.1"
                  defaultValue={p.val}
                  style={{ fontSize: "1.1rem", fontWeight: 800, color: "#ffffff" }}
                />
                <span style={{ fontSize: "0.78rem", color: "#cbd5e1" }}>{p.desc}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── 6. SUB-PESTAÑA: EVALUACIÓN MÉDICA & POSTURAL ── */}
      {subTab === "clinico" && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 26 }}>
          <div className="glass-elevated" style={{ padding: "28px 32px", borderRadius: 20, display: "flex", flexDirection: "column", gap: 20 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, borderBottom: "1px solid rgba(255, 255, 255, 0.08)", paddingBottom: 14 }}>
              <HeartPulse size={22} color="#8b5cf6" />
              <h3 style={{ fontSize: "1.2rem", fontWeight: 800, color: "#ffffff" }}>Signos Vitales & Capacidad</h3>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              <Input label="Presión Arterial en Reposo (mmHg)" defaultValue="115/75" />
              <Input label="Frecuencia Cardíaca en Reposo (ppm / bpm)" type="number" defaultValue="68" />
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
                <Input label="Capacidad Vital (Litros)" type="number" step="0.1" defaultValue="4.2" />
                <Input label="Saturación de Oxígeno O2 (%)" type="number" defaultValue="98" />
              </div>
            </div>
          </div>

          <div className="glass-elevated" style={{ padding: "28px 32px", borderRadius: 20, display: "flex", flexDirection: "column", gap: 20 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, borderBottom: "1px solid rgba(255, 255, 255, 0.08)", paddingBottom: 14 }}>
              <ShieldCheck size={22} color="#10b981" />
              <h3 style={{ fontSize: "1.2rem", fontWeight: 800, color: "#ffffff" }}>Postura & Recomendaciones</h3>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
                <Select label="Evaluación de Escoliosis">
                  <option>Normal / Sin Desviación</option>
                  <option>Leve (Monitoreo)</option>
                  <option>Moderada (Remitir)</option>
                </Select>
                <Select label="Apoyo Plantar (Pisada)">
                  <option>Neutro / Normal</option>
                  <option>Pie Plano</option>
                  <option>Pie Cavo</option>
                </Select>
              </div>
              <div>
                <label className="dp-label">Concepto Pedagógico / Clínico para el Docente</label>
                <textarea
                  className="dp-input"
                  rows={4}
                  defaultValue="Estudiante apto para actividades deportivas regulares y pruebas de acondicionamiento físico escolar sin contraindicaciones."
                  style={{ resize: "vertical", minHeight: 90 }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
