// ─────────────────────────────────────────────
// App.tsx — Orquestador principal institucional
// Diseñado para docentes: incluye gestión de tema Claro/Oscuro y Asistente Google Gemini
// ─────────────────────────────────────────────
import React, { useState, useEffect } from "react";
import {
  Users, Activity, FileText, BarChart2, Heart, Check, LayoutDashboard, Sparkles
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
import { AsistenteGeminiDocente } from "./components/ai/AsistenteGeminiDocente";
import { BuscadorInteligente } from "./components/search/BuscadorInteligente";

type Role   = "ENTRENADOR" | "APRENDIZ";
type TabId  = "dashboard" | "usuarios" | "antropometria" | "pruebas" | "graficas" | "ia";
type Theme  = "light" | "dark";

const ALL_TABS: TabConfig[] = [
  { id: "dashboard",     icon: LayoutDashboard, label: "Dashboard",             color: "#10b981", allowedRoles: ["ENTRENADOR", "APRENDIZ"] },
  { id: "usuarios",      icon: Users,           label: "Usuarios & Roles",      color: "#3b82f6", allowedRoles: ["ENTRENADOR"] },
  { id: "antropometria", icon: FileText,        label: "Ficha Antropométrica",  color: "#10b981", allowedRoles: ["ENTRENADOR", "APRENDIZ"] },
  { id: "pruebas",       icon: Activity,        label: "Pruebas Físicas",       color: "#f97316", allowedRoles: ["ENTRENADOR", "APRENDIZ"] },
  { id: "graficas",      icon: BarChart2,       label: "Gráficas & Reportes",   color: "#8b5cf6", allowedRoles: ["ENTRENADOR", "APRENDIZ"] },
  { id: "ia",            icon: Heart,           label: "Nutrición & Hábitos",   color: "#06b6d4", allowedRoles: ["ENTRENADOR", "APRENDIZ"] },
];

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole]         = useState<Role>("ENTRENADOR");
  const [activeTab, setActiveTab] = useState<TabId>("dashboard");
  const [toast, setToast]       = useState<string | null>(null);
  const [isGeminiOpen, setIsGeminiOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Modo Claro Institucional por defecto (limpio, claro y amigable para profesores)
  const [theme, setTheme] = useState<Theme>(() => {
    const guardado = localStorage.getItem("deportest_theme") as Theme;
    return guardado === "dark" ? "dark" : "light";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("deportest_theme", theme);
  }, [theme]);

  // Atajo de teclado global Ctrl + K para abrir buscador inteligente
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

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
      {/* Layout Header & Navigation */}
      <Header
        role={role}
        onRoleChange={handleRoleChange}
        onLogout={() => setIsAuthenticated(false)}
        theme={theme}
        onToggleTheme={toggleTheme}
        onOpenGemini={() => setIsGeminiOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
      />
      <Navigation tabs={ALL_TABS} activeTab={activeTab} role={role} onTabChange={(id) => setActiveTab(id as TabId)} />

      {/* Main Container Espacioso y Cómodo */}
      <main style={{ flex: 1, maxWidth: 1320, margin: "0 auto", width: "100%", padding: "26px 24px" }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            {activeTab === "dashboard"     && <TabDashboard onNavigate={(t) => setActiveTab(t as any)} />}
            {activeTab === "usuarios"      && <TabUsuarios      onSave={(msg) => notify(msg || "✓ Usuario registrado correctamente.")} />}
            {activeTab === "antropometria" && (
              <TabAntropometria
                role={role}
                onSave={() => notify("✓ Ficha antropométrica guardada con éxito.")}
                onOpenGemini={() => setIsGeminiOpen(true)}
              />
            )}
            {activeTab === "pruebas"       && <TabPruebas       role={role} onSave={() => notify("✓ Resultado de prueba registrado.")} />}
            {activeTab === "ia"            && <TabNutricionAI   onSave={() => notify("✓ Plan de nutrición guardado en base de datos.")} />}
            {activeTab === "graficas"      && <TabGraficas      role={role} />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Botón Flotante Permanente de Asistente IA Google Gemini */}
      <button
        onClick={() => setIsGeminiOpen(true)}
        className="btn"
        style={{
          position: "fixed",
          bottom: 26,
          right: 26,
          background: "linear-gradient(135deg, #4285F4 0%, #9B51E0 50%, #34A853 100%)",
          color: "#ffffff",
          padding: "12px 20px",
          borderRadius: 99,
          boxShadow: "0 8px 30px rgba(66, 133, 244, 0.4)",
          fontSize: "0.88rem",
          fontWeight: 800,
          zIndex: 90,
          gap: 8,
          cursor: "pointer",
        }}
        title="Pregúntale cualquier duda al Asistente Google Gemini"
      >
        <Sparkles size={18} />
        <span>Ayuda Google Gemini</span>
      </button>

      {/* Buscador Inteligente Global Spotlight */}
      <BuscadorInteligente
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onNavigate={(tab) => setActiveTab(tab as TabId)}
        onOpenGemini={() => setIsGeminiOpen(true)}
      />

      {/* Asistente Pedagógico IA Google AI Studio */}
      <AsistenteGeminiDocente
        isOpen={isGeminiOpen}
        onClose={() => setIsGeminiOpen(false)}
      />

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
              left: 28,
              background: "var(--color-bg-surface)",
              border: "1.5px solid var(--color-green)",
              borderRadius: 14,
              padding: "14px 22px",
              display: "flex",
              alignItems: "center",
              gap: 12,
              boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
              zIndex: 9999,
            }}
          >
            <div
              style={{
                width: 30,
                height: 30,
                borderRadius: "50%",
                background: "rgba(16, 185, 129, 0.15)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <Check size={16} color="var(--color-green)" />
            </div>
            <span style={{ fontSize: "0.88rem", fontWeight: 700, color: "var(--color-text-primary)" }}>{toast}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
