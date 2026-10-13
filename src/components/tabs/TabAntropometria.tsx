// ─────────────────────────────────────────────────────────────
// TabAntropometria.tsx — Ficha de Valoración Física & Antropometría Escolar
// Diseñada para Docentes e Instructores: Clara, Guiada, Sin Enredos Técnicos
// Soporta Modo Claro/Oscuro y Asistencia Inteligente con Google Gemini
// ─────────────────────────────────────────────────────────────
import React, { useState, useEffect } from "react";
import {
  FileText,
  Save,
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
  Plus,
  Minus,
  Sparkle,
  Copy,
  Check,
} from "lucide-react";
import { Input } from "../ui/Input";
import { Select } from "../ui/Select";
import { consultarGoogleGemini } from "../../services/geminiService";
import { userService } from "../../services/userService";

interface TabAntropometriaProps {
  role: string;
  onSave: () => void;
  onOpenGemini?: () => void;
}

type ModoVista = "basica" | "perimetros" | "pliegues" | "clinica";

const ESTUDIANTES_EJEMPLO = [
  { id: "usr-1", nombre: "Juan Camilo Rodríguez", doc: "1001234567", grado: "10° B", edad: 16, sexo: "Masculino", tallaIni: "1.74", pesoIni: "64.5" },
  { id: "usr-2", nombre: "Valentina Morales Peña", doc: "1002345678", grado: "11° A", edad: 17, sexo: "Femenino", tallaIni: "1.65", pesoIni: "55.0" },
  { id: "usr-3", nombre: "Andrés Felipe Gómez",    doc: "1003456789", grado: "9° C",  edad: 15, sexo: "Masculino", tallaIni: "1.68", pesoIni: "68.2" },
];

const obtenerEstudiantes = () => {
  const users = userService.getUsuarios().filter((u) => u.rol === "APRENDIZ");
  if (users.length > 0) {
    return users.map((u) => ({
      id: u.id,
      nombre: `${u.nombres} ${u.apellidos}`,
      doc: u.numDoc,
      grado: u.grado || "10° B",
      edad: userService.calcularEdad(u.fechaNacimiento) || 16,
      sexo: u.genero,
      tallaIni: u.talla || "1.70",
      pesoIni: u.peso || "60.0",
      avatarUrl: u.avatarUrl,
    }));
  }
  return ESTUDIANTES_EJEMPLO;
};

export function TabAntropometria({ role, onSave, onOpenGemini }: TabAntropometriaProps) {
  const [estudiantes, setEstudiantes] = useState(obtenerEstudiantes);
  const [estudianteSel, setEstudianteSel] = useState(() => estudiantes[0] || ESTUDIANTES_EJEMPLO[0]);
  const [modoVista, setModoVista] = useState<ModoVista>("basica");
  const [savedOk, setSavedOk] = useState(false);

  // Escuchar si se registran nuevos usuarios en TabUsuarios
  useEffect(() => {
    const unsub = userService.subscribe(() => {
      const actualizados = obtenerEstudiantes();
      setEstudiantes(actualizados);
      setEstudianteSel((prev) => actualizados.find((e) => e.id === prev.id) || actualizados[0]);
    });
    return () => unsub();
  }, []);

  // Estado para cálculo dinámico de IMC
  const [peso, setPeso] = useState(estudianteSel.pesoIni);
  const [talla, setTalla] = useState(estudianteSel.tallaIni);
  const [observacionDocente, setObservacionDocente] = useState(
    "Estudiante en condición física saludable y óptima. Apto para participar en todas las actividades deportivas escolares y pruebas físicas sin ninguna restricción médica."
  );
  const [generandoIA, setGenerandoIA] = useState(false);

  // Al cambiar de estudiante
  const cambiarEstudiante = (id: string) => {
    const est = estudiantes.find((e) => e.id === id) || estudiantes[0];
    setEstudianteSel(est);
    setTalla(est.tallaIni);
    setPeso(est.pesoIni);
  };

  const pesoNum = parseFloat(peso) || 0;
  const tallaNum = parseFloat(talla) || 0;
  let imc = 0;
  if (pesoNum > 0 && tallaNum > 0) {
    imc = parseFloat((pesoNum / (tallaNum * tallaNum)).toFixed(1));
  }

  // Clasificación pedagógica de la OMS
  let imcClass = "Sin datos";
  let imcColor = "#64748b";
  let imcBg = "rgba(100, 116, 139, 0.12)";
  let imcConsejoDocente = "Ingresa estatura y peso para ver el resultado de tu estudiante.";

  if (imc > 0) {
    if (imc < 18.5) {
      imcClass = "Bajo Peso";
      imcColor = "#2563eb";
      imcBg = "rgba(37, 99, 235, 0.15)";
      imcConsejoDocente = "El estudiante está por debajo del percentil ideal. Fomentar refrigerio escolar nutritivo y evitar sobrecargas extremas de resistencia sin hidratación previa.";
    } else if (imc < 25) {
      imcClass = "Peso Saludable (Normal OMS)";
      imcColor = "#10b981";
      imcBg = "rgba(16, 185, 129, 0.15)";
      imcConsejoDocente = "¡Excelente desarrollo! Proporción de masa y estatura armónica para su edad. Apto para cualquier entrenamiento deportivo y prueba de rendimiento.";
    } else if (imc < 30) {
      imcClass = "Sobrepeso Leve";
      imcColor = "#d97706";
      imcBg = "rgba(217, 119, 6, 0.15)";
      imcConsejoDocente = "Recomendar mayor actividad física diaria recreativa (60 minutos) y promover agua en vez de jugos azucarados en la lonchera.";
    } else {
      imcClass = "Alerta: Riesgo de Obesidad";
      imcColor = "#e11d48";
      imcBg = "rgba(225, 29, 72, 0.15)";
      imcConsejoDocente = "Alerta preventiva escolar. Se recomienda remitir a valoración con orientación o bienestar institucional para acompañamiento amable.";
    }
  }

  // Ajuste rápido con botones +/-
  const ajustarTalla = (delta: number) => {
    const nueva = Math.max(1.0, Math.min(2.3, parseFloat((tallaNum + delta).toFixed(2))));
    setTalla(nueva.toString());
  };

  const ajustarPeso = (delta: number) => {
    const nuevo = Math.max(20, Math.min(180, parseFloat((pesoNum + delta).toFixed(1))));
    setPeso(nuevo.toString());
  };

  // Generar recomendación con Google Gemini
  const handleGenerarRecomendacionIA = async () => {
    setGenerandoIA(true);
    try {
      const prompt = "Redacta una observación escolar formal y pedagógica para el boletín sobre la condición física y el IMC de este estudiante.";
      const respuesta = await consultarGoogleGemini(prompt, {
        nombre: estudianteSel.nombre,
        edad: estudianteSel.edad,
        grado: estudianteSel.grado,
        estatura: tallaNum,
        peso: pesoNum,
        imc,
        clasificacionImc: imcClass,
      });
      setObservacionDocente(respuesta);
    } catch (e) {
      console.error(e);
    } finally {
      setGenerandoIA(false);
    }
  };

  const handleSave = () => {
    onSave();
    userService.actualizarMedidas(estudianteSel.id, peso, talla);
    setSavedOk(true);
    setTimeout(() => setSavedOk(false), 2500);
  };

  return (
    <div className="animate-fade-in" style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {/* ── 1. CABECERA AMIGABLE: SELECCIÓN DEL ALUMNO & ACCIONES ── */}
      <div
        className="glass-elevated"
        style={{
          padding: "24px 28px",
          borderRadius: 20,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 20,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: 14,
              background: "linear-gradient(135deg, var(--color-green-dark), var(--color-green))",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#ffffff",
              boxShadow: "0 6px 20px rgba(16, 185, 129, 0.3)",
              flexShrink: 0,
            }}
          >
            <FileText size={26} />
          </div>

          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
              <h2 style={{ fontSize: "1.35rem", fontWeight: 800, color: "var(--color-text-primary)", letterSpacing: "-0.02em" }}>
                Ficha de Valoración Física Escolar
              </h2>
              <span
                style={{
                  fontSize: "0.74rem",
                  padding: "3px 10px",
                  borderRadius: 99,
                  background: "rgba(16, 185, 129, 0.15)",
                  color: "var(--color-green)",
                  fontWeight: 800,
                  border: "1px solid rgba(16, 185, 129, 0.3)",
                }}
              >
                Protocolo OMS Docente
              </span>
            </div>

            {/* Selector Rápido de Alumno */}
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 6 }}>
              <span style={{ fontSize: "0.85rem", color: "var(--color-text-muted)", fontWeight: 600 }}>
                Estudiante a evaluar:
              </span>
              <select
                value={estudianteSel.id}
                onChange={(e) => cambiarEstudiante(e.target.value)}
                style={{
                  background: "var(--color-bg-card)",
                  border: "1px solid var(--color-border)",
                  borderRadius: 8,
                  padding: "4px 10px",
                  fontSize: "0.86rem",
                  fontWeight: 700,
                  color: "var(--color-text-primary)",
                  cursor: "pointer",
                }}
              >
                {estudiantes.map((est) => (
                  <option key={est.id} value={est.id}>
                    {est.nombre} — {est.grado} ({est.edad} años)
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Acciones del Docente */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
          {onOpenGemini && (
            <button
              onClick={onOpenGemini}
              className="btn btn-secondary"
              style={{
                borderColor: "#3b82f6",
                color: "#2563eb",
                padding: "10px 16px",
                fontSize: "0.85rem",
              }}
              title="Abrir asistente de Google Gemini"
            >
              <Sparkles size={16} color="#3b82f6" />
              <span>Ayuda Google Gemini</span>
            </button>
          )}

          <button
            className="btn btn-secondary"
            onClick={() => window.print()}
            style={{ padding: "10px 16px", fontSize: "0.85rem" }}
            title="Imprimir informe en PDF"
          >
            <Printer size={16} />
            <span>Imprimir PDF</span>
          </button>

          <button
            className="btn btn-primary"
            onClick={handleSave}
            style={{ padding: "10px 20px", fontSize: "0.88rem" }}
          >
            {savedOk ? <CheckCircle2 size={16} /> : <Save size={16} />}
            <span>{savedOk ? "✓ Ficha Guardada" : "Guardar Ficha Oficial"}</span>
          </button>
        </div>
      </div>

      {/* ── 2. SELECTOR DE VISTA AMIGABLE (BÁSICA RECOMENDADA vs AVANZADA) ── */}
      <div
        style={{
          display: "flex",
          gap: 10,
          borderBottom: "1px solid var(--color-border)",
          paddingBottom: 4,
          overflowX: "auto",
        }}
      >
        <button
          onClick={() => setModoVista("basica")}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "10px 18px",
            borderRadius: "10px 10px 0 0",
            border: "none",
            borderBottom: `3px solid ${modoVista === "basica" ? "var(--color-green)" : "transparent"}`,
            background: modoVista === "basica" ? "rgba(16, 185, 129, 0.1)" : "transparent",
            color: modoVista === "basica" ? "var(--color-green)" : "var(--color-text-secondary)",
            fontSize: "0.92rem",
            fontWeight: modoVista === "basica" ? 800 : 600,
            cursor: "pointer",
            fontFamily: "var(--font-sans)",
          }}
        >
          <Weight size={17} />
          <span>Valoración Básica (Talla, Peso & IMC)</span>
        </button>

        <button
          onClick={() => setModoVista("perimetros")}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "10px 18px",
            borderRadius: "10px 10px 0 0",
            border: "none",
            borderBottom: `3px solid ${modoVista === "perimetros" ? "var(--color-blue)" : "transparent"}`,
            background: modoVista === "perimetros" ? "rgba(37, 99, 235, 0.1)" : "transparent",
            color: modoVista === "perimetros" ? "var(--color-blue)" : "var(--color-text-secondary)",
            fontSize: "0.88rem",
            fontWeight: modoVista === "perimetros" ? 800 : 600,
            cursor: "pointer",
            fontFamily: "var(--font-sans)",
          }}
        >
          <Ruler size={17} />
          <span>Perímetros (Cinta Métrica)</span>
        </button>

        <button
          onClick={() => setModoVista("pliegues")}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "10px 18px",
            borderRadius: "10px 10px 0 0",
            border: "none",
            borderBottom: `3px solid ${modoVista === "pliegues" ? "var(--color-amber)" : "transparent"}`,
            background: modoVista === "pliegues" ? "rgba(217, 119, 6, 0.1)" : "transparent",
            color: modoVista === "pliegues" ? "var(--color-amber)" : "var(--color-text-secondary)",
            fontSize: "0.88rem",
            fontWeight: modoVista === "pliegues" ? 800 : 600,
            cursor: "pointer",
            fontFamily: "var(--font-sans)",
          }}
        >
          <Activity size={17} />
          <span>Pliegues de Grasa (Adipómetro)</span>
        </button>

        <button
          onClick={() => setModoVista("clinica")}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "10px 18px",
            borderRadius: "10px 10px 0 0",
            border: "none",
            borderBottom: `3px solid ${modoVista === "clinica" ? "var(--color-purple)" : "transparent"}`,
            background: modoVista === "clinica" ? "rgba(124, 58, 237, 0.1)" : "transparent",
            color: modoVista === "clinica" ? "var(--color-purple)" : "var(--color-text-secondary)",
            fontSize: "0.88rem",
            fontWeight: modoVista === "clinica" ? 800 : 600,
            cursor: "pointer",
            fontFamily: "var(--font-sans)",
          }}
        >
          <HeartPulse size={17} />
          <span>Signos & Salud Postural</span>
        </button>
      </div>

      {/* ── 3. VISTA BÁSICA: EL FLUJO MÁS FÁCIL PARA EL PROFESOR ── */}
      {modoVista === "basica" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          {/* Fila Principal: Paso 1 (Medidas) y Paso 2 (Semáforo OMS) */}
          <div style={{ display: "grid", gridTemplateColumns: "1.1fr 1.3fr", gap: 24 }}>
            {/* Panel Izquierdo: Paso 1 - Medidas Rápidas */}
            <div
              className="glass-elevated"
              style={{
                padding: "26px 28px",
                borderRadius: 20,
                display: "flex",
                flexDirection: "column",
                gap: 20,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10, borderBottom: "1px solid var(--color-border)", paddingBottom: 14 }}>
                <span
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: 99,
                    background: "var(--color-green)",
                    color: "#ffffff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "0.85rem",
                    fontWeight: 800,
                  }}
                >
                  1
                </span>
                <div>
                  <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--color-text-primary)" }}>
                    Medidas Básicas del Alumno
                  </h3>
                  <p style={{ fontSize: "0.8rem", color: "var(--color-text-muted)" }}>
                    Ingresa o ajusta con los botones la estatura y el peso
                  </p>
                </div>
              </div>

              {/* Estatura con botones de ajuste rápido */}
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                  <label className="dp-label" style={{ marginBottom: 0 }}>
                    Estatura / Talla (en Metros)
                  </label>
                  <span style={{ fontSize: "0.75rem", color: "var(--color-text-muted)" }}>
                    Ejemplo: 1.74
                  </span>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <button
                    onClick={() => ajustarTalla(-0.01)}
                    className="btn btn-secondary"
                    style={{ padding: "10px 14px", borderRadius: 10 }}
                    title="Restar 1 centímetro"
                  >
                    <Minus size={16} />
                  </button>

                  <input
                    className="dp-input"
                    type="number"
                    step="0.01"
                    min="0.8"
                    max="2.5"
                    value={talla}
                    onChange={(e) => setTalla(e.target.value)}
                    style={{ textAlign: "center", fontSize: "1.3rem", fontWeight: 800 }}
                  />

                  <button
                    onClick={() => ajustarTalla(0.01)}
                    className="btn btn-secondary"
                    style={{ padding: "10px 14px", borderRadius: 10 }}
                    title="Sumar 1 centímetro"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>

              {/* Peso con botones de ajuste rápido */}
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                  <label className="dp-label" style={{ marginBottom: 0 }}>
                    Peso Corporal (en Kilogramos)
                  </label>
                  <span style={{ fontSize: "0.75rem", color: "var(--color-text-muted)" }}>
                    Ejemplo: 64.5
                  </span>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <button
                    onClick={() => ajustarPeso(-0.5)}
                    className="btn btn-secondary"
                    style={{ padding: "10px 14px", borderRadius: 10 }}
                    title="Restar medio kilogramo"
                  >
                    <Minus size={16} />
                  </button>

                  <input
                    className="dp-input"
                    type="number"
                    step="0.1"
                    min="20"
                    max="200"
                    value={peso}
                    onChange={(e) => setPeso(e.target.value)}
                    style={{ textAlign: "center", fontSize: "1.3rem", fontWeight: 800 }}
                  />

                  <button
                    onClick={() => ajustarPeso(0.5)}
                    className="btn btn-secondary"
                    style={{ padding: "10px 14px", borderRadius: 10 }}
                    title="Sumar medio kilogramo"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>

              {/* Datos administrativos complementarios */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 4 }}>
                <div>
                  <label className="dp-label">Docente Responsable</label>
                  <input className="dp-input" defaultValue="Prof. Walter Pinto" style={{ fontSize: "0.85rem" }} />
                </div>
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                    <label className="dp-label" style={{ display: "flex", alignItems: "center", gap: 6, margin: 0 }}>
                      <Calendar size={13} color="var(--color-green)" /> Fecha de Medición
                    </label>
                    <span style={{ fontSize: "0.72rem", color: "var(--color-green)", fontWeight: 700 }}>
                      📅 Calendario Oficial
                    </span>
                  </div>
                  <input
                    className="dp-input"
                    type="date"
                    defaultValue="2026-10-13"
                    style={{ fontSize: "0.88rem", fontWeight: 700 }}
                  />
                </div>
              </div>
            </div>

            {/* Panel Derecho: Paso 2 - Diagnóstico Visual Claro OMS */}
            <div
              className="glass-elevated"
              style={{
                padding: "26px 28px",
                borderRadius: 20,
                display: "flex",
                flexDirection: "column",
                gap: 20,
                borderLeft: `4px solid ${imcColor}`,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10, borderBottom: "1px solid var(--color-border)", paddingBottom: 14 }}>
                <span
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: 99,
                    background: imcColor,
                    color: "#ffffff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "0.85rem",
                    fontWeight: 800,
                  }}
                >
                  2
                </span>
                <div>
                  <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--color-text-primary)" }}>
                    Diagnóstico Automático (Semáforo OMS)
                  </h3>
                  <p style={{ fontSize: "0.8rem", color: "var(--color-text-muted)" }}>
                    Calculado al instante para que el docente sepa el estado de salud
                  </p>
                </div>
              </div>

              {/* Resultado del IMC en Grande */}
              <div
                style={{
                  padding: "20px 24px",
                  borderRadius: 16,
                  background: imcBg,
                  border: `1.5px solid ${imcColor}40`,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: 16,
                }}
              >
                <div>
                  <span style={{ fontSize: "0.78rem", fontWeight: 800, textTransform: "uppercase", color: "var(--color-text-muted)", letterSpacing: "0.04em" }}>
                    Índice de Masa Corporal (IMC)
                  </span>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginTop: 4 }}>
                    <span style={{ fontSize: "3rem", fontWeight: 900, color: "var(--color-text-primary)", lineHeight: 1 }}>
                      {imc > 0 ? imc : "--"}
                    </span>
                    <span style={{ fontSize: "1rem", color: "var(--color-text-muted)", fontWeight: 700 }}>
                      kg/m²
                    </span>
                  </div>
                </div>

                <div
                  style={{
                    padding: "8px 18px",
                    borderRadius: 12,
                    background: "var(--color-bg-surface)",
                    border: `2px solid ${imcColor}`,
                    color: imcColor,
                    fontSize: "1.05rem",
                    fontWeight: 900,
                    boxShadow: "var(--shadow-sm)",
                  }}
                >
                  {imcClass}
                </div>
              </div>

              {/* Barra Gráfica del Semáforo OMS */}
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.74rem", fontWeight: 700, marginBottom: 8 }}>
                  <span style={{ color: "#2563eb" }}>Bajo Peso (&lt;18.5)</span>
                  <span style={{ color: "#10b981" }}>Saludable (18.5 - 24.9)</span>
                  <span style={{ color: "#d97706" }}>Sobrepeso (25 - 29.9)</span>
                  <span style={{ color: "#e11d48" }}>Alerta (&ge;30)</span>
                </div>

                <div style={{ height: 12, borderRadius: 99, background: "var(--color-border)", overflow: "hidden", display: "flex" }}>
                  <div style={{ width: "25%", background: "#2563eb" }} title="Bajo Peso" />
                  <div style={{ width: "25%", background: "#10b981" }} title="Peso Normal Saludable" />
                  <div style={{ width: "25%", background: "#d97706" }} title="Sobrepeso Leve" />
                  <div style={{ width: "25%", background: "#e11d48" }} title="Riesgo de Obesidad" />
                </div>
              </div>

              {/* Explicación en lenguaje cotidiano para el docente */}
              <div
                style={{
                  padding: "14px 16px",
                  borderRadius: 12,
                  background: "var(--color-bg-card)",
                  border: "1px solid var(--color-border)",
                  fontSize: "0.85rem",
                  color: "var(--color-text-secondary)",
                  lineHeight: 1.5,
                }}
              >
                <div style={{ fontWeight: 800, color: "var(--color-text-primary)", marginBottom: 4, display: "flex", alignItems: "center", gap: 6 }}>
                  <Info size={16} color={imcColor} />
                  <span>¿Qué significa para la clase del profesor?</span>
                </div>
                {imcConsejoDocente}
              </div>
            </div>
          </div>

          {/* Fila Inferior: Paso 3 - Recomendación y Observación con Google Gemini */}
          <div
            className="glass-elevated"
            style={{
              padding: "24px 28px",
              borderRadius: 20,
              display: "flex",
              flexDirection: "column",
              gap: 16,
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: 99,
                    background: "#7c3aed",
                    color: "#ffffff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "0.85rem",
                    fontWeight: 800,
                  }}
                >
                  3
                </span>
                <div>
                  <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--color-text-primary)" }}>
                    Observación Oficial para el Boletín Escolar
                  </h3>
                  <p style={{ fontSize: "0.8rem", color: "var(--color-text-muted)" }}>
                    El texto que irá en el informe oficial de notas y seguimiento del estudiante
                  </p>
                </div>
              </div>

              {/* Botón de Generación Asistida con Gemini */}
              <button
                onClick={handleGenerarRecomendacionIA}
                disabled={generandoIA}
                className="btn"
                style={{
                  background: "linear-gradient(135deg, #4285F4 0%, #9B51E0 50%, #34A853 100%)",
                  color: "#ffffff",
                  fontSize: "0.85rem",
                  padding: "9px 18px",
                  borderRadius: 10,
                  boxShadow: "0 4px 14px rgba(66, 133, 244, 0.25)",
                }}
              >
                <Sparkles size={16} />
                <span>{generandoIA ? "Google Gemini redactando..." : "Redactar con Google Gemini"}</span>
              </button>
            </div>

            <textarea
              className="dp-input"
              rows={4}
              value={observacionDocente}
              onChange={(e) => setObservacionDocente(e.target.value)}
              placeholder="Escribe aquí las observaciones o usa el botón de Google Gemini para redactar automáticamente..."
              style={{
                fontSize: "0.92rem",
                lineHeight: 1.6,
                fontWeight: 500,
                resize: "vertical",
                minHeight: 100,
              }}
            />

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "0.76rem", color: "var(--color-text-muted)" }}>
              <span>Puedes editar este texto libremente antes de guardar o imprimir.</span>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(observacionDocente);
                }}
                className="btn btn-ghost"
                style={{ padding: "4px 10px", fontSize: "0.76rem", gap: 4 }}
              >
                <Copy size={13} />
                <span>Copiar texto al portapapeles</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── 4. SUB-PESTAÑA: PERÍMETROS CORPORALES (OPCIONAL PARA ESPECIALISTAS) ── */}
      {modoVista === "perimetros" && (
        <div className="glass-elevated" style={{ padding: "26px 30px", borderRadius: 20, display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid var(--color-border)", paddingBottom: 14 }}>
            <div>
              <h3 style={{ fontSize: "1.15rem", fontWeight: 800, color: "var(--color-text-primary)" }}>
                Registro de Perímetros Corporales (Cinta Métrica)
              </h3>
              <p style={{ fontSize: "0.82rem", color: "var(--color-text-muted)", marginTop: 2 }}>
                Medición en centímetros (cm) para valoración antropométrica avanzada
              </p>
            </div>
            <span style={{ fontSize: "0.8rem", padding: "4px 12px", borderRadius: 8, background: "rgba(37, 99, 235, 0.12)", color: "var(--color-blue)", fontWeight: 700 }}>
              Unidad: Centímetros (cm)
            </span>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16 }}>
            {[
              { reg: "Hombros", val: "104.5", desc: "Perímetro total superior" },
              { reg: "Pecho / Tórax", val: "88.0", desc: "A la altura del pecho" },
              { reg: "Cintura", val: "72.5", desc: "Punto más estrecho del abdomen" },
              { reg: "Cadera", val: "94.0", desc: "Zona más ancha de la pelvis" },
              { reg: "Brazo Relajado", val: "27.5", desc: "Brazo extendido al costado" },
              { reg: "Brazo en Tensión", val: "29.8", desc: "Flexión máxima de bíceps" },
              { reg: "Muslo Superior", val: "52.0", desc: "Debajo del pliegue del muslo" },
              { reg: "Pantorrilla", val: "34.0", desc: "Mayor grosor de los gemelos" },
            ].map((p, i) => (
              <div
                key={i}
                style={{
                  padding: "16px",
                  borderRadius: 14,
                  background: "var(--color-bg-card)",
                  border: "1px solid var(--color-border)",
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "0.88rem", fontWeight: 700, color: "var(--color-text-primary)" }}>{p.reg}</span>
                  <span style={{ fontSize: "0.75rem", color: "var(--color-blue)", fontWeight: 700 }}>cm</span>
                </div>
                <input
                  className="dp-input"
                  type="number"
                  step="0.1"
                  defaultValue={p.val}
                  style={{ fontSize: "1.1rem", fontWeight: 800, textAlign: "center" }}
                />
                <span style={{ fontSize: "0.74rem", color: "var(--color-text-muted)" }}>{p.desc}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── 5. SUB-PESTAÑA: PLIEGUES CUTÁNEOS (OPCIONAL) ── */}
      {modoVista === "pliegues" && (
        <div className="glass-elevated" style={{ padding: "26px 30px", borderRadius: 20, display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid var(--color-border)", paddingBottom: 14 }}>
            <div>
              <h3 style={{ fontSize: "1.15rem", fontWeight: 800, color: "var(--color-text-primary)" }}>
                Grosor de Pliegues Cutáneos (Adipometría)
              </h3>
              <p style={{ fontSize: "0.82rem", color: "var(--color-text-muted)", marginTop: 2 }}>
                Estimación de grasa subcutánea con plicómetro en milímetros (mm)
              </p>
            </div>
            <span style={{ fontSize: "0.8rem", padding: "4px 12px", borderRadius: 8, background: "rgba(217, 119, 6, 0.12)", color: "var(--color-amber)", fontWeight: 700 }}>
              Unidad: Milímetros (mm)
            </span>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16 }}>
            {[
              { pliegue: "Pliegue Tricipital", val: "10.5", desc: "Parte trasera del brazo" },
              { pliegue: "Pliegue Bicipital", val: "5.0", desc: "Parte delantera sobre bíceps" },
              { pliegue: "Pliegue Subescapular", val: "9.2", desc: "Debajo del omóplato" },
              { pliegue: "Pliegue Abdominal", val: "14.5", desc: "Al lado del ombligo" },
              { pliegue: "Pliegue Muslo", val: "13.0", desc: "Punto medio del muslo" },
              { pliegue: "Pliegue Pantorrilla", val: "8.5", desc: "Parte interna del gemelo" },
            ].map((p, i) => (
              <div
                key={i}
                style={{
                  padding: "16px",
                  borderRadius: 14,
                  background: "var(--color-bg-card)",
                  border: "1px solid var(--color-border)",
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "0.88rem", fontWeight: 700, color: "var(--color-text-primary)" }}>{p.pliegue}</span>
                  <span style={{ fontSize: "0.75rem", color: "var(--color-amber)", fontWeight: 700 }}>mm</span>
                </div>
                <input
                  className="dp-input"
                  type="number"
                  step="0.1"
                  defaultValue={p.val}
                  style={{ fontSize: "1.1rem", fontWeight: 800, textAlign: "center" }}
                />
                <span style={{ fontSize: "0.74rem", color: "var(--color-text-muted)" }}>{p.desc}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── 6. SUB-PESTAÑA: CLÍNICA Y SALUD POSTURAL ── */}
      {modoVista === "clinica" && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
          <div className="glass-elevated" style={{ padding: "26px 28px", borderRadius: 20, display: "flex", flexDirection: "column", gap: 18 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, borderBottom: "1px solid var(--color-border)", paddingBottom: 12 }}>
              <HeartPulse size={20} color="var(--color-purple)" />
              <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--color-text-primary)" }}>
                Signos Vitales en Reposo
              </h3>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <Input label="Presión Arterial (mmHg)" defaultValue="115/75" />
              <Input label="Frecuencia Cardíaca en Reposo (pulsaciones / min)" type="number" defaultValue="68" />
              <Input label="Saturación de Oxígeno (%)" type="number" defaultValue="98" />
            </div>
          </div>

          <div className="glass-elevated" style={{ padding: "26px 28px", borderRadius: 20, display: "flex", flexDirection: "column", gap: 18 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, borderBottom: "1px solid var(--color-border)", paddingBottom: 12 }}>
              <ShieldCheck size={20} color="var(--color-green)" />
              <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--color-text-primary)" }}>
                Postura & Recomendación Médica
              </h3>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <Select label="Evaluación de Columna (Escoliosis)">
                <option>Normal / Sin Desviación</option>
                <option>Leve (Monitoreo regular)</option>
                <option>Moderada (Remitir a especialista)</option>
              </Select>
              <Select label="Apoyo de Pisada">
                <option>Neutro / Normal</option>
                <option>Pie Plano</option>
                <option>Pie Cavo</option>
              </Select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
