// ─────────────────────────────────────────────
// App.tsx — Orquestador principal (limpio y modular)
// ─────────────────────────────────────────────
import React, { useState } from "react";
import {
  Users, Activity, FileText, BarChart2, BrainCircuit, Check, LayoutDashboard
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { Header } from "./components/layout/Header";
import { Navigation, TabConfig } from "./components/layout/Navigation";
import { TabUsuarios }      from "./components/tabs/TabUsuarios";
import { TabAntropometria } from "./components/tabs/TabAntropometria";
import { TabPruebas }       from "./components/tabs/TabPruebas";
import { TabNutricionAI }   from "./components/tabs/TabNutricionAI";
import { TabGraficas }      from "./components/tabs/TabGraficas";
import { TabDashboard }     from "./components/tabs/TabDashboard";
import { Login }            from "./components/auth/Login";

type Role   = "ENTRENADOR" | "APRENDIZ";
type TabId  = "dashboard" | "usuarios" | "antropometria" | "pruebas" | "ia" | "graficas";

const ALL_TABS: TabConfig[] = [
  { id: "dashboard",     icon: LayoutDashboard, label: "Dashboard General",      color: "var(--color-blue)",   allowedRoles: ["ENTRENADOR", "APRENDIZ"] },
  { id: "usuarios",      icon: Users,       label: "Usuarios & Roles",        color: "var(--color-green)",  allowedRoles: ["ENTRENADOR"] },
  { id: "antropometria", icon: FileText,     label: "Ficha Antropométrica",    color: "var(--color-teal)",   allowedRoles: ["ENTRENADOR", "APRENDIZ"] },
  { id: "pruebas",       icon: Activity,    label: "Pruebas Físicas",          color: "var(--color-rose)",   allowedRoles: ["ENTRENADOR", "APRENDIZ"] },
  { id: "ia",            icon: BrainCircuit,label: "IA · Nutrición",           color: "var(--color-purple)", allowedRoles: ["ENTRENADOR", "APRENDIZ"] },
  { id: "graficas",      icon: BarChart2,   label: "Gráficas de Salud",        color: "var(--color-amber)",  allowedRoles: ["ENTRENADOR", "APRENDIZ"] },
];

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole]         = useState<Role>("ENTRENADOR");
  const [activeTab, setActiveTab] = useState<TabId>("dashboard");
  const [toast, setToast]       = useState<string | null>(null);

  const notify = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3200);
  };

  const handleRoleChange = (r: Role) => {
    setRole(r);
    setActiveTab("dashboard");
  };

  const handleLogin = (r: Role) => {
    setRole(r);
    setIsAuthenticated(true);
  };

  if (!isAuthenticated) {
    return (
      <AnimatePresence mode="wait">
        <motion.div key="login" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <Login onLogin={handleLogin} />
        </motion.div>
      </AnimatePresence>
    );
  }

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Layout */}
      <Header role={role} onRoleChange={handleRoleChange} onLogout={() => setIsAuthenticated(false)} />
      <Navigation tabs={ALL_TABS} activeTab={activeTab} role={role} onTabChange={(id) => setActiveTab(id as TabId)} />

      {/* Main */}
      <main style={{ flex: 1, maxWidth: 1280, margin: "0 auto", width: "100%", padding: "32px 24px" }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            {activeTab === "dashboard"     && <TabDashboard />}
            {activeTab === "usuarios"      && <TabUsuarios      onSave={() => notify("✓ Usuario registrado correctamente.")} />}
            {activeTab === "antropometria" && <TabAntropometria role={role} onSave={() => notify("✓ Ficha antropométrica guardada.")} />}
            {activeTab === "pruebas"       && <TabPruebas       role={role} onSave={() => notify("✓ Resultado de prueba registrado.")} />}
            {activeTab === "ia"            && <TabNutricionAI   onSave={() => notify("✓ Plan de nutrición guardado en base de datos.")} />}
            {activeTab === "graficas"      && <TabGraficas      role={role} />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.9 }}
            animate={{ opacity: 1, y: 0,  scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.9 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            style={{
              position: "fixed",
              bottom: 28,
              right: 28,
              background: "rgba(17, 24, 39, 0.95)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(34,197,94,0.3)",
              borderRadius: 14,
              padding: "14px 22px",
              display: "flex",
              alignItems: "center",
              gap: 12,
              boxShadow: "0 8px 40px rgba(0,0,0,0.6), 0 0 0 1px rgba(34,197,94,0.1)",
              zIndex: 9999,
            }}
          >
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                background: "rgba(34,197,94,0.15)",
                border: "1px solid rgba(34,197,94,0.4)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <Check size={16} color="var(--color-green)" />
            </div>
            <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--color-text-primary)" }}>{toast}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
