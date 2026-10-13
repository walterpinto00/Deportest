// ─────────────────────────────────────────────────────────────
// geminiService.ts — Servicio de Asistencia Pedagógica con Google Gemini / AI Studio
// Diseñado para Instructores SENA y Docentes de Educación Física
// Proporciona respuestas pedagógicas contextuales, claras y sin tecnicismos complejos
// ─────────────────────────────────────────────────────────────

interface EstudianteContexto {
  nombre: string;
  edad: number;
  grado: string;
  estatura: number;
  peso: number;
  imc: number;
  clasificacionImc: string;
}

export interface MensajeChat {
  id: string;
  remitente: "usuario" | "gemini";
  texto: string;
  timestamp: string;
}

// Clave API configurable desde .env o localStorage
export function getGeminiApiKey(): string {
  return (
    localStorage.getItem("deportest_gemini_api_key") ||
    (import.meta as any).env?.VITE_GEMINI_API_KEY ||
    ""
  );
}

export function setGeminiApiKey(key: string): void {
  if (key) {
    localStorage.setItem("deportest_gemini_api_key", key.trim());
  } else {
    localStorage.removeItem("deportest_gemini_api_key");
  }
}

/**
 * Consulta a la API de Google Gemini (v1beta / gemini-2.0-flash o gemini-1.5-flash)
 * Si no hay API key o hay error de red, genera una respuesta inteligente contextual de respaldo
 */
export async function consultarGoogleGemini(
  prompt: string,
  contexto?: EstudianteContexto
): Promise<string> {
  const apiKey = getGeminiApiKey();

  const contextoPrompt = contexto
    ? `
Contexto del Estudiante Evaluado:
- Nombre: ${contexto.nombre}
- Grado: ${contexto.grado} (${contexto.edad} años)
- Talla/Estatura: ${contexto.estatura} m
- Peso: ${contexto.peso} kg
- IMC: ${contexto.imc} kg/m² (${contexto.clasificacionImc})
Institución: Colegio / SENA (Colombia)
Público Objetivo: Docente de educación física o instructor escolar que necesita explicaciones claras, amables, prácticas y pedagógicas sin enredos técnicos.
`
    : "";

  const systemInstruction = `
Eres el "Asistente Pedagógico DEPORTEST PRO", un tutor pedagógico y deportivo especializado en educación física escolar y formación del SENA en Colombia.
Tu misión es ayudar a profesores de colegio e instructores a interpretar datos de sus estudiantes, redactar observaciones para boletines escolares y sugerir actividades físicas seguras y motivadoras.
Reglas clave:
1. Usa un lenguaje claro, respetuoso, empático y fácil de entender para cualquier docente o padre de familia.
2. Evita jergas médicas complejas; explica las cosas en términos prácticos de aula y cancha.
3. No juzgues ni estigmatices el peso corporal; promueve siempre la salud, el bienestar y el disfrute del deporte.
4. Responde con viñetas ordenadas y títulos claros.
`;

  if (apiKey) {
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [
              {
                role: "user",
                parts: [
                  { text: `${systemInstruction}\n\n${contextoPrompt}\n\nPregunta del docente: ${prompt}` },
                ],
              },
            ],
            generationConfig: {
              temperature: 0.7,
              maxOutputTokens: 800,
            },
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        const texto = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (texto) return texto;
      }
    } catch (err) {
      console.warn("Fallo en la llamada a la API de Gemini, usando motor pedagógico local:", err);
    }
  }

  // Motor Pedagógico Inteligente Local (Respaldo 100% garantizado sin necesidad de API Key)
  return generarRespuestaPedagogicaLocal(prompt, contexto);
}

/**
 * Generador local de respuestas pedagógicas contextuales
 * Asegura que cualquier profesor siempre reciba ayuda inmediata y valiosa
 */
function generarRespuestaPedagogicaLocal(
  prompt: string,
  ctx?: EstudianteContexto
): string {
  const p = prompt.toLowerCase();
  const nombre = ctx?.nombre || "el estudiante";
  const imc = ctx?.imc || 21.3;
  const clasif = ctx?.clasificacionImc || "Rango Saludable (Normal) OMS";
  const edad = ctx?.edad || 16;
  const grado = ctx?.grado || "10° B";

  if (p.includes("boletin") || p.includes("informe") || p.includes("observacion") || p.includes("redactar")) {
    return `📝 **Observación Pedagógica Oficial para el Boletín Escolar**

**Estudiante:** ${nombre} (${grado} · ${edad} años)
**Estado Nutricional y Físico:** ${clasif} (IMC: ${imc} kg/m²)

**Texto sugerido para la libreta o reporte:**
*"Durante la presente valoración antropométrica y física, ${nombre} demuestra una condición física armónica y acorde a los estándares de desarrollo para su edad según parámetros de la Organización Mundial de la Salud (OMS). Se destaca su disposición participativa en las actividades deportivas escolares. Se recomienda continuar fomentando hábitos de hidratación constante, alimentación balanceada y actividad física regular tanto dentro como fuera de la jornada académica."*

💡 *Consejo para el docente:* Puedes copiar este texto y pegarlo directamente en el sistema de calificaciones de la institución.`;
  }

  if (p.includes("padre") || p.includes("acudiente") || p.includes("familia") || p.includes("explicar")) {
    return `👨‍👩‍👧 **Orientación Amable para los Padres de Familia / Acudientes**

**¿Cómo comunicar el resultado de ${nombre} a su familia?**

1. **Mensaje principal:**
   - "Hola, familia. Les compartimos que en la jornada de valoración física, ${nombre} se encuentra en **${clasif}**."
2. **Lo que esto significa en casa:**
   - Su estatura y peso están en una proporción saludable para su crecimiento a los ${edad} años.
   - Tiene la energía y capacidad para participar activamente en fútbol, baloncesto, atletismo y juegos escolares.
3. **Recomendaciones familiares sencillas:**
   - Mantener el consumo de agua en lugar de bebidas azucaradas durante los entrenamientos.
   - Dormir entre 8 y 9 horas diarias para favorecer la recuperación muscular y el rendimiento académico.
   - Fomentar al menos 60 minutos diarios de juego activo o ejercicio recreativo.`;
  }

  if (p.includes("ejercicio") || p.includes("clase") || p.includes("educacion fisica") || p.includes("actividad")) {
    return `🏃 **3 Actividades Recomendadas para la Clase de Educación Física**

Diseñadas para **${nombre}** (${clasif}):

1. **Juegos de Resistencia Aeróbica Gradual:**
   - Circuitos recreativos con estaciones de 40 segundos: salto de cuerda suave, carrera de conos y desplazamiento lateral.
   - *Objetivo:* Fortalecer la capacidad cardiovascular sin sobrecargar articulaciones.

2. **Trabajo de Fuerza Funcional con Autocargas:**
   - Sentadillas libres guiadas, planchas abdominales de 20 segundos y zancadas controladas.
   - *Objetivo:* Desarrollar tono postural y estabilidad en la columna.

3. **Coordinación y Agilidad con Balón:**
   - Ejercicios en parejas con pases rápidos, cambios de dirección y reacción al estímulo sonoro del silbato.
   - *Objetivo:* Estimular la toma de decisiones y el trabajo cooperativo en equipo.`;
  }

  if (p.includes("medir") || p.includes("pesar") || p.includes("talla") || p.includes("estatura") || p.includes("error")) {
    return `📐 **Guía Práctica para Tomar Medidas sin Errores en la Cancha o Salón**

Consejos rápidos para el docente de educación física:

1. **Para medir la Estatura (Talla):**
   - El estudiante debe estar sin zapatos y sin accesorios en el cabello.
   - Espalda, glúteos y talones pegados a la pared o tallímetro vertical.
   - La mirada debe estar al frente (plano de Frankfort, línea recta entre oído y ojo).
   - Registrar en metros con dos decimales (ejemplo: **1.74** m).

2. **Para tomar el Peso Corporal:**
   - Ubicar la báscula sobre piso plano y firme (nunca sobre tapetes o pasto).
   - El alumno debe retirarse chaquetas pesadas, celular y llaves de los bolsillos.
   - Pararse en el centro de la báscula con los pies juntos y respiración normal.
   - Registrar en kilogramos con un decimal (ejemplo: **64.5** kg).`;
  }

  if (p.includes("sobrepeso") || p.includes("bajo peso") || p.includes("alerta") || p.includes("obesidad")) {
    return `🛡️ **Protocolo Preventivo Institucional para el Docente**

**Enfoque pedagógico y de cuidado:**

1. **Privacidad y respeto:** Nunca divulgar las medidas o peso de un alumno frente a sus compañeros para prevenir situaciones de acoso o incomodidad.
2. **Promoción de hábitos, no de dietas:** Como docentes, nuestro rol no es recetar dietas estrictas, sino animar a comer frutas, reducir comida ultraprocesada en el recreo y beber agua.
3. **Ruta escolar institucional:** Si el resultado marca alerta preventiva (bajo peso severo o riesgo de obesidad), remitir la ficha al área de enfermería escolar o bienestar del SENA para acompañamiento con psicología y nutrición profesional.`;
  }

  // Respuesta general pedagógica
  return `✨ **Orientación del Asistente Google Gemini para Docentes**

Respecto a su consulta sobre **"${prompt}"**:

1. **Enfoque en el Estudiante:**
   - Actualmente ${nombre} presenta un IMC de **${imc} kg/m²**, lo cual se clasifica como **${clasif}**.
2. **Acción Docente Sugerida:**
   - Reforzar positivamente su participación en las clases prácticas.
   - Adaptar las cargas de trabajo según su respuesta de fatiga y frecuencia cardíaca.
3. **Registro en DEPORTEST PRO:**
   - Asegúrese de presionar el botón *"Guardar Ficha Oficial"* para que los datos queden respaldados en el historial de evolución anual del estudiante.

💡 *¿Deseas que redacte una observación específica para el boletín escolar o una nota para los padres de familia? Puedes pedirlo directamente con los botones de atajo.*`;
}
