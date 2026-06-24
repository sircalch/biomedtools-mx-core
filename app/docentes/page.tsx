import type { Metadata } from "next";
import {
  ArrowRight,
  BookOpenCheck,
  CalendarClock,
  ClipboardCheck,
  FileText,
  GraduationCap,
  ShieldCheck,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Link from "next/link";

import { TeacherPilotDashboard } from "@/app/components/TeacherPilotDashboard";
import {
  CASE_SIMULATOR_URL,
  QUIZ_ARENA_URL,
  REPORT_BUILDER_URL,
  buildUrl,
} from "@/app/lib/biomed-content";

export const metadata: Metadata = {
  title: "Para docentes | BioMedTools MX Core",
  description:
    "Consola docente, actividad piloto, evidencias y rubrica para usar BioMedTools MX Core en clase.",
};

const pilotLinks = {
  quiz: buildUrl(QUIZ_ARENA_URL, "/quiz/monitoreo-signos-vitales", {
    mode: "study",
    difficulty: "all",
  }),
  case: buildUrl(CASE_SIMULATOR_URL, "/cases/monitor-sin-spo2", {
    category: "monitoreo-signos-vitales",
  }),
  report: buildUrl(REPORT_BUILDER_URL, "/builder/corrective", {
    activity: "case",
    caseId: "monitor-sin-spo2",
    equipment: "Monitor multiparametrico",
  }),
};

const recommendedFlow: Array<{
  label: string;
  text: string;
  href: string;
  icon: LucideIcon;
}> = [
  {
    label: "Quiz",
    text: "Monitoreo de signos vitales",
    href: pilotLinks.quiz,
    icon: BookOpenCheck,
  },
  {
    label: "Caso",
    text: "Monitor sin lectura de SpO2",
    href: pilotLinks.case,
    icon: ShieldCheck,
  },
  {
    label: "Reporte",
    text: "Evidencia tecnica en PDF",
    href: pilotLinks.report,
    icon: FileText,
  },
];

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
    <main className="mx-auto w-full max-w-7xl px-4 py-6 md:px-6">
      <section className="mb-6 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-[0_18px_55px_rgba(15,23,42,0.12)]">
        <div className="grid lg:grid-cols-[1fr_0.78fr]">
          <div className="p-5 md:p-7">
            <div className="flex h-12 w-12 items-center justify-center rounded-md bg-blue-950 text-white">
              <GraduationCap className="h-6 w-6" aria-hidden="true" />
            </div>
            <h1 className="mt-5 max-w-3xl text-3xl font-semibold leading-tight text-slate-950 md:text-4xl">
              Panel docente para piloto academico
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">
              Prepara una actividad de 40 a 60 minutos, comparte el flujo
              Quiz - Caso - Reporte y registra evidencia minima sin depender
              todavia de backend.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={pilotLinks.quiz}
                className="inline-flex min-h-11 items-center gap-2 rounded-md bg-blue-700 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-800"
              >
                Iniciar flujo piloto
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
              <Link
                href="/ruta"
                className="inline-flex min-h-11 items-center rounded-md border border-blue-200 bg-white px-4 py-2 text-sm font-semibold text-blue-800 hover:bg-blue-50"
              >
                Ver rutas guiadas
              </Link>
            </div>
          </div>

          <aside className="border-t border-slate-200 bg-slate-50 p-5 lg:border-l lg:border-t-0 md:p-7">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
              Flujo recomendado
            </h2>
            <div className="mt-4 space-y-3">
              {recommendedFlow.map(({ label, text, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  className="grid grid-cols-[2.5rem_1fr_auto] items-center gap-3 rounded-md border border-slate-200 bg-white p-3 shadow-sm hover:border-blue-200 hover:bg-blue-50"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-md bg-blue-50 text-blue-700">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block text-xs font-semibold uppercase text-slate-500">
                      {label}
                    </span>
                    <span className="mt-0.5 block text-sm font-semibold text-slate-950">
                      {text}
                    </span>
                  </span>
                  <ArrowRight className="h-4 w-4 text-blue-700" aria-hidden="true" />
                </a>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <TeacherPilotDashboard />

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
              <div
                key={time}
                className="grid gap-2 border-b border-slate-200 bg-white p-3 last:border-b-0 md:grid-cols-[6rem_10rem_1fr]"
              >
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
            <article
              key={criterion}
              className="rounded-lg border border-slate-200 bg-slate-50 p-4"
            >
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
    </main>
  );
}
