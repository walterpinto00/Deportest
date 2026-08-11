// ─────────────────────────────────────────────
// Tab: Ficha Antropométrica
// ─────────────────────────────────────────────
import React, { useState } from "react";
import { FileText, Save, Search, User, Ruler, Weight, HeartPulse, Activity } from "lucide-react";
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

  // Decorator Card Component
  const MetricCard = ({ label, icon: Icon, color, children }: any) => (
    <div style={{
      background: "rgba(255,255,255,0.02)",
      border: "1px solid rgba(255,255,255,0.05)",
      borderRadius: 16,
      padding: 20,
      display: "flex",
      flexDirection: "column",
      gap: 16
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ width: 32, height: 32, borderRadius: 8, background: `color-mix(in srgb, ${color} 15%, transparent)`, display: "flex", alignItems: "center", justifyContent: "center", color }}>
          <Icon size={16} />
        </div>
        <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--color-text-primary)" }}>{label}</span>
      </div>
      {children}
    </div>
  );

  return (
    <div className="animate-fade-in glass-elevated" style={{ overflow: "hidden", borderRadius: 24 }}>
      {/* Header Premium */}
      <div style={{ padding: "32px 40px", borderBottom: "1px solid rgba(255,255,255,0.06)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16, background: "rgba(0,0,0,0.2)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ width: 48, height: 48, borderRadius: 14, background: "linear-gradient(135deg, rgba(20,184,166,0.2), rgba(20,184,166,0.05))", border: "1px solid rgba(20,184,166,0.4)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 8px 24px rgba(20,184,166,0.2)" }}>
            <FileText size={24} color="var(--color-teal)" />
          </div>
          <div>
            <h2 style={{ fontSize: "1.25rem", fontWeight: 800, letterSpacing: "-0.02em" }}>Ficha Antropométrica</h2>
            <p style={{ fontSize: "0.8rem", color: "var(--color-text-secondary)", marginTop: 2 }}>Dashboard clínico de mediciones corporales</p>
          </div>
        </div>
        {role === "ENTRENADOR" && (
          <div style={{ display: "flex", alignItems: "flex-end", gap: 12, flexWrap: "wrap", background: "rgba(255,255,255,0.03)", padding: "12px 20px", borderRadius: 16, border: "1px solid rgba(255,255,255,0.05)" }}>
            <Input label="Documento del Aprendiz" placeholder="Buscar ID..." style={{ width: 180, background: "rgba(0,0,0,0.2)" }} />
            <button className="btn btn-secondary" style={{ marginBottom: 0, padding: "10px 16px" }}>
              <Search size={14} /> Buscar
            </button>
            <div style={{ width: 1, height: 40, background: "rgba(255,255,255,0.1)", margin: "0 8px" }} />
            <Input label="Paciente" placeholder="—" readOnly style={{ width: 200, opacity: 0.7 }} />
          </div>
        )}
      </div>

      {/* Navegación de Pestañas con estilo Píldora */}
      <div style={{ display: "flex", padding: "20px 40px", gap: 8, overflowX: "auto", background: "rgba(0,0,0,0.1)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        {SUB_TABS.map((t) => {
          const active = subTab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setSubTab(t.id)}
              style={{
                padding: "8px 16px",
                fontSize: "0.8rem",
                fontWeight: active ? 700 : 500,
                color: active ? "#fff" : "var(--color-text-muted)",
                background: active ? t.color : "transparent",
                border: "none",
                borderRadius: 20,
                cursor: "pointer",
                transition: "all 0.2s",
                whiteSpace: "nowrap",
                boxShadow: active ? `0 4px 12px color-mix(in srgb, ${t.color} 40%, transparent)` : "none",
              }}
            >
              {t.label}
            </button>
          );
        })}
      </div>

      {/* Content Area */}
      <div style={{ padding: 40, minHeight: 400 }}>
        {subTab === "datos" && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32, maxWidth: 900, margin: "0 auto" }}>
            <MetricCard label="Información General" icon={User} color="var(--color-teal)">
              <Input label="Evaluador a Cargo" placeholder="Nombre del entrenador" />
              <Input label="Fecha de Evaluación" type="date" />
            </MetricCard>

            <MetricCard label="Composición Básica" icon={Weight} color="var(--color-green)">
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <Input label="Edad (años)" type="number" placeholder="—" />
                <Input label="Talla (m)" type="number" step="0.01" placeholder="1.70" />
              </div>
              <Input label="Peso Total (kg)" type="number" step="0.1" placeholder="68.5" />
              
              <div style={{ marginTop: 8, padding: 16, borderRadius: 12, background: "linear-gradient(135deg, rgba(20,184,166,0.1), rgba(20,184,166,0.02))", border: "1px solid rgba(20,184,166,0.2)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <p style={{ fontSize: "0.7rem", color: "var(--color-teal)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>Índice de Masa Corporal</p>
                  <p style={{ fontSize: "2rem", fontWeight: 900, color: "#fff", lineHeight: 1 }}>24.5</p>
                </div>
                <div style={{ padding: "6px 12px", background: "rgba(34,197,94,0.2)", color: "var(--color-green)", borderRadius: 8, fontSize: "0.75rem", fontWeight: 700 }}>
                  Peso Normal
                </div>
              </div>
            </MetricCard>
          </div>
        )}

        {subTab === "perimetros" && (
          <div style={{ maxWidth: 900, margin: "0 auto" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
              <p style={{ fontSize: "0.9rem", color: "var(--color-text-secondary)", display: "flex", alignItems: "center", gap: 8 }}><Ruler size={16} /> Medidas en centímetros (cm)</p>
              <Input label="Fecha Medición" type="date" style={{ width: 160 }} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "20px 24px" }}>
              {["Hombro", "Tórax", "Cintura", "Cadera", "Brazo Derecho", "Brazo Izquierdo", "Muslo Superior", "Muslo Medio", "Muslo Inferior", "Pierna"].map(
                (m) => (
                  <div key={m} style={{ position: "relative" }}>
                    <Input label={m} type="number" placeholder="0.0" />
                    <div style={{ position: "absolute", right: 12, top: 38, fontSize: "0.7rem", color: "var(--color-text-muted)", fontWeight: 600 }}>cm</div>
                  </div>
                )
              )}
            </div>
          </div>
        )}

        {subTab === "pliegues" && (
          <div style={{ maxWidth: 900, margin: "0 auto" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
              <p style={{ fontSize: "0.9rem", color: "var(--color-text-secondary)", display: "flex", alignItems: "center", gap: 8 }}><Activity size={16} /> Adiposidad en milímetros (mm)</p>
              <Input label="Fecha Medición" type="date" style={{ width: 160 }} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "20px 24px" }}>
              {["Bicipital", "Tricipital", "Subescapular", "Suprailiaco", "Abdominal", "Muslo", "Pantorrilla"].map(
                (m) => (
                  <div key={m} style={{ position: "relative" }}>
                    <Input label={m} type="number" placeholder="0.0" />
                    <div style={{ position: "absolute", right: 12, top: 38, fontSize: "0.7rem", color: "var(--color-text-muted)", fontWeight: 600 }}>mm</div>
                  </div>
                )
              )}
            </div>
          </div>
        )}

        {subTab === "clinico" && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32, maxWidth: 900, margin: "0 auto" }}>
            <MetricCard label="Signos Vitales e Índices" icon={HeartPulse} color="var(--color-rose)">
              <Input label="Tensión Arterial (mmHg)" placeholder="Ej: 120/80" />
              <Input label="Frecuencia Cardíaca (bpm)" type="number" placeholder="Ej: 72" />
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <Input label="Peso Ideal (kg)" type="number" />
                <Input label="Índ. Obesidad" type="number" />
              </div>
            </MetricCard>

            <MetricCard label="Evaluación Postural" icon={Activity} color="var(--color-purple)">
              <Select label="Escoliosis">
                <option>Normal</option><option>Leve</option><option>Moderada</option><option>Severa</option>
              </Select>
              <Select label="Cifosis">
                <option>Normal</option><option>Leve</option><option>Moderada</option><option>Severa</option>
              </Select>
              <Select label="Lordosis">
                <option>Normal</option><option>Leve</option><option>Moderada</option><option>Severa</option>
              </Select>
              <Input label="Observaciones Médicas" placeholder="Notas adicionales..." />
            </MetricCard>
          </div>
        )}
      </div>

      {/* Footer Action */}
      <div style={{ padding: "24px 40px", borderTop: "1px solid rgba(255,255,255,0.05)", display: "flex", justifyContent: "flex-end", background: "rgba(0,0,0,0.2)" }}>
        <button 
          className="btn btn-primary" 
          onClick={onSave}
          style={{ 
            padding: "14px 28px", 
            fontSize: "0.95rem",
            background: "linear-gradient(135deg, #0d9488, #0f766e)", 
            boxShadow: "0 8px 24px rgba(13,148,136,0.3)",
            border: "none",
            borderRadius: 12
          }}
        >
          <Save size={18} />
          Guardar Registro Médico
        </button>
      </div>
    </div>
  );
}
