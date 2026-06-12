import {
  Activity,
  ArrowRight,
  BookOpenCheck,
  BrainCircuit,
  ClipboardCheck,
  ExternalLink,
  FileText,
  FlaskConical,
  GraduationCap,
  ShieldCheck,
  Stethoscope,
  Users,
  Wrench,
} from "lucide-react";

const CASE_SIMULATOR_URL =
  process.env.NEXT_PUBLIC_CASE_SIMULATOR_URL ||
  "https://biomed-case-simulator.vercel.app";
const QUIZ_ARENA_URL =
  process.env.NEXT_PUBLIC_QUIZ_ARENA_URL ||
  "https://biomed-quiz-arena.vercel.app";
const REPORT_BUILDER_URL =
  process.env.NEXT_PUBLIC_REPORT_BUILDER_URL ||
  "https://clinical-report-builder.vercel.app";

function buildUrl(base: string, path = "/", params?: Record<string, string>) {
  const url = new URL(path, base);
  if (params) {
    for (const [key, value] of Object.entries(params)) {
      url.searchParams.set(key, value);
    }
  }
  return url.toString();
}

const modules = [
  {
    title: "BioMed Quiz Arena",
    description:
      "Repasa conceptos de ingenieria biomedica, seguridad clinica y tecnologia medica mediante quizzes por categoria.",
    href: QUIZ_ARENA_URL,
    action: "Abrir quizzes",
    icon: BookOpenCheck,
    accent: "blue",
  },
  {
    title: "BioMed Case Simulator",
    description:
      "Resuelve casos clinico-tecnicos de fallas en equipos medicos y fortalece el razonamiento biomedico.",
    href: CASE_SIMULATOR_URL,
    action: "Abrir simulador",
    icon: BrainCircuit,
    accent: "cyan",
  },
  {
    title: "Clinical Report Builder",
    description:
      "Genera reportes tecnicos biomedicos para practicas, mantenimiento y documentacion profesional.",
    href: REPORT_BUILDER_URL,
    action: "Crear reporte",
    icon: FileText,
    accent: "teal",
  },
];

const practices = [
  {
    title: "Monitor sin senal SpO2",
    category: "monitoreo-signos-vitales",
    caseId: "monitor-sin-spo2",
    equipment: "Monitor multiparametrico",
    icon: Activity,
  },
  {
    title: "Bomba de infusion con alarma de oclusion",
    category: "bombas-infusion-terapia",
    caseId: "bomba-oclusion",
    equipment: "Bomba volumetrica",
    icon: FlaskConical,
  },
  {
    title: "Desfibrilador que no carga",
    category: "desfibrilador-urgencias",
    caseId: "desfibrilador-no-carga",
    equipment: "Desfibrilador",
    icon: ShieldCheck,
  },
];

const audience = [
  {
    title: "Estudiantes",
    icon: GraduationCap,
    items: [
      "Repaso por categoria",
      "Practica guiada",
      "Evidencia de actividad",
      "Preparacion para laboratorio",
    ],
  },
  {
    title: "Docentes",
    icon: Users,
    items: [
      "Actividades guiadas",
      "Pretest/postest",
      "Practicas digitales",
      "Reportes como evidencia",
    ],
  },
  {
    title: "Tecnicos biomedicos",
    icon: Wrench,
    items: [
      "Entrenamiento basico",
      "Diagnostico tecnico",
      "Documentacion",
      "Reportes profesionales",
    ],
  },
];

const accentClass: Record<string, string> = {
  blue: "border-blue-200 bg-blue-50 text-blue-800",
  cyan: "border-cyan-200 bg-cyan-50 text-cyan-800",
  teal: "border-teal-200 bg-teal-50 text-teal-800",
};

export default function Home() {
  const guidedPracticeUrl = buildUrl(QUIZ_ARENA_URL, "/quiz/monitoreo-signos-vitales", {
    mode: "study",
    difficulty: "all",
  });

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/92 backdrop-blur">
        <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-3 md:px-6">
          <a href="#inicio" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-950">
            <span className="flex h-8 w-8 items-center justify-center rounded-md bg-slate-950 text-white">
              <Stethoscope className="h-4 w-4" aria-hidden="true" />
            </span>
            BioMedTools MX Core
          </a>
          <nav className="flex flex-wrap items-center gap-1 text-sm">
            <a
              href="#flujo"
              className="rounded-md px-3 py-2 font-medium text-slate-700 hover:bg-blue-50 hover:text-blue-800"
            >
              Flujo
            </a>
            <a
              href="#modulos"
              className="rounded-md px-3 py-2 font-medium text-slate-700 hover:bg-blue-50 hover:text-blue-800"
            >
              Modulos
            </a>
            <a
              href={guidedPracticeUrl}
              className="inline-flex min-h-10 items-center gap-2 rounded-md bg-blue-700 px-3 py-2 font-medium text-white shadow-sm hover:bg-blue-800"
            >
              Iniciar
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </nav>
        </div>
      </header>

      <main id="inicio">
        <section className="mx-auto w-full max-w-7xl px-4 py-10 md:px-6 lg:py-14">
          <div className="overflow-hidden rounded-lg border border-slate-200 bg-white/95 shadow-[0_20px_60px_rgba(15,23,42,0.10)]">
            <div className="grid gap-0 lg:grid-cols-[1.02fr_0.98fr]">
              <div className="p-6 md:p-9 lg:p-10">
                <div className="inline-flex items-center gap-2 rounded-md border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-semibold uppercase text-blue-800">
                  <Activity className="h-3.5 w-3.5" aria-hidden="true" />
                  Plataforma academica integrada
                </div>
                <h1 className="mt-5 max-w-3xl text-4xl font-semibold leading-tight text-slate-950 md:text-6xl">
                  BioMedTools MX Core
                </h1>
                <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-700">
                  Plataforma de aprendizaje, simulacion y documentacion tecnica
                  para Ingenieria Biomedica y Ciencias de la Salud.
                </p>
                <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600">
                  Entrena competencias tecnicas en tecnologia medica mediante
                  quizzes, casos simulados y reportes biomedicos.
                </p>
                <div className="mt-7 flex flex-wrap gap-3">
                  <a
                    href={guidedPracticeUrl}
                    className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-blue-700 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-blue-800"
                  >
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    Iniciar practica guiada
                  </a>
                  <a
                    href="#modulos"
                    className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-800"
                  >
                    Ver modulos
                  </a>
                </div>

                <div className="mt-8 grid gap-2 sm:grid-cols-3">
                  {[
                    ["Quizzes", "100 preguntas"],
                    ["Casos", "5 escenarios"],
                    ["Reportes", "PDF educativo"],
                  ].map(([label, value]) => (
                    <div key={label} className="border-l border-slate-200 pl-3">
                      <p className="text-xs font-semibold uppercase text-slate-500">
                        {label}
                      </p>
                      <p className="mt-1 text-sm font-semibold text-slate-950">
                        {value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-slate-200 bg-slate-950 p-5 text-white lg:border-l lg:border-t-0 md:p-7">
                <div className="rounded-md border border-white/10 bg-white/[0.03] p-4">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <p className="text-sm font-semibold">Flujo de entrenamiento</p>
                    <span className="rounded border border-emerald-400/30 bg-emerald-400/10 px-2 py-1 text-xs text-emerald-200">
                      Activo
                    </span>
                  </div>
                  <div className="mt-4 grid gap-3">
                    {[
                      { label: "Estudiar", text: "BioMed Quiz Arena", icon: BookOpenCheck },
                      { label: "Practicar", text: "BioMed Case Simulator", icon: BrainCircuit },
                      { label: "Documentar", text: "Clinical Report Builder", icon: FileText },
                    ].map((item, index) => (
                      <div
                        key={item.label}
                        className="grid grid-cols-[2.5rem_1fr_auto] items-center gap-3 rounded-md border border-white/10 bg-white/[0.04] p-3"
                      >
                        <span className="flex h-10 w-10 items-center justify-center rounded-md bg-blue-500/15 text-blue-100">
                          <item.icon className="h-5 w-5" aria-hidden="true" />
                        </span>
                        <div>
                          <p className="text-xs font-semibold uppercase text-slate-400">
                            {index + 1}. {item.label}
                          </p>
                          <p className="mt-0.5 text-sm font-semibold text-white">
                            {item.text}
                          </p>
                        </div>
                        <span className="h-px w-8 bg-cyan-300/40" />
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 rounded-md border border-cyan-300/20 bg-cyan-300/10 p-3">
                    <p className="text-xs font-semibold uppercase text-cyan-100">
                      Practica piloto
                    </p>
                    <p className="mt-1 text-sm text-slate-200">
                      Monitoreo de signos vitales / SpO2 con reporte tecnico.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="flujo" className="border-y border-slate-200 bg-white/85">
          <div className="mx-auto w-full max-w-7xl px-4 py-10 md:px-6">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <h2 className="text-2xl font-semibold text-slate-950">
                  Estudiar - Practicar - Documentar
                </h2>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
                  La ruta recomendada conecta repaso conceptual, toma de
                  decisiones tecnicas y evidencia documentada.
                </p>
              </div>
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {[
                ["Estudiar", "BioMed Quiz Arena", "Refuerza conceptos por categoria antes de resolver casos."],
                ["Practicar", "BioMed Case Simulator", "Aplica razonamiento tecnico con pistas y decisiones."],
                ["Documentar", "Clinical Report Builder", "Convierte el ejercicio en evidencia tecnica exportable."],
              ].map(([title, product, text], index) => (
                <article key={title} className="relative rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                  <span className="absolute right-4 top-4 text-xs font-semibold text-slate-400">
                    0{index + 1}
                  </span>
                  <h3 className="text-lg font-semibold text-slate-950">{title}</h3>
                  <p className="mt-1 text-sm font-semibold text-blue-700">{product}</p>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="modulos" className="mx-auto w-full max-w-7xl px-4 py-12 md:px-6">
          <h2 className="text-2xl font-semibold text-slate-950">Modulos</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {modules.map((module) => (
              <article
                key={module.title}
                className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md"
              >
                <div className={`inline-flex h-11 w-11 items-center justify-center rounded-md border ${accentClass[module.accent]}`}>
                  <module.icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-slate-950">
                  {module.title}
                </h3>
                <p className="mt-2 min-h-20 text-sm leading-6 text-slate-600">
                  {module.description}
                </p>
                <a
                  href={module.href}
                  className="mt-4 inline-flex min-h-10 items-center gap-2 rounded-md border border-blue-200 bg-blue-50 px-3 py-2 text-sm font-medium text-blue-800 hover:bg-blue-100"
                >
                  {module.action}
                  <ExternalLink className="h-4 w-4" aria-hidden="true" />
                </a>
              </article>
            ))}
          </div>
        </section>

        <section className="border-y border-slate-200 bg-slate-50/85">
          <div className="mx-auto w-full max-w-7xl px-4 py-12 md:px-6">
            <h2 className="text-2xl font-semibold text-slate-950">
              Practicas sugeridas
            </h2>
            <div className="mt-5 grid gap-4">
              {practices.map((practice) => {
                const quizUrl = buildUrl(QUIZ_ARENA_URL, `/quiz/${practice.category}`, {
                  mode: "study",
                  difficulty: "all",
                });
                const caseUrl = buildUrl(CASE_SIMULATOR_URL, "/", {
                  category: practice.category,
                });
                const reportUrl = buildUrl(REPORT_BUILDER_URL, "/", {
                  activity: "case",
                  caseId: practice.caseId,
                  equipment: practice.equipment,
                });

                return (
                  <article
                    key={practice.title}
                    className="grid gap-4 rounded-lg border border-slate-200 bg-white p-5 shadow-sm lg:grid-cols-[0.75fr_1fr]"
                  >
                    <div className="flex items-start gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-md bg-slate-950 text-white">
                        <practice.icon className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <div>
                        <h3 className="text-lg font-semibold text-slate-950">
                          {practice.title}
                        </h3>
                        <p className="mt-1 text-sm text-slate-600">
                          Flujo recomendado para actividad piloto.
                        </p>
                      </div>
                    </div>
                    <div className="grid gap-2 sm:grid-cols-3">
                      <a href={quizUrl} className="rounded-md border border-slate-200 bg-slate-50 p-3 text-sm font-medium text-slate-800 hover:border-blue-200 hover:bg-blue-50">
                        Quiz de repaso
                      </a>
                      <a href={caseUrl} className="rounded-md border border-slate-200 bg-slate-50 p-3 text-sm font-medium text-slate-800 hover:border-cyan-200 hover:bg-cyan-50">
                        Caso simulado
                      </a>
                      <a href={reportUrl} className="rounded-md border border-slate-200 bg-slate-50 p-3 text-sm font-medium text-slate-800 hover:border-teal-200 hover:bg-teal-50">
                        Reporte tecnico
                      </a>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-7xl px-4 py-12 md:px-6">
          <div className="grid gap-4 md:grid-cols-3">
            {audience.map((group) => (
              <article key={group.title} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                <group.icon className="h-6 w-6 text-blue-700" aria-hidden="true" />
                <h2 className="mt-4 text-lg font-semibold text-slate-950">
                  {group.title}
                </h2>
                <ul className="mt-3 space-y-2 text-sm text-slate-600">
                  {group.items.map((item) => (
                    <li key={item} className="flex gap-2">
                      <ClipboardCheck className="mt-0.5 h-4 w-4 shrink-0 text-blue-700" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="border-y border-slate-200 bg-white/85">
          <div className="mx-auto grid w-full max-w-7xl gap-6 px-4 py-10 md:px-6 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <h2 className="text-2xl font-semibold text-slate-950">
                Proximamente
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                Nuevos modulos para ampliar el ecosistema educativo y tecnico.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {["MedTech Atlas Edu", "SafeCheck Health", "Electrical Safety Trainer"].map((item) => (
                <article key={item} className="rounded-md border border-slate-200 bg-slate-50 p-4">
                  <p className="text-sm font-semibold text-slate-950">{item}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-7xl px-4 py-10 md:px-6">
          <div className="rounded-lg border border-amber-200 bg-amber-50 p-5 text-sm leading-6 text-amber-900">
            Uso educativo. No sustituye protocolos clinicos, normativas
            institucionales, supervision profesional ni mantenimiento biomedico
            certificado.
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-5 md:px-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Creado por
            </p>
            <p className="text-sm font-semibold text-slate-950">
              Ing. Andres Monreal
            </p>
            <p className="text-xs text-slate-600">
              Ingeniero Biomedico / Topic Tales Biomedica
            </p>
          </div>
          <p className="text-xs text-slate-500">
            BioMedTools MX Core para uso academico y formativo.
          </p>
        </div>
      </footer>
    </div>
  );
}
