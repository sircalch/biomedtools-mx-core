import type { Metadata } from "next";
import {
  ArrowRight,
  BookOpenCheck,
  ClipboardCheck,
  FileText,
  GraduationCap,
  ShieldCheck,
  Stethoscope,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Evidencia piloto | BioMedTools MX Core",
  description:
    "Guia para recolectar evidencia de uso piloto academico de BioMedTools MX Core.",
};

const evidenceFolders = [
  "01_capturas_sistema",
  "02_resultados_quiz",
  "03_resultados_case",
  "04_reportes_pdf",
  "05_encuestas",
  "06_observaciones",
  "07_resumen_resultados",
];

const indicators = [
  {
    title: "Comprension del flujo",
    text: "El usuario entiende que debe estudiar, practicar y documentar sin explicacion externa extensa.",
  },
  {
    title: "Claridad tecnica",
    text: "El lenguaje de preguntas, casos y reportes es formativo y no genera acciones clinicas riesgosas.",
  },
  {
    title: "Evidencia generada",
    text: "Se obtiene captura del quiz, resultado del caso y reporte tecnico revisable.",
  },
  {
    title: "Experiencia movil",
    text: "La actividad puede completarse desde celular sin contenido roto ni botones confusos.",
  },
];

const pilotFlow = [
  "Core -> Actividades guiadas",
  "Quiz de monitoreo de signos vitales",
  "Caso Monitor sin lectura de SpO2",
  "Reporte tecnico en Clinical Report Builder",
  "Encuesta u observacion breve",
];

export default function PilotEvidencePage() {
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
            <Link href="/docentes" className="rounded-md px-3 py-2 text-blue-100 hover:bg-white/10 hover:text-white">
              Docentes
            </Link>
            <Link href="/acerca" className="rounded-md px-3 py-2 text-blue-100 hover:bg-white/10 hover:text-white">
              Acerca
            </Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto w-full max-w-7xl px-4 py-6 md:px-6">
        <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-[0_18px_55px_rgba(15,23,42,0.12)] md:p-7">
          <div className="grid gap-6 lg:grid-cols-[0.95fr_0.8fr]">
            <div>
              <ShieldCheck className="h-9 w-9 text-blue-700" aria-hidden="true" />
              <h1 className="mt-5 max-w-3xl text-3xl font-semibold leading-tight text-slate-950 md:text-5xl">
                Evidencia para validacion humana y piloto academico.
              </h1>
              <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">
                Esta pagina organiza lo que se debe guardar despues de probar
                BioMedTools MX Core con 2 a 5 personas y, despues, con un grupo
                pequeno de estudiantes.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/actividades" className="inline-flex min-h-11 items-center gap-2 rounded-md bg-blue-700 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-800">
                  Abrir actividades
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <Link href="/docentes" className="inline-flex min-h-11 items-center rounded-md border border-blue-200 bg-white px-4 py-2 text-sm font-semibold text-blue-800 hover:bg-blue-50">
                  Ver guia docente
                </Link>
              </div>
            </div>
            <aside className="rounded-lg border border-blue-100 bg-blue-50 p-5">
              <h2 className="text-lg font-semibold text-blue-950">
                Flujo piloto recomendado
              </h2>
              <ol className="mt-4 space-y-3 text-sm leading-6 text-slate-700">
                {pilotFlow.map((item, index) => (
                  <li key={item} className="flex gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-700 text-xs font-semibold text-white">
                      {index + 1}
                    </span>
                    {item}
                  </li>
                ))}
              </ol>
            </aside>
          </div>
        </section>

        <section className="mt-6 grid gap-4 lg:grid-cols-[0.75fr_1.1fr]">
          <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <FileText className="h-6 w-6 text-blue-700" aria-hidden="true" />
              <h2 className="text-lg font-semibold text-slate-950">
                Carpeta de evidencia
              </h2>
            </div>
            <div className="mt-4 grid gap-2">
              {evidenceFolders.map((folder) => (
                <div key={folder} className="rounded-md border border-slate-200 bg-slate-50 px-3 py-2 font-mono text-xs text-slate-700">
                  {folder}
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <GraduationCap className="h-6 w-6 text-blue-700" aria-hidden="true" />
              <h2 className="text-lg font-semibold text-slate-950">
                Indicadores a observar
              </h2>
            </div>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {indicators.map((indicator) => (
                <section key={indicator.title} className="rounded-md border border-slate-200 bg-slate-50 p-4">
                  <h3 className="text-sm font-semibold text-slate-950">
                    {indicator.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {indicator.text}
                  </p>
                </section>
              ))}
            </div>
          </article>
        </section>

        <section className="mt-6 grid gap-4 md:grid-cols-3">
          {[
            {
              title: "Participantes",
              icon: Users,
              text: "2 alumnos, 1 biomedico, 1 docente y prueba propia desde celular o modo incognito.",
            },
            {
              title: "Material minimo",
              icon: ClipboardCheck,
              text: "Capturas, resultados, reporte PDF y observaciones breves sobre claridad y fallos.",
            },
            {
              title: "Correccion v1.0.1",
              icon: BookOpenCheck,
              text: "Corregir solo textos, enlaces, botones, problemas moviles y prellenado antes del piloto formal.",
            },
          ].map((item) => (
            <article key={item.title} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
              <item.icon className="h-6 w-6 text-blue-700" aria-hidden="true" />
              <h2 className="mt-4 text-base font-semibold text-slate-950">
                {item.title}
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                {item.text}
              </p>
            </article>
          ))}
        </section>

        <section className="my-6 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-900">
          La evidencia es para mejora educativa y validacion de uso. Evita
          recolectar datos sensibles de pacientes o informacion clinica real.
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
