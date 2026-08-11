// ─────────────────────────────────────────────
// Tab: Pruebas Físicas
// ─────────────────────────────────────────────
import React, { useState } from "react";
import { Activity, Dumbbell, Save, Info } from "lucide-react";
import { Input } from "../ui/Input";

interface TabPruebasProps {
  role: string;
  onSave: () => void;
}

const TESTS: Record<string, { title: string; desc: string; icon: any; color: string; unit: string; details: string[] }> = {
  cooper:      { title: "Test de Cooper (12 min)", icon: Activity, color: "var(--color-rose)", unit: "metros recorridos", desc: "Prueba de resistencia aeróbica. Recorre la mayor distancia posible en 12 minutos a velocidad constante.", details: ["Mide el VO2 máximo (consumo de oxígeno).", "Realizar en pista plana de 400m.", "Anotar la distancia en metros recorridos."] },
  ruffier:     { title: "Test de Ruffier-Dickson", icon: Activity, color: "var(--color-amber)", unit: "índice calculado", desc: "Mide la adaptación y recuperación cardiovascular tras esfuerzo corto e intenso.", details: ["Pulsaciones en reposo 1 min (P1).", "30 sentadillas en 45 s y tomar pulso (P2).", "Descansar 1 min y tomar pulso (P3).", "Fórmula: (P1+P2+P3-200)/10."] },
  velocidad:   { title: "Velocidad 50 metros", icon: Activity, color: "var(--color-blue)", unit: "segundos", desc: "Mide la velocidad de desplazamiento en 50 m partiendo desde posición de pie.", details: ["Superficie plana y antideslizante.", "Cronómetro que inicia al '¡Ya!'", "Anotar tiempo exacto en segundos."] },
  flexiones:   { title: "Fuerza – Flexiones", icon: Dumbbell, color: "var(--color-green)", unit: "repeticiones", desc: "Evalúa la fuerza resistencia de brazos, pectorales y zona media.", details: ["Máximas flexiones en 1 minuto.", "Cuerpo recto, codos a 90° en el descenso.", "Mujeres pueden apoyar rodillas."] },
  salto_largo: { title: "Salto Largo sin Impulso", icon: Activity, color: "var(--color-purple)", unit: "centímetros", desc: "Mide la fuerza explosiva de los miembros inferiores.", details: ["Pies a la anchura de hombros.", "Flexionar rodillas y balancear brazos.", "Medir desde la línea al talón más atrasado."] },
  abdominales: { title: "Abdominales (1 min)", icon: Activity, color: "var(--color-teal)", unit: "repeticiones", desc: "Mide la fuerza de resistencia de la musculatura abdominal.", details: ["Boca arriba, rodillas flexionadas.", "Subir tronco hasta tocar rodillas con codos.", "Máximas repeticiones correctas en 1 min."] },
  flexibilidad:{ title: "Sit and Reach", icon: Activity, color: "var(--color-amber)", unit: "centímetros", desc: "Evalúa la flexibilidad del tronco y elasticidad de isquiotibiales.", details: ["Sentado, piernas extendidas y juntas.", "Alcanzar lo más lejos posible.", "Mantener posición 2 segundos."] },
  agilidad:    { title: "Test de Illinois", icon: Activity, color: "var(--color-rose)", unit: "segundos", desc: "Evalúa la agilidad y velocidad de cambios de dirección.", details: ["Circuito 10×5m con conos.", "Iniciar acostado boca abajo.", "Registrar tiempo total del recorrido."] },
};

export function TabPruebas({ role, onSave }: TabPruebasProps) {
  const [selectedTest, setSelectedTest] = useState("cooper");
  const test = TESTS[selectedTest];
  const Icon = test.icon;

  return (
    <div className="animate-fade-in glass-elevated" style={{ overflow: "hidden" }}>
      {/* Header */}
      <div style={{ padding: "24px 32px", borderBottom: "1px solid var(--color-border)", display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ width: 38, height: 38, borderRadius: 10, background: "rgba(244,63,94,0.15)", border: "1px solid rgba(244,63,94,0.3)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Activity size={18} color="var(--color-rose)" />
        </div>
        <div>
          <h2 style={{ fontSize: "1rem", fontWeight: 700 }}>Registro de Pruebas Físicas</h2>
          <p style={{ fontSize: "0.72rem", color: "var(--color-text-secondary)", marginTop: 2 }}>Evalúa la condición atlética, mide el progreso y ajusta la intensidad del entrenamiento.</p>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "row", gap: 0 }}>
        {/* Selector izquierdo */}
        <div style={{ width: 200, flexShrink: 0, borderRight: "1px solid var(--color-border)", padding: "16px 0" }}>
          {Object.entries(TESTS).map(([id, t]) => (
            <button
              key={id}
              onClick={() => setSelectedTest(id)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                width: "100%",
                padding: "10px 20px",
                background: selectedTest === id ? `${t.color}14` : "transparent",
                border: "none",
                borderLeft: `3px solid ${selectedTest === id ? t.color : "transparent"}`,
                color: selectedTest === id ? t.color : "var(--color-text-muted)",
                fontSize: "0.8rem",
                fontWeight: selectedTest === id ? 700 : 500,
                fontFamily: "var(--font-sans)",
                cursor: "pointer",
                textAlign: "left",
                transition: "all 0.15s",
              }}
            >
              <t.icon size={14} />
              {t.title.split("–")[0].split("(")[0].trim()}
            </button>
          ))}
        </div>

        {/* Contenido */}
        <div style={{ flex: 1, padding: 32, display: "flex", gap: 32, flexWrap: "wrap" }}>
          {/* Form */}
          <div style={{ padding: 24, display: "flex", flexDirection: "column", gap: 16 }}>
            {role === "ENTRENADOR" && <Input label="ID Usuario Evaluado" placeholder="Identificación..." />}
            <div style={{ flexDirection: "column", gap: 16 }}>
              <Input label={`Marca Obtenida (${test.unit})`} type="number" step="0.01" placeholder="0.00" />
              <Input label="Fecha de Ejecución" type="date" />
            </div>

            {/* Baremo info */}
            <div style={{ padding: 16, borderRadius: 12, background: `${test.color}10`, border: `1px solid ${test.color}30` }}>
              <h4 style={{ fontSize: "0.78rem", fontWeight: 700, color: test.color, marginBottom: 6 }}>Puntuación Automática (Baremo)</h4>
              <p style={{ fontSize: "0.75rem", color: "var(--color-text-secondary)", lineHeight: 1.6 }}>
                El sistema calculará los puntos cruzando la marca ingresada con la tabla <strong>test_baremo</strong> según género y edad del usuario.
              </p>
            </div>

            <div style={{ marginTop: "auto" }}>
              <button
                className="btn btn-primary"
                style={{ background: `linear-gradient(135deg, ${test.color}cc, ${test.color})`, boxShadow: `0 4px 12px ${test.color}40` }}
                onClick={onSave}
              >
                <Save size={15} />
                Registrar Prueba
              </button>
            </div>
          </div>

          {/* Instrucciones */}
          <div
            style={{
              width: 300,
              flexShrink: 0,
              background: "rgba(255,255,255,0.02)",
              border: "1px solid var(--color-border)",
              borderRadius: 14,
              padding: 24,
              display: "flex",
              flexDirection: "column",
              gap: 16,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <Info size={16} color={test.color} />
              <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--color-text-primary)" }}>¿Cómo realizar la prueba?</span>
            </div>
            <div
              style={{
                height: 100,
                borderRadius: 10,
                background: `${test.color}10`,
                border: `1px solid ${test.color}25`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Icon size={40} color={test.color} style={{ opacity: 0.7 }} />
            </div>
            <h4 style={{ fontSize: "0.95rem", fontWeight: 800, color: "var(--color-text-primary)" }}>{test.title}</h4>
            <p style={{ fontSize: "0.78rem", color: "var(--color-text-secondary)", lineHeight: 1.7 }}>{test.desc}</p>
            <div>
              <p className="section-title" style={{ marginBottom: 10 }}>Pasos:</p>
              <ul style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {test.details.map((d, i) => (
                  <li key={i} style={{ display: "flex", gap: 10, fontSize: "0.78rem", color: "var(--color-text-secondary)", lineHeight: 1.6 }}>
                    <span style={{ width: 18, height: 18, borderRadius: "50%", background: `${test.color}20`, border: `1px solid ${test.color}40`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.65rem", fontWeight: 700, color: test.color, flexShrink: 0, marginTop: 2 }}>{i+1}</span>
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
