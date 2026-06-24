import type { Metadata } from "next";
import {
  ArrowRight,
  BookOpenCheck,
  ClipboardCheck,
  Compass,
  Database,
  FileText,
  Layers,
  ShieldCheck,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { MedTechAtlasExplorer } from "../components/MedTechAtlasExplorer";
import { equipmentProfiles } from "../lib/biomed-content";

export const metadata: Metadata = {
  title: "MedTech Atlas Edu | BioMedTools MX Core",
  description:
    "Atlas educativo de equipos medicos, fallas frecuentes, checklist tecnico y rutas conectadas a Quiz, Case Simulator y Report Builder.",
};

const atlasStats = [
  { label: "Equipos base", value: equipmentProfiles.length, icon: Database },
  { label: "Categorias", value: new Set(equipmentProfiles.map((item) => item.category)).size, icon: Layers },
  { label: "Checklists", value: "30+", icon: ClipboardCheck },
  { label: "Rutas", value: "Quiz-Caso-Reporte", icon: ArrowRight },
];

export default function MedTechAtlasPage() {
  return (
    <div className="min-h-screen">
      <main className="mx-auto w-full max-w-7xl px-4 py-6 md:px-6">
        <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-[0_18px_55px_rgba(15,23,42,0.12)] md:p-7">
          <div className="grid gap-6 lg:grid-cols-[0.92fr_0.78fr]">
            <div>
              <p className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-blue-700">
                <Compass className="h-4 w-4" aria-hidden="true" />
                MedTech Atlas Edu
              </p>
              <h1 className="mt-3 max-w-3xl text-3xl font-semibold leading-tight text-slate-950 md:text-5xl">
                Atlas tecnico para estudiar equipos medicos y conectar practica con evidencia.
              </h1>
              <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">
                Consulta fichas de equipos, fallas comunes, competencias y checklist
                educativo. Cada ficha conecta con Quiz Arena, Case Simulator y
                Clinical Report Builder para completar el flujo academico.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="#explorador-atlas"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-blue-700 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-800"
                >
                  Explorar atlas
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
                <Link
                  href="/ruta"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-blue-200 bg-white px-4 py-2 text-sm font-semibold text-blue-800 hover:bg-blue-50"
                >
                  Ver ruta guiada
                  <BookOpenCheck className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </div>

            <aside className="rounded-lg border border-blue-100 bg-blue-50 p-5">
              <div className="overflow-hidden rounded-lg border border-blue-100 bg-white shadow-sm">
                <Image
                  src="/biomed-equipment-atlas.png"
                  alt="Atlas educativo de equipos medicos"
                  width={960}
                  height={600}
                  className="aspect-[16/9] w-full object-cover"
                  priority
                />
              </div>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {atlasStats.map((item) => (
                  <article
                    key={item.label}
                    className="rounded-md border border-blue-100 bg-white p-3"
                  >
                    <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
                      <item.icon className="h-4 w-4 text-blue-700" aria-hidden="true" />
                      {item.label}
                    </p>
                    <p className="mt-1 text-base font-semibold text-slate-950">
                      {item.value}
                    </p>
                  </article>
                ))}
              </div>
            </aside>
          </div>
        </section>

        <section className="mt-6 grid gap-4 md:grid-cols-3">
          {[
            {
              title: "Antes del caso",
              text: "Revisa partes, alarmas y fallas frecuentes para llegar con contexto tecnico.",
              icon: BookOpenCheck,
            },
            {
              title: "Durante la practica",
              text: "Usa el checklist como guia de observacion y evita conclusiones prematuras.",
              icon: ClipboardCheck,
            },
            {
              title: "Despues del flujo",
              text: "Genera reporte correctivo o preventivo como evidencia academica.",
              icon: FileText,
            },
          ].map((item) => (
            <article
              key={item.title}
              className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
            >
              <item.icon className="h-6 w-6 text-blue-700" aria-hidden="true" />
              <h2 className="mt-4 text-base font-semibold text-slate-950">
                {item.title}
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">{item.text}</p>
            </article>
          ))}
        </section>

        <div id="explorador-atlas" className="mt-6 scroll-mt-6">
          <MedTechAtlasExplorer equipment={equipmentProfiles} />
        </div>

        <section className="my-6 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-900">
          <div className="flex gap-3">
            <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
            <p>
              Uso educativo. No sustituye manuales del fabricante, protocolos
              institucionales, pruebas normativas ni mantenimiento certificado.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
