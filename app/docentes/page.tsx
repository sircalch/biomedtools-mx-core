import type { Metadata } from "next";
import {
  ArrowRight,
  BookOpenCheck,
  CalendarClock,
  ClipboardCheck,
  FileText,
  GraduationCap,
  ShieldCheck,
  Stethoscope,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const QUIZ_ARENA_URL =
  process.env.NEXT_PUBLIC_QUIZ_ARENA_URL ||
  "https://biomed-quiz-arena.vercel.app";
const CASE_SIMULATOR_URL =
  process.env.NEXT_PUBLIC_CASE_SIMULATOR_URL ||
  "https://biomed-case-simulator.vercel.app";
const REPORT_BUILDER_URL =
  process.env.NEXT_PUBLIC_REPORT_BUILDER_URL ||
  "https://clinical-report-builder.vercel.app";

export const metadata: Metadata = {
  title: "Para docentes | BioMedTools MX Core",
  description:
    "Actividad piloto, evidencias y rubrica para usar BioMedTools MX Core en clase.",
};

function buildUrl(base: string, path = "/", params?: Record<string, string>) {
  const url = new URL(path, base);
  if (params) {
    for (const [key, value] of Object.entries(params)) {
      url.searchParams.set(key, value);
    }
  }
  return url.toString();
}

const pilotLinks = {
  quiz: buildUrl(QUIZ_ARENA_URL, "/quiz/monitoreo-signos-vitales", {
    mode: "study",
    difficulty: "all",
  }),
  case: buildUrl(CASE_SIMULATOR_URL, "/", {
    category: "monitoreo-signos-vitales",
  }),
  report: buildUrl(REPORT_BUILDER_URL, "/", {
    activity: "case",
    caseId: "monitor-sin-spo2",
    equipment: "Monitor multiparametrico",
  }),
};

const sessionPlan = [
  ["0-5 min", "Contexto", "Presentar objetivo, flujo y aviso educativo."],
  ["5-15 min", "Pretest / quiz", "Resolver preguntas de monitoreo de signos vitales."],
  ["15-35 min", "Caso simulado", "Completar caso Monitor sin lectura de SpO2."],
  ["35-50 min", "Reporte", "Generar evidencia tecnica con Report Builder."],
  ["50-60 min", "Cierre", "Recolectar observaciones y dudas del grupo."],
];

const evidenceItems = [
  "Captura del resultado del quiz.",
  "Resultado final del caso simulado.",
  "Reporte PDF o vista previa del reporte tecnico.",
  "Observacion breve del estudiante sobre claridad del flujo.",
  "Registro docente de problemas tecnicos o dudas frecuentes.",
];

const rubric = [
  ["Comprension tecnica", "Identifica conceptos basicos y los aplica sin conclusiones riesgosas."],
  ["Razonamiento del caso", "Sigue pasos, revisa pistas y selecciona acciones justificadas."],
  ["Documentacion", "Reporta falla, diagnostico, acciones y recomendaciones con lenguaje tecnico."],
  ["Evidencia", "Entrega capturas o reporte que permitan verificar la actividad."],
];

export default function TeachersPage() {
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-50 border-b border-blue-800 bg-blue-950 text-white shadow-sm">
        <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-3 md:px-6">
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold">
            <span className="flex h-8 w-8 items-center justify-center rounded-md bg-white/10 ring-1 ring-white/20">
              <Stethoscope className="h-4 w-4" aria-hidden="true" />
            </span>
            BioMedTools MX Core
          </Link>
          <nav className="flex flex-wrap items-center gap-1 text-xs font-medium">
            <Link href="/ruta" className="rounded-md px-3 py-2 text-blue-100 hover:bg-white/10 hover:text-white">
              Ruta
            </Link>
            <Link href="/biblioteca" className="rounded-md px-3 py-2 text-blue-100 hover:bg-white/10 hover:text-white">
              Biblioteca
            </Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto w-full max-w-7xl px-4 py-6 md:px-6">
        <section className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-[0_18px_55px_rgba(15,23,42,0.12)]">
          <div className="grid lg:grid-cols-[1fr_0.78fr]">
            <div className="p-5 md:p-7">
              <div className="flex h-12 w-12 items-center justify-center rounded-md bg-blue-950 text-white">
                <GraduationCap className="h-6 w-6" aria-hidden="true" />
              </div>
              <h1 className="mt-5 max-w-3xl text-3xl font-semibold leading-tight text-slate-950 md:text-4xl">
                Actividad piloto para docentes
              </h1>
              <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">
                Guia breve para aplicar BioMedTools MX Core como actividad de
                repaso, simulacion y documentacion tecnica con estudiantes de
                Ingenieria Biomedica o ciencias de la salud.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href={pilotLinks.quiz} className="inline-flex min-h-11 items-center gap-2 rounded-md bg-blue-700 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-800">
                  Iniciar flujo piloto
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
                <Link href="/ruta" className="inline-flex min-h-11 items-center rounded-md border border-blue-200 bg-white px-4 py-2 text-sm font-semibold text-blue-800 hover:bg-blue-50">
                  Ver rutas
                </Link>
              </div>
            </div>
            <aside className="border-t border-slate-200 bg-slate-50 p-5 lg:border-l lg:border-t-0 md:p-7">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                Flujo recomendado
              </h2>
              <div className="mt-4 space-y-3">
                {[
                  ["Quiz", "Monitoreo de signos vitales", pilotLinks.quiz, BookOpenCheck],
                  ["Caso", "Monitor sin lectura de SpO2", pilotLinks.case, ShieldCheck],
                  ["Reporte", "Evidencia tecnica en PDF", pilotLinks.report, FileText],
                ].map(([label, text, href, Icon]) => (
                  <a
                    key={String(label)}
                    href={String(href)}
                    className="grid grid-cols-[2.5rem_1fr_auto] items-center gap-3 rounded-md border border-slate-200 bg-white p-3 shadow-sm hover:border-blue-200 hover:bg-blue-50"
                  >
                    <span className="flex h-10 w-10 items-center justify-center rounded-md bg-blue-50 text-blue-700">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <span>
                      <span className="block text-xs font-semibold uppercase text-slate-500">
                        {String(label)}
                      </span>
                      <span className="mt-0.5 block text-sm font-semibold text-slate-950">
                        {String(text)}
                      </span>
                    </span>
                    <ArrowRight className="h-4 w-4 text-blue-700" aria-hidden="true" />
                  </a>
                ))}
              </div>
            </aside>
          </div>
        </section>

        <section className="mt-6 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
          <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-2">
              <CalendarClock className="h-5 w-5 text-blue-700" aria-hidden="true" />
              <h2 className="text-base font-semibold text-slate-950">
                Planeacion de sesion
              </h2>
            </div>
            <div className="mt-4 overflow-hidden rounded-lg border border-slate-200">
              {sessionPlan.map(([time, phase, detail]) => (
                <div key={time} className="grid gap-2 border-b border-slate-200 bg-white p-3 last:border-b-0 md:grid-cols-[6rem_10rem_1fr]">
                  <p className="text-sm font-semibold text-blue-700">{time}</p>
                  <p className="text-sm font-semibold text-slate-950">{phase}</p>
                  <p className="text-sm leading-6 text-slate-600">{detail}</p>
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-2">
              <ClipboardCheck className="h-5 w-5 text-teal-700" aria-hidden="true" />
              <h2 className="text-base font-semibold text-slate-950">
                Evidencia a recolectar
              </h2>
            </div>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
              {evidenceItems.map((item) => (
                <li key={item} className="flex gap-2">
                  <ClipboardCheck className="mt-1 h-4 w-4 shrink-0 text-teal-700" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </article>
        </section>

        <section className="mt-6 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-700" aria-hidden="true" />
              <h2 className="text-base font-semibold text-slate-950">
                Rubrica breve sugerida
              </h2>
            </div>
            <span className="rounded-md border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-600">
              Uso formativo
            </span>
          </div>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {rubric.map(([criterion, description]) => (
              <article key={criterion} className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                <h3 className="text-sm font-semibold text-slate-950">
                  {criterion}
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {description}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="my-6 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-900">
          Actividad educativa. No evalua competencia clinica, no sustituye
          supervision docente ni reemplaza protocolos institucionales.
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
          </div>
        </footer>
      </main>
    </div>
  );
}
