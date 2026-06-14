import type { Metadata } from "next";
import {
  ArrowRight,
  BookOpenCheck,
  ClipboardCheck,
  FileText,
  ShieldCheck,
  Stethoscope,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Aviso educativo | BioMedTools MX Core",
  description:
    "Aviso de uso educativo, alcance y limitaciones de BioMedTools MX Core.",
};

const limits = [
  {
    title: "No sustituye protocolos",
    text: "El contenido no reemplaza procedimientos clinicos, normativas institucionales ni indicaciones del fabricante.",
  },
  {
    title: "No es decision clinica",
    text: "Los quizzes, casos y reportes no deben utilizarse para diagnosticar, tratar o tomar decisiones sobre pacientes.",
  },
  {
    title: "No certifica mantenimiento",
    text: "La plataforma no acredita mantenimiento biomedico, calibracion, pruebas normativas ni liberacion de equipo.",
  },
  {
    title: "Uso con supervision",
    text: "En contextos academicos o clinicos debe usarse con supervision docente o profesional responsable.",
  },
];

const privacy = [
  "No captures ni subas datos de pacientes reales.",
  "No incluyas nombres, expedientes, imagenes clinicas ni datos sensibles.",
  "Usa escenarios simulados o anonimizados para actividades y reportes.",
  "Si se recolecta evidencia piloto, conserva solo informacion academica necesaria.",
];

export default function EducationalNoticePage() {
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
            <Link href="/acerca" className="rounded-md px-3 py-2 text-blue-100 hover:bg-white/10 hover:text-white">
              Acerca
            </Link>
            <Link href="/evidencia-piloto" className="rounded-md px-3 py-2 text-blue-100 hover:bg-white/10 hover:text-white">
              Evidencia
            </Link>
            <Link href="/actividades" className="rounded-md px-3 py-2 text-blue-100 hover:bg-white/10 hover:text-white">
              Actividades
            </Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto w-full max-w-7xl px-4 py-6 md:px-6">
        <section className="rounded-lg border border-amber-200 bg-amber-50 p-5 shadow-[0_18px_55px_rgba(15,23,42,0.12)] md:p-7">
          <div className="grid gap-6 lg:grid-cols-[0.9fr_0.7fr]">
            <div>
              <ShieldCheck className="h-9 w-9 text-amber-800" aria-hidden="true" />
              <h1 className="mt-5 max-w-3xl text-3xl font-semibold leading-tight text-slate-950 md:text-5xl">
                Aviso educativo y alcance de uso.
              </h1>
              <p className="mt-4 max-w-3xl text-base leading-7 text-amber-950">
                BioMedTools MX Core es una plataforma formativa. Debe usarse
                para aprendizaje, simulacion y documentacion academica, no para
                operar equipos reales ni tomar decisiones clinicas.
              </p>
            </div>
            <aside className="rounded-lg border border-amber-200 bg-white p-5">
              <h2 className="text-lg font-semibold text-slate-950">
                Regla principal
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                Si una actividad involucra pacientes, equipo en servicio o
                riesgo operativo, debe seguirse el protocolo institucional y la
                supervision profesional correspondiente.
              </p>
            </aside>
          </div>
        </section>

        <section className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {limits.map((limit) => (
            <article key={limit.title} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
              <BookOpenCheck className="h-6 w-6 text-blue-700" aria-hidden="true" />
              <h2 className="mt-4 text-base font-semibold text-slate-950">
                {limit.title}
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                {limit.text}
              </p>
            </article>
          ))}
        </section>

        <section className="mt-6 grid gap-4 lg:grid-cols-[0.8fr_1fr]">
          <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <FileText className="h-6 w-6 text-blue-700" aria-hidden="true" />
            <h2 className="mt-4 text-lg font-semibold text-slate-950">
              Datos y privacidad educativa
            </h2>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
              {privacy.map((item) => (
                <li key={item} className="flex gap-2">
                  <ClipboardCheck className="mt-1 h-4 w-4 shrink-0 text-teal-700" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </article>

          <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-950">
              Texto breve para actividades
            </h2>
            <div className="mt-4 rounded-md border border-slate-200 bg-slate-50 p-4 text-sm leading-6 text-slate-700">
              Uso educativo. Esta actividad no sustituye protocolos clinicos,
              normativas institucionales, supervision profesional ni
              mantenimiento biomedico certificado. No usar informacion de
              pacientes reales.
            </div>
            <Link href="/actividades" className="mt-4 inline-flex min-h-10 items-center gap-2 rounded-md bg-blue-700 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-800">
              Volver a actividades
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
