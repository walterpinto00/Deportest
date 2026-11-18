// ─────────────────────────────────────────────────────────────
// ModalPoliticaPrivacidad.tsx — Política de Privacidad y Tratamiento de Datos
// Cumplimiento estricto de la Ley Estatutaria 1581 de 2012, Decreto 1377 de 2013
// y normativa de protección de datos sensibles en menores de edad (Art. 7)
// ─────────────────────────────────────────────────────────────
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldCheck,
  X,
  FileText,
  AlertTriangle,
  Mail,
  Clock,
  CheckCircle2,
  Lock,
  ExternalLink
} from "lucide-react";

interface ModalPoliticaPrivacidadProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ModalPoliticaPrivacidad({ isOpen, onClose }: ModalPoliticaPrivacidadProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0, 0, 0, 0.65)",
          backdropFilter: "blur(6px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px",
          zIndex: 99999,
        }}
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 16 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          onClick={(e) => e.stopPropagation()}
          className="glass-elevated"
          style={{
            width: "100%",
            maxWidth: 680,
            maxHeight: "88vh",
            borderRadius: 20,
            background: "var(--color-bg-card)",
            border: "1.5px solid var(--color-border)",
            boxShadow: "0 25px 60px rgba(0,0,0,0.4)",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          {/* Header del Modal */}
          <div
            style={{
              padding: "20px 26px",
              borderBottom: "1px solid var(--color-border)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              background: "var(--color-bg-surface)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 12,
                  background: "rgba(16, 185, 129, 0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--color-green)",
                }}
              >
                <ShieldCheck size={22} />
              </div>
              <div>
                <h3 style={{ fontSize: "1.08rem", fontWeight: 800, color: "var(--color-text-primary)", margin: 0 }}>
                  Aviso de Privacidad & Tratamiento de Datos
                </h3>
                <span style={{ fontSize: "0.75rem", color: "var(--color-green)", fontWeight: 700 }}>
                  Ley Estatutaria 1581 de 2012 · Habeas Data Colombia
                </span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="btn btn-ghost"
              style={{ padding: "6px", borderRadius: 8, color: "var(--color-text-muted)" }}
              title="Cerrar ventana"
            >
              <X size={18} />
            </button>
          </div>

          {/* Contenido con scroll */}
          <div
            style={{
              padding: "24px 28px",
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
              gap: 20,
              fontSize: "0.85rem",
              lineHeight: 1.65,
              color: "var(--color-text-secondary)",
            }}
          >
            {/* Banner de Aviso para Menores de Edad */}
            <div
              style={{
                padding: "14px 18px",
                borderRadius: 14,
                background: "rgba(217, 119, 6, 0.12)",
                border: "1.5px solid rgba(217, 119, 6, 0.3)",
                display: "flex",
                alignItems: "flex-start",
                gap: 12,
                color: "#d97706",
              }}
            >
              <AlertTriangle size={20} style={{ flexShrink: 0, marginTop: 2 }} />
              <div>
                <strong style={{ fontSize: "0.88rem", display: "block", marginBottom: 2 }}>
                  Protección Especial y Consentimiento para Menores de Edad (Art. 7)
                </strong>
                <span>
                  El tratamiento de datos de niños, niñas y adolescentes está expresamente protegido. En caso de aprendices o atletas menores de 18 años, la autorización debe ser otorgada obligatoriamente por sus representantes legales (padres o acudientes), garantizando el respeto prevalente por sus derechos fundamentales.
                </span>
              </div>
            </div>

            {/* Punto 1: Responsable y Finalidad */}
            <div>
              <h4 style={{ fontSize: "0.95rem", fontWeight: 800, color: "var(--color-text-primary)", display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                <FileText size={16} color="var(--color-blue)" /> 1. Responsable del Tratamiento & Finalidad
              </h4>
              <p>
                <strong>DEPORTEST</strong> y las instituciones adscritas son los responsables del tratamiento de los datos personales. La información recopilada tiene como <strong>finalidad única y legítima</strong> la valoración antropométrica, seguimiento de la condición física, análisis de baremos atléticos, asesoría nutricional y generación de boletines de rendimiento formativo.
              </p>
            </div>

            {/* Punto 2: Tratamiento de Datos Sensibles */}
            <div>
              <h4 style={{ fontSize: "0.95rem", fontWeight: 800, color: "var(--color-text-primary)", display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                <Lock size={16} color="var(--color-purple)" /> 2. Tratamiento de Datos Sensibles (Salud & Biometría)
              </h4>
              <p>
                Las medidas corporales (talla, peso, perímetros, pliegues cutáneos), signos vitales e historial deportivo constituyen <strong>datos sensibles</strong> bajo el Art. 5 de la Ley 1581 de 2012. Se informa expresamente al titular que el suministro de estos datos es de carácter <strong>facultativo</strong> y que la plataforma aplica estrictas medidas técnicas y de cifrado para garantizar su confidencialidad.
              </p>
            </div>

            {/* Punto 3: Derechos ARCO del Titular */}
            <div>
              <h4 style={{ fontSize: "0.95rem", fontWeight: 800, color: "var(--color-text-primary)", display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                <CheckCircle2 size={16} color="var(--color-green)" /> 3. Derechos del Titular (Derechos ARCO)
              </h4>
              <ul style={{ margin: "4px 0 0 18px", padding: 0 }}>
                <li><strong>Acceso:</strong> Conocer los datos personales que reposan en las bases de datos.</li>
                <li><strong>Rectificación:</strong> Actualizar o corregir información parcial, inexacta o incompleta.</li>
                <li><strong>Cancelación / Supresión:</strong> Solicitar la eliminación de los datos cuando no exista deber legal o contractual de conservarlos.</li>
                <li><strong>Oposición / Revocatoria:</strong> Revocar la autorización otorgada para el tratamiento en cualquier momento.</li>
              </ul>
            </div>

            {/* Punto 4: Canal Formal de Atención PQR */}
            <div
              style={{
                padding: "16px 20px",
                borderRadius: 14,
                background: "var(--color-bg-surface)",
                border: "1px solid var(--color-border)",
                display: "flex",
                flexDirection: "column",
                gap: 10,
              }}
            >
              <h4 style={{ fontSize: "0.92rem", fontWeight: 800, color: "var(--color-text-primary)", display: "flex", alignItems: "center", gap: 8, margin: 0 }}>
                <Mail size={16} color="var(--color-blue)" /> 4. Canal Formal de Atención PQR (Derechos ARCO)
              </h4>
              <p style={{ margin: 0 }}>
                Para ejercer sus derechos de consulta, reclamo o supresión de datos personales, el titular o acudiente puede radicar su solicitud mediante los siguientes canales oficiales:
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 4 }}>
                <div style={{ background: "var(--color-bg-card)", padding: "10px 14px", borderRadius: 10, border: "1px solid var(--color-border)" }}>
                  <span style={{ fontSize: "0.72rem", color: "var(--color-text-muted)", display: "block" }}>Canal de Atención Institucional:</span>
                  <strong style={{ color: "var(--color-blue)", fontSize: "0.86rem" }}>privacidad@deportest.edu.co</strong>
                </div>
                <div style={{ background: "var(--color-bg-card)", padding: "10px 14px", borderRadius: 10, border: "1px solid var(--color-border)" }}>
                  <span style={{ fontSize: "0.72rem", color: "var(--color-text-muted)", display: "flex", alignItems: "center", gap: 4 }}>
                    <Clock size={12} /> Plazo Máximo Legal de Respuesta:
                  </span>
                  <strong style={{ color: "var(--color-text-primary)", fontSize: "0.86rem" }}>10 a 15 días hábiles</strong>
                </div>
              </div>
            </div>
          </div>

          {/* Footer del Modal */}
          <div
            style={{
              padding: "16px 26px",
              borderTop: "1px solid var(--color-border)",
              background: "var(--color-bg-surface)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 12,
            }}
          >
            <span style={{ fontSize: "0.76rem", color: "var(--color-text-muted)" }}>
              Actualizado conforme a las directrices de la Superintendencia de Industria y Comercio (SIC).
            </span>
            <button
              onClick={onClose}
              className="btn btn-primary"
              style={{ padding: "9px 20px", fontSize: "0.85rem", fontWeight: 700 }}
            >
              Entendido y Cerrar
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
