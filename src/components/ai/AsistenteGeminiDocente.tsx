// ─────────────────────────────────────────────────────────────
// AsistenteGeminiDocente.tsx — Asistente Pedagógico IA (Google AI Studio / Gemini)
// Diseñado para Instructores SENA y Docentes de Educación Física
// Permite resolver dudas, redactar boletines y guiar al profesor sin complicaciones
// ─────────────────────────────────────────────────────────────
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  X,
  Send,
  Copy,
  Check,
  Key,
  BookOpen,
  Users,
  Dumbbell,
  Ruler,
  HelpCircle,
  Lightbulb,
  CornerDownRight,
  RefreshCw,
} from "lucide-react";
import {
  consultarGoogleGemini,
  getGeminiApiKey,
  setGeminiApiKey,
} from "../../services/geminiService";

interface AsistenteProps {
  isOpen: boolean;
  onClose: () => void;
  estudianteActual?: {
    nombre: string;
    edad: number;
    grado: string;
    estatura: number;
    peso: number;
    imc: number;
    clasificacionImc: string;
  };
  onInsertarObservacion?: (texto: string) => void;
}

export function AsistenteGeminiDocente({
  isOpen,
  onClose,
  estudianteActual = {
    nombre: "Juan Camilo Rodríguez",
    edad: 16,
    grado: "10° B",
    estatura: 1.74,
    peso: 64.5,
    imc: 21.3,
    clasificacionImc: "Rango Saludable (Normal) OMS",
  },
  onInsertarObservacion,
}: AsistenteProps) {
  const [inputTexto, setInputTexto] = useState("");
  const [cargando, setCargando] = useState(false);
  const [copiado, setCopiado] = useState(false);
  const [insertado, setInsertado] = useState(false);
  const [mostrarConfigKey, setMostrarConfigKey] = useState(false);
  const [apiKeyTemporal, setApiKeyTemporal] = useState(getGeminiApiKey());

  const [mensajes, setMensajes] = useState<
    { remitente: "usuario" | "gemini"; texto: string; timestamp: string }[]
  >([
    {
      remitente: "gemini",
      texto: `¡Hola, profesor! 👋 Soy tu **Asistente Pedagógico con Google Gemini**.

Estoy aquí para facilitarte el trabajo con **${estudianteActual.nombre}** (Grado ${estudianteActual.grado}, IMC ${estudianteActual.imc} - ${estudianteActual.clasificacionImc}).

Puedes tocar cualquiera de los **atajos rápidos de abajo** o hacerme cualquier pregunta sobre cómo evaluar o guiar a tus estudiantes.`,
      timestamp: "Ahora",
    },
  ]);

  const ATAJOS_DOCENTE = [
    {
      id: "boletin",
      label: "📝 Redactar nota para boletín escolar",
      prompt: "Redacta una observación formal, constructiva y respetuosa para el boletín escolar del estudiante basada en su IMC y condición actual.",
      icon: BookOpen,
      color: "#3b82f6",
    },
    {
      id: "padres",
      label: "👨‍👩‍👧 Explicar este resultado a los acudientes",
      prompt: "¿Cómo puedo explicarle de forma clara, sencilla y sin alarmar este resultado de IMC a los padres de familia?",
      icon: Users,
      color: "#10b981",
    },
    {
      id: "ejercicios",
      label: "🏃 3 ejercicios para mi clase de educación física",
      prompt: "Sugiere 3 ejercicios prácticos y seguros para realizar en la clase de educación física acordes a su peso y desarrollo.",
      icon: Dumbbell,
      color: "#f59e0b",
    },
    {
      id: "medir",
      label: "📐 ¿Cómo tomar talla y peso sin errores?",
      prompt: "¿Cuáles son las recomendaciones clave para tomar la talla y el peso en la cancha sin cometer errores técnicos?",
      icon: Ruler,
      color: "#8b5cf6",
    },
  ];

  const handleEnviar = async (textoPersonalizado?: string) => {
    const texto = textoPersonalizado || inputTexto;
    if (!texto.trim() || cargando) return;

    const ahora = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const nuevoHistorial = [
      ...mensajes,
      { remitente: "usuario" as const, texto, timestamp: ahora },
    ];
    setMensajes(nuevoHistorial);
    if (!textoPersonalizado) setInputTexto("");
    setCargando(true);

    try {
      const respuesta = await consultarGoogleGemini(texto, estudianteActual);
      setMensajes([
        ...nuevoHistorial,
        { remitente: "gemini", texto: respuesta, timestamp: ahora },
      ]);
    } catch (e) {
      setMensajes([
        ...nuevoHistorial,
        {
          remitente: "gemini",
          texto: "Hubo un pequeño contratiempo al consultar la IA. Inténtalo de nuevo.",
          timestamp: ahora,
        },
      ]);
    } finally {
      setCargando(false);
    }
  };

  const handleCopiarUltimo = (texto: string) => {
    navigator.clipboard.writeText(texto);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2000);
  };

  const handleInsertar = (texto: string) => {
    if (onInsertarObservacion) {
      onInsertarObservacion(texto);
      setInsertado(true);
      setTimeout(() => setInsertado(false), 2000);
    }
  };

  const guardarKey = () => {
    setGeminiApiKey(apiKeyTemporal);
    setMostrarConfigKey(false);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(15, 23, 42, 0.65)",
          backdropFilter: "blur(6px)",
          zIndex: 999,
          display: "flex",
          justifyContent: "flex-end",
        }}
        onClick={onClose}
      >
        <motion.div
          initial={{ x: "100%", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: "100%", opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 220 }}
          onClick={(e) => e.stopPropagation()}
          style={{
            width: "100%",
            maxWidth: 520,
            height: "100%",
            background: "var(--color-bg-surface)",
            borderLeft: "1px solid var(--color-border)",
            boxShadow: "-12px 0 40px rgba(0, 0, 0, 0.45)",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* ── Encabezado Estilo Google AI Studio ── */}
          <div
            style={{
              padding: "18px 24px",
              borderBottom: "1px solid var(--color-border)",
              background: "linear-gradient(135deg, rgba(66, 133, 244, 0.08) 0%, rgba(155, 81, 224, 0.08) 50%, rgba(52, 168, 83, 0.08) 100%)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 12,
                  background: "linear-gradient(135deg, #4285F4 0%, #9B51E0 50%, #34A853 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#ffffff",
                  boxShadow: "0 4px 16px rgba(66, 133, 244, 0.35)",
                }}
              >
                <Sparkles size={22} />
              </div>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--color-text-primary)" }}>
                    Asistente Pedagógico
                  </h3>
                  <span
                    style={{
                      fontSize: "0.68rem",
                      fontWeight: 800,
                      padding: "2px 7px",
                      borderRadius: 99,
                      background: "rgba(66, 133, 244, 0.15)",
                      color: "#3b82f6",
                      border: "1px solid rgba(66, 133, 244, 0.3)",
                      letterSpacing: "0.04em",
                    }}
                  >
                    Google Gemini
                  </span>
                </div>
                <p style={{ fontSize: "0.78rem", color: "var(--color-text-muted)" }}>
                  Guía didáctica para docentes e instructores
                </p>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <button
                onClick={() => setMostrarConfigKey(!mostrarConfigKey)}
                className="btn btn-ghost"
                style={{ padding: "8px", borderRadius: 8, color: "var(--color-text-muted)" }}
                title="Configurar Google AI Studio API Key"
              >
                <Key size={16} />
              </button>
              <button
                onClick={onClose}
                className="btn btn-ghost"
                style={{ padding: "8px", borderRadius: 8, color: "var(--color-text-muted)" }}
                title="Cerrar panel"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Configuración de API Key si el usuario lo desea */}
          {mostrarConfigKey && (
            <div
              style={{
                padding: "14px 20px",
                background: "rgba(66, 133, 244, 0.08)",
                borderBottom: "1px solid var(--color-border)",
                fontSize: "0.82rem",
              }}
            >
              <div style={{ fontWeight: 700, marginBottom: 4, color: "var(--color-text-primary)" }}>
                Conectar con Google AI Studio (Opcional):
              </div>
              <p style={{ color: "var(--color-text-muted)", fontSize: "0.76rem", marginBottom: 8 }}>
                Si tienes una API Key de Google AI Studio puedes pegarla aquí. Si no tienes, el asistente funciona de forma autónoma con su motor pedagógico preinstalado.
              </p>
              <div style={{ display: "flex", gap: 8 }}>
                <input
                  className="dp-input"
                  type="password"
                  placeholder="Pega tu clave AIzaSy..."
                  value={apiKeyTemporal}
                  onChange={(e) => setApiKeyTemporal(e.target.value)}
                  style={{ fontSize: "0.82rem", padding: "8px 12px" }}
                />
                <button onClick={guardarKey} className="btn btn-primary" style={{ padding: "8px 14px", fontSize: "0.82rem" }}>
                  Guardar
                </button>
              </div>
            </div>
          )}

          {/* ── Barra del Alumno Contextual ── */}
          <div
            style={{
              padding: "10px 20px",
              background: "rgba(255, 255, 255, 0.03)",
              borderBottom: "1px solid var(--color-border)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontSize: "0.78rem",
            }}
          >
            <div>
              <span style={{ color: "var(--color-text-muted)" }}>Evaluando a: </span>
              <strong style={{ color: "var(--color-text-primary)" }}>{estudianteActual.nombre}</strong>{" "}
              <span style={{ color: "var(--color-text-muted)" }}>({estudianteActual.grado})</span>
            </div>
            <div
              style={{
                padding: "3px 9px",
                borderRadius: 99,
                background: "rgba(16, 185, 129, 0.15)",
                color: "var(--color-green)",
                fontWeight: 700,
                fontSize: "0.72rem",
              }}
            >
              IMC {estudianteActual.imc} · {estudianteActual.clasificacionImc.split(" ")[0]}
            </div>
          </div>

          {/* ── Lista de Mensajes ── */}
          <div
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "20px",
              display: "flex",
              flexDirection: "column",
              gap: 16,
            }}
          >
            {mensajes.map((m, idx) => (
              <div
                key={idx}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: m.remitente === "usuario" ? "flex-end" : "flex-start",
                }}
              >
                <div
                  style={{
                    maxWidth: "88%",
                    padding: "14px 18px",
                    borderRadius: 16,
                    background:
                      m.remitente === "usuario"
                        ? "linear-gradient(135deg, var(--color-green-dark), var(--color-green))"
                        : "var(--color-bg-elevated)",
                    color: m.remitente === "usuario" ? "#ffffff" : "var(--color-text-primary)",
                    border: m.remitente === "usuario" ? "none" : "1px solid var(--color-border)",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                    fontSize: "0.88rem",
                    lineHeight: 1.6,
                    whiteSpace: "pre-line",
                  }}
                >
                  {m.texto}
                </div>

                {/* Acciones para respuestas de Gemini */}
                {m.remitente === "gemini" && idx > 0 && (
                  <div style={{ display: "flex", gap: 8, marginTop: 6, paddingLeft: 4 }}>
                    <button
                      onClick={() => handleCopiarUltimo(m.texto)}
                      className="btn btn-ghost"
                      style={{ padding: "4px 10px", fontSize: "0.72rem", gap: 4 }}
                    >
                      {copiado ? <Check size={12} color="var(--color-green)" /> : <Copy size={12} />}
                      <span>{copiado ? "Copiado" : "Copiar texto"}</span>
                    </button>
                    {onInsertarObservacion && (
                      <button
                        onClick={() => handleInsertar(m.texto)}
                        className="btn btn-ghost"
                        style={{ padding: "4px 10px", fontSize: "0.72rem", gap: 4, color: "var(--color-green)" }}
                      >
                        {insertado ? <Check size={12} /> : <CornerDownRight size={12} />}
                        <span>{insertado ? "Insertado en la Ficha" : "Insertar en Ficha"}</span>
                      </button>
                    )}
                  </div>
                )}
              </div>
            ))}

            {cargando && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "12px 18px",
                  borderRadius: 14,
                  background: "var(--color-bg-elevated)",
                  border: "1px solid var(--color-border)",
                  color: "var(--color-text-muted)",
                  fontSize: "0.82rem",
                  width: "fit-content",
                }}
              >
                <RefreshCw size={14} className="animate-spin" />
                <span>Google Gemini redactando respuesta pedagógica...</span>
              </div>
            )}
          </div>

          {/* ── Atajos Rápidos en 1 Clic para Docentes ── */}
          <div
            style={{
              padding: "12px 20px 8px",
              borderTop: "1px solid var(--color-border)",
              background: "rgba(255, 255, 255, 0.02)",
            }}
          >
            <div
              style={{
                fontSize: "0.72rem",
                fontWeight: 700,
                textTransform: "uppercase",
                color: "var(--color-text-muted)",
                letterSpacing: "0.04em",
                marginBottom: 8,
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              <Lightbulb size={13} color="#f59e0b" />
              <span>Preguntas Rápidas (Toca para responder):</span>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              {ATAJOS_DOCENTE.map((a) => {
                const Icon = a.icon;
                return (
                  <button
                    key={a.id}
                    onClick={() => handleEnviar(a.prompt)}
                    disabled={cargando}
                    className="btn btn-secondary"
                    style={{
                      padding: "8px 10px",
                      fontSize: "0.74rem",
                      textAlign: "left",
                      whiteSpace: "normal",
                      lineHeight: 1.3,
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      borderRadius: 10,
                    }}
                  >
                    <Icon size={14} color={a.color} style={{ flexShrink: 0 }} />
                    <span style={{ fontWeight: 600 }}>{a.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ── Caja de Entrada de Pregunta Libre ── */}
          <div
            style={{
              padding: "14px 20px",
              borderTop: "1px solid var(--color-border)",
              display: "flex",
              gap: 10,
              background: "var(--color-bg-surface)",
            }}
          >
            <input
              className="dp-input"
              placeholder="Haz una pregunta docente... (ej: ¿Cómo evaluar este grado?)"
              value={inputTexto}
              onChange={(e) => setInputTexto(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleEnviar()}
              disabled={cargando}
              style={{ fontSize: "0.85rem", padding: "10px 14px" }}
            />
            <button
              onClick={() => handleEnviar()}
              disabled={!inputTexto.trim() || cargando}
              className="btn btn-primary"
              style={{ padding: "10px 16px", flexShrink: 0 }}
            >
              <Send size={15} />
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
