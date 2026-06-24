"use client";

import {
  AlertTriangle,
  ArrowRight,
  BookOpenCheck,
  ClipboardCheck,
  FileText,
  Search,
  ShieldCheck,
  Stethoscope,
} from "lucide-react";
import { useMemo, useState } from "react";

import {
  buildUrl,
  CASE_SIMULATOR_URL,
  QUIZ_ARENA_URL,
  REPORT_BUILDER_URL,
  type EquipmentProfile,
} from "../lib/biomed-content";

type MedTechAtlasExplorerProps = {
  equipment: readonly EquipmentProfile[];
};

export function MedTechAtlasExplorer({ equipment }: MedTechAtlasExplorerProps) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Todas");
  const [selectedSlug, setSelectedSlug] = useState(equipment[0]?.slug ?? "");

  const categories = useMemo(
    () => ["Todas", ...Array.from(new Set(equipment.map((item) => item.category)))],
    [equipment],
  );

  const filteredEquipment = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return equipment.filter((item) => {
      const matchesCategory = category === "Todas" || item.category === category;
      const haystack = [
        item.name,
        item.category,
        item.summary,
        item.reportEquipment,
        ...item.commonIssues,
        ...item.checklist,
      ]
        .join(" ")
        .toLowerCase();

      return matchesCategory && (!normalizedQuery || haystack.includes(normalizedQuery));
    });
  }, [category, equipment, query]);

  const selected =
    equipment.find((item) => item.slug === selectedSlug) ??
    filteredEquipment[0] ??
    equipment[0];

  if (!selected) {
    return null;
  }

  const quizUrl = buildUrl(QUIZ_ARENA_URL, `/quiz/${selected.quizCategory}`, {
    mode: "study",
    difficulty: "all",
  });
  const caseUrl = buildUrl(CASE_SIMULATOR_URL, `/cases/${selected.caseId}`, {
    category: selected.caseCategory,
  });
  const reportUrl = buildUrl(REPORT_BUILDER_URL, "/builder/corrective", {
    activity: "case",
    caseId: selected.caseId,
    caseTitle: selected.name,
    equipment: selected.reportEquipment,
  });
  const preventiveReportUrl = buildUrl(REPORT_BUILDER_URL, "/builder/corrective", {
    template: "preventive",
    equipment: selected.reportEquipment,
  });

  return (
    <section className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
      <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
        <div className="grid gap-3 md:grid-cols-[1fr_13rem]">
          <label className="relative block">
            <Search
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
              aria-hidden="true"
            />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Buscar equipo, falla, accesorio o checklist"
              className="min-h-11 w-full rounded-md border border-slate-300 bg-white pl-9 pr-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
            />
          </label>
          <label className="block">
            <span className="sr-only">Categoria</span>
            <select
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              className="min-h-11 w-full rounded-md border border-slate-300 bg-white px-3 text-sm font-medium text-slate-800 shadow-sm outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
            >
              {categories.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="mt-4 grid gap-3">
          {filteredEquipment.map((item) => {
            const active = item.slug === selected.slug;

            return (
              <button
                key={item.slug}
                type="button"
                onClick={() => setSelectedSlug(item.slug)}
                className={[
                  "w-full rounded-lg border p-4 text-left transition",
                  active
                    ? "border-blue-300 bg-blue-50 shadow-sm"
                    : "border-slate-200 bg-white hover:border-blue-200 hover:bg-slate-50",
                ].join(" ")}
              >
                <div className="flex items-start gap-3">
                  <span
                    className={[
                      "flex h-10 w-10 shrink-0 items-center justify-center rounded-md border",
                      active
                        ? "border-blue-200 bg-white text-blue-700"
                        : "border-slate-200 bg-slate-50 text-slate-600",
                    ].join(" ")}
                  >
                    <Stethoscope className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm font-semibold text-slate-950">
                      {item.name}
                    </span>
                    <span className="mt-1 block text-xs font-semibold uppercase text-blue-700">
                      {item.category}
                    </span>
                    <span className="mt-2 block text-sm leading-6 text-slate-600">
                      {item.summary}
                    </span>
                  </span>
                </div>
              </button>
            );
          })}

          {filteredEquipment.length === 0 ? (
            <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50 p-5 text-sm text-slate-600">
              No se encontraron equipos con ese filtro.
            </div>
          ) : null}
        </div>
      </div>

      <aside className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm lg:sticky lg:top-20 lg:self-start">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-blue-700">
              Ficha atlas
            </p>
            <h2 className="mt-1 text-2xl font-semibold text-slate-950">
              {selected.name}
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
              {selected.summary}
            </p>
          </div>
          <span className="rounded-md border border-blue-200 bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-800">
            {selected.category}
          </span>
        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <section className="rounded-md border border-slate-200 bg-slate-50 p-4">
            <h3 className="inline-flex items-center gap-2 text-sm font-semibold text-slate-950">
              <AlertTriangle className="h-4 w-4 text-amber-600" aria-hidden="true" />
              Fallas frecuentes
            </h3>
            <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-700">
              {selected.commonIssues.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-md border border-teal-100 bg-teal-50 p-4">
            <h3 className="inline-flex items-center gap-2 text-sm font-semibold text-teal-950">
              <BookOpenCheck className="h-4 w-4 text-teal-700" aria-hidden="true" />
              Competencias
            </h3>
            <ul className="mt-3 space-y-2 text-sm leading-6 text-teal-950">
              {selected.learningOutcomes.map((item) => (
                <li key={item} className="flex gap-2">
                  <ShieldCheck className="mt-1 h-4 w-4 shrink-0 text-teal-700" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </section>
        </div>

        <section className="mt-4 rounded-md border border-slate-200 bg-white p-4 shadow-sm">
          <h3 className="inline-flex items-center gap-2 text-sm font-semibold text-slate-950">
            <ClipboardCheck className="h-4 w-4 text-blue-700" aria-hidden="true" />
            Checklist tecnico educativo
          </h3>
          <div className="mt-3 grid gap-2">
            {selected.checklist.map((item, index) => (
              <div
                key={item}
                className="grid grid-cols-[1.75rem_1fr] gap-3 rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm leading-6 text-slate-700"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-700 text-xs font-semibold text-white">
                  {index + 1}
                </span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-4 rounded-md border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-900">
          {selected.caution}
        </section>

        <div className="mt-5 grid gap-2 sm:grid-cols-2">
          <a
            href={quizUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-10 items-center justify-center gap-2 rounded-md bg-blue-700 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-800"
          >
            Practicar quiz
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
          <a
            href={caseUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-10 items-center justify-center gap-2 rounded-md border border-cyan-200 bg-cyan-50 px-3 py-2 text-sm font-semibold text-cyan-800 hover:bg-cyan-100"
          >
            Abrir caso
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
          <a
            href={reportUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-10 items-center justify-center gap-2 rounded-md border border-teal-200 bg-teal-50 px-3 py-2 text-sm font-semibold text-teal-800 hover:bg-teal-100"
          >
            Reporte correctivo
            <FileText className="h-4 w-4" aria-hidden="true" />
          </a>
          <a
            href={preventiveReportUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-10 items-center justify-center gap-2 rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50"
          >
            Preventivo
            <FileText className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </aside>
    </section>
  );
}
