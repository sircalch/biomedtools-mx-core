import type { Metadata } from "next";
import {
  ArrowRight,
  BookOpenCheck,
  Calculator,
  ClipboardCheck,
  FileText,
  ShieldCheck,
  Stethoscope,
  Wrench,
  Zap,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { futureProjects } from "../lib/biomed-content";

export const metadata: Metadata = {
  title: "Proyectos recomendados | BioMedTools MX Core",
  description:
    "Roadmap de nuevos modulos educativos recomendados para BioMedTools MX Core.",
};

const projectIcons: Record<string, typeof Stethoscope> = {
  "medtech-atlas-edu": BookOpenCheck,
  "electrical-safety-trainer": Zap,
  "safecheck-health": ShieldCheck,
  "maintenance-planner-lite": Wrench,
  "biomedical-calculators-edu": Calculator,
};

const roadmap = [
  {
    title: "Primero",
    text: "Validar Core con usuarios y consolidar actividades guiadas.",
  },
  {
    title: "Despues",
    text: "Convertir el modulo con mas uso en app independiente.",
  },
  {
    title: "Finalmente",
    text: "Agregar backend, historial, grupos y evidencia docente.",
  },
];

export default function ProjectsPage() {
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
            <Link href="/actividades" className="rounded-md px-3 py-2 text-blue-100 hover:bg-white/10 hover:text-white">
              Actividades
            </Link>
            <Link href="/biblioteca" className="rounded-md px-3 py-2 text-blue-100 hover:bg-white/10 hover:text-white">
              Biblioteca
            </Link>
            <Link href="/acerca" className="rounded-md px-3 py-2 text-blue-100 hover:bg-white/10 hover:text-white">
              Acerca
            </Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto w-full max-w-7xl px-4 py-6 md:px-6">
        <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-[0_18px_55px_rgba(15,23,42,0.12)] md:p-7">
          <div className="grid gap-6 lg:grid-cols-[0.95fr_0.75fr]">
            <div>
              <h1 className="max-w-3xl text-3xl font-semibold leading-tight text-slate-950 md:text-5xl">
                Proyectos recomendados para crecer BioMedTools MX.
              </h1>
              <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">
                Estos modulos se dejan como roadmap. La recomendacion tecnica
                es validar primero el Core actual y despues separar los modulos
                con mayor uso real.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/evidencia-piloto" className="inline-flex min-h-11 items-center gap-2 rounded-md bg-blue-700 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-800">
                  Ver evidencia piloto
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <Link href="/actividades" className="inline-flex min-h-11 items-center rounded-md border border-blue-200 bg-white px-4 py-2 text-sm font-semibold text-blue-800 hover:bg-blue-50">
                  Abrir actividades
                </Link>
              </div>
            </div>
            <aside className="rounded-lg border border-blue-100 bg-blue-50 p-5">
              <FileText className="h-7 w-7 text-blue-700" aria-hidden="true" />
              <h2 className="mt-4 text-lg font-semibold text-blue-950">
                Criterio de priorizacion
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                Crear primero lo que fortalezca actividades, evidencia y
                seguridad educativa. Evitar crecer con apps vacias.
              </p>
            </aside>
          </div>
        </section>

        <section className="mt-6 grid gap-4 lg:grid-cols-[1.1fr_0.7fr]">
          <div className="grid gap-4 md:grid-cols-2">
            {futureProjects.map((project) => {
              const Icon = projectIcons[project.slug] || ClipboardCheck;
              return (
                <article key={project.slug} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="flex items-start gap-4">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-slate-950 text-white">
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </span>
                    <div>
                      <h2 className="text-lg font-semibold text-slate-950">
                        {project.name}
                      </h2>
                      <p className="mt-1 text-xs font-semibold uppercase text-blue-700">
                        {project.status}
                      </p>
                    </div>
                  </div>
                  <p className="mt-4 text-sm leading-6 text-slate-600">
                    {project.purpose}
                  </p>
                </article>
              );
            })}
          </div>

          <aside className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm lg:sticky lg:top-20 lg:self-start">
            <h2 className="text-lg font-semibold text-slate-950">
              Orden recomendado
            </h2>
            <div className="mt-4 space-y-3">
              {roadmap.map((item, index) => (
                <article key={item.title} className="rounded-md border border-slate-200 bg-slate-50 p-4">
                  <div className="flex gap-3">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-700 text-xs font-semibold text-white">
                      {index + 1}
                    </span>
                    <div>
                      <h3 className="text-sm font-semibold text-slate-950">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-sm leading-6 text-slate-600">
                        {item.text}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </aside>
        </section>

        <section className="my-6 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-900">
          Roadmap educativo. Los proyectos nuevos deben mantenerse dentro del
          alcance formativo y no convertirse en herramientas clinicas.
        </section>

        <footer className="mb-6 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
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
        </footer>
      </main>
    </div>
  );
}
