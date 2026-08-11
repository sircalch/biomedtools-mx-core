import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { CoreShell } from "./components/CoreShell";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://biomedtools-mx-core.vercel.app";
const OG_IMAGE = "/biomed-equipment-atlas.png";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "BioMedTools MX Core",
    template: "%s | BioMedTools MX Core",
  },
  description:
    "Plataforma de aprendizaje, simulacion y documentacion tecnica para Ingenieria Biomedica y Ciencias de la Salud.",
  applicationName: "BioMedTools MX Core",
  authors: [{ name: "Ing. Andres Monreal" }],
  creator: "Ing. Andres Monreal / Topic Tales Biomedica",
  keywords: [
    "ingenieria biomedica",
    "tecnologia medica",
    "educacion biomedica",
    "simulacion clinico tecnica",
    "reportes biomedicos",
  ],
  openGraph: {
    title: "BioMedTools MX Core",
    description:
      "Ecosistema educativo para quizzes, casos simulados, atlas tecnico y reportes biomedicos.",
    url: SITE_URL,
    siteName: "BioMedTools MX Core",
    images: [
      {
        url: OG_IMAGE,
        width: 1600,
        height: 1000,
        alt: "Equipos medicos y flujo de aprendizaje de BioMedTools MX Core",
      },
    ],
    locale: "es_MX",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BioMedTools MX Core",
    description:
      "Plataforma de aprendizaje, simulacion y documentacion tecnica para Ingenieria Biomedica.",
    images: [OG_IMAGE],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <CoreShell>{children}</CoreShell>
      </body>
    </html>
  );
}
