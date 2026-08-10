import React, { useState, useMemo } from "react";
import { 
  Users, 
  Activity, 
  FileText, 
  BarChart2,
  BrainCircuit,
  Save,
  Check,
  Search,
  Calendar,
  RefreshCw,
  Info,
  Dumbbell
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { 
  LineChart, 
  Line, 
  BarChart,
  Bar,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';

type Role = "INSTRUCTOR" | "APRENDIZ";

export default function App() {
  const [role, setRole] = useState<Role>("INSTRUCTOR");
  const [activeTab, setActiveTab] = useState<"usuarios" | "antropometria" | "pruebas" | "ia" | "graficas">("antropometria");
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMsg, setNotificationMsg] = useState("");

  const triggerNotification = (msg: string) => {
    setNotificationMsg(msg);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  // Mock data for historical charts
  const historialPruebas = [
    { fecha: 'Ene 2023', cooper: 1800, flexiones: 25, velocidad: 9.5 },
    { fecha: 'Abr 2023', cooper: 1950, flexiones: 32, velocidad: 9.0 },
    { fecha: 'Jul 2023', cooper: 2100, flexiones: 38, velocidad: 8.5 },
    { fecha: 'Oct 2023', cooper: 2300, flexiones: 45, velocidad: 8.0 },
  ];

  const historialAntropo = [
    { fecha: 'Ene 2023', peso: 75.5, cintura: 88, grasa: 22 },
    { fecha: 'Abr 2023', peso: 74.0, cintura: 85, grasa: 20 },
    { fecha: 'Jul 2023', peso: 72.5, cintura: 82, grasa: 18 },
    { fecha: 'Oct 2023', peso: 71.0, cintura: 80, grasa: 16 },
  ];

  const allTabs = [
    { id: "usuarios", icon: Users, label: "Usuarios & Roles", allowedRoles: ["INSTRUCTOR"] },
    { id: "antropometria", icon: FileText, label: "Ficha Antropométrica", allowedRoles: ["INSTRUCTOR", "APRENDIZ"] },
    { id: "pruebas", icon: Activity, label: "Pruebas Físicas", allowedRoles: ["INSTRUCTOR", "APRENDIZ"] },
    { id: "ia", icon: BrainCircuit, label: "IA: Nutrición y Ejercicio", allowedRoles: ["INSTRUCTOR", "APRENDIZ"] },
    { id: "graficas", icon: BarChart2, label: "Gráficas de Salud", allowedRoles: ["INSTRUCTOR", "APRENDIZ"] },
  ];

  const visibleTabs = allTabs.filter(tab => tab.allowedRoles.includes(role));

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-gray-900">
      {/* Header */}
      <header className="bg-slate-900 text-white shadow-md z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center shadow-lg">
              <Activity className="text-white w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">DEPORTEST PRO</h1>
              <p className="text-xs text-green-300 font-medium">Plataforma Atlética y Nutricional AI</p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-sm font-medium">
            <div className="flex items-center gap-2 bg-slate-800 px-3 py-1.5 rounded-full border border-slate-700">
              <span className="text-slate-400">Rol:</span>
              <select 
                value={role} 
                onChange={(e) => {
                  setRole(e.target.value as Role);
                  setActiveTab("antropometria");
                }}
                className="bg-transparent text-white outline-none font-bold"
              >
                <option value="INSTRUCTOR">Instructor</option>
                <option value="APRENDIZ">Aprendiz</option>
              </select>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex overflow-x-auto custom-scrollbar">
          {visibleTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-5 py-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? "border-green-600 text-green-700 bg-green-50/50"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 hover:bg-gray-50"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative">
        <AnimatePresence mode="wait">
          {activeTab === "usuarios" && (
            <TabUsuarios key="usuarios" onSave={() => triggerNotification("Usuario guardado en la base de datos.")} />
          )}
          {activeTab === "antropometria" && (
            <TabAntropometria key="antropometria" role={role} onSave={() => triggerNotification("Ficha antropométrica actualizada.")} />
          )}
          {activeTab === "pruebas" && (
            <TabPruebas key="pruebas" role={role} onSave={() => triggerNotification("Resultado de prueba registrado.")} />
          )}
          {activeTab === "ia" && (
            <TabNutricionAI key="ia" onSave={() => triggerNotification("Plan de nutrición guardado con éxito.")} />
          )}
          {activeTab === "graficas" && (
            <TabGraficas key="graficas" historialPruebas={historialPruebas} historialAntropo={historialAntropo} role={role} />
          )}
        </AnimatePresence>
      </main>

      {/* Global Notification */}
      <AnimatePresence>
        {showNotification && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-6 right-6 bg-slate-900 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 border border-slate-700 z-50"
          >
            <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
              <Check className="w-5 h-5 text-green-400" />
            </div>
            <p className="font-medium text-sm">{notificationMsg}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// -----------------------------------------------------------------------------
// TAB COMPONENTS
// -----------------------------------------------------------------------------

function TabUsuarios({ onSave }: { onSave: () => void, key?: string }) {
  const [avatarSeed, setAvatarSeed] = useState("descripcion");
  const [avatarStyle, setAvatarStyle] = useState("dylan");

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden"
    >
      <div className="px-6 py-5 border-b border-gray-200 bg-gray-50/50">
        <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
          <Users className="w-5 h-5 text-green-600" />
          Registro y Perfil de Usuario
        </h2>
        <p className="text-sm text-gray-500 mt-1">Crea un nuevo usuario, define su rol y personaliza su avatar.</p>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4 md:col-span-2">
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Credenciales de Acceso</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input label="Correo Electrónico (Único)" type="email" placeholder="usuario@correo.com" />
              <Input label="Contraseña (Se aplicará Hash en BD)" type="password" placeholder="••••••••" />
              <Select label="Rol en el Sistema">
                <option>APRENDIZ</option>
                <option>INSTRUCTOR</option>
                <option>ADMINISTRADOR</option>
                <option>BIENESTAR</option>
              </Select>
            </div>
          </div>
          
          <div className="space-y-4 md:col-span-2 mt-4">
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Datos Personales</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select label="Tipo Identificación">
                <option>Cédula de Ciudadanía (CC)</option>
                <option>Tarjeta de Identidad (TI)</option>
                <option>Cédula de Extranjería (CE)</option>
              </Select>
              <Input label="Número de Identificación" placeholder="Ej: 1001234567" />
              <Input label="Nombres" placeholder="Ej: Juan" />
              <Input label="Apellidos" placeholder="Ej: Perez" />
              <Select label="Género">
                <option>Masculino</option>
                <option>Femenino</option>
                <option>Otro</option>
              </Select>
              <Input label="Fecha de Nacimiento" type="date" />
            </div>
          </div>

          <div className="space-y-4 md:col-span-2 mt-4">
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Personalizar Avatar</h3>
            <div className="flex flex-col md:flex-row items-center gap-8 bg-green-50/50 p-6 rounded-xl border border-green-100">
              <div className="w-32 h-32 rounded-full border-4 border-green-200 overflow-hidden bg-white shadow-sm shrink-0">
                <img 
                  src={`https://api.dicebear.com/9.x/${avatarStyle}/svg?seed=${avatarSeed}&backgroundColor=c0aede,b6e3f4,ffdfbf`} 
                  alt="Avatar Preview" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 space-y-4 w-full">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-gray-700 uppercase tracking-wide">Estilo del Avatar</label>
                  <select 
                    value={avatarStyle} 
                    onChange={(e) => setAvatarStyle(e.target.value)}
                    className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="dylan">Dylan (Profesional y Limpio)</option>
                    <option value="avataaars-neutral">Avataaars Neutro (Clásico)</option>
                    <option value="miniavs">Miniavs (Minimalista)</option>
                    <option value="pixel-art">Pixel Art (Retro)</option>
                    <option value="fun-emoji">Emojis Divertidos (Caras)</option>
                    <option value="bottts-neutral">Robots (Bottts Neutros)</option>
                    <option value="initials">Iniciales (Corporativo)</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-gray-700 uppercase tracking-wide">Descripción</label>
                  <input 
                    type="text" 
                    value={avatarSeed}
                    onChange={(e) => setAvatarSeed(e.target.value)}
                    placeholder="Escribe una descripción para generar el avatar..."
                    className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>
            </div>
          </div>

        </div>
        <div className="mt-8 flex justify-end pt-6 border-t border-gray-100">
          <button onClick={onSave} className="flex items-center gap-2 bg-green-600 text-white px-6 py-2.5 rounded-lg hover:bg-green-700 font-medium transition-colors">
            <Save className="w-4 h-4" />
            Registrar Usuario
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function TabAntropometria({ onSave, role }: { onSave: () => void, role: string, key?: string }) {
  const [subTab, setSubTab] = useState<"datos" | "perimetros" | "pliegues" | "clinico">("datos");

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="max-w-5xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden"
    >
      <div className="px-6 py-5 border-b border-gray-200 bg-gray-50/50 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div>
          <h2 className="text-lg font-bold text-teal-700 flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Ficha Antropométrica
          </h2>
        </div>
        {role === "INSTRUCTOR" && (
          <div className="flex gap-4 items-center flex-wrap">
            <Input label="Documento" placeholder="ID..." />
            <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 mt-5">Buscar</button>
            <Input label="Aprendiz Seleccionado" placeholder="Nombre completo" readOnly />
            <Input label="Programa" placeholder="ADSO" readOnly />
          </div>
        )}
      </div>

      {/* Sub Tabs */}
      <div className="flex border-b border-gray-200 bg-white px-6 mt-4">
        {["datos", "perimetros", "pliegues", "clinico"].map((tab) => (
          <button
            key={tab}
            onClick={() => setSubTab(tab as any)}
            className={`px-4 py-2 text-sm font-medium border-b-2 capitalize transition-colors ${
              subTab === tab
                ? "border-teal-500 text-teal-600"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab === "clinico" ? "Análisis Clínico" : tab}
          </button>
        ))}
      </div>

      <div className="p-6 bg-slate-50 min-h-[400px]">
        {subTab === "datos" && (
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm max-w-2xl mx-auto">
             <div className="flex justify-between items-center mb-6">
               <h3 className="text-sm font-bold text-teal-600 uppercase tracking-wider">Datos Básicos y Evaluador</h3>
               <div className="w-40"><Input label="Fecha" type="date" /></div>
             </div>
             <div className="space-y-4">
                <Input label="Evaluador" placeholder="Nombre del instructor" />
                <Input label="Edad" type="number" />
                <Input label="Talla (m)" type="number" step="0.01" />
                <Input label="Peso (kg)" type="number" step="0.1" />
             </div>
          </div>
        )}

        {subTab === "perimetros" && (
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
             <div className="flex justify-end mb-6">
               <div className="w-40"><Input label="Fecha" type="date" /></div>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
                <Input label="Hombro (cm)" type="number" />
                <Input label="Cadera (cm)" type="number" />
                <Input label="Tórax (cm)" type="number" />
                <Input label="Muslo Superior (cm)" type="number" />
                <Input label="Brazo Derecho (cm)" type="number" />
                <Input label="Muslo Medio (cm)" type="number" />
                <Input label="Brazo Izquierdo (cm)" type="number" />
                <Input label="Muslo Inferior (cm)" type="number" />
                <Input label="Cintura (cm)" type="number" />
                <Input label="Pierna (cm)" type="number" />
             </div>
          </div>
        )}

        {subTab === "pliegues" && (
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
             <div className="flex justify-end mb-6">
               <div className="w-40"><Input label="Fecha" type="date" /></div>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
                <Input label="Bicipital (mm)" type="number" />
                <Input label="Abdominal (mm)" type="number" />
                <Input label="Tricipital (mm)" type="number" />
                <Input label="Muslo (mm)" type="number" />
                <Input label="Subescapular (mm)" type="number" />
                <Input label="Pantorrilla (mm)" type="number" />
                <Input label="Suprailiaco (mm)" type="number" />
             </div>
          </div>
        )}

        {subTab === "clinico" && (
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
             <div className="flex justify-end mb-6">
               <div className="w-40"><Input label="Fecha" type="date" /></div>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                <div>
                  <h3 className="text-sm font-bold text-gray-700 mb-4">Signos Vitales e Índices Corporales</h3>
                  <div className="space-y-4">
                    <Input label="Tensión Arterial" placeholder="Ej: 120/80" />
                    <Input label="Peso Ideal" type="number" />
                    <Input label="Índice de Obesidad" type="number" />
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-700 mb-4">Evaluación Postural</h3>
                  <div className="space-y-4">
                    <Input label="Escoliosis" placeholder="Normal/Leve..." />
                    <Input label="Cifosis" placeholder="Normal/Leve..." />
                    <Input label="Lordosis" placeholder="Normal/Leve..." />
                  </div>
                </div>
             </div>
          </div>
        )}

        <div className="mt-6 flex justify-end">
          <button onClick={onSave} className="flex items-center gap-2 bg-teal-600 text-white px-6 py-2.5 rounded-lg hover:bg-teal-700 font-medium transition-colors">
            <Save className="w-4 h-4" />
            Guardar Ficha
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function TabPruebas({ onSave, role }: { onSave: () => void, role: string, key?: string }) {
  const [selectedTest, setSelectedTest] = useState("cooper");

  const testInstructions: Record<string, { title: string, desc: string, icon: any, details: string[] }> = {
    "cooper": {
      title: "Test de Cooper (12 min)",
      desc: "Prueba de resistencia aeróbica que consiste en recorrer la mayor distancia posible en 12 minutos a velocidad constante.",
      details: [
        "Mide el VO2 máximo (consumo de oxígeno).",
        "Se recomienda realizar en una pista de atletismo plana de 400m.",
        "El resultado se anota en metros recorridos."
      ],
      icon: Activity
    },
    "ruffier": {
      title: "Test de Ruffier-Dickson",
      desc: "Prueba que mide la adaptación y recuperación cardiovascular tras un esfuerzo corto e intenso.",
      details: [
        "1. Toma tus pulsaciones en reposo durante 1 minuto (P1).",
        "2. Realiza 30 sentadillas profundas a ritmo constante en 45 segundos y toma el pulso (P2).",
        "3. Descansa 1 minuto sentado y vuelve a tomar el pulso (P3).",
        "El sistema aplica la fórmula: (P1 + P2 + P3 - 200) / 10."
      ],
      icon: Activity
    },
    "velocidad": {
      title: "Velocidad 50 metros",
      desc: "Mide la velocidad de traslación o desplazamiento en una distancia corta, partiendo de posición de pie.",
      details: [
        "Se debe correr en una superficie plana y antideslizante.",
        "Se utiliza cronómetro y se inicia al momento de decir '¡Ya!'.",
        "Se anota el tiempo exacto en segundos y centésimas."
      ],
      icon: Activity
    },
    "flexiones": {
      title: "Test de Fuerza (Flexiones)",
      desc: "Evalúa la fuerza resistencia de la musculatura de brazos, pectorales y zona media.",
      details: [
        "Realizar la mayor cantidad de flexiones de pecho (lagartijas) en 1 minuto.",
        "Cuerpo completamente recto y bajar hasta que codos formen 90 grados.",
        "Mujeres pueden apoyar rodillas según criterio del instructor."
      ],
      icon: Dumbbell
    },
    "salto_largo": {
      title: "Salto Largo sin Impulso",
      desc: "Mide la fuerza explosiva de los miembros inferiores.",
      details: [
        "Pararse detrás de la línea de salto con los pies separados a la anchura de los hombros.",
        "Flexionar las rodillas y balancear los brazos para tomar impulso.",
        "Saltar hacia adelante lo más lejos posible cayendo con ambos pies.",
        "Se mide la distancia en centímetros desde la línea hasta el talón más atrasado."
      ],
      icon: Activity
    },
    "abdominales": {
      title: "Abdominales (1 min)",
      desc: "Mide la fuerza de resistencia de la musculatura abdominal.",
      details: [
        "Acostarse boca arriba con rodillas flexionadas y pies apoyados.",
        "Manos cruzadas en el pecho o detrás de la cabeza.",
        "Subir el tronco hasta tocar las rodillas con los codos y volver a la posición inicial.",
        "Contar el número máximo de repeticiones correctas en 1 minuto."
      ],
      icon: Activity
    },
    "flexibilidad": {
      title: "Sit and Reach",
      desc: "Evalúa la flexibilidad del tronco (zona lumbar) y la elasticidad de los músculos isquiotibiales.",
      details: [
        "Sentarse en el suelo con piernas extendidas juntas y descalzo.",
        "Colocar el cajón de medición frente a los pies.",
        "Flexionar el tronco hacia adelante extendiendo brazos y manos sobre la regla.",
        "Mantener la posición máxima por 2 segundos y anotar la marca en centímetros."
      ],
      icon: Activity
    },
    "agilidad": {
      title: "Test de Illinois",
      desc: "Evalúa la agilidad y velocidad de cambios de dirección.",
      details: [
        "El circuito incluye rectas y zigzag entre conos en un área de 10x5 metros.",
        "El sujeto inicia acostado boca abajo con las manos a la altura de los hombros.",
        "Al dar la señal, se levanta y corre el circuito a máxima velocidad.",
        "Se toma el tiempo total en segundos."
      ],
      icon: Activity
    }
  };

  const currentTest = testInstructions[selectedTest];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="max-w-5xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden"
    >
       <div className="px-6 py-5 border-b border-gray-200 bg-gray-50/50 flex justify-between items-center">
        <div>
          <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <Activity className="w-5 h-5 text-rose-600" />
            Registro de Pruebas Físicas
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Las pruebas físicas permiten evaluar la condición atlética, medir el progreso y ajustar la intensidad de los entrenamientos.
          </p>
        </div>
      </div>
      <div className="p-6 flex flex-col md:flex-row gap-8">
        
        <div className="flex-1 space-y-6">
          <div className="grid grid-cols-1 gap-6">
            {role === "INSTRUCTOR" && <Input label="ID Usuario Evaluado" placeholder="Identificación..." />}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-gray-700 uppercase tracking-wide">Seleccionar Prueba</label>
              <select 
                value={selectedTest}
                onChange={(e) => setSelectedTest(e.target.value)}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:bg-white transition-all appearance-none"
              >
                <option value="cooper">Test de Cooper (Resistencia)</option>
                <option value="ruffier">Test de Ruffier (Corazón)</option>
                <option value="velocidad">Velocidad 50 metros</option>
                <option value="flexiones">Flexiones de pecho 1 min</option>
                <option value="salto_largo">Salto Largo sin Impulso</option>
                <option value="abdominales">Abdominales en 1 minuto</option>
                <option value="flexibilidad">Sit and Reach (Flexibilidad)</option>
                <option value="agilidad">Test de Agilidad (Illinois)</option>
              </select>
            </div>
            <Input label="Marca Obtenida" type="number" step="0.01" placeholder="Valor numérico de la prueba" />
            <Input label="Fecha de Ejecución" type="date" />
          </div>
          
          <div className="border border-rose-100 bg-rose-50 rounded-xl p-4 mt-6">
            <h4 className="text-sm font-semibold text-rose-800 mb-2">Puntuación Automática (Baremo)</h4>
            <p className="text-sm text-rose-700">El sistema calculará automáticamente los puntos obtenidos cruzando la marca ingresada con la tabla <b>test_baremo</b> según el género y la edad del usuario.</p>
          </div>
          
          <div className="flex justify-end pt-4">
            <button onClick={onSave} className="flex items-center gap-2 bg-rose-600 text-white px-6 py-2.5 rounded-lg hover:bg-rose-700 font-medium transition-colors">
              <Save className="w-4 h-4" />
              Registrar Prueba
            </button>
          </div>
        </div>

        {/* Panel de Instrucciones */}
        <div className="w-full md:w-96 bg-slate-50 border border-slate-200 rounded-xl p-6 shadow-sm">
           <div className="flex items-center gap-2 mb-4">
              <Info className="w-5 h-5 text-green-500" />
              <h3 className="font-bold text-slate-800">¿Cómo realizar la prueba?</h3>
           </div>
           <div className="w-full h-32 bg-green-100/50 rounded-lg mb-6 flex items-center justify-center border border-green-200">
              <currentTest.icon className="w-12 h-12 text-green-500" />
           </div>
           <h4 className="font-bold text-slate-900 mb-2 text-lg">{currentTest.title}</h4>
           <p className="text-sm text-slate-600 leading-relaxed mb-4">{currentTest.desc}</p>
           
           <div className="space-y-3">
             <h5 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Pasos y Consideraciones:</h5>
             <ul className="text-sm text-slate-600 space-y-2">
               {currentTest.details.map((detail, idx) => (
                 <li key={idx} className="flex items-start gap-2">
                   <div className="w-1.5 h-1.5 rounded-full bg-green-400 mt-1.5 shrink-0" />
                   <span>{detail}</span>
                 </li>
               ))}
             </ul>
           </div>
        </div>

      </div>
    </motion.div>
  );
}

function TabNutricionAI({ onSave }: { onSave: () => void, key?: string }) {
  const [generating, setGenerating] = useState(false);
  const [plan, setPlan] = useState("");

  const handleGenerate = () => {
    setGenerating(true);
    setPlan("");
    setTimeout(() => {
      setPlan(`===================================================
PLAN INTEGRAL: NUTRICIÓN Y EJERCICIO (GENERADO POR IA)
===================================================

PERFIL DEL USUARIO:
- Somatotipo: Ectomorfo
- Nivel de Resistencia (Cooper): Bajo
- Nivel de Fuerza (Flexiones): Medio
- Objetivo: Ganancia de masa muscular y mejora cardiovascular.

---------------------------------------------------
1. PLAN DE ENTRENAMIENTO
---------------------------------------------------
Frecuencia: 4 días a la semana
Enfoque: Hipertrofia (fuerza) y acondicionamiento aeróbico leve.

Lunes y Jueves (Tren Superior):
- Calentamiento articular: 10 mins
- Flexiones de pecho: 4 series x al fallo (progreso para mejorar el test).
- Dominadas o Remo invertido: 3 series x 8-10 reps.
- Press militar (si hay equipo): 3 series x 10 reps.

Martes y Viernes (Tren Inferior & Cardio):
- Sentadillas (Ruffier preparation): 4 series x 15 reps.
- Zancadas: 3 series x 12 reps (cada pierna).
- Cardio: 15-20 mins de trote continuo para mejorar Test de Cooper.

---------------------------------------------------
2. PLAN NUTRICIONAL
---------------------------------------------------
Recomendación Calórica Diaria: 3,200 kcal
Distribución Macros: 50% Carbohidratos, 25% Proteínas, 25% Grasas saludables

Desayuno (750 kcal):
- 4 huevos enteros revueltos
- 2 tazas de avena con leche entera, plátano y crema de maní.

Almuerzo (900 kcal):
- 200g de pechuga de pollo
- 2 tazas de arroz blanco o integral
- 1 taza de brócoli con aceite de oliva

Cena (800 kcal):
- 200g de carne magra
- 300g de papa al horno
- Ensalada abundante

Snacks (750 kcal):
- Batido de proteína post-entrenamiento.
- Puñado de frutos secos.

* Nota: Mantener hidratación de 3L diarios. Descansar 7-8 horas para recuperación óptima.
`);
      setGenerating(false);
    }, 2500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="max-w-6xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden flex flex-col md:flex-row"
    >
      <div className="w-full md:w-1/3 bg-slate-50 p-6 border-r border-gray-200 flex flex-col">
        <div className="mb-6">
           <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <BrainCircuit className="w-6 h-6 text-fuchsia-600" />
            IA: Nutrición y Ejercicio
          </h2>
          <p className="text-sm text-gray-500 mt-2">Genera planes de alimentación y rutinas de ejercicio basados en el somatotipo y los resultados de los tests físicos.</p>
        </div>
        
        <div className="space-y-4 flex-1">
          <Input label="ID del Usuario" placeholder="1001234567" defaultValue="1001234567" />
          <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
            <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Datos Detectados</h4>
            <ul className="text-sm space-y-2 text-gray-700">
              <li className="flex justify-between"><span>Somatotipo:</span> <span className="font-semibold text-teal-600">Ectomorfo</span></li>
              <li className="flex justify-between"><span>Peso actual:</span> <span className="font-semibold">60.5 kg</span></li>
              <li className="flex justify-between"><span>Test Cooper:</span> <span className="font-semibold text-rose-500">Bajo (1800m)</span></li>
              <li className="flex justify-between"><span>Flexiones:</span> <span className="font-semibold text-amber-500">Medio (30)</span></li>
            </ul>
          </div>
          <Select label="Objetivo Principal">
            <option>Aumento de masa muscular (Superávit)</option>
            <option>Definición / Pérdida de grasa (Déficit)</option>
            <option>Mejora de resistencia cardiovascular</option>
          </Select>
        </div>
        <button 
          onClick={handleGenerate}
          disabled={generating}
          className="mt-6 w-full py-3 bg-fuchsia-600 hover:bg-fuchsia-700 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {generating ? (
            <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>
              <RefreshCw className="w-5 h-5" />
            </motion.div>
          ) : (
            <BrainCircuit className="w-5 h-5" />
          )}
          {generating ? "Analizando Resultados..." : "Generar Plan Integral"}
        </button>
      </div>
      <div className="w-full md:w-2/3 p-6 bg-white relative min-h-[550px]">
        {plan ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-full flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-gray-900">Plan Asistido</h3>
              <button onClick={onSave} className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-lg text-sm hover:bg-slate-800 transition-colors">
                <Save className="w-4 h-4" />
                Guardar en BD
              </button>
            </div>
            <textarea 
              readOnly 
              value={plan}
              className="w-full flex-1 bg-slate-50 border border-gray-200 rounded-lg p-4 font-mono text-sm text-gray-800 focus:outline-none resize-none custom-scrollbar"
            />
          </motion.div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-gray-400">
            <BrainCircuit className="w-16 h-16 mb-4 opacity-20" />
            <p>Configura los parámetros y haz clic en generar para obtener una rutina y dieta personalizada apoyada por inteligencia artificial, cruzando los datos antropométricos y físicos.</p>
          </div>
        )}
      </div>
    </motion.div>
  );
}

function TabGraficas({ historialPruebas, historialAntropo, role }: { historialPruebas: any[], historialAntropo: any[], role: string, key?: string }) {
  const [metricaPrueba, setMetricaPrueba] = useState("cooper");
  const [metricaAntropo, setMetricaAntropo] = useState("peso");

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="space-y-6 max-w-6xl mx-auto"
    >
      {role === "INSTRUCTOR" && (
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
           <Input label="Documento del Aprendiz" placeholder="ID a consultar..." />
           <button className="bg-green-600 text-white px-4 py-2 mt-5 rounded-lg text-sm font-medium hover:bg-green-700">Cargar Historial</button>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Gráfica Rendimiento Físico */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <Activity className="w-5 h-5 text-rose-600" />
              Evolución: Pruebas Físicas
            </h3>
            <select 
              value={metricaPrueba} 
              onChange={(e) => setMetricaPrueba(e.target.value)}
              className="text-sm bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-rose-500"
            >
              <option value="cooper">Test Cooper (m)</option>
              <option value="flexiones">Flexiones (reps)</option>
              <option value="velocidad">Velocidad 50m (s)</option>
            </select>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={historialPruebas}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                <XAxis dataKey="fecha" axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 12}} dx={-10} domain={['auto', 'auto']} />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  cursor={{stroke: '#e5e7eb', strokeWidth: 2}}
                />
                <Line type="monotone" dataKey={metricaPrueba} stroke="#ec4899" strokeWidth={3} dot={{r: 4}} activeDot={{r: 6}} name={metricaPrueba.toUpperCase()} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Gráfica Antropométrica */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <Users className="w-5 h-5 text-teal-600" />
              Evolución: Antropometría
            </h3>
            <select 
              value={metricaAntropo} 
              onChange={(e) => setMetricaAntropo(e.target.value)}
              className="text-sm bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option value="peso">Peso (kg)</option>
              <option value="cintura">Cintura (cm)</option>
              <option value="grasa">% Grasa</option>
            </select>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={historialAntropo}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                <XAxis dataKey="fecha" axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 12}} domain={['auto', 'auto']} dx={-10} />
                <Tooltip 
                  cursor={{stroke: '#e5e7eb', strokeWidth: 2}}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Line type="monotone" dataKey={metricaAntropo} stroke="#14b8a6" strokeWidth={3} dot={{r: 4}} activeDot={{r: 6}} name={metricaAntropo.toUpperCase()} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </motion.div>
  );
}

// -----------------------------------------------------------------------------
// REUSABLE UI COMPONENTS
// -----------------------------------------------------------------------------

function Input({ label, type = "text", placeholder, defaultValue, step }: any) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-bold text-gray-700 uppercase tracking-wide">{label}</label>
      <input 
        type={type} 
        placeholder={placeholder}
        defaultValue={defaultValue}
        step={step}
        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:bg-white transition-all"
      />
    </div>
  );
}

function Select({ label, children }: any) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-bold text-gray-700 uppercase tracking-wide">{label}</label>
      <select className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:bg-white transition-all appearance-none">
        {children}
      </select>
    </div>
  );
}
