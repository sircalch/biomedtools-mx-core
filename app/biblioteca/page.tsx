import type { Metadata } from "next";
import {
  Activity,
  ArrowRight,
  BookOpenCheck,
  ClipboardCheck,
  FlaskConical,
  Search,
  ShieldCheck,
  Stethoscope,
  ThermometerSun,
  Zap,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const QUIZ_ARENA_URL =
  process.env.NEXT_PUBLIC_QUIZ_ARENA_URL ||
  "https://biomed-quiz-arena.vercel.app";
const CASE_SIMULATOR_URL =
  process.env.NEXT_PUBLIC_CASE_SIMULATOR_URL ||
  "https://biomed-case-simulator.vercel.app";

export const metadata: Metadata = {
  title: "Biblioteca de equipos | BioMedTools MX Core",
  description:
    "Fichas educativas de equipos medicos para entrenamiento en Ingenieria Biomedica.",
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

const equipment = [
  {
    slug: "monitor-multiparametrico",
    name: "Monitor multiparametrico",
    category: "Monitoreo",
    icon: Activity,
    quizCategory: "monitoreo-signos-vitales",
    caseCategory: "monitoreo-signos-vitales",
    commonIssues: ["Sensor SpO2 sin lectura", "Cable o conector danado", "Configuracion o alarma no documentada"],
  },
  {
    slug: "bomba-infusion",
    name: "Bomba de infusion",
    category: "Terapia",
    icon: FlaskConical,
    quizCategory: "bombas-infusion-terapia",
    caseCategory: "bombas-infusion-terapia",
    commonIssues: ["Alarma de oclusion", "Linea mal colocada", "Bateria o flujo no verificado"],
  },
  {
    slug: "desfibrilador",
    name: "Desfibrilador",
    category: "Urgencias",
    icon: ShieldCheck,
    quizCategory: "desfibrilador-urgencias",
    caseCategory: "desfibrilador-urgencias",
    commonIssues: ["No carga energia", "Accesorios incompletos", "Bateria o autoprueba pendiente"],
  },
  {
    slug: "autoclave",
    name: "Autoclave",
    category: "Esterilizacion",
    icon: ClipboardCheck,
    quizCategory: "esterilizacion-autoclave",
    caseCategory: "esterilizacion-autoclave",
    commonIssues: ["Ciclo incompleto", "Sello o puerta con fuga", "Registro de ciclo incompleto"],
  },
  {
    slug: "electrocardiografo",
    name: "Electrocardiografo",
    category: "Diagnostico",
    icon: Zap,
    quizCategory: "equipos-medicos-basicos",
    caseCategory: "monitoreo-signos-vitales",
    commonIssues: ["Ruido en senal", "Electrodos/cables", "Configuracion de derivaciones"],
  },
  {
    slug: "incubadora-cuna-termica",
    name: "Incubadora / cuna termica",
    category: "Soporte neonatal",
    icon: ThermometerSun,
    quizCategory: "equipos-medicos-basicos",
    caseCategory: "ingenieria-clinica-mantenimiento",
    commonIssues: ["Control termico", "Alarmas", "Registro de mantenimiento preventivo"],
  },
];

const checklist = [
  "Identificar equipo, area, inventario y responsable de la actividad.",
  "Registrar sintoma reportado sin asumir causa antes de verificar.",
  "Revisar accesorios, conexiones, alimentacion y configuracion visible.",
  "Documentar mensajes de alarma, condiciones de prueba y resultado.",
  "Escalar conforme a protocolo institucional cuando exista riesgo o duda.",
];

export default function EquipmentLibraryPage() {
  const featured = equipment[0];
  const quizUrl = buildUrl(QUIZ_ARENA_URL, `/quiz/${featured.quizCategory}`, {
    mode: "study",
    difficulty: "all",
  });
  const caseUrl = buildUrl(CASE_SIMULATOR_URL, "/", {
    category: featured.caseCategory,
  });

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
            <Link href="/ruta" className="rounded-md px-3 py-2 text-blue-100 hover:bg-white/10 hover:text-white">
              Ruta
            </Link>
            <Link href="/docentes" className="rounded-md px-3 py-2 text-blue-100 hover:bg-white/10 hover:text-white">
              Docentes
            </Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto w-full max-w-7xl px-4 py-6 md:px-6">
        <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-[0_18px_55px_rgba(15,23,42,0.12)] md:p-7">
          <div className="grid gap-6 lg:grid-cols-[0.95fr_0.8fr]">
            <div>
              <h1 className="text-3xl font-semibold leading-tight text-slate-950 md:text-4xl">
                Biblioteca de equipos medicos
              </h1>
              <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">
                Fichas educativas para reconocer funcionamiento general, fallas
                comunes, verificaciones tecnicas iniciales y evidencia minima
                esperada en practicas de Ingenieria Biomedica.
              </p>
              <div className="mt-6 flex max-w-xl items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2">
                <Search className="h-4 w-4 text-slate-400" aria-hidden="true" />
                <span className="text-sm text-slate-500">
                  Buscar por equipo, categoria o sintoma tecnico
                </span>
              </div>
            </div>
            <aside className="rounded-lg border border-blue-100 bg-blue-50 p-5">
              <BookOpenCheck className="h-7 w-7 text-blue-700" aria-hidden="true" />
              <h2 className="mt-4 text-lg font-semibold text-blue-950">
                Uso recomendado
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                Antes del caso, revisa la ficha del equipo. Despues del caso,
                documenta hallazgos con Report Builder.
              </p>
            </aside>
          </div>
        </section>

        <section className="mt-6 grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <h2 className="text-base font-semibold text-slate-950">
              Equipos disponibles
            </h2>
            <div className="mt-3 grid gap-3 md:grid-cols-2">
              {equipment.map((item) => (
                <article key={item.name} className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
                  <div className="flex gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-blue-100 bg-blue-50 text-blue-700">
                      <item.icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-slate-950">
                        {item.name}
                      </p>
                      <p className="mt-1 text-xs font-medium uppercase text-slate-500">
                        {item.category}
                      </p>
                    </div>
                  </div>
                  <ul className="mt-3 space-y-1.5 text-xs leading-5 text-slate-600">
                    {item.commonIssues.map((issue) => (
                      <li key={issue} className="flex gap-2">
                        <ClipboardCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-blue-700" aria-hidden="true" />
                        {issue}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={`/biblioteca/${item.slug}`}
                    className="mt-4 inline-flex min-h-8 items-center gap-2 rounded-md border border-blue-200 bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-800 hover:bg-blue-100"
                  >
                    Ver ficha
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </Link>
                </article>
              ))}
            </div>
          </div>

          <aside className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm lg:sticky lg:top-20 lg:self-start">
            <div className="flex items-start gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-slate-950 text-white">
                <featured.icon className="h-6 w-6" aria-hidden="true" />
              </span>
              <div>
                <p className="text-xs font-semibold uppercase text-blue-700">
                  Ficha destacada
                </p>
                <h2 className="mt-1 text-xl font-semibold text-slate-950">
                  {featured.name}
                </h2>
              </div>
            </div>

            <div className="mt-5 grid gap-4">
              <section className="rounded-md border border-slate-200 bg-slate-50 p-4">
                <h3 className="text-sm font-semibold text-slate-950">
                  Uso educativo
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Equipo usado para visualizar parametros, alarmas y tendencias.
                  En esta plataforma se revisa desde una perspectiva tecnica y
                  formativa.
                </p>
              </section>

              <section className="rounded-md border border-slate-200 bg-white p-4">
                <h3 className="text-sm font-semibold text-slate-950">
                  Checklist basico
                </h3>
                <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-600">
                  {checklist.map((item) => (
                    <li key={item} className="flex gap-2">
                      <ClipboardCheck className="mt-1 h-4 w-4 shrink-0 text-teal-700" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </section>

              <section className="grid gap-2 sm:grid-cols-2">
                <a href={quizUrl} className="inline-flex min-h-10 items-center justify-center gap-2 rounded-md bg-blue-700 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-800">
                  Practicar quiz
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
                <a href={caseUrl} className="inline-flex min-h-10 items-center justify-center gap-2 rounded-md border border-cyan-200 bg-cyan-50 px-3 py-2 text-sm font-semibold text-cyan-800 hover:bg-cyan-100">
                  Caso relacionado
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
                <Link href={`/biblioteca/${featured.slug}`} className="inline-flex min-h-10 items-center justify-center gap-2 rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50 sm:col-span-2">
                  Abrir ficha completa
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </section>
            </div>
          </aside>
        </section>

        <section className="my-6 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-900">
          Las fichas son material educativo. No sustituyen manuales del
          fabricante, protocolos institucionales, pruebas normativas ni
          mantenimiento certificado.
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
        </footer>
      </main>
    </div>
  );
}
