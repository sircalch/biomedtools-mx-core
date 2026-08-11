import type { Metadata } from "next";
import {
  ArrowRight,
  BookOpenCheck,
  Boxes,
  BrainCircuit,
  ClipboardCheck,
  FileText,
  ShieldCheck,
  Stethoscope,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import {
  buildUrl,
  BIOMED_3D_LAB_URL,
  CASE_SIMULATOR_URL,
  equipmentProfiles,
  guidedActivities,
  QUIZ_ARENA_URL,
  REPORT_BUILDER_URL,
} from "../lib/biomed-content";

export const metadata: Metadata = {
  title: "Actividades guiadas | BioMedTools MX Core",
  description:
    "Actividades Quiz - Caso - Reporte para clases, laboratorios y pilotos academicos de Ingenieria Biomedica.",
};

const steps = [
  {
    title: "1. Repaso",
    text: "Activar conceptos tecnicos con quiz por categoria.",
    icon: BookOpenCheck,
  },
  {
    title: "2. Exploracion 3D",
    text: "Identificar sensores, modulos, riesgos y puntos de verificacion.",
    icon: Boxes,
  },
  {
    title: "3. Simulacion",
    text: "Resolver un caso tecnico-educativo con decisiones justificadas.",
    icon: BrainCircuit,
  },
  {
    title: "4. Evidencia",
    text: "Documentar hallazgos y recomendaciones en reporte tecnico.",
    icon: FileText,
  },
];

export default function GuidedActivitiesPage() {
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
            <Link href="/evidencia-piloto" className="rounded-md px-3 py-2 text-blue-100 hover:bg-white/10 hover:text-white">
              Evidencia
            </Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto w-full max-w-7xl px-4 py-6 md:px-6">
        <section className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-[0_18px_55px_rgba(15,23,42,0.12)]">
          <div className="grid lg:grid-cols-[1fr_0.82fr]">
            <div className="p-5 md:p-7">
              <h1 className="max-w-3xl text-3xl font-semibold leading-tight text-slate-950 md:text-5xl">
                Actividades guiadas para clase, laboratorio y practica piloto.
              </h1>
              <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">
                Cada actividad conecta un quiz, un caso simulado y un reporte
                tecnico. El objetivo es que el alumno produzca evidencia clara,
                no solo que navegue la plataforma.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={buildUrl(QUIZ_ARENA_URL, "/quiz/monitoreo-signos-vitales", {
                    mode: "study",
                    difficulty: "all",
                  })}
                  className="inline-flex min-h-11 items-center gap-2 rounded-md bg-blue-700 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-800"
                >
                  Iniciar actividad SpO2
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
                <Link
                  href="/docentes"
                  className="inline-flex min-h-11 items-center rounded-md border border-blue-200 bg-white px-4 py-2 text-sm font-semibold text-blue-800 hover:bg-blue-50"
                >
                  Guia docente
                </Link>
              </div>
            </div>
            <aside className="border-t border-slate-200 bg-slate-50 p-5 lg:border-l lg:border-t-0 md:p-7">
              <div className="grid gap-3">
                {steps.map((step) => (
                  <article key={step.title} className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
                    <div className="flex gap-3">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-blue-50 text-blue-700">
                        <step.icon className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <div>
                        <h2 className="text-sm font-semibold text-slate-950">
                          {step.title}
                        </h2>
                        <p className="mt-1 text-sm leading-6 text-slate-600">
                          {step.text}
                        </p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </aside>
          </div>
        </section>

        <section className="mt-6 grid gap-4">
          {guidedActivities.map((activity) => {
            const equipment = equipmentProfiles.find(
              (item) => item.slug === activity.equipmentSlug,
            );
            const quizUrl = buildUrl(QUIZ_ARENA_URL, `/quiz/${equipment?.quizCategory || "monitoreo-signos-vitales"}`, {
              mode: "study",
              difficulty: "all",
            });
            const caseUrl = buildUrl(CASE_SIMULATOR_URL, "/", {
              category: equipment?.caseCategory || "monitoreo-signos-vitales",
            });
            const labUrl = buildUrl(BIOMED_3D_LAB_URL, "/", {
              category: equipment?.quizCategory || "monitoreo-signos-vitales",
              equipment: equipment?.equipment3d || activity.equipmentSlug,
            });
            const reportUrl = buildUrl(REPORT_BUILDER_URL, "/", {
              activity: "guided",
              caseId: equipment?.caseId || activity.slug,
              equipment: equipment?.reportEquipment || activity.title,
            });

            return (
              <article
                key={activity.slug}
                className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
              >
                <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
                  <div>
                    <div className="flex items-start gap-4">
                      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-slate-950 text-white">
                        <ShieldCheck className="h-6 w-6" aria-hidden="true" />
                      </span>
                      <div>
                        <h2 className="text-xl font-semibold text-slate-950">
                          {activity.title}
                        </h2>
                        <p className="mt-2 text-sm leading-6 text-slate-600">
                          {activity.objective}
                        </p>
                      </div>
                    </div>
                    <div className="mt-4 grid gap-2 sm:grid-cols-2">
                      <div className="rounded-md border border-slate-200 bg-slate-50 p-3">
                        <p className="text-xs font-semibold uppercase text-slate-500">
                          Duracion
                        </p>
                        <p className="mt-1 text-sm font-semibold text-slate-950">
                          {activity.duration}
                        </p>
                      </div>
                      <div className="rounded-md border border-slate-200 bg-slate-50 p-3">
                        <p className="text-xs font-semibold uppercase text-slate-500">
                          Nivel
                        </p>
                        <p className="mt-1 text-sm font-semibold text-slate-950">
                          {activity.level}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <section className="rounded-md border border-slate-200 bg-slate-50 p-4">
                      <h3 className="text-sm font-semibold text-slate-950">
                        Flujo de trabajo
                      </h3>
                      <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-600">
                        {activity.flow.map((item) => (
                          <li key={item} className="flex gap-2">
                            <ClipboardCheck className="mt-1 h-4 w-4 shrink-0 text-blue-700" aria-hidden="true" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </section>
                    <section className="rounded-md border border-slate-200 bg-white p-4">
                      <h3 className="text-sm font-semibold text-slate-950">
                        Evidencia esperada
                      </h3>
                      <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-600">
                        {activity.evidence.map((item) => (
                          <li key={item} className="flex gap-2">
                            <ClipboardCheck className="mt-1 h-4 w-4 shrink-0 text-teal-700" aria-hidden="true" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </section>
                  </div>
                </div>

                <div className="mt-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-5">
                  <a href={quizUrl} className="rounded-md border border-blue-200 bg-blue-50 px-3 py-3 text-sm font-semibold text-blue-800 hover:bg-blue-100">
                    Abrir quiz
                  </a>
                  <a href={labUrl} className="rounded-md border border-blue-200 bg-white px-3 py-3 text-sm font-semibold text-blue-800 hover:bg-blue-50">
                    Explorar 3D
                  </a>
                  <a href={caseUrl} className="rounded-md border border-cyan-200 bg-cyan-50 px-3 py-3 text-sm font-semibold text-cyan-800 hover:bg-cyan-100">
                    Abrir caso
                  </a>
                  <a href={reportUrl} className="rounded-md border border-teal-200 bg-teal-50 px-3 py-3 text-sm font-semibold text-teal-800 hover:bg-teal-100">
                    Crear reporte
                  </a>
                  <Link href={`/biblioteca/${activity.equipmentSlug}`} className="rounded-md border border-slate-200 bg-white px-3 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-50">
                    Ver ficha tecnica
                  </Link>
                </div>
              </article>
            );
          })}
        </section>

        <section className="my-6 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-900">
          Actividades de uso educativo. No sustituyen protocolos clinicos,
          normativas institucionales, supervision profesional ni mantenimiento
          biomedico certificado.
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
                <p className="text-xs font-semibold uppercase text-slate-500">
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
            <Link href="/evidencia-piloto" className="inline-flex min-h-10 items-center gap-2 rounded-md border border-blue-200 bg-blue-50 px-3 py-2 text-sm font-semibold text-blue-800 hover:bg-blue-100">
              Ver evidencia piloto
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </footer>
      </main>
    </div>
  );
}
