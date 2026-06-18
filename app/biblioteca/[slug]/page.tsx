import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  Activity,
  ArrowRight,
  BookOpenCheck,
  ClipboardCheck,
  FileText,
  FlaskConical,
  ShieldCheck,
  Stethoscope,
  ThermometerSun,
  Zap,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import {
  buildUrl,
  CASE_SIMULATOR_URL,
  equipmentProfiles,
  getEquipmentBySlug,
  QUIZ_ARENA_URL,
  REPORT_BUILDER_URL,
} from "../../lib/biomed-content";

type EquipmentPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

const iconBySlug: Record<string, typeof Stethoscope> = {
  "monitor-multiparametrico": Activity,
  "bomba-infusion": FlaskConical,
  desfibrilador: ShieldCheck,
  autoclave: ClipboardCheck,
  electrocardiografo: Zap,
  "incubadora-cuna-termica": ThermometerSun,
};

const imagePositionBySlug: Record<string, string> = {
  "monitor-multiparametrico": "0% 0%",
  "bomba-infusion": "50% 0%",
  desfibrilador: "100% 0%",
  autoclave: "0% 100%",
  electrocardiografo: "50% 100%",
  "incubadora-cuna-termica": "100% 100%",
};

export function generateStaticParams() {
  return equipmentProfiles.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: EquipmentPageProps): Promise<Metadata> {
  const { slug } = await params;
  const profile = getEquipmentBySlug(slug);

  if (!profile) {
    return {
      title: "Ficha no encontrada | BioMedTools MX Core",
    };
  }

  return {
    title: `${profile.name} | Biblioteca BioMedTools MX Core`,
    description: `Ficha educativa de ${profile.name} para entrenamiento tecnico biomedico.`,
  };
}

export default async function EquipmentProfilePage({
  params,
}: EquipmentPageProps) {
  const { slug } = await params;
  const profile = getEquipmentBySlug(slug);

  if (!profile) {
    notFound();
  }

  const Icon = iconBySlug[profile.slug] || Stethoscope;
  const quizUrl = buildUrl(QUIZ_ARENA_URL, `/quiz/${profile.quizCategory}`, {
    mode: "study",
    difficulty: "all",
  });
  const caseUrl = buildUrl(CASE_SIMULATOR_URL, "/", {
    category: profile.caseCategory,
  });
  const reportUrl = buildUrl(REPORT_BUILDER_URL, "/", {
    activity: "equipment-profile",
    caseId: profile.caseId,
    equipment: profile.reportEquipment,
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
            <Link href="/biblioteca" className="rounded-md px-3 py-2 text-blue-100 hover:bg-white/10 hover:text-white">
              Biblioteca
            </Link>
            <Link href="/actividades" className="rounded-md px-3 py-2 text-blue-100 hover:bg-white/10 hover:text-white">
              Actividades
            </Link>
            <Link href="/aviso-educativo" className="rounded-md px-3 py-2 text-blue-100 hover:bg-white/10 hover:text-white">
              Aviso
            </Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto w-full max-w-7xl px-4 py-6 md:px-6">
        <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-[0_18px_55px_rgba(15,23,42,0.12)] md:p-7">
          <div className="grid gap-6 lg:grid-cols-[0.85fr_0.7fr]">
            <div>
              <div className="flex items-start gap-4">
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-md bg-slate-950 text-white">
                  <Icon className="h-7 w-7" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase text-blue-700">
                    {profile.category}
                  </p>
                  <h1 className="mt-1 text-3xl font-semibold leading-tight text-slate-950 md:text-5xl">
                    {profile.name}
                  </h1>
                </div>
              </div>
              <p className="mt-5 max-w-3xl text-base leading-7 text-slate-600">
                {profile.summary}
              </p>
              <div
                aria-label={`Imagen educativa de ${profile.name}`}
                className="mt-6 h-64 overflow-hidden rounded-lg border border-slate-200 bg-blue-50 bg-no-repeat shadow-sm sm:h-80"
                role="img"
                style={{
                  backgroundImage: "url('/biomed-equipment-atlas.png')",
                  backgroundPosition:
                    imagePositionBySlug[profile.slug] || "50% 50%",
                  backgroundSize: "300% 200%",
                }}
              >
                <span className="sr-only">{profile.name}</span>
              </div>
            </div>

            <aside className="rounded-lg border border-blue-100 bg-blue-50 p-5">
              <BookOpenCheck className="h-7 w-7 text-blue-700" aria-hidden="true" />
              <h2 className="mt-4 text-lg font-semibold text-blue-950">
                Flujo recomendado
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                Revisar ficha, resolver quiz, practicar caso relacionado y
                generar evidencia tecnica.
              </p>
              <div className="mt-4 grid gap-2">
                <a href={quizUrl} className="inline-flex min-h-10 items-center justify-between rounded-md bg-blue-700 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-800">
                  Abrir quiz
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
                <a href={caseUrl} className="inline-flex min-h-10 items-center justify-between rounded-md border border-cyan-200 bg-white px-3 py-2 text-sm font-semibold text-cyan-800 hover:bg-cyan-50">
                  Abrir caso
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
                <a href={reportUrl} className="inline-flex min-h-10 items-center justify-between rounded-md border border-teal-200 bg-white px-3 py-2 text-sm font-semibold text-teal-800 hover:bg-teal-50">
                  Crear reporte
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            </aside>
          </div>
        </section>

        <section className="mt-6 grid gap-4 lg:grid-cols-3">
          <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-base font-semibold text-slate-950">
              Fallas o situaciones comunes
            </h2>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
              {profile.commonIssues.map((item) => (
                <li key={item} className="flex gap-2">
                  <ClipboardCheck className="mt-1 h-4 w-4 shrink-0 text-blue-700" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </article>

          <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-base font-semibold text-slate-950">
              Checklist tecnico inicial
            </h2>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
              {profile.checklist.map((item) => (
                <li key={item} className="flex gap-2">
                  <ClipboardCheck className="mt-1 h-4 w-4 shrink-0 text-teal-700" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </article>

          <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-base font-semibold text-slate-950">
              Resultado de aprendizaje
            </h2>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
              {profile.learningOutcomes.map((item) => (
                <li key={item} className="flex gap-2">
                  <FileText className="mt-1 h-4 w-4 shrink-0 text-blue-700" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </article>
        </section>

        <section className="mt-6 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-900">
          {profile.caution}
        </section>

        <section className="my-6 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-base font-semibold text-slate-950">
                Continuar en la biblioteca
              </h2>
              <p className="mt-1 text-sm text-slate-600">
                Revisa otros equipos para preparar actividades comparativas.
              </p>
            </div>
            <Link href="/biblioteca" className="inline-flex min-h-10 items-center gap-2 rounded-md border border-blue-200 bg-blue-50 px-3 py-2 text-sm font-semibold text-blue-800 hover:bg-blue-100">
              Ver todos los equipos
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
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
