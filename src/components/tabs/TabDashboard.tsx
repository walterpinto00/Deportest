// ─────────────────────────────────────────────
// Tab: Dashboard (Inicio)
// ─────────────────────────────────────────────
import React from "react";
import { Users, Activity, TrendingUp, ShieldAlert, BarChart2, Flame } from "lucide-react";
import { motion } from "framer-motion";

export function TabDashboard() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      className="animate-fade-in" 
      variants={containerVariants}
      initial="hidden"
      animate="show"
      style={{ display: "flex", flexDirection: "column", gap: 24 }}
    >
      
      {/* ── Widgets Superiores ── */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16 }}>
        {[
          { label: "Atletas Registrados", value: "248", sub: "+12 este mes", icon: Users, color: "var(--color-blue)" },
          { label: "Sesiones Activas", value: "34", sub: "En este momento", icon: Flame, color: "var(--color-amber)" },
          { label: "Alertas Médicas", value: "5", sub: "IMC en riesgo", icon: ShieldAlert, color: "var(--color-rose)" },
          { label: "Rendimiento Global", value: "87%", sub: "Promedio mensual", icon: TrendingUp, color: "var(--color-green)" },
        ].map((stat, i) => (
          <motion.div key={i} variants={itemVariants} className="glass" style={{ padding: 24, position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: -20, right: -20, opacity: 0.05, transform: "scale(2)" }}>
              <stat.icon size={64} color={stat.color} />
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: `color-mix(in srgb, ${stat.color} 15%, transparent)`, display: "flex", alignItems: "center", justifyContent: "center", border: `1px solid color-mix(in srgb, ${stat.color} 30%, transparent)` }}>
                <stat.icon size={20} color={stat.color} />
              </div>
              <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--color-text-secondary)", textTransform: "uppercase", letterSpacing: "0.05em" }}>{stat.label}</span>
            </div>
            <div style={{ fontSize: "2.5rem", fontWeight: 900, color: "#fff", lineHeight: 1 }}>{stat.value}</div>
            <div style={{ fontSize: "0.75rem", color: stat.color, marginTop: 8, fontWeight: 600 }}>{stat.sub}</div>
          </motion.div>
        ))}
      </div>

      {/* ── Gráficas y Distribución ── */}
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 24 }}>
        
        {/* Rendimiento por Deporte */}
        <motion.div variants={itemVariants} className="glass-elevated" style={{ padding: 32 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24 }}>
            <BarChart2 size={20} color="var(--color-teal)" />
            <h3 style={{ fontSize: "1.1rem", fontWeight: 800 }}>Rendimiento por Disciplina</h3>
          </div>
          
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {[
              { nombre: "Fútbol", pct: 92, color: "var(--color-blue)" },
              { nombre: "Baloncesto", pct: 78, color: "var(--color-amber)" },
              { nombre: "Voleibol", pct: 85, color: "var(--color-purple)" },
              { nombre: "Atletismo", pct: 95, color: "var(--color-teal)" },
            ].map((dep, i) => (
              <div key={i}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                  <span style={{ fontSize: "0.85rem", fontWeight: 600 }}>{dep.nombre}</span>
                  <span style={{ fontSize: "0.85rem", fontWeight: 800, color: dep.color }}>{dep.pct}%</span>
                </div>
                <div style={{ height: 8, background: "rgba(255,255,255,0.05)", borderRadius: 4, overflow: "hidden" }}>
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${dep.pct}%` }}
                    transition={{ duration: 1, delay: 0.2 + i * 0.1, ease: "easeOut" }}
                    style={{ height: "100%", background: dep.color, borderRadius: 4, boxShadow: `0 0 10px ${dep.color}88` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Distribución de IMC */}
        <motion.div variants={itemVariants} className="glass-elevated" style={{ padding: 32, display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24 }}>
            <Activity size={20} color="var(--color-green)" />
            <h3 style={{ fontSize: "1.1rem", fontWeight: 800 }}>Estado de Salud Global</h3>
          </div>
          
          <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", gap: 16 }}>
            {[
              { label: "Peso Normal", val: "65%", color: "var(--color-green)" },
              { label: "Sobrepeso", val: "20%", color: "var(--color-amber)" },
              { label: "Bajo Peso", val: "10%", color: "var(--color-blue)" },
              { label: "Obesidad", val: "5%", color: "var(--color-rose)" },
            ].map((st, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 16px", background: "rgba(255,255,255,0.02)", borderRadius: 12, border: "1px solid rgba(255,255,255,0.05)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 10, height: 10, borderRadius: "50%", background: st.color, boxShadow: `0 0 8px ${st.color}` }} />
                  <span style={{ fontSize: "0.85rem", color: "var(--color-text-secondary)" }}>{st.label}</span>
                </div>
                <span style={{ fontSize: "0.9rem", fontWeight: 700, color: st.color }}>{st.val}</span>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </motion.div>
  );
}
