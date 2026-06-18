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

export const metadata: Metadata = {
  title: "BioMedTools MX Core",
  description:
    "Plataforma de aprendizaje, simulacion y documentacion tecnica para Ingenieria Biomedica y Ciencias de la Salud.",
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
