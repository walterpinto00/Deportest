// ─────────────────────────────────────────────────────────────
// TabPruebas.tsx — Registro de Pruebas Físicas y Baremos Oficiales
// ─────────────────────────────────────────────────────────────
import React, { useState } from "react";
import { Activity, Dumbbell, Save, Award, ChevronRight, CheckCircle2 } from "lucide-react";
import { Input } from "../ui/Input";

interface TabPruebasProps {
  role: string;
  onSave: () => void;
}

const TESTS: Record<
  string,
  { title: string; categoria: string; unit: string; desc: string; baremoEstimado: string; details: string[] }
> = {
  cooper: {
    title: "Test de Cooper (12 min)",
    categoria: "Resistencia Cardiovascular",
    unit: "metros recorridos",
    desc: "Prueba estandarizada de capacidad aeróbica máxima. El aprendiz recorre la mayor distancia continua posible durante 12 minutos.",
    baremoEstimado: "> 2.400 m (Nivel Bueno - Aceptable para 16-18 años)",
    details: [
      "Permite estimar el VO2 Máximo según protocolo oficial.",
      "Ejecutar sobre pista atlética o superficie plana de 400 m.",
      "Registro de marca final en metros continuos.",
    ],
  },
  course_navette: {
    title: "Course-Navette (Léger)",
    categoria: "Potencia Aeróbica Escolar",
    unit: "períodos completados",
    desc: "Test progresivo de ida y vuelta en 20 metros con señal sonora regulada (el pitido escolar).",
    baremoEstimado: "Palier 7.5 (Promedio óptimo juvenil)",
    details: [
      "Prueba de referencia para evaluación escolar y colegios.",
      "Pista de 20 metros delimitada con conos.",
      "Finaliza cuando el alumno no alcanza la línea antes del pitido.",
    ],
  },
  velocidad: {
    title: "Velocidad 50 Metros",
    categoria: "Velocidad de Desplazamiento",
    unit: "segundos",
    desc: "Mide la velocidad de aceleración pura en distancia corta con salida de pie.",
    baremoEstimado: "7.2 s (Nivel Competitivo Juvenil)",
    details: [
      "Superficie plana no resbaladiza.",
      "Cronómetro digital manual o células fotoeléctricas.",
      "Registro del mejor tiempo entre dos intentos.",
    ],
  },
  flexiones: {
    title: "Fuerza Resistencia — Flexiones",
    categoria: "Fuerza del Tren Superior",
    unit: "repeticiones en 1 min",
    desc: "Evalúa la resistencia muscular en pectorales, deltoides y tríceps con alineación corporal estricta.",
    baremoEstimado: "30 a 35 repeticiones (Nivel Bueno)",
    details: [
      "Espalda y cadera en línea recta durante todo el rango.",
      "Descenso hasta ángulo de 90° en los codos.",
      "Mujeres pueden optar por apoyo de rodillas según baremo formativo.",
    ],
  },
  salto_largo: {
    title: "Salto Largo sin Impulso",
    categoria: "Potencia del Tren Inferior",
    unit: "centímetros",
    desc: "Mide la fuerza explosiva de los miembros inferiores desde posición estática.",
    baremoEstimado: "210 cm (Nivel Bueno)",
    details: [
      "Pies a la anchura de hombros detrás de la línea de despegue.",
      "Flexión de rodillas y oscilación coordinada de brazos.",
      "Se mide hasta la huella del talón más cercano a la línea.",
    ],
  },
  abdominales: {
    title: "Abdominales en 1 Minuto",
    categoria: "Resistencia de la Zona Media (Core)",
    unit: "repeticiones",
    desc: "Evalúa la fuerza y estabilidad de la musculatura abdominal y flexora de cadera.",
    baremoEstimado: "38 repeticiones (Nivel Muy Bueno)",
    details: [
      "Boca arriba con rodillas a 90° y pies sujetos.",
      "Elevación de tronco tocando rodillas con los codos.",
      "Conteo continuo de repeticiones válidas en 60 segundos.",
    ],
  },
  flexibilidad: {
    title: "Test de Flexibilidad (Wells)",
    categoria: "Elasticidad Muscular & Movilidad",
    unit: "centímetros (+/-)",
    desc: "Evalúa la elongación de los músculos isquiotibiales y flexibilidad lumbosacra.",
    baremoEstimado: "+4 cm sobre el punto cero (Nivel Satisfactorio)",
    details: [
      "Uso del cajón estándar de flexión de tronco.",
      "Piernas completamente extendidas sin flexionar rodillas.",
      "Mantener la posición máxima durante 2 segundos.",
    ],
  },
};

export function TabPruebas({ role, onSave }: TabPruebasProps) {
  const [selectedTest, setSelectedTest] = useState("cooper");
  const test = TESTS[selectedTest];

  return (
    <div className="animate-fade-in glass-elevated" style={{ overflow: "hidden", borderRadius: 16 }}>
      {/* Cabecera */}
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
            <Activity size={20} />
          </div>
          <div>
            <h2 style={{ fontSize: "1.1rem", fontWeight: 700, letterSpacing: "-0.01em" }}>
              Baremos y Pruebas Físicas Oficiales
            </h2>
            <p style={{ fontSize: "0.74rem", color: "var(--color-text-secondary)" }}>
              Registro de marcas atléticas y baremación estandarizada por edad y género
            </p>
          </div>
        </div>

        <span
          style={{
            fontSize: "0.72rem",
            padding: "4px 10px",
            borderRadius: 6,
            background: "rgba(255, 255, 255, 0.04)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            color: "var(--color-text-secondary)",
          }}
        >
          {Object.keys(TESTS).length} Pruebas Estandarizadas
        </span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "240px 1fr", minHeight: 460 }}>
        {/* Selector de Pruebas Lateral */}
        <div
          style={{
            borderRight: "1px solid var(--color-border)",
            padding: "16px 0",
            display: "flex",
            flexDirection: "column",
            gap: 2,
            background: "rgba(0, 0, 0, 0.1)",
          }}
        >
          {Object.entries(TESTS).map(([id, t]) => {
            const active = selectedTest === id;
            return (
              <button
                key={id}
                onClick={() => setSelectedTest(id)}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  width: "100%",
                  padding: "12px 20px",
                  background: active ? "rgba(255, 255, 255, 0.06)" : "transparent",
                  border: "none",
                  borderLeft: `3px solid ${active ? "var(--color-green)" : "transparent"}`,
                  color: active ? "#ffffff" : "var(--color-text-secondary)",
                  cursor: "pointer",
                  textAlign: "left",
                  transition: "all 0.15s ease",
                  fontFamily: "var(--font-sans)",
                }}
              >
                <span style={{ fontSize: "0.8rem", fontWeight: active ? 700 : 500 }}>
                  {t.title}
                </span>
                <span style={{ fontSize: "0.68rem", color: "var(--color-text-muted)", marginTop: 2 }}>
                  {t.categoria}
                </span>
              </button>
            );
          })}
        </div>

        {/* Panel de Registro y Detalles de la Prueba */}
        <div style={{ padding: "32px", display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: 32 }}>
          {/* Formulario de Registro */}
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <div>
              <span
                style={{
                  fontSize: "0.7rem",
                  color: "var(--color-green)",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                }}
              >
                {test.categoria}
              </span>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 800, marginTop: 4, letterSpacing: "-0.02em" }}>
                {test.title}
              </h3>
              <p style={{ fontSize: "0.8rem", color: "var(--color-text-secondary)", lineHeight: 1.6, marginTop: 6 }}>
                {test.desc}
              </p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {role === "ENTRENADOR" && (
                <Input label="Identificación del Aprendiz" defaultValue="1001234567" />
              )}
              <Input
                label={`Marca Alcanzada (${test.unit})`}
                type="number"
                step="0.01"
                placeholder="Ingresa la marca obtenida..."
                defaultValue="2450"
              />
              <Input label="Fecha de Ejecución" type="date" defaultValue="2026-10-12" />
            </div>

            <div style={{ marginTop: 12 }}>
              <button
                className="btn btn-primary"
                onClick={onSave}
                style={{ padding: "12px 24px" }}
              >
                <Save size={15} />
                Guardar y Calcular Baremo
              </button>
            </div>
          </div>

          {/* Tarjeta de Baremo Oficial y Protocolo */}
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            {/* Baremo Oficial */}
            <div
              style={{
                padding: "20px",
                borderRadius: 12,
                background: "rgba(16, 185, 129, 0.05)",
                border: "1px solid rgba(16, 185, 129, 0.2)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                <Award size={16} color="var(--color-green)" />
                <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--color-green)" }}>
                  Baremo de Referencia (Tabla Oficial)
                </span>
              </div>
              <p style={{ fontSize: "0.85rem", fontWeight: 700, color: "#ffffff", marginBottom: 6 }}>
                {test.baremoEstimado}
              </p>
              <p style={{ fontSize: "0.74rem", color: "var(--color-text-secondary)", lineHeight: 1.5 }}>
                El puntaje numérico (1 a 100 pts) se calcula automáticamente de acuerdo con las tablas estandarizadas del manual de educación física y rendimiento atlético.
              </p>
            </div>

            {/* Protocolo de Aplicación */}
            <div
              style={{
                padding: "18px 20px",
                borderRadius: 12,
                background: "rgba(255, 255, 255, 0.02)",
                border: "1px solid rgba(255, 255, 255, 0.05)",
              }}
            >
              <h4 style={{ fontSize: "0.8rem", fontWeight: 700, marginBottom: 12, color: "var(--color-text-primary)" }}>
                Protocolo Técnico de Aplicación
              </h4>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {test.details.map((d, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: "0.75rem", color: "var(--color-text-secondary)" }}>
                    <ChevronRight size={13} color="var(--color-green)" style={{ flexShrink: 0, marginTop: 2 }} />
                    <span>{d}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
