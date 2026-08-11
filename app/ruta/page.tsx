import type { Metadata } from "next";
import { Activity, Boxes, ClipboardCheck, FileText, GraduationCap } from "lucide-react";

import { GuidedRoutePlanner } from "@/app/components/GuidedRoutePlanner";

export const metadata: Metadata = {
  title: "Ruta de aprendizaje | BioMedTools MX Core",
  description:
    "Ruta guiada interactiva Quiz - 3D - Caso - Reporte para actividades de Ingenieria Biomedica.",
};

const summary = [
  {
    label: "Entrada",
    value: "Quiz",
    detail: "Pretest, estudio o repaso por categoria.",
    icon: Activity,
  },
  {
    label: "Visual",
    value: "3D",
    detail: "Exploracion de subsistemas y puntos de verificacion.",
    icon: Boxes,
  },
  {
    label: "Practica",
    value: "Caso",
    detail: "Decision tecnica por etapas y pistas.",
    icon: ClipboardCheck,
  },
  {
    label: "Salida",
    value: "PDF",
    detail: "Reporte tecnico y evidencia de actividad.",
    icon: FileText,
  },
  {
    label: "Uso",
    value: "Clase",
    detail: "Actividad piloto, laboratorio o tarea guiada.",
    icon: GraduationCap,
  },
];

export default function LearningRoutePage() {
  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-6 md:px-6">
      <section className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {summary.map((item) => (
          <article
            key={item.label}
            className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm"
          >
            <div className="flex items-center justify-between gap-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                {item.label}
              </p>
              <item.icon className="h-5 w-5 text-blue-700" aria-hidden="true" />
            </div>
            <p className="mt-3 text-2xl font-semibold text-slate-950">
              {item.value}
            </p>
            <p className="mt-1 text-sm leading-5 text-slate-600">
              {item.detail}
            </p>
          </article>
        ))}
      </section>

      <GuidedRoutePlanner />
    </main>
  );
}
