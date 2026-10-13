// ─────────────────────────────────────────────────────────────
// BuscadorInteligente.tsx — Buscador Inteligente Global Spotlight
// Diseñado para instructores SENA y docentes:
// Búsqueda en tiempo real de aprendices, pruebas físicas y funciones
// ─────────────────────────────────────────────────────────────
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  X,
  User,
  Activity,
  FileText,
  Heart,
  BarChart2,
  Sparkles,
  Printer,
  ChevronRight,
  Shield,
  Zap,
  ArrowRight,
  UserPlus
} from "lucide-react";
import { userService, Usuario } from "../../services/userService";

interface BuscadorInteligenteProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (tabId: string, param?: string) => void;
  onOpenGemini: () => void;
}

const PRUEBAS_SEARCH = [
  {
    id: "cooper",
    nombre: "Test de Cooper (12 Minutos)",
    categoria: "Resistencia Aeróbica",
    desc: "Medición de resistencia cardiorrespiratoria en pista o terreno plano.",
    unidad: "metros",
  },
  {
    id: "flexiones",
    nombre: "Flexiones de Brazo (1 Minuto)",
    categoria: "Fuerza Resistencia",
    desc: "Evaluación de fuerza dinámica en tren superior y core.",
    unidad: "repeticiones",
  },
  {
    id: "salto",
    nombre: "Salto Horizontal sin Impulso",
    categoria: "Potencia Muscular",
    desc: "Prueba de potencia explosiva de miembros inferiores.",
    unidad: "centímetros",
  },
  {
    id: "navette",
    nombre: "Course-Navette (Palieres de 20m)",
    categoria: "Capacidad Aeróbica Máxima",
    desc: "Test progresivo de ida y vuelta para cálculo indirecto de VO2 Máx.",
    unidad: "palieres",
  },
  {
    id: "flexibilidad",
    nombre: "Test de Flexibilidad de Wells (Sit and Reach)",
    categoria: "Flexibilidad & Rango Articular",
    desc: "Medición de elasticidad en zona lumbar e isquiotibiales.",
    unidad: "centímetros (+/-)",
  },
];

const ACCIONES_SISTEMA = [
  {
    id: "act-registro",
    titulo: "Registrar Nuevo Usuario o Aprendiz",
    sub: "Ir al formulario de usuarios & generador de avatar",
    tab: "usuarios",
    icon: UserPlus,
    color: "#3b82f6",
  },
  {
    id: "act-antropo",
    titulo: "Ficha Antropométrica Oficial (Protocolo OMS)",
    sub: "Calcular IMC, pliegues cutáneos y diagnóstico nutricional",
    tab: "antropometria",
    icon: FileText,
    color: "#10b981",
  },
  {
    id: "act-pruebas",
    titulo: "Batería de Pruebas Físicas & Calificación",
    sub: "Registrar marcas y obtener puntajes según baremos",
    tab: "pruebas",
    icon: Activity,
    color: "#f97316",
  },
  {
    id: "act-graficas",
    titulo: "Gráficas & Reportes de Evolución",
    sub: "Visualizar curvas de progreso atlético y percentiles",
    tab: "graficas",
    icon: BarChart2,
    color: "#8b5cf6",
  },
  {
    id: "act-nutricion",
    titulo: "Nutrición & Hábitos Saludables (IA)",
    sub: "Planes de lonchera escolar, macronutrientes y descanso",
    tab: "ia",
    icon: Heart,
    color: "#06b6d4",
  },
  {
    id: "act-gemini",
    titulo: "Consultar al Asistente Google Gemini",
    sub: "Redactar informes, notas para padres o sugerencias de entrenamiento",
    action: "gemini",
    icon: Sparkles,
    color: "#4285F4",
  },
  {
    id: "act-print",
    titulo: "Imprimir / Exportar Reporte en PDF",
    sub: "Generar documento oficial para presentación escolar o SENA",
    action: "print",
    icon: Printer,
    color: "#64748b",
  },
];

export function BuscadorInteligente({
  isOpen,
  onClose,
  onNavigate,
  onOpenGemini,
}: BuscadorInteligenteProps) {
  const [query, setQuery] = useState("");
  const [usuarios, setUsuarios] = useState<Usuario[]>(() => userService.getUsuarios());
  const [filtro, setFiltro] = useState<"TODOS" | "ALUMNOS" | "PRUEBAS" | "ACCIONES">("TODOS");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setUsuarios(userService.getUsuarios());
      setTimeout(() => inputRef.current?.focus(), 80);
    } else {
      setQuery("");
    }
  }, [isOpen]);

  // Cerrar con Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const q = query.toLowerCase().trim();

  // Filtrado de aprendices
  const aprendicesCoincidentes = usuarios.filter((u) => {
    if (filtro !== "TODOS" && filtro !== "ALUMNOS") return false;
    if (!q) return true;
    return (
      u.nombres.toLowerCase().includes(q) ||
      u.apellidos.toLowerCase().includes(q) ||
      u.numDoc.includes(q) ||
      u.email.toLowerCase().includes(q) ||
      (u.grado && u.grado.toLowerCase().includes(q)) ||
      u.rol.toLowerCase().includes(q)
    );
  });

  // Filtrado de pruebas físicas
  const pruebasCoincidentes = PRUEBAS_SEARCH.filter((p) => {
    if (filtro !== "TODOS" && filtro !== "PRUEBAS") return false;
    if (!q) return true;
    return (
      p.nombre.toLowerCase().includes(q) ||
      p.categoria.toLowerCase().includes(q) ||
      p.desc.toLowerCase().includes(q)
    );
  });

  // Filtrado de acciones del sistema
  const accionesCoincidentes = ACCIONES_SISTEMA.filter((a) => {
    if (filtro !== "TODOS" && filtro !== "ACCIONES") return false;
    if (!q) return true;
    return (
      a.titulo.toLowerCase().includes(q) ||
      a.sub.toLowerCase().includes(q)
    );
  });

  const totalResultados =
    aprendicesCoincidentes.length + pruebasCoincidentes.length + accionesCoincidentes.length;

  return (
    <AnimatePresence>
      <div
        role="dialog"
        aria-modal="true"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 999,
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "center",
          paddingTop: "7vh",
          paddingLeft: 16,
          paddingRight: 16,
        }}
      >
        {/* Fondo oscuro con desenfoque */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(15, 23, 42, 0.65)",
            backdropFilter: "blur(8px)",
          }}
        />

        {/* Modal de Búsqueda Inteligente */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: -16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: -16 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          style={{
            position: "relative",
            width: "100%",
            maxWidth: 760,
            background: "var(--color-bg-surface)",
            borderRadius: 22,
            border: "1.5px solid var(--color-border)",
            boxShadow: "0 25px 60px rgba(0, 0, 0, 0.35)",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            maxHeight: "85vh",
          }}
        >
          {/* Barra de Entrada de Búsqueda */}
          <div
            style={{
              padding: "20px 24px",
              borderBottom: "1.5px solid var(--color-border)",
              display: "flex",
              alignItems: "center",
              gap: 14,
              background: "var(--color-bg-card)",
            }}
          >
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 10,
                background: "rgba(16, 185, 129, 0.12)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--color-green)",
                flexShrink: 0,
              }}
            >
              <Search size={20} />
            </div>

            <input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Escribe el nombre de un alumno, cédula, prueba (ej: Cooper) o acción..."
              style={{
                width: "100%",
                background: "transparent",
                border: "none",
                outline: "none",
                fontSize: "1.05rem",
                fontWeight: 600,
                color: "var(--color-text-primary)",
                fontFamily: "var(--font-sans)",
              }}
            />

            {query && (
              <button
                onClick={() => setQuery("")}
                style={{
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  color: "var(--color-text-muted)",
                  padding: 4,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <X size={18} />
              </button>
            )}

            <button
              onClick={onClose}
              style={{
                fontSize: "0.72rem",
                fontWeight: 700,
                padding: "4px 8px",
                borderRadius: 6,
                background: "var(--color-bg-surface)",
                border: "1px solid var(--color-border)",
                color: "var(--color-text-muted)",
                cursor: "pointer",
              }}
            >
              ESC
            </button>
          </div>

          {/* Filtros Rápidos */}
          <div
            style={{
              padding: "10px 24px",
              background: "var(--color-bg-surface)",
              borderBottom: "1px solid var(--color-border)",
              display: "flex",
              gap: 8,
              alignItems: "center",
              overflowX: "auto",
            }}
          >
            <span style={{ fontSize: "0.75rem", color: "var(--color-text-muted)", fontWeight: 700 }}>
              FILTRAR:
            </span>
            {[
              { id: "TODOS", label: "Todo" },
              { id: "ALUMNOS", label: "Aprendices & Atletas" },
              { id: "PRUEBAS", label: "Pruebas Físicas" },
              { id: "ACCIONES", label: "Módulos & Herramientas" },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setFiltro(f.id as any)}
                style={{
                  fontSize: "0.75rem",
                  fontWeight: filtro === f.id ? 800 : 600,
                  padding: "4px 12px",
                  borderRadius: 99,
                  border: `1.5px solid ${filtro === f.id ? "var(--color-green)" : "var(--color-border)"}`,
                  background: filtro === f.id ? "rgba(16, 185, 129, 0.12)" : "transparent",
                  color: filtro === f.id ? "var(--color-green)" : "var(--color-text-secondary)",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                }}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Lista de Resultados con Scroll Suave */}
          <div
            style={{
              padding: "16px 24px",
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
              gap: 20,
              flex: 1,
            }}
          >
            {totalResultados === 0 ? (
              <div style={{ textAlign: "center", padding: "40px 20px" }}>
                <Search size={36} color="var(--color-text-muted)" style={{ margin: "0 auto 12px" }} />
                <p style={{ fontWeight: 700, color: "var(--color-text-primary)" }}>
                  No se encontraron resultados para "{query}"
                </p>
                <p style={{ fontSize: "0.82rem", color: "var(--color-text-muted)", marginTop: 4 }}>
                  Intenta buscar por el nombre de un alumno (ej: Juan Camilo, Valentina), una prueba (ej: Cooper, Flexiones) o un módulo.
                </p>
              </div>
            ) : (
              <>
                {/* 1. SECCIÓN APRENDICES & ATLETAS */}
                {aprendicesCoincidentes.length > 0 && (
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                      <span style={{ fontSize: "0.76rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.04em", color: "var(--color-text-muted)" }}>
                        🏃 Aprendices & Atletas Registrados ({aprendicesCoincidentes.length})
                      </span>
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                      {aprendicesCoincidentes.slice(0, 6).map((user) => {
                        const edad = userService.calcularEdad(user.fechaNacimiento);
                        return (
                          <div
                            key={user.id}
                            style={{
                              padding: "12px 16px",
                              borderRadius: 14,
                              background: "var(--color-bg-card)",
                              border: "1px solid var(--color-border)",
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              gap: 12,
                              transition: "all 0.15s ease",
                            }}
                          >
                            {/* Información del Alumno */}
                            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                              <div
                                style={{
                                  width: 42,
                                  height: 42,
                                  borderRadius: "50%",
                                  overflow: "hidden",
                                  border: "1.5px solid var(--color-border)",
                                  background: "var(--color-bg-surface)",
                                  flexShrink: 0,
                                }}
                              >
                                <img
                                  src={user.avatarUrl}
                                  alt={user.nombres}
                                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                />
                              </div>
                              <div>
                                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                  <span style={{ fontWeight: 800, color: "var(--color-text-primary)", fontSize: "0.92rem" }}>
                                    {user.nombres} {user.apellidos}
                                  </span>
                                  <span
                                    style={{
                                      fontSize: "0.68rem",
                                      fontWeight: 800,
                                      padding: "1px 7px",
                                      borderRadius: 6,
                                      background: user.rol === "ENTRENADOR" ? "rgba(59, 130, 246, 0.15)" : "rgba(16, 185, 129, 0.15)",
                                      color: user.rol === "ENTRENADOR" ? "var(--color-blue)" : "var(--color-green)",
                                    }}
                                  >
                                    {user.rol}
                                  </span>
                                </div>
                                <div style={{ fontSize: "0.76rem", color: "var(--color-text-secondary)", marginTop: 2 }}>
                                  Doc: <strong>{user.numDoc}</strong> • {user.grado || "Programa SENA"} {edad ? `• ${edad} años` : ""}
                                </div>
                              </div>
                            </div>

                            {/* Acciones Rápidas con 1 Clic */}
                            <div style={{ display: "flex", gap: 6 }}>
                              <button
                                onClick={() => {
                                  onNavigate("antropometria", user.id);
                                  onClose();
                                }}
                                className="btn btn-secondary"
                                style={{ fontSize: "0.74rem", padding: "6px 10px", borderRadius: 8, gap: 4 }}
                                title="Ver Ficha Antropométrica"
                              >
                                <FileText size={12} color="var(--color-green)" />
                                <span>Ficha</span>
                              </button>

                              <button
                                onClick={() => {
                                  onNavigate("pruebas", `${user.numDoc} — ${user.nombres} ${user.apellidos}`);
                                  onClose();
                                }}
                                className="btn btn-secondary"
                                style={{ fontSize: "0.74rem", padding: "6px 10px", borderRadius: 8, gap: 4 }}
                                title="Evaluar Pruebas Físicas"
                              >
                                <Activity size={12} color="#f97316" />
                                <span>Prueba</span>
                              </button>

                              <button
                                onClick={() => {
                                  onNavigate("ia", user.id);
                                  onClose();
                                }}
                                className="btn btn-secondary"
                                style={{ fontSize: "0.74rem", padding: "6px 10px", borderRadius: 8, gap: 4 }}
                                title="Ver Plan de Nutrición & Hábitos"
                              >
                                <Heart size={12} color="#06b6d4" />
                                <span>Nutrición</span>
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* 2. SECCIÓN PRUEBAS FÍSICAS */}
                {pruebasCoincidentes.length > 0 && (
                  <div>
                    <span style={{ fontSize: "0.76rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.04em", color: "var(--color-text-muted)", display: "block", marginBottom: 10 }}>
                      ⚡ Batería de Pruebas Físicas ({pruebasCoincidentes.length})
                    </span>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                      {pruebasCoincidentes.map((p) => (
                        <div
                          key={p.id}
                          onClick={() => {
                            onNavigate("pruebas");
                            onClose();
                          }}
                          style={{
                            padding: "14px 16px",
                            borderRadius: 14,
                            background: "var(--color-bg-card)",
                            border: "1px solid var(--color-border)",
                            cursor: "pointer",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <div>
                            <div style={{ fontWeight: 800, color: "var(--color-text-primary)", fontSize: "0.88rem" }}>
                              {p.nombre}
                            </div>
                            <div style={{ fontSize: "0.74rem", color: "var(--color-text-muted)", marginTop: 2 }}>
                              {p.categoria} ({p.unidad})
                            </div>
                          </div>
                          <ChevronRight size={16} color="var(--color-text-muted)" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 3. SECCIÓN ACCIONES RÁPIDAS & HERRAMIENTAS */}
                {accionesCoincidentes.length > 0 && (
                  <div>
                    <span style={{ fontSize: "0.76rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.04em", color: "var(--color-text-muted)", display: "block", marginBottom: 10 }}>
                      🛠️ Módulos & Herramientas del Sistema ({accionesCoincidentes.length})
                    </span>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                      {accionesCoincidentes.map((a) => {
                        const Icon = a.icon;
                        return (
                          <div
                            key={a.id}
                            onClick={() => {
                              if (a.action === "gemini") {
                                onOpenGemini();
                              } else if (a.action === "print") {
                                window.print();
                              } else if (a.tab) {
                                onNavigate(a.tab);
                              }
                              onClose();
                            }}
                            style={{
                              padding: "12px 14px",
                              borderRadius: 14,
                              background: "var(--color-bg-card)",
                              border: "1px solid var(--color-border)",
                              cursor: "pointer",
                              display: "flex",
                              alignItems: "center",
                              gap: 12,
                            }}
                          >
                            <div
                              style={{
                                width: 34,
                                height: 34,
                                borderRadius: 8,
                                background: `${a.color}18`,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                color: a.color,
                                flexShrink: 0,
                              }}
                            >
                              <Icon size={16} />
                            </div>
                            <div style={{ flex: 1, minWidth: 0 }}>
                              <div style={{ fontWeight: 700, color: "var(--color-text-primary)", fontSize: "0.84rem", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                                {a.titulo}
                              </div>
                              <div style={{ fontSize: "0.72rem", color: "var(--color-text-muted)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                                {a.sub}
                              </div>
                            </div>
                            <ArrowRight size={14} color="var(--color-text-muted)" />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Pie de Página con Atajo de Teclado */}
          <div
            style={{
              padding: "12px 24px",
              background: "var(--color-bg-card)",
              borderTop: "1px solid var(--color-border)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontSize: "0.74rem",
              color: "var(--color-text-muted)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span>💡 Tip: Puedes presionar <kbd style={{ padding: "2px 6px", background: "var(--color-bg-surface)", border: "1px solid var(--color-border)", borderRadius: 4 }}>Ctrl</kbd> + <kbd style={{ padding: "2px 6px", background: "var(--color-bg-surface)", border: "1px solid var(--color-border)", borderRadius: 4 }}>K</kbd> en cualquier momento para abrir el buscador.</span>
            </div>
            <button
              onClick={onClose}
              className="btn btn-ghost"
              style={{ padding: "4px 10px", fontSize: "0.72rem", borderRadius: 6 }}
            >
              Cerrar Buscador
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
