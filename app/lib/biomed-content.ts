export const CASE_SIMULATOR_URL =
  process.env.NEXT_PUBLIC_CASE_SIMULATOR_URL ||
  "https://biomed-case-simulator.vercel.app";
export const QUIZ_ARENA_URL =
  process.env.NEXT_PUBLIC_QUIZ_ARENA_URL ||
  "https://biomed-quiz-arena.vercel.app";
export const REPORT_BUILDER_URL =
  process.env.NEXT_PUBLIC_REPORT_BUILDER_URL ||
  "https://clinical-report-builder.vercel.app";

export function buildUrl(
  base: string,
  path = "/",
  params?: Record<string, string>,
) {
  const url = new URL(path, base);
  if (params) {
    for (const [key, value] of Object.entries(params)) {
      url.searchParams.set(key, value);
    }
  }
  return url.toString();
}

export const equipmentProfiles = [
  {
    slug: "monitor-multiparametrico",
    name: "Monitor multiparametrico",
    category: "Monitoreo de signos vitales",
    quizCategory: "monitoreo-signos-vitales",
    caseCategory: "monitoreo-signos-vitales",
    caseId: "monitor-sin-spo2",
    reportEquipment: "Monitor multiparametrico",
    summary:
      "Equipo usado para visualizar parametros, alarmas y tendencias. En BioMedTools se trabaja desde verificacion tecnica inicial y documentacion formativa.",
    commonIssues: [
      "Sensor SpO2 sin lectura o mal colocado.",
      "Cable, conector o accesorio danado.",
      "Configuracion de alarma no documentada.",
      "Lectura inestable por movimiento, perfusion o interferencia.",
    ],
    checklist: [
      "Identificar equipo, area, inventario y responsable de la actividad.",
      "Verificar sensor, cable, conector y puerto antes de asumir falla interna.",
      "Registrar mensaje de alarma, parametro afectado y condicion de prueba.",
      "Comparar configuracion visible con el objetivo educativo del caso.",
      "Documentar accion realizada, resultado y recomendacion de seguimiento.",
    ],
    learningOutcomes: [
      "Distinguir sintoma reportado de causa tecnica probable.",
      "Ordenar una verificacion inicial sin sustituir protocolo clinico.",
      "Redactar evidencia tecnica clara para reporte correctivo.",
    ],
    caution:
      "No usar para tomar decisiones clinicas. La actividad es educativa y debe respetar protocolos institucionales.",
  },
  {
    slug: "bomba-infusion",
    name: "Bomba de infusion",
    category: "Terapia y administracion",
    quizCategory: "bombas-infusion-terapia",
    caseCategory: "bombas-infusion-terapia",
    caseId: "bomba-oclusion",
    reportEquipment: "Bomba volumetrica",
    summary:
      "Equipo de terapia con alarmas relacionadas con linea, presion, configuracion y accesorios. El entrenamiento se enfoca en verificacion tecnica segura.",
    commonIssues: [
      "Alarma de oclusion distal o linea pinzada.",
      "Set mal colocado o puerta sin cierre adecuado.",
      "Bateria baja, alimentacion o flujo no verificado.",
      "Configuracion no documentada antes de la prueba.",
    ],
    checklist: [
      "Registrar alarma, configuracion visible y condicion de la linea.",
      "Revisar set, puerta, clamp, conexiones y trayecto de la linea.",
      "Verificar alimentacion, bateria y accesorios disponibles.",
      "No modificar terapia real; trabajar solo en actividad simulada o supervisada.",
      "Documentar hallazgos, accion tecnica y recomendacion.",
    ],
    learningOutcomes: [
      "Relacionar alarma con posibles condiciones de linea y configuracion.",
      "Evitar conclusiones prematuras sobre falla del equipo.",
      "Preparar reporte tecnico con evidencia observable.",
    ],
    caution:
      "No sustituye indicaciones clinicas ni mantenimiento certificado del fabricante.",
  },
  {
    slug: "desfibrilador",
    name: "Desfibrilador",
    category: "Urgencias y soporte",
    quizCategory: "desfibrilador-urgencias",
    caseCategory: "desfibrilador-urgencias",
    caseId: "desfibrilador-no-carga",
    reportEquipment: "Desfibrilador",
    summary:
      "Equipo critico que requiere revision de energia, accesorios, autoprueba y disponibilidad. El enfoque es tecnico-educativo y de escalamiento responsable.",
    commonIssues: [
      "No carga energia o falla de autoprueba.",
      "Bateria descargada o alimentacion no disponible.",
      "Palas, parches o cable incompletos.",
      "Registro de verificacion diaria incompleto.",
    ],
    checklist: [
      "Confirmar estado del equipo sin utilizarlo en paciente.",
      "Revisar bateria, cable de alimentacion, accesorios y autoprueba.",
      "Registrar mensajes, indicadores y condiciones visibles.",
      "Escalar de inmediato si se trata de equipo en servicio critico.",
      "Documentar evidencia, limitacion de la prueba y recomendacion.",
    ],
    learningOutcomes: [
      "Reconocer prioridad tecnica en equipo critico.",
      "Identificar evidencia minima antes de escalar.",
      "Redactar reporte sin omitir riesgo operativo.",
    ],
    caution:
      "No sustituye entrenamiento clinico, protocolos de urgencia ni pruebas normativas.",
  },
  {
    slug: "autoclave",
    name: "Autoclave",
    category: "Esterilizacion",
    quizCategory: "esterilizacion-autoclave",
    caseCategory: "esterilizacion-autoclave",
    caseId: "autoclave-sin-presion",
    reportEquipment: "Autoclave",
    summary:
      "Equipo de esterilizacion asociado a ciclos, carga, sellos, temperatura, presion y registro. El enfoque es documentar observaciones tecnicas iniciales.",
    commonIssues: [
      "Ciclo incompleto o alarma durante proceso.",
      "Sello, puerta o empaque con fuga observable.",
      "Carga inadecuada o registro incompleto.",
      "Evidencia de ciclo no anexada al reporte.",
    ],
    checklist: [
      "Registrar ciclo, carga, alarma y condicion visible.",
      "Verificar bitacora, indicadores y parametros reportados.",
      "No liberar material ni validar esterilidad desde esta plataforma.",
      "Identificar si requiere revision especializada o mantenimiento.",
      "Documentar observaciones y evidencia disponible.",
    ],
    learningOutcomes: [
      "Ordenar informacion tecnica de un ciclo incompleto.",
      "Diferenciar observacion educativa de liberacion de material.",
      "Preparar evidencia para seguimiento institucional.",
    ],
    caution:
      "No sustituye normas de esterilizacion, validacion microbiologica ni protocolos institucionales.",
  },
  {
    slug: "electrocardiografo",
    name: "Electrocardiografo",
    category: "Diagnostico",
    quizCategory: "equipos-medicos-basicos",
    caseCategory: "monitoreo-signos-vitales",
    caseId: "monitor-sin-spo2",
    reportEquipment: "Electrocardiografo",
    summary:
      "Equipo de diagnostico para registro de senales electricas cardiacas. La ficha se centra en accesorios, ruido, derivaciones y documentacion tecnica.",
    commonIssues: [
      "Ruido o artefacto en senal.",
      "Electrodos, cable paciente o derivaciones no verificados.",
      "Configuracion de filtro o velocidad no documentada.",
      "Impresion o exportacion sin datos completos.",
    ],
    checklist: [
      "Confirmar accesorios, cable paciente y estado fisico visible.",
      "Registrar configuracion observada sin interpretar clinicamente el trazo.",
      "Verificar alimentacion, papel o exportacion segun practica.",
      "Documentar condicion de prueba y limitaciones.",
      "Escalar si el equipo se usa en area clinica activa.",
    ],
    learningOutcomes: [
      "Distinguir revision tecnica de interpretacion diagnostica.",
      "Identificar accesorios y condiciones que afectan la senal.",
      "Generar reporte tecnico sin conclusiones clinicas.",
    ],
    caution:
      "No interpreta electrocardiogramas ni sustituye criterio medico.",
  },
  {
    slug: "incubadora-cuna-termica",
    name: "Incubadora / cuna termica",
    category: "Soporte neonatal",
    quizCategory: "equipos-medicos-basicos",
    caseCategory: "ingenieria-clinica-mantenimiento",
    caseId: "incubadora-temp-inestable",
    reportEquipment: "Incubadora neonatal",
    summary:
      "Equipo de soporte neonatal con control termico, alarmas, sensores y mantenimiento preventivo. La ficha es introductoria y educativa.",
    commonIssues: [
      "Control termico no documentado.",
      "Sensor o alarma con condicion no verificada.",
      "Limpieza, accesorios o bitacora incompleta.",
      "Mantenimiento preventivo pendiente.",
    ],
    checklist: [
      "Registrar modo observado, sensor, alarmas y condiciones visibles.",
      "No modificar parametros en entorno clinico real sin supervision.",
      "Verificar limpieza, accesorios y bitacora segun actividad.",
      "Documentar limitaciones de prueba y necesidad de seguimiento.",
      "Escalar toda duda por tratarse de poblacion vulnerable.",
    ],
    learningOutcomes: [
      "Reconocer criticidad de equipos de soporte neonatal.",
      "Ordenar verificacion basica y evidencia sin intervenir clinicamente.",
      "Aplicar lenguaje tecnico prudente en el reporte.",
    ],
    caution:
      "No sustituye protocolos neonatales, calibracion ni mantenimiento certificado.",
  },
] as const;

export type EquipmentProfile = (typeof equipmentProfiles)[number];

export const guidedActivities = [
  {
    slug: "monitor-sin-senal-spo2",
    title: "Monitor sin senal SpO2",
    duration: "45 min",
    level: "Basico-intermedio",
    equipmentSlug: "monitor-multiparametrico",
    objective:
      "Practicar una verificacion tecnica inicial de monitoreo y generar evidencia de actividad.",
    flow: [
      "Quiz de monitoreo de signos vitales.",
      "Caso simulado Monitor sin lectura de SpO2.",
      "Reporte correctivo con hallazgos y recomendacion.",
    ],
    evidence: [
      "Captura del resultado del quiz.",
      "Resultado final del caso.",
      "Vista previa o PDF del reporte tecnico.",
    ],
  },
  {
    slug: "bomba-oclusion",
    title: "Bomba de infusion con alarma de oclusion",
    duration: "45-60 min",
    level: "Intermedio",
    equipmentSlug: "bomba-infusion",
    objective:
      "Relacionar alarma, linea, configuracion y documentacion tecnica sin asumir falla interna.",
    flow: [
      "Quiz de bombas de infusion y terapia.",
      "Caso simulado de oclusion.",
      "Reporte tecnico de verificacion inicial.",
    ],
    evidence: [
      "Puntaje del quiz.",
      "Decisiones tomadas en el caso.",
      "Reporte con causa probable y accion realizada.",
    ],
  },
  {
    slug: "desfibrilador-no-carga",
    title: "Desfibrilador que no carga",
    duration: "40-50 min",
    level: "Intermedio",
    equipmentSlug: "desfibrilador",
    objective:
      "Reconocer prioridad tecnica, accesorios, energia y escalamiento de un equipo critico.",
    flow: [
      "Quiz de desfibrilador y urgencias.",
      "Caso simulado de no carga.",
      "Reporte con evidencia y recomendacion de escalamiento.",
    ],
    evidence: [
      "Resultado del quiz.",
      "Resultado del caso.",
      "Reporte tecnico con aviso de criticidad.",
    ],
  },
  {
    slug: "autoclave-ciclo-incompleto",
    title: "Autoclave no alcanza presion objetivo",
    duration: "40 min",
    level: "Basico",
    equipmentSlug: "autoclave",
    objective:
      "Ordenar datos de ciclo, alarma, carga y registro sin validar esterilidad.",
    flow: [
      "Quiz de esterilizacion y autoclave.",
      "Caso simulado sobre presion objetivo y sello de puerta.",
      "Reporte con observaciones y seguimiento.",
    ],
    evidence: [
      "Respuestas del quiz.",
      "Lista de observaciones tecnicas.",
      "Reporte educativo de seguimiento.",
    ],
  },
] as const;

export const futureProjects = [
  {
    slug: "medtech-atlas-edu",
    name: "MedTech Atlas Edu",
    status: "Activo en Core",
    purpose:
      "Atlas educativo de equipos medicos, fichas, fallas comunes, checklist y rutas relacionadas.",
  },
  {
    slug: "electrical-safety-trainer",
    name: "Electrical Safety Trainer",
    status: "Alta prioridad",
    purpose:
      "Entrenador de seguridad electrica hospitalaria con casos, quizzes y checklist formativo.",
  },
  {
    slug: "safecheck-health",
    name: "SafeCheck Health",
    status: "Prototipo sugerido",
    purpose:
      "Checklist educativo para bioseguridad, verificacion inicial y documentacion de condiciones seguras.",
  },
  {
    slug: "maintenance-planner-lite",
    name: "Maintenance Planner Lite",
    status: "Fase posterior",
    purpose:
      "Calendario simple de mantenimiento preventivo para practicas y gestion academica de equipos.",
  },
  {
    slug: "biomedical-calculators-edu",
    name: "Biomedical Calculators Edu",
    status: "Fase posterior",
    purpose:
      "Calculadoras educativas de unidades, tiempos, conversiones y parametros tecnicos no clinicos.",
  },
] as const;

export function getEquipmentBySlug(slug: string) {
  return equipmentProfiles.find((item) => item.slug === slug);
}
