"use client";

import {
  BarChart3,
  CheckCircle2,
  ClipboardCheck,
  Download,
  FileText,
  RotateCcw,
  Users,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

type PilotMetrics = {
  participants: number;
  quizAverage: number;
  caseCompleted: number;
  reportsGenerated: number;
  observations: number;
};

type ChecklistKey =
  | "links"
  | "mobile"
  | "privacy"
  | "evidence"
  | "rubric";

const STORAGE_KEY = "biomedtools-core:teacher-dashboard:v1";

const defaultMetrics: PilotMetrics = {
  participants: 5,
  quizAverage: 75,
  caseCompleted: 4,
  reportsGenerated: 3,
  observations: 2,
};

const checklistItems: Array<{
  key: ChecklistKey;
  label: string;
  detail: string;
}> = [
  {
    key: "links",
    label: "Enlaces verificados",
    detail: "Core, Quiz, Case y Report abren desde navegador/incognito.",
  },
  {
    key: "mobile",
    label: "Celular probado",
    detail: "El flujo se puede completar en pantalla pequena.",
  },
  {
    key: "privacy",
    label: "Privacidad revisada",
    detail: "No se solicitan datos clinicos sensibles ni identificadores reales.",
  },
  {
    key: "evidence",
    label: "Carpeta de evidencia lista",
    detail: "Capturas, reportes PDF, observaciones y resumen de resultados.",
  },
  {
    key: "rubric",
    label: "Rubrica compartida",
    detail: "Criterios claros para reporte tecnico y participacion.",
  },
];

const metricInputs: Array<{
  key: keyof PilotMetrics;
  label: string;
  icon: typeof Users;
  max: number;
}> = [
  { key: "participants", label: "Participantes", icon: Users, max: 999 },
  { key: "quizAverage", label: "Promedio quiz", icon: BarChart3, max: 100 },
  { key: "caseCompleted", label: "Casos", icon: ClipboardCheck, max: 999 },
  { key: "reportsGenerated", label: "Reportes", icon: FileText, max: 999 },
  { key: "observations", label: "Observaciones", icon: CheckCircle2, max: 999 },
];

function readDashboardState() {
  if (typeof window === "undefined") {
    return { metrics: defaultMetrics, checklist: [] as ChecklistKey[] };
  }

  try {
    const parsed = JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? "{}");
    return {
      metrics: { ...defaultMetrics, ...(parsed.metrics ?? {}) },
      checklist: Array.isArray(parsed.checklist)
        ? (parsed.checklist as ChecklistKey[])
        : [],
    };
  } catch {
    return { metrics: defaultMetrics, checklist: [] as ChecklistKey[] };
  }
}

function clampMetric(value: number, min = 0, max = 100) {
  if (!Number.isFinite(value)) {
    return min;
  }
  return Math.min(max, Math.max(min, Math.round(value)));
}

export function TeacherPilotDashboard() {
  const [metrics, setMetrics] = useState<PilotMetrics>(defaultMetrics);
  const [checklist, setChecklist] = useState<ChecklistKey[]>([]);
  const [storageReady, setStorageReady] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const state = readDashboardState();
      setMetrics(state.metrics);
      setChecklist(state.checklist);
      setStorageReady(true);
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!storageReady) {
      return;
    }

    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ metrics, checklist }),
    );
  }, [checklist, metrics, storageReady]);

  const derived = useMemo(() => {
    const completion =
      metrics.participants > 0
        ? Math.round((metrics.caseCompleted / metrics.participants) * 100)
        : 0;
    const evidence =
      metrics.participants > 0
        ? Math.round((metrics.reportsGenerated / metrics.participants) * 100)
        : 0;
    const readiness = Math.round(
      (checklist.length / checklistItems.length) * 45 +
        Math.min(metrics.quizAverage, 100) * 0.25 +
        Math.min(completion, 100) * 0.2 +
        Math.min(evidence, 100) * 0.1,
    );

    return {
      completion: Math.min(completion, 100),
      evidence: Math.min(evidence, 100),
      readiness: Math.min(readiness, 100),
    };
  }, [checklist.length, metrics]);

  function updateMetric(key: keyof PilotMetrics, value: string) {
    setMetrics((current) => ({
      ...current,
      [key]: clampMetric(
        Number(value),
        0,
        key === "quizAverage" ? 100 : 999,
      ),
    }));
  }

  function toggleChecklist(key: ChecklistKey, checked: boolean) {
    setChecklist((current) =>
      checked ? [...new Set([...current, key])] : current.filter((item) => item !== key),
    );
  }

  function resetDashboard() {
    setMetrics(defaultMetrics);
    setChecklist([]);
  }

  function exportCsv() {
    const rows = [
      ["campo", "valor"],
      ["participantes", String(metrics.participants)],
      ["promedio_quiz", String(metrics.quizAverage)],
      ["casos_completados", String(metrics.caseCompleted)],
      ["reportes_generados", String(metrics.reportsGenerated)],
      ["observaciones", String(metrics.observations)],
      ["avance_casos", `${derived.completion}%`],
      ["evidencia", `${derived.evidence}%`],
      ["preparacion", `${derived.readiness}%`],
      ["checklist", checklist.join("|")],
    ];
    const csv = rows.map((row) => row.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const href = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = href;
    link.download = "biomedtools-piloto-docente.csv";
    link.click();
    URL.revokeObjectURL(href);
  }

  return (
    <section className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-[0_18px_55px_rgba(15,23,42,0.12)]">
      <div className="grid lg:grid-cols-[1fr_18rem]">
        <div className="p-5 md:p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-blue-700">
                Consola docente local
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-950">
                Preparacion y seguimiento de piloto
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
                Captura numeros rapidos de una prueba controlada. Los datos se
                guardan solo en este navegador y pueden exportarse como CSV.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={exportCsv}
                className="inline-flex min-h-10 items-center gap-2 rounded-md bg-blue-700 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-800"
              >
                <Download className="h-4 w-4" aria-hidden="true" />
                Exportar CSV
              </button>
              <button
                type="button"
                onClick={resetDashboard}
                className="inline-flex min-h-10 items-center gap-2 rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                <RotateCcw className="h-4 w-4" aria-hidden="true" />
                Reiniciar
              </button>
            </div>
          </div>

          <div className="mt-5 grid gap-3 md:grid-cols-5">
            {metricInputs.map(({ key, label, icon: Icon, max }) => (
              <label
                key={key}
                className="rounded-lg border border-slate-200 bg-slate-50 p-3"
              >
                <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  <Icon className="h-4 w-4 text-blue-700" aria-hidden="true" />
                  {label}
                </span>
                <input
                  type="number"
                  min={0}
                  max={max}
                  value={metrics[key]}
                  onChange={(event) =>
                    updateMetric(key, event.target.value)
                  }
                  className="mt-2 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-lg font-semibold text-slate-950 outline-none focus:ring-2 focus:ring-blue-200"
                />
              </label>
            ))}
          </div>

          <div className="mt-5 grid gap-3 md:grid-cols-3">
            {[
              ["Preparacion", `${derived.readiness}%`, "Checklist + datos minimos"],
              ["Casos completos", `${derived.completion}%`, "Casos / participantes"],
              ["Evidencia PDF", `${derived.evidence}%`, "Reportes / participantes"],
            ].map(([label, value, detail]) => (
              <article
                key={label}
                className="rounded-lg border border-blue-100 bg-blue-50 p-4"
              >
                <p className="text-sm font-semibold text-blue-950">{label}</p>
                <p className="mt-2 text-3xl font-semibold text-blue-800">
                  {value}
                </p>
                <p className="mt-1 text-xs text-slate-600">{detail}</p>
              </article>
            ))}
          </div>
        </div>

        <aside className="border-t border-slate-200 bg-slate-50 p-5 lg:border-l lg:border-t-0">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Checklist antes de aplicar
          </h3>
          <div className="mt-4 space-y-3">
            {checklistItems.map((item) => {
              const checked = checklist.includes(item.key);
              return (
                <label
                  key={item.key}
                  className="flex gap-3 rounded-md border border-slate-200 bg-white p-3 shadow-sm"
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={(event) =>
                      toggleChecklist(item.key, event.target.checked)
                    }
                    className="mt-1 h-4 w-4 rounded border-slate-300 text-blue-700"
                  />
                  <span>
                    <span className="block text-sm font-semibold text-slate-950">
                      {item.label}
                    </span>
                    <span className="mt-1 block text-xs leading-5 text-slate-600">
                      {item.detail}
                    </span>
                  </span>
                </label>
              );
            })}
          </div>
        </aside>
      </div>
    </section>
  );
}
