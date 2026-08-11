import type { Metadata } from "next";
import {
  ArrowRight,
  BookOpenCheck,
  Box,
  Database,
  ExternalLink,
  FileText,
  ImageIcon,
  Landmark,
  Library,
  ShieldCheck,
  Stethoscope,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { externalResources } from "../lib/biomed-content";

export const metadata: Metadata = {
  title: "Recursos abiertos | BioMedTools MX Core",
  description:
    "Recursos abiertos y fuentes oficiales para mejorar BioMedTools MX Core con trazabilidad, licencias y referencias educativas.",
};

const categoryIcons: Record<string, typeof Library> = {
  "Modelos 3D": Box,
  Iconografia: ImageIcon,
  "Ilustracion cientifica": ImageIcon,
  "Ilustracion biomedica": ImageIcon,
  "Consulta regulatoria": Landmark,
  "Identificacion de dispositivos": Database,
  "Ingenieria biomedica": Stethoscope,
  "Base academica": BookOpenCheck,
};

const workflow = [
  {
    title: "Buscar",
    text: "Usar fuentes oficiales o abiertas antes de incorporar imagenes, iconos o referencias.",
  },
  {
    title: "Validar licencia",
    text: "Confirmar si el asset permite uso educativo, modificacion, distribucion y atribucion.",
  },
  {
    title: "Registrar",
    text: "Documentar fuente, URL, autor/licencia y uso previsto en el repositorio.",
  },
];

export default function ResourcesPage() {
  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-6 md:px-6">
      <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-[0_18px_55px_rgba(15,23,42,0.12)] md:p-7">
        <div className="grid gap-6 lg:grid-cols-[0.98fr_0.72fr]">
          <div>
            <p className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-blue-700">
              <Library className="h-4 w-4" aria-hidden="true" />
              Recursos abiertos
            </p>
            <h1 className="mt-3 max-w-3xl text-3xl font-semibold leading-tight text-slate-950 md:text-5xl">
              Fuentes confiables para mejorar BioMedTools sin usar assets dudosos.
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">
              Esta biblioteca concentra recursos visuales, modelos 3D, bases
              oficiales y material academico que pueden alimentar quizzes, casos,
              reportes y el laboratorio 3D con trazabilidad.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="#catalogo-recursos"
                className="inline-flex min-h-11 items-center gap-2 rounded-md bg-blue-700 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-800"
              >
                Explorar catalogo
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
              <Link
                href="/proyectos"
                className="inline-flex min-h-11 items-center rounded-md border border-blue-200 bg-white px-4 py-2 text-sm font-semibold text-blue-800 hover:bg-blue-50"
              >
                Ver roadmap
              </Link>
            </div>
          </div>

          <aside className="rounded-lg border border-blue-100 bg-blue-50 p-5">
            <div className="overflow-hidden rounded-lg border border-blue-100 bg-white shadow-sm">
              <Image
                src="/biomed-equipment-atlas.png"
                alt="Atlas educativo de equipos biomedicos"
                width={960}
                height={600}
                className="aspect-[16/9] w-full object-cover"
                priority
              />
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {[
                ["Fuentes", externalResources.length.toString()],
                ["Uso", "Educativo"],
                ["Licencias", "Trazables"],
                ["Riesgo", "Controlado"],
              ].map(([label, value]) => (
                <div key={label} className="rounded-md border border-blue-100 bg-white p-3">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    {label}
                  </p>
                  <p className="mt-1 text-base font-semibold text-slate-950">
                    {value}
                  </p>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section className="mt-6 grid gap-4 md:grid-cols-3">
        {workflow.map((item, index) => (
          <article key={item.title} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-700 text-sm font-semibold text-white">
              {index + 1}
            </span>
            <h2 className="mt-4 text-base font-semibold text-slate-950">
              {item.title}
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">{item.text}</p>
          </article>
        ))}
      </section>

      <section id="catalogo-recursos" className="mt-6 scroll-mt-6">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {externalResources.map((resource) => {
            const Icon = categoryIcons[resource.category] || Library;
            return (
              <article
                key={resource.title}
                className="flex min-h-[290px] flex-col rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md"
              >
                <div className="flex items-start gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md border border-blue-100 bg-blue-50 text-blue-700">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-blue-700">
                      {resource.category}
                    </p>
                    <h2 className="mt-1 text-base font-semibold leading-6 text-slate-950">
                      {resource.title}
                    </h2>
                  </div>
                </div>
                <p className="mt-4 text-sm font-medium text-slate-700">
                  {resource.source}
                </p>
                <p className="mt-2 flex-1 text-sm leading-6 text-slate-600">
                  {resource.use}
                </p>
                <p className="mt-3 rounded-md border border-amber-200 bg-amber-50 p-3 text-xs leading-5 text-amber-900">
                  {resource.licenseNote}
                </p>
                <a
                  href={resource.href}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-flex min-h-9 items-center gap-2 rounded-md bg-blue-700 px-3 py-1.5 text-xs font-semibold text-white hover:bg-blue-800"
                >
                  Abrir recurso
                  <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              </article>
            );
          })}
        </div>
      </section>

      <section className="my-6 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex gap-3">
          <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-blue-700" aria-hidden="true" />
          <div>
            <h2 className="text-base font-semibold text-slate-950">
              Criterio de uso responsable
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Estos enlaces apoyan el desarrollo visual y academico del ecosistema.
              No sustituyen manuales de fabricante, protocolos institucionales,
              regulacion aplicable ni supervision profesional.
            </p>
          </div>
        </div>
      </section>

      <footer className="mb-6 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex items-center gap-4">
          <FileText className="h-6 w-6 text-blue-700" aria-hidden="true" />
          <p className="text-sm leading-6 text-slate-600">
            La trazabilidad completa de recursos y licencias queda registrada en
            `THIRD_PARTY_NOTICES.md` dentro de cada repositorio.
          </p>
        </div>
      </footer>
    </main>
  );
}
