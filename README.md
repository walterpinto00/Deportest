<div align="center">
  <img src="https://raw.githubusercontent.com/walterpinto00/Deportest/main/public/login-cover.jpg" width="100%" style="border-radius: 12px; margin-bottom: 20px;" alt="Deportest Banner">
  
  <h1>🏅 Deportest</h1>
  <p><strong>Plataforma de Alto Rendimiento Deportivo y Nutricional Inteligente (SENA)</strong></p>

  <p>
    <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
    <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
    <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js" />
    <img src="https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white" alt="Framer Motion" />
  </p>
</div>

<br />

## 🚀 Sobre el Proyecto

**Deportest** es una aplicación integral desarrollada para la gestión, seguimiento y mejora del rendimiento físico de los aprendices del **SENA**. Su objetivo es proporcionar a los entrenadores e instructores herramientas clínicas avanzadas, análisis de datos y generación de planes deportivos apoyados por Inteligencia Artificial.

Con una interfaz *premium* basada en Glassmorphism (efectos de cristal), animaciones fluidas y un diseño oscuro moderno, Deportest ofrece una experiencia de usuario inmersiva y profesional.

---

## ✨ Características Principales

- **📊 Dashboard Interactivo:** Centro de mando con métricas globales en tiempo real sobre el estado de salud y rendimiento de los atletas en diferentes disciplinas (Fútbol, Baloncesto, Atletismo, etc.).
- **📋 Fichas Antropométricas:** Módulo clínico para llevar el registro detallado de perímetros, pliegues cutáneos y signos vitales. Incluye un motor analítico que calcula el **Índice de Masa Corporal (IMC) automáticamente** con clasificaciones de la OMS.
- **🧠 Nutrición y Ejercicio Inteligente (IA):** Generador de planes de alimentación y rutinas de ejercicio adaptadas al somatotipo, peso y objetivos de cada atleta. Incluye medidores de macronutrientes animados.
- **📄 Exportación a PDF:** Función de exportación de grado clínico que permite aislar los reportes médicos y guardarlos o imprimirlos con diseño adaptado (`@media print`), libre de distracciones visuales.
- **🧑‍🎨 Generador de Avatares:** Creación automática de perfiles utilizando integraciones gráficas dinámicas.
- **🔒 Seguridad y Roles:** Sistema de inicio de sesión con validación estricta y protección basada en roles (Entrenador vs Aprendiz).

---

## 🛠️ Tecnologías Utilizadas

El ecosistema de **Deportest** está construido utilizando tecnologías modernas y diversas (Microservicios / Monorepo):

*   **Frontend:** React (SPA), HTML5, CSS3 (Vainilla CSS con arquitectura Glassmorphism), TypeScript, Framer Motion (Animaciones), Lucide React (Iconografía).
*   **Backend & APIs:** Node.js, Express, middlewares de seguridad (RoleGuard, Auth).
*   **Data Processing:** Scripts analíticos en **Python** (`analisis_rendimiento.py`), estructuras backend empresariales en **Java** (DAOs).

---

## 📂 Estructura del Repositorio

```text
📦 Deportest
 ┣ 📂 backend            # Servidor Node.js, controladores, middlewares y rutas
 ┣ 📂 public             # Recursos estáticos (imágenes de login, iconos)
 ┣ 📂 src
 ┃ ┣ 📂 components       # Componentes de React (Layouts, UI, Tabs)
 ┃ ┣ 📂 data             # Scripts en Python, clases Java (DAO) y SQL
 ┃ ┣ 📂 utils            # Funciones utilitarias (Validaciones)
 ┃ ┣ 📜 App.tsx          # Orquestador y enrutador principal de React
 ┃ ┣ 📜 index.css        # Sistema de diseño global (Variables, UI, @media print)
 ┃ ┗ 📜 main.tsx         # Punto de entrada de la aplicación
 ┣ 📜 package.json       # Dependencias del frontend
 ┗ 📜 README.md          # Documentación del proyecto
```

---

## 💻 Instalación y Uso Local

Para levantar el entorno de desarrollo localmente:

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/walterpinto00/Deportest.git
   ```
2. **Navegar a la carpeta:**
   ```bash
   cd Deportest
   ```
3. **Instalar dependencias del Frontend:**
   ```bash
   npm install
   ```
4. **Ejecutar el servidor de desarrollo:**
   ```bash
   npm run dev
   ```
5. Abre [http://localhost:5173](http://localhost:5173) en tu navegador para ver la aplicación.

---

<div align="center">
  <i>Desarrollado para la excelencia deportiva en el SENA.</i> 🟢
</div>
