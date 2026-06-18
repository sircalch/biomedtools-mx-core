"use client";

import {
  Activity,
  ClipboardCheck,
  Database,
  FileText,
  GraduationCap,
  Home,
  Info,
  Layers,
  Map,
  ShieldCheck,
  Stethoscope,
  Wrench,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

const navItems = [
  { label: "Inicio", href: "/", icon: Home },
  { label: "Modulos", href: "/#modulos", icon: Layers },
  { label: "Actividades", href: "/actividades", icon: ClipboardCheck },
  { label: "Biblioteca", href: "/biblioteca", icon: Database },
  { label: "Ruta", href: "/ruta", icon: Map },
  { label: "Evidencia", href: "/evidencia-piloto", icon: FileText },
  { label: "Proyectos", href: "/proyectos", icon: Wrench },
  { label: "Docentes", href: "/docentes", icon: GraduationCap },
  { label: "Acerca", href: "/acerca", icon: Info },
  { label: "Aviso", href: "/aviso-educativo", icon: ShieldCheck },
];

function isActive(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }
  if (href.startsWith("/#")) {
    return false;
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function CoreShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="core-shell min-h-screen bg-transparent">
      <aside className="core-sidebar fixed inset-y-0 left-0 z-50 hidden w-[17rem] flex-col border-r border-blue-800 bg-blue-950 text-white shadow-[18px_0_45px_rgba(15,23,42,0.18)] lg:flex">
        <div className="border-b border-white/10 p-5">
          <Link href="/" className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-md bg-white/10 ring-1 ring-white/20">
              <Stethoscope className="h-5 w-5 text-cyan-100" aria-hidden="true" />
            </span>
            <span>
              <span className="block text-sm font-semibold leading-5">
                BioMedTools MX Core
              </span>
              <span className="mt-0.5 block text-xs text-blue-200">
                Plataforma academica
              </span>
            </span>
          </Link>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-4">
          <div className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(pathname, item.href);
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={[
                    "flex min-h-10 items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition",
                    active
                      ? "bg-blue-700 text-white shadow-sm"
                      : "text-blue-100 hover:bg-white/10 hover:text-white",
                  ].join(" ")}
                >
                  <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                  {item.label}
                </Link>
              );
            })}
          </div>
        </nav>

        <div className="border-t border-white/10 p-4">
          <div className="rounded-lg border border-white/10 bg-white/5 p-3">
            <div className="flex items-center gap-3">
              <Image
                src="/topic-tales-biomedica-logo.png"
                alt="Topic Tales Biomedica"
                width={96}
                height={68}
                className="h-11 w-auto rounded bg-white object-contain p-1"
              />
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wide text-blue-200">
                  Topic Tales Biomedica
                </p>
                <p className="text-xs font-semibold text-white">
                  Ing. Andres Monreal
                </p>
                <p className="mt-0.5 text-[11px] leading-4 text-blue-200">
                  Ingeniero Biomedico
                </p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      <header className="core-mobile-header sticky top-0 z-50 border-b border-blue-800 bg-blue-950 text-white shadow-sm lg:hidden">
        <div className="flex items-center justify-between gap-3 px-4 py-3">
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold">
            <span className="flex h-8 w-8 items-center justify-center rounded-md bg-white/10 ring-1 ring-white/20">
              <Stethoscope className="h-4 w-4" aria-hidden="true" />
            </span>
            BioMedTools MX Core
          </Link>
          <Link
            href="/actividades"
            className="rounded-md bg-white px-3 py-1.5 text-xs font-semibold text-blue-950"
          >
            Practicar
          </Link>
        </div>
        <nav className="flex gap-1 overflow-x-auto px-3 pb-3 text-xs font-medium">
          {navItems.slice(0, 8).map((item) => {
            const Icon = item.icon;
            const active = isActive(pathname, item.href);
            return (
              <Link
                key={item.label}
                href={item.href}
                className={[
                  "inline-flex min-h-9 shrink-0 items-center gap-1.5 rounded-md px-3 py-2",
                  active
                    ? "bg-blue-700 text-white"
                    : "text-blue-100 hover:bg-white/10 hover:text-white",
                ].join(" ")}
              >
                <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </header>

      <div className="core-content lg:pl-[17rem]">
        <div className="min-h-screen">{children}</div>
        <footer className="core-global-footer border-t border-blue-900 bg-blue-950 text-white">
          <div className="mx-auto grid w-full max-w-7xl gap-6 px-4 py-6 md:grid-cols-[1fr_1fr_1fr] md:px-6">
            <div className="flex gap-4">
              <Image
                src="/topic-tales-biomedica-logo.png"
                alt="Topic Tales Biomedica"
                width={140}
                height={98}
                className="h-16 w-auto rounded bg-white object-contain p-1.5"
              />
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-cyan-100">
                  Topic Tales Biomedica
                </p>
                <p className="text-sm font-semibold">BioMedTools MX Core</p>
                <p className="mt-1 max-w-sm text-xs leading-5 text-blue-200">
                  Plataforma de aprendizaje, simulacion y documentacion tecnica
                  para Ingenieria Biomedica.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <p className="font-semibold text-white">Enlaces</p>
                <div className="mt-2 grid gap-1 text-blue-200">
                  <Link href="/actividades">Actividades</Link>
                  <Link href="/biblioteca">Biblioteca</Link>
                  <Link href="/ruta">Ruta</Link>
                </div>
              </div>
              <div>
                <p className="font-semibold text-white">Legal</p>
                <div className="mt-2 grid gap-1 text-blue-200">
                  <Link href="/aviso-educativo">Aviso educativo</Link>
                  <Link href="/evidencia-piloto">Evidencia piloto</Link>
                  <Link href="/proyectos">Roadmap</Link>
                </div>
              </div>
            </div>
            <div className="text-xs leading-5 text-blue-200">
              <div className="flex items-center gap-2 text-white">
                <Activity className="h-4 w-4" aria-hidden="true" />
                Uso educativo
              </div>
              <p className="mt-2">
                No sustituye protocolos clinicos, normativas institucionales,
                supervision profesional ni mantenimiento certificado.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
