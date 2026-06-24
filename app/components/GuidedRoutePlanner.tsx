"use client";

import {
  ArrowRight,
  BookOpenCheck,
  CheckCircle2,
  ClipboardCheck,
  FileText,
  ListChecks,
  RotateCcw,
  ShieldCheck,
  Stethoscope,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import {
  CASE_SIMULATOR_URL,
  QUIZ_ARENA_URL,
  REPORT_BUILDER_URL,
  buildUrl,
  getEquipmentBySlug,
  guidedActivities,
} from "@/app/lib/biomed-content";

type ActivitySlug = (typeof guidedActivities)[number]["slug"];
type StepKey = "pretest" | "case" | "report" | "evidence" | "reflection";

const STORAGE_KEY = "biomedtools-core:guided-route:v2";

const stepLabels: Record<StepKey, string> = {
  pretest: "Pretest / repaso",
  case: "Caso simulado",
  report: "Reporte tecnico",
  evidence: "Evidencia",
  reflection: "Cierre reflexivo",
};

const stepDescriptions: Record<StepKey, string> = {
  pretest: "Resolver quiz por categoria para activar conceptos clave.",
  case: "Aplicar razonamiento tecnico en un escenario simulado.",
  report: "Documentar falla, diagnostico, acciones y recomendaciones.",
  evidence: "Guardar capturas, PDF y observaciones de la actividad.",
  reflection: "Registrar dudas, hallazgos y mejoras para el siguiente grupo.",
};

const stepIcons: Record<StepKey, typeof BookOpenCheck> = {
  pretest: BookOpenCheck,
  case: ShieldCheck,
  report: FileText,
  evidence: ClipboardCheck,
  reflection: ListChecks,
};

function readStoredProgress(): Record<string, StepKey[]> {
  if (typeof window === "undefined") {
    return {};
  }

  try {
    const parsed = JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? "{}");
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

export function GuidedRoutePlanner() {
  const [selectedSlug, setSelectedSlug] = useState<ActivitySlug>(
    guidedActivities[0].slug,
  );
  const [progress, setProgress] = useState<Record<string, StepKey[]>>({});

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setProgress(readStoredProgress());
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  const activity = useMemo(
    () =>
      guidedActivities.find((item) => item.slug === selectedSlug) ??
      guidedActivities[0],
    [selectedSlug],
  );
  const equipment = getEquipmentBySlug(activity.equipmentSlug);
  const completedSteps = progress[activity.slug] ?? [];
  const completionPercent = Math.round((completedSteps.length / 5) * 100);

  const quizUrl = buildUrl(QUIZ_ARENA_URL, `/quiz/${equipment?.quizCategory ?? ""}`, {
    mode: "study",
    difficulty: "all",
  });
  const caseUrl = buildUrl(
    CASE_SIMULATOR_URL,
    `/cases/${equipment?.caseId ?? activity.slug}`,
    {
      category: equipment?.caseCategory ?? activity.slug,
    },
  );
  const reportUrl = buildUrl(REPORT_BUILDER_URL, "/builder/corrective", {
    activity: "case",
    caseId: equipment?.caseId ?? activity.slug,
    caseTitle: activity.title,
    equipment: equipment?.reportEquipment ?? activity.title,
  });

  const stepActions: Record<StepKey, { label: string; href: string }> = {
    pretest: { label: "Abrir quiz", href: quizUrl },
    case: { label: "Abrir caso", href: caseUrl },
    report: { label: "Crear reporte", href: reportUrl },
    evidence: { label: "Organizar evidencia", href: "/evidencia-piloto" },
    reflection: { label: "Ver guia docente", href: "/docentes" },
  };

  function setStep(step: StepKey, checked: boolean) {
    setProgress((current) => {
      const currentSteps = new Set(current[activity.slug] ?? []);
      if (checked) {
        currentSteps.add(step);
      } else {
        currentSteps.delete(step);
      }
      const next = {
        ...current,
        [activity.slug]: Array.from(currentSteps),
      };
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }

  function resetCurrentRoute() {
    setProgress((current) => {
      const next = { ...current, [activity.slug]: [] };
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }

  return (
    <section className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-[0_18px_55px_rgba(15,23,42,0.12)]">
      <div className="grid lg:grid-cols-[18rem_1fr]">
        <aside className="border-b border-slate-200 bg-blue-950 p-5 text-white lg:border-b-0 lg:border-r">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-md border border-white/15 bg-white/10">
              <Stethoscope className="h-5 w-5 text-cyan-100" aria-hidden="true" />
            </span>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-blue-200">
                Ruta guiada v2
              </p>
              <h1 className="text-lg font-semibold">Actividad completa</h1>
            </div>
          </div>

          <div className="mt-6 space-y-2">
            {guidedActivities.map((item) => {
              const itemProgress = progress[item.slug]?.length ?? 0;
              const active = item.slug === activity.slug;
              return (
                <button
                  key={item.slug}
                  type="button"
                  onClick={() => setSelectedSlug(item.slug)}
                  className={[
                    "w-full rounded-md border px-3 py-3 text-left transition",
                    active
                      ? "border-cyan-200 bg-white text-blue-950"
                      : "border-white/10 bg-white/[0.06] text-blue-100 hover:bg-white/10",
                  ].join(" ")}
                >
                  <span className="block text-sm font-semibold">{item.title}</span>
                  <span className={active ? "mt-1 block text-xs text-slate-600" : "mt-1 block text-xs text-blue-200"}>
                    {item.duration} - {itemProgress}/5 pasos
                  </span>
                </button>
              );
            })}
          </div>
        </aside>

        <div className="min-w-0 p-5 md:p-7">
          <div className="grid gap-5 xl:grid-cols-[1fr_18rem]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-blue-700">
                {activity.level}
              </p>
              <h2 className="mt-2 max-w-3xl text-3xl font-semibold leading-tight text-slate-950 md:text-4xl">
                {activity.title}
              </h2>
              <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">
                {activity.objective}
              </p>
            </div>

            <aside className="rounded-lg border border-blue-100 bg-blue-50 p-4">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-semibold text-blue-950">
                  Avance de actividad
                </p>
                <span className="text-2xl font-semibold text-blue-800">
                  {completionPercent}%
                </span>
              </div>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-blue-100">
                <div
                  className="h-full rounded-full bg-blue-700 transition-all"
                  style={{ width: `${completionPercent}%` }}
                />
              </div>
              <button
                type="button"
                onClick={resetCurrentRoute}
                className="mt-4 inline-flex min-h-9 items-center gap-2 rounded-md border border-blue-200 bg-white px-3 py-1.5 text-xs font-semibold text-blue-800 hover:bg-blue-50"
              >
                <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
                Reiniciar ruta
              </button>
            </aside>
          </div>

          <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_0.78fr]">
            <section className="rounded-lg border border-slate-200 bg-slate-50 p-4">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                Flujo operativo
              </h3>
              <div className="mt-4 space-y-3">
                {(Object.keys(stepLabels) as StepKey[]).map((step, index) => {
                  const Icon = stepIcons[step];
                  const checked = completedSteps.includes(step);
                  const action = stepActions[step];

                  return (
                    <article
                      key={step}
                      className="grid gap-3 rounded-lg border border-slate-200 bg-white p-4 shadow-sm md:grid-cols-[auto_1fr_auto]"
                    >
                      <label className="flex cursor-pointer items-start gap-3 md:col-span-2">
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={(event) => setStep(step, event.target.checked)}
                          className="mt-1 h-4 w-4 rounded border-slate-300 text-blue-700"
                        />
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-blue-50 text-blue-700">
                          <Icon className="h-4 w-4" aria-hidden="true" />
                        </span>
                        <span>
                          <span className="block text-sm font-semibold text-slate-950">
                            {index + 1}. {stepLabels[step]}
                          </span>
                          <span className="mt-1 block text-sm leading-6 text-slate-600">
                            {stepDescriptions[step]}
                          </span>
                        </span>
                      </label>
                      <a
                        href={action.href}
                        className="inline-flex min-h-10 items-center justify-center gap-2 rounded-md border border-blue-200 bg-blue-50 px-3 py-2 text-sm font-semibold text-blue-800 hover:bg-blue-100"
                      >
                        {action.label}
                        <ArrowRight className="h-4 w-4" aria-hidden="true" />
                      </a>
                    </article>
                  );
                })}
              </div>
            </section>

            <aside className="space-y-4">
              <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                  Evidencia minima
                </h3>
                <ul className="mt-3 space-y-3 text-sm leading-6 text-slate-600">
                  {activity.evidence.map((item) => (
                    <li key={item} className="flex gap-2">
                      <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-teal-700" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {equipment ? (
                <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                    Checklist tecnico
                  </h3>
                  <ul className="mt-3 space-y-3 text-sm leading-6 text-slate-600">
                    {equipment.checklist.slice(0, 4).map((item) => (
                      <li key={item} className="flex gap-2">
                        <ClipboardCheck className="mt-1 h-4 w-4 shrink-0 text-blue-700" aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              ) : null}

              <section className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-900">
                Uso educativo. No sustituye protocolos institucionales,
                supervision profesional ni mantenimiento certificado.
              </section>
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
}
