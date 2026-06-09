# BioMedTools MX Core

Landing integradora para conectar tres herramientas educativas:

- BioMed Quiz Arena
- BioMed Case Simulator
- Clinical Report Builder

## Objetivo

Presentar BioMedTools MX Core como una plataforma de aprendizaje, simulacion y documentacion tecnica para Ingenieria Biomedica y Ciencias de la Salud.

## Variables de entorno

```env
NEXT_PUBLIC_CASE_SIMULATOR_URL=https://biomed-case-simulator.vercel.app
NEXT_PUBLIC_QUIZ_ARENA_URL=https://biomed-quiz-arena.vercel.app
NEXT_PUBLIC_REPORT_BUILDER_URL=https://clinical-report-builder.vercel.app
```

Si no se configuran, la app usa esas URLs por defecto.

## Flujo educativo

1. Estudiar: BioMed Quiz Arena.
2. Practicar: BioMed Case Simulator.
3. Documentar: Clinical Report Builder.

## Desarrollo

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Deploy en Vercel

Este proyecto es compatible con Vercel como app Next.js. Configura las variables publicas anteriores si quieres apuntar a otros dominios.
