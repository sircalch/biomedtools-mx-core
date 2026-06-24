import type { Metadata } from "next";
import { ArrowRight, FileText, History, ShieldCheck } from "lucide-react";
import Link from "next/link";

import { LocalActivityHistory } from "../components/LocalActivityHistory";

export const metadata: Metadata = {
  title: "Historial local | BioMedTools MX Core",
  description:
    "Historial local de avance, evidencia y observaciones para actividades piloto de BioMedTools MX Core.",
};

export default function HistoryPage() {
  return (
    <div className="min-h-screen">
      <main className="mx-auto w-full max-w-7xl px-4 py-6 md:px-6">
        <section className="mb-6 rounded-lg border border-slate-200 bg-white p-5 shadow-[0_18px_55px_rgba(15,23,42,0.12)] md:p-7">
          <div className="grid gap-5 lg:grid-cols-[1fr_0.5fr]">
            <div>
              <p className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-blue-700">
                <History className="h-4 w-4" aria-hidden="true" />
                Seguimiento y evidencia
              </p>
              <h1 className="mt-3 max-w-3xl text-3xl font-semibold leading-tight text-slate-950 md:text-5xl">
                Historial operativo para validar el flujo con usuarios reales.
              </h1>
              <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">
                Centraliza el avance de rutas, datos de consola docente y notas
                manuales de evidencia mientras se mantiene pausada la integracion
                con backend.
              </p>
            </div>
            <aside className="rounded-lg border border-blue-100 bg-blue-50 p-5">
              <ShieldCheck className="h-7 w-7 text-blue-700" aria-hidden="true" />
              <h2 className="mt-4 text-lg font-semibold text-blue-950">
                Preparado para piloto
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                Exporta JSON y conserva capturas/PDF en tu carpeta de evidencia.
              </p>
              <div className="mt-4 grid gap-2">
                <Link
                  href="/ruta"
                  className="inline-flex min-h-10 items-center justify-center gap-2 rounded-md bg-blue-700 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-800"
                >
                  Abrir ruta
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <Link
                  href="/evidencia-piloto"
                  className="inline-flex min-h-10 items-center justify-center gap-2 rounded-md border border-blue-200 bg-white px-3 py-2 text-sm font-semibold text-blue-800 hover:bg-blue-50"
                >
                  Carpeta piloto
                  <FileText className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </aside>
          </div>
        </section>

        <LocalActivityHistory />
      </main>
    </div>
  );
}
