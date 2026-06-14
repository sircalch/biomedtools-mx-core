import type { Metadata } from "next";
import {
  Activity,
  BookOpenCheck,
  BrainCircuit,
  ClipboardCheck,
  FileText,
  FlaskConical,
  ShieldCheck,
  Stethoscope,
  Zap,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const CASE_SIMULATOR_URL =
  process.env.NEXT_PUBLIC_CASE_SIMULATOR_URL ||
  "https://biomed-case-simulator.vercel.app";
const QUIZ_ARENA_URL =
  process.env.NEXT_PUBLIC_QUIZ_ARENA_URL ||
  "https://biomed-quiz-arena.vercel.app";
const REPORT_BUILDER_URL =
  process.env.NEXT_PUBLIC_REPORT_BUILDER_URL ||
  "https://clinical-report-builder.vercel.app";

export const metadata: Metadata = {
  title: "Ruta de aprendizaje | BioMedTools MX Core",
  description:
    "Rutas guiadas Quiz - Caso - Reporte para actividades de Ingenieria Biomedica.",
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

const routeTracks = [
  {
    title: "Monitoreo de signos vitales / SpO2",
    category: "monitoreo-signos-vitales",
    caseId: "monitor-sin-spo2",
    equipment: "Monitor multiparametrico",
    icon: Activity,
    outcome: "Identificar verificaciones tecnicas iniciales y documentar evidencia.",
  },
  {
    title: "Bombas de infusion y terapia",
    category: "bombas-infusion-terapia",
    caseId: "bomba-oclusion",
    equipment: "Bomba volumetrica",
    icon: FlaskConical,
    outcome: "Relacionar alarma, linea, configuracion y prueba funcional.",
  },
  {
    title: "Desfibrilador y urgencias",
    category: "desfibrilador-urgencias",
    caseId: "desfibrilador-no-carga",
    equipment: "Desfibrilador",
    icon: ShieldCheck,
    outcome: "Practicar lectura tecnica de fallas sin sustituir protocolos.",
  },
  {
    title: "Esterilizacion y autoclave",
    category: "esterilizacion-autoclave",
    caseId: "autoclave-ciclo-incompleto",
    equipment: "Autoclave",
    icon: ClipboardCheck,
    outcome: "Ordenar observaciones de ciclo, carga, sellos y registro.",
  },
  {
    title: "Seguridad electrica hospitalaria",
    category: "seguridad-electrica-hospitalaria",
    caseId: "seguridad-electrica-basica",
    equipment: "Equipo electromedico",
    icon: Zap,
    outcome: "Reconocer riesgos tecnicos basicos y criterios de escalamiento.",
  },
];

const workflow = [
  {
    title: "1. Estudiar",
    product: "BioMed Quiz Arena",
    text: "Repaso por categoria para activar conceptos antes del caso.",
    icon: BookOpenCheck,
  },
  {
    title: "2. Practicar",
    product: "BioMed Case Simulator",
    text: "Toma de decisiones guiada sobre una falla tecnico-educativa.",
    icon: BrainCircuit,
  },
  {
    title: "3. Documentar",
    product: "Clinical Report Builder",
    text: "Evidencia tecnica con formato profesional y exportable.",
    icon: FileText,
  },
];

export default function LearningRoutePage() {
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
            <Link href="/" className="rounded-md px-3 py-2 text-blue-100 hover:bg-white/10 hover:text-white">
              Inicio
            </Link>
            <Link href="/biblioteca" className="rounded-md px-3 py-2 text-blue-100 hover:bg-white/10 hover:text-white">
              Biblioteca
            </Link>
            <Link href="/docentes" className="rounded-md px-3 py-2 text-blue-100 hover:bg-white/10 hover:text-white">
              Docentes
            </Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto w-full max-w-7xl px-4 py-6 md:px-6">
        <section className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-[0_18px_55px_rgba(15,23,42,0.12)]">
          <div className="grid lg:grid-cols-[16rem_1fr]">
            <aside className="bg-blue-950 p-5 text-white">
              <h1 className="text-xl font-semibold">Ruta de aprendizaje</h1>
              <p className="mt-2 text-sm leading-6 text-blue-100">
                Secuencia recomendada para convertir repaso conceptual en
                practica y evidencia documentada.
              </p>
              <div className="mt-8 space-y-3">
                {workflow.map((step) => (
                  <article key={step.title} className="rounded-md border border-white/10 bg-white/5 p-3">
                    <step.icon className="h-5 w-5 text-cyan-200" aria-hidden="true" />
                    <p className="mt-3 text-sm font-semibold">{step.title}</p>
                    <p className="mt-1 text-xs text-blue-100">{step.product}</p>
                  </article>
                ))}
              </div>
            </aside>

            <div className="p-5 md:p-7">
              <div className="grid gap-6 lg:grid-cols-[1fr_0.75fr]">
                <div>
                  <h2 className="max-w-3xl text-3xl font-semibold leading-tight text-slate-950 md:text-4xl">
                    De concepto a evidencia tecnica en una sola actividad.
                  </h2>
                  <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">
                    Cada ruta conecta un quiz breve, un caso simulado y un
                    reporte tecnico. El objetivo es formar criterio, orden de
                    verificacion y comunicacion profesional.
                  </p>
                </div>
                <div className="rounded-lg border border-blue-100 bg-blue-50 p-4">
                  <p className="text-sm font-semibold text-blue-950">
                    Duracion sugerida
                  </p>
                  <p className="mt-2 text-3xl font-semibold text-blue-800">
                    40-60 min
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Ideal para laboratorio, clase practica o validacion piloto.
                  </p>
                </div>
              </div>

              <section className="mt-7 grid gap-4 md:grid-cols-3">
                {workflow.map((step) => (
                  <article key={step.title} className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                    <step.icon className="h-6 w-6 text-blue-700" aria-hidden="true" />
                    <h3 className="mt-4 text-base font-semibold text-slate-950">
                      {step.title}
                    </h3>
                    <p className="mt-1 text-sm font-semibold text-blue-700">
                      {step.product}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      {step.text}
                    </p>
                  </article>
                ))}
              </section>
            </div>
          </div>
        </section>

        <section className="mt-6">
          <h2 className="text-base font-semibold text-slate-950">
            Rutas sugeridas por tema
          </h2>
          <div className="mt-3 grid gap-4">
            {routeTracks.map((track) => {
              const quizUrl = buildUrl(QUIZ_ARENA_URL, `/quiz/${track.category}`, {
                mode: "study",
                difficulty: "all",
              });
              const caseUrl = buildUrl(CASE_SIMULATOR_URL, "/", {
                category: track.category,
              });
              const reportUrl = buildUrl(REPORT_BUILDER_URL, "/", {
                activity: "case",
                caseId: track.caseId,
                equipment: track.equipment,
              });

              return (
                <article
                  key={track.title}
                  className="grid gap-4 rounded-lg border border-slate-200 bg-white p-5 shadow-sm lg:grid-cols-[0.8fr_1.2fr]"
                >
                  <div className="flex gap-4">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-slate-950 text-white">
                      <track.icon className="h-6 w-6" aria-hidden="true" />
                    </span>
                    <div>
                      <h3 className="text-lg font-semibold text-slate-950">
                        {track.title}
                      </h3>
                      <p className="mt-2 text-sm leading-6 text-slate-600">
                        {track.outcome}
                      </p>
                    </div>
                  </div>
                  <div className="grid gap-2 sm:grid-cols-3">
                    <a href={quizUrl} className="rounded-md border border-blue-200 bg-blue-50 px-3 py-3 text-sm font-semibold text-blue-800 hover:bg-blue-100">
                      Iniciar quiz
                    </a>
                    <a href={caseUrl} className="rounded-md border border-cyan-200 bg-cyan-50 px-3 py-3 text-sm font-semibold text-cyan-800 hover:bg-cyan-100">
                      Abrir caso
                    </a>
                    <a href={reportUrl} className="rounded-md border border-teal-200 bg-teal-50 px-3 py-3 text-sm font-semibold text-teal-800 hover:bg-teal-100">
                      Crear evidencia
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section className="my-6 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-900">
          Uso educativo. Las rutas no sustituyen protocolos institucionales,
          supervision profesional ni mantenimiento biomedico certificado.
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
