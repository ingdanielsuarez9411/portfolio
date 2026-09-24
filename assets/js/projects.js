/* =====================================================================
   PROYECTOS Y DEMOS
   ---------------------------------------------------------------------
   Para agregar una demo nueva solo copia un objeto de esta lista y edita
   sus campos. No hace falta tocar el HTML.

   Campos:
   - id        : identificador único (sin espacios). Sirve para enlazar
                 directo a la demo: https://TU-USUARIO.github.io/TU-REPO/#demo-ID
   - title     : nombre del proyecto
   - category  : una de las categorías de PROJECT_CATEGORIES (abajo)
   - summary   : una línea que aparece en la tarjeta
   - description: texto completo que aparece en la ventana de la demo
   - stack     : lista de tecnologías usadas
   - image     : ruta a la imagen de portada (assets/img/...)
   - badge     : etiqueta corta opcional en la tarjeta ("Demo", "En curso", "Piloto")
   - video     : { type: "youtube", id: "XXXXXXXX" }
                 { type: "mp4",     src: "assets/demos/archivo.mp4" }
                 { type: "gif",     src: "assets/demos/archivo.gif" }
                 null si todavía no hay demo grabada
   - links     : lista de { label, url, icon } (icon es un nombre de Ionicons)
   ===================================================================== */

const PROJECT_CATEGORIES = [
  "Todos",
  "Agentes de voz IA",
  "Bots WhatsApp",
  "Genesys Cloud",
  "Analítica",
  "Experimentos"
];

const PROJECTS = [
  {
    id: "agente-voz-leads",
    title: "Agente de voz IA para calificación de leads",
    category: "Agentes de voz IA",
    summary: "Agente conversacional que llama, califica y agenda leads de forma autónoma.",
    description:
      "Agente de voz agéntico que contacta prospectos, conversa en lenguaje natural, " +
      "califica el interés según un prompt maestro del equipo comercial y registra el " +
      "resultado en un CRM ligero (Google Sheets + Apps Script). Incluye manejo de " +
      "objeciones, variables de salida estructuradas y métricas de contacto.",
    stack: ["Dapta", "LLM", "STT / TTS", "Google Sheets", "Apps Script", "SIP"],
    image: "assets/img/project-voz-leads.svg",
    badge: "Demo",
    video: null,
    links: []
  },
  {
    id: "motor-voz-propio",
    title: "Motor de voz IA propio con LiveKit",
    category: "Agentes de voz IA",
    summary: "Experimento para construir un agente de voz de bajo costo con pipeline STT → LLM → TTS.",
    description:
      "Exploración de una arquitectura propia de agente de voz: LiveKit para el transporte " +
      "de audio en tiempo real, un modelo de lenguaje para el razonamiento y motores de " +
      "voz a texto y texto a voz intercambiables, conectado a una troncal SIP. El objetivo " +
      "es comparar latencia, calidad y costo frente a plataformas comerciales.",
    stack: ["LiveKit", "Python", "OpenAI / Anthropic", "Deepgram", "ElevenLabs", "SIP"],
    image: "assets/img/project-livekit.svg",
    badge: "En curso",
    video: null,
    links: []
  },
  {
    id: "bot-whatsapp-peru",
    title: "Bot de WhatsApp para ventas y soporte",
    category: "Bots WhatsApp",
    summary: "Flujo conversacional en Genesys Cloud integrado con un BSP vía Open Messaging.",
    description:
      "Bot de WhatsApp construido en Genesys Cloud Architect e integrado con el proveedor " +
      "de WhatsApp Business API mediante Open Messaging. Captura datos del cliente, " +
      "enruta a la cola correcta según intención y país, y entrega contexto al asesor " +
      "cuando la conversación pasa a un humano.",
    stack: ["Genesys Cloud", "Architect", "Open Messaging", "WhatsApp Business API", "Data Actions"],
    image: "assets/img/project-wa-bot.svg",
    badge: "Producción",
    video: null,
    links: []
  },
  {
    id: "encuesta-whatsapp",
    title: "Encuesta de satisfacción por WhatsApp",
    category: "Bots WhatsApp",
    summary: "Plantilla de WhatsApp que dispara una encuesta automatizada al cierre de la atención.",
    description:
      "Encuesta comercial enviada desde una plantilla aprobada de WhatsApp Business y " +
      "resuelta por un bot que guarda las respuestas para análisis. Permite medir " +
      "satisfacción sin intervención del asesor y consolidar resultados por país y cola.",
    stack: ["Genesys Cloud", "WhatsApp Templates", "Feebak", "Power BI"],
    image: "assets/img/project-encuesta.svg",
    badge: "Producción",
    video: null,
    links: []
  },
  {
    id: "byoc-latam",
    title: "Troncales SIP BYOC en 8 países de Latinoamérica",
    category: "Genesys Cloud",
    summary: "Diseño y configuración de troncales con carriers locales para voz entrante y saliente.",
    description:
      "Arquitectura de telefonía BYOC Cloud en Genesys Cloud con carriers de Colombia, " +
      "México, Perú, Ecuador, Bolivia, Paraguay, Uruguay y Argentina: negociación de " +
      "códecs, caller ID, planes de marcación por país y resolución de incidencias " +
      "SIP/RTP con capturas de tráfico.",
    stack: ["Genesys Cloud", "BYOC", "SIP", "RTP", "Dial plans", "Wireshark"],
    image: "assets/img/project-byoc.svg",
    badge: "Producción",
    video: null,
    links: []
  },
  {
    id: "ivr-colombia",
    title: "Rediseño del IVR de Colombia",
    category: "Genesys Cloud",
    summary: "Nuevo árbol de autoservicio y enrutamiento por habilidades en Architect.",
    description:
      "Rediseño completo del IVR principal: menús simplificados, identificación del " +
      "cliente por número, autoservicio para consultas frecuentes y enrutamiento por " +
      "habilidades hacia las colas correctas. Incluye plan de corte a producción y " +
      "monitoreo posterior.",
    stack: ["Genesys Cloud", "Architect", "Skills routing", "Data Actions"],
    image: "assets/img/project-ivr.svg",
    badge: null,
    video: null,
    links: []
  },
  {
    id: "speech-analytics",
    title: "Piloto de Speech Analytics con IA",
    category: "Analítica",
    summary: "Análisis automático de llamadas para detectar temas, sentimiento y oportunidades.",
    description:
      "Piloto de Speech and Text Analytics en Genesys Cloud: transcripción de llamadas, " +
      "detección de temas, análisis de sentimiento y tableros para calidad y supervisión. " +
      "El objetivo es pasar de muestreos manuales a cobertura del 100 % de interacciones.",
    stack: ["Genesys Cloud", "Speech & Text Analytics", "Topic mining", "Power BI"],
    image: "assets/img/project-speech.svg",
    badge: "Piloto",
    video: null,
    links: []
  },
  {
    id: "powerbi-genesys",
    title: "Tableros de Power BI conectados a Genesys",
    category: "Analítica",
    summary: "KPIs del contact center consumidos directamente desde las APIs de Analytics.",
    description:
      "Solución de reportería que consulta las APIs de Genesys Cloud Analytics (colas, " +
      "agentes, conversaciones) y construye tableros de nivel de servicio, abandono, " +
      "AHT y ocupación por país, sin exportaciones manuales.",
    stack: ["Power BI", "Genesys Analytics API", "OAuth", "Power Query"],
    image: "assets/img/project-powerbi.svg",
    badge: null,
    video: null,
    links: []
  },
  {
    id: "agente-copilot",
    title: "Agente de productividad en Copilot Studio",
    category: "Experimentos",
    summary: "Asistente personal para tickets, tiempos y resúmenes ejecutivos semanales.",
    description:
      "Agente construido en Microsoft Copilot Studio que centraliza tickets, seguimiento " +
      "de tiempos y estados de proyectos, y genera resúmenes ejecutivos semanales y " +
      "mensuales listos para compartir.",
    stack: ["Microsoft Copilot Studio", "Power Automate", "SharePoint"],
    image: "assets/img/project-copilot.svg",
    badge: "Experimento",
    video: null,
    links: []
  },
  {
    id: "taskflow",
    title: "TaskFlow — panel de proyectos y horas",
    category: "Experimentos",
    summary: "Aplicación local en Python/Flask para registrar tickets, horas y productividad diaria.",
    description:
      "Pequeña aplicación web para llevar el control de tickets, horas trabajadas y " +
      "productividad diaria del equipo de canales digitales, con vistas por proyecto " +
      "y exportación de reportes.",
    stack: ["Python", "Flask", "SQLite", "HTML / CSS"],
    image: "assets/img/project-taskflow.svg",
    badge: "Experimento",
    video: null,
    links: []
  }
];
