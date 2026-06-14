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
import Image from "next/image";

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
    description: "Banco academico de preguntas por categoria, niveles y modos.",
    href: QUIZ_ARENA_URL,
    action: "Abrir quizzes",
    icon: BookOpenCheck,
    accent: "blue",
  },
  {
    title: "BioMed Case Simulator",
    description: "Casos de fallas en equipos medicos con guia diagnostica.",
    href: CASE_SIMULATOR_URL,
    action: "Abrir simulador",
    icon: BrainCircuit,
    accent: "cyan",
  },
  {
    title: "Clinical Report Builder",
    description: "Genera reportes tecnicos profesionales en PDF.",
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
    items: ["Repaso por categoria", "Practica guiada", "Evidencia de actividad"],
  },
  {
    title: "Docentes",
    icon: Users,
    items: ["Actividades guiadas", "Pretest/postest", "Reportes como evidencia"],
  },
  {
    title: "Tecnicos biomedicos",
    icon: Wrench,
    items: ["Entrenamiento basico", "Diagnostico tecnico", "Documentacion"],
  },
];

const activityLog = [
  ["Quiz - Monitoreo", "Puntaje: 80% · Hoy, 10:45"],
  ["Caso - Monitor sin SpO2", "Resultado: Completado · Hoy, 11:15"],
  ["Reporte - Correctivo", "PDF generado · Hoy, 11:28"],
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
      <header className="sticky top-0 z-50 border-b border-blue-800 bg-blue-950 text-white shadow-sm">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-3 px-4 py-3 md:px-6">
          <a href="#inicio" className="inline-flex items-center gap-2 text-sm font-semibold">
            <span className="flex h-8 w-8 items-center justify-center rounded-md bg-white/10 ring-1 ring-white/20">
              <Stethoscope className="h-4 w-4" aria-hidden="true" />
            </span>
            BioMedTools MX Core
          </a>
          <nav className="hidden items-center gap-1 text-xs font-medium md:flex">
            {["Inicio", "Modulos", "Practicas guiadas", "Recursos"].map((item) => (
              <a
                key={item}
                href={item === "Inicio" ? "#inicio" : item === "Modulos" ? "#modulos" : "#practicas"}
                className="rounded-md px-3 py-2 text-blue-100 hover:bg-white/10 hover:text-white"
              >
                {item}
              </a>
            ))}
          </nav>
          <a
            href={guidedPracticeUrl}
            className="inline-flex min-h-9 items-center gap-2 rounded-md bg-white px-3 py-1.5 text-xs font-semibold text-blue-950 hover:bg-blue-50"
          >
            Andres M.
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        </div>
      </header>

      <main id="inicio" className="mx-auto w-full max-w-7xl px-4 py-6 md:px-6">
        <section className="rounded-lg border border-slate-200 bg-white/96 p-5 shadow-[0_18px_55px_rgba(15,23,42,0.12)] md:p-7">
          <div className="grid gap-6 lg:grid-cols-[0.95fr_0.9fr]">
            <div className="flex flex-col justify-center">
              <h1 className="max-w-2xl text-3xl font-semibold leading-tight text-slate-950 md:text-5xl">
                Plataforma de aprendizaje, simulacion y documentacion tecnica
                para Ingenieria Biomedica y Ciencias de la Salud.
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
                Entrena competencias tecnicas con quizzes, casos simulados y
                reportes profesionales conectados en un mismo flujo academico.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={guidedPracticeUrl}
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-blue-700 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-800"
                >
                  Iniciar practica guiada
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
                <a
                  href="#modulos"
                  className="inline-flex min-h-11 items-center justify-center rounded-md border border-blue-200 bg-white px-4 py-2 text-sm font-medium text-blue-800 hover:bg-blue-50"
                >
                  Ver modulos
                </a>
              </div>
            </div>

            <div className="self-start rounded-lg border border-blue-100 bg-gradient-to-br from-blue-50 to-white p-5">
              <div className="relative min-h-56 overflow-hidden rounded-md border border-blue-100 bg-white">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(37,99,235,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(37,99,235,0.08)_1px,transparent_1px)] bg-[size:34px_34px]" />
                <div className="absolute left-6 top-10 h-14 w-28 rounded-md border-2 border-blue-300">
                  <Activity className="absolute left-4 top-4 h-8 w-8 text-blue-500" aria-hidden="true" />
                  <div className="absolute right-3 top-3 h-2 w-8 rounded bg-blue-200" />
                  <div className="absolute right-3 top-7 h-2 w-8 rounded bg-blue-100" />
                </div>
                <div className="absolute left-44 top-20 h-20 w-28 rounded-lg border-2 border-blue-400 bg-blue-50">
                  <div className="mx-auto mt-4 h-9 w-16 rounded border border-blue-300 bg-blue-950">
                    <Activity className="mx-auto mt-2 h-5 w-8 text-cyan-200" aria-hidden="true" />
                  </div>
                  <div className="mx-auto mt-2 flex w-20 justify-between">
                    <span className="h-2 w-2 rounded-full bg-blue-300" />
                    <span className="h-2 w-2 rounded-full bg-blue-300" />
                    <span className="h-2 w-2 rounded-full bg-blue-300" />
                  </div>
                </div>
                <div className="absolute right-16 top-10 h-24 w-16 rounded-full border-2 border-blue-300" />
                <div className="absolute right-20 top-28 h-20 w-10 rounded-b-full border-b-2 border-l-2 border-r-2 border-blue-300" />
                <div className="absolute bottom-7 left-10 right-10 grid grid-cols-3 gap-3">
                  {["Quiz", "Caso", "Reporte"].map((item) => (
                    <div key={item} className="rounded-md border border-blue-100 bg-white/90 px-3 py-2 text-xs font-semibold text-blue-900 shadow-sm">
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-7 grid gap-4 lg:grid-cols-[1.6fr_0.75fr]">
            <section>
              <h2 className="text-sm font-semibold text-slate-950">
                Flujo de aprendizaje
              </h2>
              <div className="mt-3 grid gap-3 md:grid-cols-3">
                {[
                  { label: "Estudiar", text: "Refuerza conceptos con quizzes por categoria.", icon: BookOpenCheck },
                  { label: "Practicar", text: "Resuelve casos clinico-tecnicos simulados.", icon: BrainCircuit },
                  { label: "Documentar", text: "Genera reportes tecnicos biomedicos.", icon: FileText },
                ].map((item, index) => (
                  <article key={item.label} className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                    <div className="flex items-start gap-3">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-700 text-sm font-semibold text-white">
                        {index + 1}
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-slate-950">{item.label}</p>
                        <p className="mt-1 text-xs leading-5 text-slate-600">{item.text}</p>
                      </div>
                    </div>
                    <item.icon className="mt-4 h-7 w-7 text-blue-700" aria-hidden="true" />
                  </article>
                ))}
              </div>
            </section>

            <aside className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
              <h2 className="text-sm font-semibold text-slate-950">
                Actividad reciente
              </h2>
              <div className="mt-3 space-y-3">
                {activityLog.map(([title, detail]) => (
                  <div key={title} className="flex gap-3 border-b border-slate-100 pb-3 last:border-b-0 last:pb-0">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-blue-100 bg-blue-50 text-blue-700">
                      <FileText className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{title}</p>
                      <p className="mt-0.5 text-xs text-slate-500">{detail}</p>
                    </div>
                  </div>
                ))}
              </div>
              <a href={guidedPracticeUrl} className="mt-3 inline-flex text-xs font-semibold text-blue-700 hover:text-blue-900">
                Ver historial completo
                <ArrowRight className="ml-1 h-3.5 w-3.5" aria-hidden="true" />
              </a>
            </aside>
          </div>
        </section>

        <section id="modulos" className="mt-6">
          <h2 className="text-base font-semibold text-slate-950">
            Modulos disponibles
          </h2>
          <div className="mt-3 grid gap-4 md:grid-cols-3">
            {modules.map((module) => (
              <article key={module.title} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-md border ${accentClass[module.accent]}`}>
                    <module.icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-slate-950">{module.title}</h3>
                    <p className="mt-1 min-h-10 text-sm leading-5 text-slate-600">
                      {module.description}
                    </p>
                    <a
                      href={module.href}
                      className="mt-3 inline-flex min-h-9 items-center gap-2 rounded-md bg-blue-700 px-3 py-1.5 text-xs font-semibold text-white hover:bg-blue-800"
                    >
                      {module.action}
                      <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-6">
          <h2 className="text-base font-semibold text-slate-950">
            Tu rendimiento local
          </h2>
          <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
            {[
              ["Quizzes realizados", "12"],
              ["Casos completados", "6"],
              ["Mejor puntaje", "92%"],
              ["Racha actual", "5"],
              ["Categoria fuerte", "Monitoreo"],
              ["Por reforzar", "Seg. electrica"],
            ].map(([label, value]) => (
              <article key={label} className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
                <p className="text-xs font-medium text-slate-500">{label}</p>
                <p className="mt-1 text-lg font-semibold text-slate-950">{value}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="practicas" className="mt-6">
          <h2 className="text-base font-semibold text-slate-950">
            Practicas guiadas
          </h2>
          <div className="mt-3 grid gap-3">
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
                <article key={practice.title} className="grid gap-3 rounded-lg border border-slate-200 bg-white p-4 shadow-sm lg:grid-cols-[0.9fr_1.2fr]">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-md bg-slate-950 text-white">
                      <practice.icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <div>
                      <h3 className="text-base font-semibold text-slate-950">
                        {practice.title}
                      </h3>
                      <p className="text-xs text-slate-500">Flujo recomendado para actividad piloto.</p>
                    </div>
                  </div>
                  <div className="grid gap-2 sm:grid-cols-3">
                    <a href={quizUrl} className="rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-blue-50">
                      Quiz de repaso
                    </a>
                    <a href={caseUrl} className="rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-cyan-50">
                      Caso simulado
                    </a>
                    <a href={reportUrl} className="rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-teal-50">
                      Reporte tecnico
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section className="mt-6 grid gap-4 md:grid-cols-3">
          {audience.map((group) => (
            <article key={group.title} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
              <group.icon className="h-6 w-6 text-blue-700" aria-hidden="true" />
              <h2 className="mt-4 text-base font-semibold text-slate-950">{group.title}</h2>
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
        </section>

        <section className="mt-6 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-base font-semibold text-slate-950">
            Design System - BioMedTools MX Core
          </h2>
          <div className="mt-4 grid gap-5 lg:grid-cols-[1.25fr_0.75fr_0.85fr_1fr]">
            <div>
              <p className="text-xs font-semibold uppercase text-slate-500">Colores</p>
              <div className="mt-3 grid grid-cols-6 gap-2">
                {["#0D47A1", "#1565C0", "#00BCD4", "#009688", "#F4F7FA", "#1E293B"].map((color) => (
                  <span key={color} className="h-9 rounded-md border border-slate-200" style={{ backgroundColor: color }} title={color} />
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase text-slate-500">Tipografia</p>
              <div className="mt-3 flex items-end gap-4 text-slate-950">
                <span className="text-3xl font-semibold">Aa</span>
                <span className="text-xl">Aa</span>
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase text-slate-500">Iconos</p>
              <div className="mt-3 flex gap-3 text-blue-700">
                <Activity className="h-6 w-6" aria-hidden="true" />
                <ShieldCheck className="h-6 w-6" aria-hidden="true" />
                <FileText className="h-6 w-6" aria-hidden="true" />
                <Stethoscope className="h-6 w-6" aria-hidden="true" />
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase text-slate-500">Botones</p>
              <div className="mt-3 flex flex-wrap gap-2">
                <span className="rounded-md bg-blue-700 px-3 py-2 text-xs font-semibold text-white">Primario</span>
                <span className="rounded-md border border-blue-200 px-3 py-2 text-xs font-semibold text-blue-800">Secundario</span>
                <span className="rounded-md bg-teal-700 px-3 py-2 text-xs font-semibold text-white">Exito</span>
              </div>
            </div>
          </div>
        </section>

        <section className="my-6 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-900">
          Uso educativo. No sustituye protocolos clinicos, normativas
          institucionales, supervision profesional ni mantenimiento biomedico
          certificado.
        </section>

        <footer className="mb-6 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-5">
            <div className="flex items-center gap-4">
              <Image
                src="/topic-tales-biomedica-logo.png"
                alt="Topic Tales Biomedica"
                width={140}
                height={98}
                className="h-14 w-auto object-contain"
                priority
              />
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Desarrollado por
                </p>
                <p className="text-sm font-semibold text-slate-950">
                  Ing. Andres Monreal
                </p>
                <p className="text-xs text-slate-600">
                  Ingeniero Biomedico / Topic Tales Biomedica
                </p>
              </div>
            </div>
            <p className="max-w-md text-xs leading-5 text-slate-500">
              BioMedTools MX Core para uso academico, simulacion educativa y
              documentacion tecnica formativa.
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
}
