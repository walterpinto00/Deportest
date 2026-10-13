# 📋 BITÁCORA DE DESARROLLO Y EVOLUCIÓN — DEPORTEST PRO

**Proyecto:** Plataforma Institucional de Valoración Antropométrica, Baremos y Rendimiento Físico  
**Entidad / Contexto:** SENA & Instituciones Educativas (Colegios en Colombia)  
**Equipo de Trabajo:**
* **Walter Pinto** — Desarrollo & Arquitectura Tecnológica
* **Camilo** — Co-desarrollo & Soporte
* **Carlos** — Instructor de Deporte (Docente SENA y Enlace en Colegio)

---

## 📌 1. Visión y Objetivos del Proyecto

### Problema Identificado en Colombia:
En más del 95% de colegios e instituciones en Colombia, los profesores de Educación Física y entrenadores del SENA evalúan a cientos de estudiantes usando hojas de cálculo en Excel hechas a mano o fichas de papel impresas. Los datos se pierden, no hay seguimiento longitudinal año tras año y no existen boletines claros para los padres de familia.

### Solución — DEPORTEST PRO:
Una plataforma web moderna, rápida y clínicamente fundamentada que permite:
1. Registrar datos antropométricos bajo estándares de la **OMS e ISAK**.
2. Evaluar pruebas físicas con **baremos estandarizados** (Test de Cooper, Course-Navette escolar, flexiones, salto largo, etc.).
3. Generar planes de orientación nutricional escolar y hábitos saludables.
4. Exportar reportes oficiales e imprimibles en PDF para padres y directivas.

---

## 📅 2. Registro Cronológico de Fases

### Fase 1: Creación del Modelo Base (Backend & Persistencia)
* Creación de modelo de base de datos relacional SQL (`db_script.sql`).
* Implementación de capas DAO en Java (`AprendizDAO.java`, `PruebaDAO.java`, `ClsConexion.java`).
* Script analítico de rendimiento en Python (`analisis_rendimiento.py`).
* Configuración inicial del servidor Node.js/Express (`server.js`).

### Fase 2: Implementación de la Interfaz y Primer Prototipo Visual
* Construcción de Single Page Application (SPA) en React con TypeScript y Vite.
* Creación de componentes modulares (`TabDashboard`, `TabUsuarios`, `TabAntropometria`, `TabPruebas`, `TabNutricionAI`, `TabGraficas`).
* Integración de avatares automáticos mediante Dicebear API.

### Fase 3: Auditoría Estética y Diagnóstico de Usabilidad
* **Detección:** La interfaz previa presentaba una saturación excesiva de colores (amarillos, morados, fucsias, azules en simultáneo) y recetas de gimnasio extremo (3.200 kcal, batidos de proteína en polvo).
* **Decisión:** 
  1. Asegurar la versión previa mediante respaldo en rama Git `backup-version-colorida` y tag `v1.0-backup`.
  2. Rediseñar la sección de nutrición hacia un enfoque de **Educación Física y Hábitos Escolares** (alimentos reales, lonchera saludable, hidratación y horas de sueño).

### Fase 4: Rediseño Integral de Clase Mundial (Estilo SaaS / Clínico)
* **Nueva Paleta:** Fondo obsidiana `#070a12`, cards satinadas `#0d121f`, micro-bordes de cristal y acento en **Verde Atlético SENA (`#10b981`)**.
* **Login Ejecutivo:** Split-screen corporativo con autenticación institucional y métricas de confianza.
* **Navegación Unificada:** Pestañas sobrias con indicador activo esmeralda.
* **Tipografía:** Adopción de *Plus Jakarta Sans* para alta legibilidad.

### Fase 5: Rediseño Visual de Alta Legibilidad y Cromatismo Atlético (Colores Vivos & Tipografía Grande)
* **Diagnóstico:** Los textos resultaban pequeños en pantalla y la interfaz se percibía monótona u oscura, dificultando distinguir los bloques de información al instante.
* **Mejoras Implementadas:**
  1. **Cromatismo Vibrante por Momento en Nutrición & Hábitos:**
     * **Desayuno en Casa:** Ámbar Dorado Solar (`#f59e0b` / `#fbbf24`) — Energía y concentración matutina.
     * **Refrigerio / Lonchera Escolar:** Verde Esmeralda Natural (`#10b981` / `#34d399`) — Pausa activa y alimentos frescos.
     * **Almuerzo Balanceado:** Cyan Eléctrico (`#06b6d4` / `#38bdf8`) — Plato del Buen Comer y alto rendimiento.
     * **Merienda Pre-Actividad:** Violeta Dinámico (`#8b5cf6` / `#c084fc`) — Recarga de glucógeno para el deporte.
     * **Cena Ligera:** Turquesa / Teal Relajante (`#14b8a6` / `#2dd4bf`) — Digestión ligera y recuperación nocturna.
  2. **Escala Tipográfica Aumentada (Sin letra pequeña borrosa):**
     * Títulos de momentos escalados de `0.95rem` a `1.25rem` con peso bold 800 en blanco puro `#ffffff`.
     * Alimentos e instrucciones aumentados de `0.77rem` a `0.96rem` con alto contraste y cómoda lectura.
     * Badges de horarios y calorías aumentados a `0.86rem` y `0.92rem` con bordes luminosos.
     * Botones interactivos aumentados a `0.92rem` con iconos de 16-18px.
  3. **Identidad Cromática en Todo el Proyecto:**
     * Barra de navegación superior con color semántico vivo por pestaña (Dashboard, Usuarios, Antropometría, Pruebas, Nutrición, Gráficas).
     * Tarjetas KPI del Dashboard con identidad visual diferenciada (Azul, Ámbar, Naranja y Verde).
     * Selector de pruebas físicas con botones temáticos por disciplina.

### Fase 6: Arquitectura Espaciosa, Desahogo Visual y Eliminación de Elementos Pegados
* **Diagnóstico del Usuario:** En pantallas de computador estándar (1366x768 / 1080p), los formularios se percibían apelmazados ("pegados uno sobre otro"), con cajas centradas estrechas que dejaban vacíos negros laterales mientras los inputs quedaban asfixiados verticalmente, y tablas cortadas por la barra de tareas.
* **Soluciones Implementadas:**
  1. **Ficha Antropométrica Desahogada (`TabAntropometria.tsx`):**
     * Eliminación de la limitación estrecha (`maxWidth: 940` centrado) pasando a una distribución armónica en todo el ancho (`maxWidth: 1320`).
     * Subpestañas convertidas en pastillas generosas con iconos propios y acento de color distintivo.
     * **Semáforo Gráfico Horizontal OMS:** Gráfica de 4 segmentos (Bajo Peso, Normal, Sobrepeso, Obesidad) con indicador visual y concepto clínico inmediato, evitando que el IMC sea una pequeña caja comprimida.
     * Separación generosa (`gap: 20px - 26px`) entre filas de campos para que cada input respire con total comodidad.
  2. **Pruebas Físicas Claras y Explicadas (`TabPruebas.tsx`):**
     * Reorganización en 2 columnas equilibradas: Registro a la izquierda y Baremo en vivo a la derecha.
     * **Tabla de Baremos de Referencia Incorporada:** Muestra los 4 cortes oficiales de cada prueba (Excelente, Bueno, Aceptable, Bajo) resaltando en vivo la fila del alumno, explicando el motivo de la puntuación obtenida.
     * Botones de incremento/decremento rápido (`-` y `+`) para ingresar marcas ágilmente sin tecleo forzado.
     * Historial de clase ajustado en cuadrícula de 2 columnas para que nunca se desborde ni quede cortado por la barra de tareas de Windows.

---

## 🏛️ 3. Marco Legal y Estrategia en Colombia

### Marco Jurídico (Blindaje de Datos):
* **Ley 1581 de 2012 (Habeas Data):** Las medidas físicas de menores de edad son datos sensibles. El tratamiento requiere **Consentimiento Informado previo y expreso firmado por los padres o acudientes**.
* **Descargo de Responsabilidad Médica:** El sistema opera bajo alcance pedagógico y formativo según percentiles de la OMS, sin constituir prescripción médica.

### Modelo de Negocio y Escalabilidad:
* **Fase Piloto (Costo $0):** Implementación piloto en el colegio donde labora el instructor Carlos para obtener la primera certificación institucional y caso de éxito.
* **Esquema de Cobro Escolar:** Tarifa accesible de **$3.500 a $5.000 COP por estudiante al año** o licencia institucional plana de **$2.500.000 COP al año por colegio**.
* **Cobro inicial:** Persona natural con RUT y Cuenta de Cobro; formalización a S.A.S. una vez se alcancen más de 3 colegios activos.

---

## 🛠️ 4. Stack Tecnológico

| Capa | Tecnología |
| :--- | :--- |
| **Frontend** | React 19, TypeScript, Vite, Vanilla CSS Moderno, Framer Motion, Lucide Icons |
| **Visualización** | Recharts (Gráficas de área y barras adaptadas al tema oscuro) |
| **Backend** | Node.js, Express, Middlewares de autenticación |
| **Analítica / Datos** | Python (`pandas`), Java (DAOs JDBC), SQL relacional |
| **Inteligencia Artificial** | Google GenAI SDK (`@google/genai`) para resúmenes pedagógicos |
