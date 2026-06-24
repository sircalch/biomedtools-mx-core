"use client";

import {
  BarChart3,
  CalendarDays,
  ClipboardCheck,
  Download,
  FileText,
  History,
  RotateCcw,
  Save,
  ShieldCheck,
  Trash2,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { guidedActivities } from "../lib/biomed-content";

type EvidenceKind = "captura" | "resultado" | "pdf" | "observacion";

type EvidenceRecord = {
  id: string;
  kind: EvidenceKind;
  title: string;
  note: string;
  createdAt: string;
};

type TeacherState = {
  metrics?: {
    participants?: number;
    quizAverage?: number;
    caseCompleted?: number;
    reportsGenerated?: number;
    observations?: number;
  };
  checklist?: string[];
};

const GUIDED_KEY = "biomedtools-core:guided-route:v2";
const TEACHER_KEY = "biomedtools-core:teacher-dashboard:v1";
const EVIDENCE_KEY = "biomedtools-core:local-evidence:v1";

const evidenceKinds: Array<{ value: EvidenceKind; label: string }> = [
  { value: "captura", label: "Captura" },
  { value: "resultado", label: "Resultado" },
  { value: "pdf", label: "PDF" },
  { value: "observacion", label: "Observacion" },
];

function readJson<T>(key: string, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) {
      return fallback;
    }

    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function downloadJson(filename: string, payload: unknown) {
  const blob = new Blob([JSON.stringify(payload, null, 2)], {
    type: "application/json;charset=utf-8",
  });
  const href = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = href;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(href);
}

export function LocalActivityHistory() {
  const [routeProgress, setRouteProgress] = useState<Record<string, string[]>>({});
  const [teacherState, setTeacherState] = useState<TeacherState>({});
  const [records, setRecords] = useState<EvidenceRecord[]>([]);
  const [kind, setKind] = useState<EvidenceKind>("captura");
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setRouteProgress(readJson<Record<string, string[]>>(GUIDED_KEY, {}));
      setTeacherState(readJson<TeacherState>(TEACHER_KEY, {}));
      setRecords(readJson<EvidenceRecord[]>(EVIDENCE_KEY, []));
      setReady(true);
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!ready) {
      return;
    }

    window.localStorage.setItem(EVIDENCE_KEY, JSON.stringify(records));
  }, [ready, records]);

  const summary = useMemo(() => {
    const routeCount = guidedActivities.length;
    const completedSteps = guidedActivities.reduce(
      (total, activity) => total + (routeProgress[activity.slug]?.length ?? 0),
      0,
    );
    const maxSteps = routeCount * 5;
    const routePercent = maxSteps > 0 ? Math.round((completedSteps / maxSteps) * 100) : 0;
    const checklistCount = teacherState.checklist?.length ?? 0;

    return {
      routePercent,
      completedSteps,
      records: records.length,
      participants: teacherState.metrics?.participants ?? 0,
      reports: teacherState.metrics?.reportsGenerated ?? 0,
      checklistCount,
    };
  }, [records.length, routeProgress, teacherState]);

  function addRecord() {
    const cleanTitle = title.trim();
    const cleanNote = note.trim();
    if (!cleanTitle && !cleanNote) {
      return;
    }

    setRecords((current) => [
      {
        id: crypto.randomUUID(),
        kind,
        title: cleanTitle || "Evidencia sin titulo",
        note: cleanNote,
        createdAt: new Date().toISOString(),
      },
      ...current,
    ]);
    setTitle("");
    setNote("");
    setKind("captura");
  }

  function removeRecord(id: string) {
    setRecords((current) => current.filter((item) => item.id !== id));
  }

  function resetEvidence() {
    setRecords([]);
  }

  function exportHistory() {
    downloadJson("biomedtools-historial-local.json", {
      exportedAt: new Date().toISOString(),
      source: "BioMedTools MX Core",
      routeProgress,
      teacherState,
      evidenceRecords: records,
      note:
        "Historial local del dominio Core. Quiz, Case y Report se unificaran con backend cuando Supabase quede activo.",
    });
  }

  return (
    <section className="grid gap-5 lg:grid-cols-[1fr_22rem]">
      <div className="space-y-5">
        <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-blue-700">
                <History className="h-4 w-4" aria-hidden="true" />
                Historial local
              </p>
              <h1 className="mt-2 text-3xl font-semibold leading-tight text-slate-950 md:text-4xl">
                Evidencia y avance del piloto en este navegador.
              </h1>
              <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
                Registra observaciones, capturas, PDFs y resultados manuales. La
                sincronizacion entre dominios quedara para la fase con backend.
              </p>
            </div>
            <button
              type="button"
              onClick={exportHistory}
              className="inline-flex min-h-10 items-center gap-2 rounded-md bg-blue-700 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-800"
            >
              <Download className="h-4 w-4" aria-hidden="true" />
              Exportar JSON
            </button>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
            {[
              ["Avance rutas", `${summary.routePercent}%`, BarChart3],
              ["Pasos marcados", String(summary.completedSteps), ClipboardCheck],
              ["Evidencias", String(summary.records), FileText],
              ["Participantes", String(summary.participants), ShieldCheck],
              ["Reportes", String(summary.reports), FileText],
            ].map(([label, value, Icon]) => (
              <article
                key={String(label)}
                className="rounded-lg border border-slate-200 bg-slate-50 p-4"
              >
                <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  <Icon className="h-4 w-4 text-blue-700" aria-hidden="true" />
                  {String(label)}
                </p>
                <p className="mt-2 text-2xl font-semibold text-slate-950">
                  {String(value)}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-base font-semibold text-slate-950">
              Rutas guiadas marcadas
            </h2>
            <span className="rounded-md border border-blue-200 bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-800">
              {summary.completedSteps} pasos
            </span>
          </div>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {guidedActivities.map((activity) => {
              const steps = routeProgress[activity.slug] ?? [];
              const percent = Math.round((steps.length / 5) * 100);

              return (
                <article
                  key={activity.slug}
                  className="rounded-lg border border-slate-200 bg-slate-50 p-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-sm font-semibold text-slate-950">
                        {activity.title}
                      </h3>
                      <p className="mt-1 text-xs text-slate-500">
                        {steps.length}/5 pasos completados
                      </p>
                    </div>
                    <span className="text-sm font-semibold text-blue-800">
                      {percent}%
                    </span>
                  </div>
                  <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-200">
                    <div
                      className="h-full rounded-full bg-blue-700"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {steps.length > 0 ? (
                      steps.map((step) => (
                        <span
                          key={step}
                          className="rounded-md border border-blue-100 bg-white px-2 py-1 text-xs font-medium text-blue-800"
                        >
                          {step}
                        </span>
                      ))
                    ) : (
                      <span className="text-xs text-slate-500">
                        Sin pasos marcados
                      </span>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-base font-semibold text-slate-950">
              Registro manual de evidencia
            </h2>
            <button
              type="button"
              onClick={resetEvidence}
              className="inline-flex min-h-9 items-center gap-2 rounded-md border border-rose-200 bg-white px-3 py-1.5 text-xs font-semibold text-rose-700 hover:bg-rose-50"
            >
              <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
              Limpiar evidencias
            </button>
          </div>

          <div className="mt-4 grid gap-3 md:grid-cols-[10rem_1fr]">
            <select
              value={kind}
              onChange={(event) => setKind(event.target.value as EvidenceKind)}
              className="min-h-10 rounded-md border border-slate-300 bg-white px-3 text-sm font-medium text-slate-800"
            >
              {evidenceKinds.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
            <input
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Titulo de evidencia"
              className="min-h-10 rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-900"
            />
          </div>
          <textarea
            value={note}
            onChange={(event) => setNote(event.target.value)}
            rows={3}
            placeholder="Observacion, nombre del archivo, resultado o detalle breve"
            className="mt-3 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900"
          />
          <button
            type="button"
            onClick={addRecord}
            className="mt-3 inline-flex min-h-10 items-center gap-2 rounded-md bg-teal-700 px-3 py-2 text-sm font-semibold text-white hover:bg-teal-800"
          >
            <Save className="h-4 w-4" aria-hidden="true" />
            Guardar evidencia
          </button>

          <div className="mt-5 space-y-3">
            {records.map((record) => (
              <article
                key={record.id}
                className="rounded-lg border border-slate-200 bg-slate-50 p-4"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-blue-700">
                      {record.kind}
                    </p>
                    <h3 className="mt-1 text-sm font-semibold text-slate-950">
                      {record.title}
                    </h3>
                    {record.note ? (
                      <p className="mt-2 text-sm leading-6 text-slate-600">
                        {record.note}
                      </p>
                    ) : null}
                    <p className="mt-2 inline-flex items-center gap-2 text-xs text-slate-500">
                      <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />
                      {new Intl.DateTimeFormat("es-MX", {
                        dateStyle: "medium",
                        timeStyle: "short",
                      }).format(new Date(record.createdAt))}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeRecord(record.id)}
                    className="inline-flex min-h-9 items-center gap-2 rounded-md border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100"
                  >
                    <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                    Quitar
                  </button>
                </div>
              </article>
            ))}

            {records.length === 0 ? (
              <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50 p-5 text-sm text-slate-600">
                Todavia no hay evidencias registradas en Core.
              </div>
            ) : null}
          </div>
        </section>
      </div>

      <aside className="space-y-5 lg:sticky lg:top-20 lg:self-start">
        <section className="rounded-lg border border-blue-100 bg-blue-50 p-5">
          <ShieldCheck className="h-6 w-6 text-blue-700" aria-hidden="true" />
          <h2 className="mt-3 text-base font-semibold text-blue-950">
            Alcance actual
          </h2>
          <p className="mt-2 text-sm leading-6 text-slate-700">
            Core registra su propia ruta y evidencia local. Los resultados de
            Quiz, Case y Report se exportan o registran manualmente hasta activar
            Supabase con autenticacion y grupos.
          </p>
        </section>

        <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-base font-semibold text-slate-950">
            Consola docente
          </h2>
          <div className="mt-4 space-y-3 text-sm">
            <div className="flex items-center justify-between gap-3 rounded-md border border-slate-200 bg-slate-50 px-3 py-2">
              <span className="text-slate-600">Checklist</span>
              <span className="font-semibold text-slate-950">
                {summary.checklistCount}/5
              </span>
            </div>
            <div className="flex items-center justify-between gap-3 rounded-md border border-slate-200 bg-slate-50 px-3 py-2">
              <span className="text-slate-600">Promedio quiz</span>
              <span className="font-semibold text-slate-950">
                {teacherState.metrics?.quizAverage ?? 0}%
              </span>
            </div>
            <div className="flex items-center justify-between gap-3 rounded-md border border-slate-200 bg-slate-50 px-3 py-2">
              <span className="text-slate-600">Casos completados</span>
              <span className="font-semibold text-slate-950">
                {teacherState.metrics?.caseCompleted ?? 0}
              </span>
            </div>
          </div>
        </section>
      </aside>
    </section>
  );
}
