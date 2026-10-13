// ─────────────────────────────────────────────────────────────
// TabAntropometria.tsx — Ficha Antropométrica y Evaluación Clínica
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
} from "lucide-react";
import { Input } from "../ui/Input";
import { Select } from "../ui/Select";

interface TabAntropometriaProps {
  role: string;
  onSave: () => void;
}

type SubTab = "datos" | "perimetros" | "pliegues" | "clinico";

const SUB_TABS: { id: SubTab; label: string }[] = [
  { id: "datos",      label: "Composición & IMC" },
  { id: "perimetros", label: "Perímetros Corporales" },
  { id: "pliegues",   label: "Pliegues Cutáneos" },
  { id: "clinico",    label: "Evaluación Médica" },
];

export function TabAntropometria({ role, onSave }: TabAntropometriaProps) {
  const [subTab, setSubTab] = useState<SubTab>("datos");

  // Estado para cálculo de IMC
  const [peso, setPeso] = useState("64.5");
  const [talla, setTalla] = useState("1.74");

  const pesoNum = parseFloat(peso);
  const tallaNum = parseFloat(talla);
  let imc = 0;
  if (pesoNum > 0 && tallaNum > 0) {
    imc = parseFloat((pesoNum / (tallaNum * tallaNum)).toFixed(1));
  }

  let imcClass = "Sin datos";
  let imcColor = "var(--color-text-muted)";
  let imcBg = "rgba(255,255,255,0.05)";

  if (imc > 0) {
    if (imc < 18.5) {
      imcClass = "Bajo Peso";
      imcColor = "var(--color-blue)";
      imcBg = "rgba(59, 130, 246, 0.15)";
    } else if (imc < 25) {
      imcClass = "Rango Saludable (Normal)";
      imcColor = "var(--color-green)";
      imcBg = "rgba(16, 185, 129, 0.15)";
    } else if (imc < 30) {
      imcClass = "Sobrepeso";
      imcColor = "var(--color-amber)";
      imcBg = "rgba(245, 158, 11, 0.15)";
    } else {
      imcClass = "Obesidad";
      imcColor = "var(--color-rose)";
      imcBg = "rgba(244, 63, 94, 0.15)";
    }
  }

  // Tarjeta de sección interna
  const MetricCard = ({ label, icon: Icon, children }: any) => (
    <div
      style={{
        background: "rgba(255,255,255,0.02)",
        border: "1px solid rgba(255,255,255,0.06)",
        borderRadius: 14,
        padding: "20px 22px",
        display: "flex",
        flexDirection: "column",
        gap: 16,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div
          style={{
            width: 30,
            height: 30,
            borderRadius: 8,
            background: "rgba(255, 255, 255, 0.04)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "var(--color-green)",
          }}
        >
          <Icon size={15} />
        </div>
        <span style={{ fontSize: "0.84rem", fontWeight: 700, color: "var(--color-text-primary)" }}>
          {label}
        </span>
      </div>
      {children}
    </div>
  );

  return (
    <div className="animate-fade-in glass-elevated" style={{ overflow: "hidden", borderRadius: 16 }}>
      {/* Cabecera de la ficha */}
      <div
        style={{
          padding: "24px 32px",
          borderBottom: "1px solid var(--color-border)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 16,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: 10,
              background: "rgba(16, 185, 129, 0.1)",
              border: "1px solid rgba(16, 185, 129, 0.25)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--color-green)",
            }}
          >
            <FileText size={20} />
          </div>
          <div>
            <h2 style={{ fontSize: "1.1rem", fontWeight: 700, letterSpacing: "-0.01em" }}>
              Ficha Antropométrica Oficial
            </h2>
            <p style={{ fontSize: "0.74rem", color: "var(--color-text-secondary)" }}>
              Protocolo de medición física y clasificación según estándares OMS
            </p>
          </div>
        </div>

        {role === "ENTRENADOR" && (
          <div
            className="no-print"
            style={{
              display: "flex",
              alignItems: "flex-end",
              gap: 10,
              flexWrap: "wrap",
            }}
          >
            <div style={{ width: 170 }}>
              <Input label="ID Aprendiz" placeholder="Buscar ID..." defaultValue="1001234567" />
            </div>
            <button className="btn btn-secondary" style={{ padding: "9px 14px", fontSize: "0.78rem" }}>
              <Search size={13} /> Buscar
            </button>
            <button
              className="btn btn-ghost"
              onClick={() => window.print()}
              style={{ padding: "9px 14px", fontSize: "0.78rem" }}
              title="Imprimir informe clínico oficial"
            >
              <Printer size={13} /> Imprimir / PDF
            </button>
          </div>
        )}
      </div>

      {/* Navegación por Sub-pestañas */}
      <div
        className="no-print"
        style={{
          display: "flex",
          padding: "12px 32px",
          gap: 6,
          background: "rgba(0, 0, 0, 0.15)",
          borderBottom: "1px solid var(--color-border)",
          overflowX: "auto",
        }}
      >
        {SUB_TABS.map((t) => {
          const active = subTab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setSubTab(t.id)}
              style={{
                padding: "8px 16px",
                fontSize: "0.78rem",
                fontWeight: active ? 600 : 500,
                color: active ? "#ffffff" : "var(--color-text-secondary)",
                background: active ? "rgba(255, 255, 255, 0.08)" : "transparent",
                border: "1px solid",
                borderColor: active ? "rgba(255, 255, 255, 0.12)" : "transparent",
                borderRadius: 8,
                cursor: "pointer",
                transition: "all 0.15s ease",
                whiteSpace: "nowrap",
              }}
            >
              {t.label}
            </button>
          );
        })}
      </div>

      {/* Área de Contenido */}
      <div style={{ padding: "32px", minHeight: 380 }}>
        {subTab === "datos" && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, maxWidth: 940, margin: "0 auto" }}>
            <MetricCard label="Datos Generales de la Valoración" icon={User}>
              <Input label="Docente / Evaluador a Cargo" defaultValue="Prof. Walter Pinto" />
              <Input label="Fecha de Registro" type="date" defaultValue="2026-10-12" />
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                <Input label="Edad Registrada" type="number" min="0" defaultValue="16" />
                <Select label="Sexo Biológico">
                  <option>Masculino</option>
                  <option>Femenino</option>
                </Select>
              </div>
            </MetricCard>

            <MetricCard label="Medición y Análisis de IMC" icon={Weight}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                <Input
                  label="Estatura / Talla (m)"
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="Ej: 1.74"
                  value={talla}
                  onChange={(e) => setTalla(e.target.value)}
                />
                <Input
                  label="Peso Corporal (kg)"
                  type="number"
                  min="0"
                  step="0.1"
                  placeholder="Ej: 64.5"
                  value={peso}
                  onChange={(e) => setPeso(e.target.value)}
                />
              </div>

              {/* Indicador Clínico de IMC */}
              <div
                style={{
                  marginTop: 6,
                  padding: "16px 20px",
                  borderRadius: 12,
                  background: "rgba(255, 255, 255, 0.02)",
                  border: "1px solid rgba(255, 255, 255, 0.06)",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <p style={{ fontSize: "0.68rem", color: "var(--color-text-muted)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em" }}>
                    Índice de Masa Corporal (IMC)
                  </p>
                  <p style={{ fontSize: "2.1rem", fontWeight: 800, color: "#ffffff", lineHeight: 1.1, marginTop: 4 }}>
                    {imc > 0 ? imc : "--"}
                  </p>
                </div>
                <div
                  style={{
                    padding: "6px 14px",
                    background: imcBg,
                    color: imcColor,
                    borderRadius: 8,
                    fontSize: "0.78rem",
                    fontWeight: 700,
                    border: `1px solid ${imcColor}33`,
                  }}
                >
                  {imcClass}
                </div>
              </div>
            </MetricCard>
          </div>
        )}

        {subTab === "perimetros" && (
          <div style={{ maxWidth: 940, margin: "0 auto" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <p style={{ fontSize: "0.82rem", color: "var(--color-text-secondary)", display: "flex", alignItems: "center", gap: 8 }}>
                <Ruler size={15} color="var(--color-green)" /> Medidas registradas en centímetros (cm)
              </p>
              <div style={{ width: 160 }}>
                <Input label="Fecha de Toma" type="date" defaultValue="2026-10-12" />
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(210px, 1fr))", gap: "16px 20px" }}>
              {["Hombros", "Tórax / Pecho", "Cintura", "Cadera", "Brazo Relajado", "Brazo Flexionado", "Muslo Superior", "Muslo Medio", "Pantorrilla"].map(
                (m) => (
                  <div key={m} style={{ position: "relative" }}>
                    <Input label={m} type="number" min="0" step="0.1" placeholder="0.0" defaultValue="75.0" />
                    <div style={{ position: "absolute", right: 12, top: 34, fontSize: "0.7rem", color: "var(--color-text-muted)", fontWeight: 600 }}>
                      cm
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        )}

        {subTab === "pliegues" && (
          <div style={{ maxWidth: 940, margin: "0 auto" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <p style={{ fontSize: "0.82rem", color: "var(--color-text-secondary)", display: "flex", alignItems: "center", gap: 8 }}>
                <Activity size={15} color="var(--color-green)" /> Grosor de tejido adiposo en milímetros (mm)
              </p>
              <div style={{ width: 160 }}>
                <Input label="Fecha de Toma" type="date" defaultValue="2026-10-12" />
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(210px, 1fr))", gap: "16px 20px" }}>
              {["Bicipital", "Tricipital", "Subescapular", "Suprailiaco", "Abdominal", "Muslo Anterior", "Pantorrilla Medial"].map(
                (m) => (
                  <div key={m} style={{ position: "relative" }}>
                    <Input label={m} type="number" min="0" step="0.1" placeholder="0.0" defaultValue="12.0" />
                    <div style={{ position: "absolute", right: 12, top: 34, fontSize: "0.7rem", color: "var(--color-text-muted)", fontWeight: 600 }}>
                      mm
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        )}

        {subTab === "clinico" && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, maxWidth: 940, margin: "0 auto" }}>
            <MetricCard label="Signos Vitales y Capacidad" icon={HeartPulse}>
              <Input label="Presión Arterial (mmHg)" placeholder="Ej: 118/78" defaultValue="115/75" />
              <Input label="Frecuencia Cardíaca en Reposo (bpm)" type="number" min="0" placeholder="Ej: 68" defaultValue="68" />
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                <Input label="Capacidad Vital (L)" type="number" min="0" step="0.1" defaultValue="4.2" />
                <Input label="Saturación O2 (%)" type="number" min="0" max="100" defaultValue="98" />
              </div>
            </MetricCard>

            <MetricCard label="Observaciones y Postura" icon={ShieldCheck}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                <Select label="Evaluación Escoliosis">
                  <option>Normal / Sin Desviación</option>
                  <option>Leve</option>
                  <option>Moderada</option>
                </Select>
                <Select label="Apoyo Plantar (Pie)">
                  <option>Normal (Neutro)</option>
                  <option>Pie Plano</option>
                  <option>Pie Cavo</option>
                </Select>
              </div>
              <Input label="Recomendaciones Médicas / Formativas" defaultValue="Apto para actividad deportiva competitiva sin restricciones." />
            </MetricCard>
          </div>
        )}
      </div>

      {/* Pie de guardado */}
      <div
        className="no-print"
        style={{
          padding: "20px 32px",
          borderTop: "1px solid var(--color-border)",
          display: "flex",
          justifyContent: "flex-end",
          background: "rgba(0, 0, 0, 0.15)",
        }}
      >
        <button
          className="btn btn-primary"
          onClick={onSave}
          style={{ padding: "11px 24px" }}
        >
          <Save size={15} />
          Guardar Ficha Oficial
        </button>
      </div>
    </div>
  );
}
