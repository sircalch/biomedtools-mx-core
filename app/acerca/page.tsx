import type { Metadata } from "next";
import {
  ArrowRight,
  BookOpenCheck,
  FileText,
  GraduationCap,
  ShieldCheck,
  Stethoscope,
  Users,
  Wrench,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Acerca de | BioMedTools MX Core",
  description:
    "Informacion del autor, proposito educativo y enfoque de BioMedTools MX Core.",
};

const principles = [
  {
    title: "Uso educativo",
    text: "Las herramientas estan pensadas para practica, repaso, simulacion y documentacion formativa.",
    icon: GraduationCap,
  },
  {
    title: "Criterio tecnico",
    text: "El contenido promueve observar, verificar, documentar y escalar sin asumir causas prematuras.",
    icon: Wrench,
  },
  {
    title: "Evidencia clara",
    text: "El flujo termina en reportes, capturas o resultados que pueden revisarse en clase o piloto.",
    icon: FileText,
  },
  {
    title: "Seguridad",
    text: "No sustituye protocolos clinicos, normativas institucionales ni mantenimiento certificado.",
    icon: ShieldCheck,
  },
];

export default function AboutPage() {
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
            <Link href="/proyectos" className="rounded-md px-3 py-2 text-blue-100 hover:bg-white/10 hover:text-white">
              Proyectos
            </Link>
            <Link href="/aviso-educativo" className="rounded-md px-3 py-2 text-blue-100 hover:bg-white/10 hover:text-white">
              Aviso
            </Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto w-full max-w-7xl px-4 py-6 md:px-6">
        <section className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-[0_18px_55px_rgba(15,23,42,0.12)]">
          <div className="grid gap-0 lg:grid-cols-[0.9fr_0.65fr]">
            <div className="p-5 md:p-7">
              <h1 className="max-w-3xl text-3xl font-semibold leading-tight text-slate-950 md:text-5xl">
                BioMedTools MX Core es una plataforma educativa para practica
                tecnica biomedica.
              </h1>
              <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">
                Integra quizzes, casos simulados, fichas de equipo y reportes
                para apoyar actividades de Ingenieria Biomedica y ciencias de
                la salud desde un enfoque formativo.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/actividades" className="inline-flex min-h-11 items-center gap-2 rounded-md bg-blue-700 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-800">
                  Ver actividades
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <Link href="/biblioteca" className="inline-flex min-h-11 items-center rounded-md border border-blue-200 bg-white px-4 py-2 text-sm font-semibold text-blue-800 hover:bg-blue-50">
                  Ver biblioteca
                </Link>
              </div>
            </div>

            <aside className="border-t border-slate-200 bg-slate-50 p-5 lg:border-l lg:border-t-0 md:p-7">
              <Image
                src="/topic-tales-biomedica-card.png"
                alt="Topic Tales Biomedica"
                width={520}
                height={360}
                className="w-full rounded-lg border border-slate-200 bg-white object-contain"
                priority
              />
              <div className="mt-4 rounded-lg border border-slate-200 bg-white p-4">
                <p className="text-xs font-semibold uppercase text-slate-500">
                  Autor
                </p>
                <h2 className="mt-1 text-lg font-semibold text-slate-950">
                  Ing. Andres Monreal
                </h2>
                <p className="mt-1 text-sm leading-6 text-slate-600">
                  Ingeniero Biomedico / Topic Tales Biomedica.
                </p>
              </div>
            </aside>
          </div>
        </section>

        <section className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {principles.map((principle) => (
            <article key={principle.title} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
              <principle.icon className="h-6 w-6 text-blue-700" aria-hidden="true" />
              <h2 className="mt-4 text-base font-semibold text-slate-950">
                {principle.title}
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                {principle.text}
              </p>
            </article>
          ))}
        </section>

        <section className="mt-6 grid gap-4 lg:grid-cols-[0.8fr_1fr]">
          <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <Users className="h-6 w-6 text-blue-700" aria-hidden="true" />
            <h2 className="mt-4 text-lg font-semibold text-slate-950">
              Para quien esta pensado
            </h2>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
              <li>Estudiantes de Ingenieria Biomedica.</li>
              <li>Estudiantes de ciencias de la salud.</li>
              <li>Docentes que necesitan actividades digitales breves.</li>
              <li>Tecnicos biomedicos en formacion.</li>
            </ul>
          </article>

          <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <BookOpenCheck className="h-6 w-6 text-blue-700" aria-hidden="true" />
            <h2 className="mt-4 text-lg font-semibold text-slate-950">
              Como usarlo de forma responsable
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              La plataforma debe usarse como recurso de aprendizaje, no como
              herramienta de decision clinica ni como reemplazo de manuales,
              procedimientos institucionales o mantenimiento certificado.
            </p>
            <Link href="/aviso-educativo" className="mt-4 inline-flex min-h-10 items-center gap-2 rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-sm font-semibold text-amber-900 hover:bg-amber-100">
              Leer aviso educativo
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </article>
        </section>

        <footer className="my-6 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
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
