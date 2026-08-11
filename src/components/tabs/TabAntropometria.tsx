// ─────────────────────────────────────────────
// Tab: Ficha Antropométrica
// ─────────────────────────────────────────────
import React, { useState } from "react";
import { FileText, Save, Search } from "lucide-react";
import { Input } from "../ui/Input";
import { Select } from "../ui/Select";

interface TabAntropometriaProps {
  role: string;
  onSave: () => void;
}

type SubTab = "datos" | "perimetros" | "pliegues" | "clinico";

const SUB_TABS: { id: SubTab; label: string; color: string }[] = [
  { id: "datos",      label: "Datos Básicos",     color: "var(--color-teal)" },
  { id: "perimetros", label: "Perímetros",         color: "var(--color-blue)" },
  { id: "pliegues",   label: "Pliegues",           color: "var(--color-amber)" },
  { id: "clinico",    label: "Análisis Clínico",   color: "var(--color-rose)" },
];

export function TabAntropometria({ role, onSave }: TabAntropometriaProps) {
  const [subTab, setSubTab] = useState<SubTab>("datos");

  return (
    <div className="animate-fade-in glass-elevated" style={{ overflow: "hidden" }}>
      {/* Header */}
      <div style={{ padding: "24px 32px", borderBottom: "1px solid var(--color-border)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 38, height: 38, borderRadius: 10, background: "rgba(20,184,166,0.15)", border: "1px solid rgba(20,184,166,0.3)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <FileText size={18} color="var(--color-teal)" />
          </div>
          <div>
            <h2 style={{ fontSize: "1rem", fontWeight: 700 }}>Ficha Antropométrica</h2>
            <p style={{ fontSize: "0.72rem", color: "var(--color-text-secondary)", marginTop: 2 }}>Registro y seguimiento de medidas corporales.</p>
          </div>
        </div>
        {role === "ENTRENADOR" && (
          <div style={{ display: "flex", alignItems: "flex-end", gap: 10, flexWrap: "wrap" }}>
            <Input label="Documento Aprendiz" placeholder="ID..." style={{ width: 160 }} />
            <button className="btn btn-secondary" style={{ marginBottom: 0 }}>
              <Search size={14} /> Buscar
            </button>
            <Input label="Nombre Completo" placeholder="—" readOnly style={{ width: 200 }} />
          </div>
        )}
      </div>

      {/* Sub-tabs */}
      <div style={{ display: "flex", borderBottom: "1px solid var(--color-border)", padding: "0 32px", gap: 4, overflowX: "auto" }}>
        {SUB_TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setSubTab(t.id)}
            style={{
              padding: "12px 18px",
              fontSize: "0.8rem",
              fontWeight: subTab === t.id ? 700 : 500,
              fontFamily: "var(--font-sans)",
              color: subTab === t.id ? t.color : "var(--color-text-muted)",
              background: "transparent",
              border: "none",
              borderBottom: `2px solid ${subTab === t.id ? t.color : "transparent"}`,
              cursor: "pointer",
              transition: "all 0.2s",
              whiteSpace: "nowrap",
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div style={{ padding: 32 }}>
        {subTab === "datos" && (
          <div style={{ maxWidth: 600, margin: "0 auto" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
              <p className="section-title" style={{ marginBottom: 0 }}>Datos Básicos y Evaluador</p>
              <Input label="Fecha" type="date" style={{ width: 160 }} />
            </div>
            <div style={{ display: "grid", gap: 16 }}>
              <Input label="Evaluador" placeholder="Nombre del entrenador" />
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
                <Input label="Edad (años)" type="number" placeholder="—" />
                <Input label="Talla (m)" type="number" step="0.01" placeholder="1.70" />
                <Input label="Peso (kg)" type="number" step="0.1" placeholder="68.5" />
              </div>
              <div style={{ padding: 16, borderRadius: 12, background: "rgba(20,184,166,0.06)", border: "1px solid rgba(20,184,166,0.15)", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <div>
                  <p style={{ fontSize: "0.7rem", color: "var(--color-text-muted)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 4 }}>IMC Calculado</p>
                  <p style={{ fontSize: "1.8rem", fontWeight: 800, color: "var(--color-teal)" }}>—</p>
                </div>
                <div>
                  <p style={{ fontSize: "0.7rem", color: "var(--color-text-muted)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 4 }}>Clasificación</p>
                  <p style={{ fontSize: "1rem", fontWeight: 700, color: "var(--color-text-secondary)" }}>Ingrese datos</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {subTab === "perimetros" && (
          <div>
            <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 20 }}>
              <Input label="Fecha" type="date" style={{ width: 160 }} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 16 }}>
              {["Hombro", "Cadera", "Tórax", "Muslo Superior", "Brazo Derecho", "Muslo Medio", "Brazo Izquierdo", "Muslo Inferior", "Cintura", "Pierna"].map(
                (m) => <Input key={m} label={`${m} (cm)`} type="number" placeholder="—" />
              )}
            </div>
          </div>
        )}

        {subTab === "pliegues" && (
          <div>
            <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 20 }}>
              <Input label="Fecha" type="date" style={{ width: 160 }} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 16 }}>
              {["Bicipital", "Tricipital", "Subescapular", "Suprailiaco", "Abdominal", "Muslo", "Pantorrilla"].map(
                (m) => <Input key={m} label={`${m} (mm)`} type="number" placeholder="—" />
              )}
            </div>
          </div>
        )}

        {subTab === "clinico" && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
            <div>
              <p className="section-title">Signos Vitales e Índices</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <Input label="Tensión Arterial" placeholder="Ej: 120/80 mmHg" />
                <Input label="Frecuencia Cardíaca" type="number" placeholder="Ej: 72 bpm" />
                <Input label="Peso Ideal (kg)" type="number" />
                <Input label="Índice de Obesidad" type="number" />
              </div>
            </div>
            <div>
              <p className="section-title">Evaluación Postural</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <Input label="Escoliosis" placeholder="Normal / Leve / Moderada..." />
                <Input label="Cifosis" placeholder="Normal / Leve / Moderada..." />
                <Input label="Lordosis" placeholder="Normal / Leve / Moderada..." />
                <Input label="Observaciones" placeholder="Notas adicionales..." />
              </div>
            </div>
          </div>
        )}

        <div style={{ marginTop: 32, paddingTop: 24, borderTop: "1px solid var(--color-border)", display: "flex", justifyContent: "flex-end" }}>
          <button className="btn btn-primary" style={{ background: "linear-gradient(135deg, #0d9488, #14b8a6)", boxShadow: "0 4px 12px rgba(20,184,166,0.3)" }} onClick={onSave}>
            <Save size={15} />
            Guardar Ficha
          </button>
        </div>
      </div>
    </div>
  );
}
