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

## Paginas principales

- `/`: dashboard principal de BioMedTools MX Core.
- `/actividades`: actividades guiadas listas para clase o piloto.
- `/ruta`: rutas Quiz - Caso - Reporte por tema.
- `/biblioteca`: biblioteca educativa de equipos medicos.
- `/biblioteca/[slug]`: ficha individual por equipo.
- `/atlas`: MedTech Atlas Edu con busqueda, fichas, checklists y enlaces a Quiz/Case/Report.
- `/historial`: historial local, registro manual de evidencia y exportacion JSON.
- `/docentes`: guia breve para actividad piloto docente.
- `/evidencia-piloto`: estructura para guardar evidencia de validacion.
- `/acerca`: autor, enfoque y proposito educativo.
- `/aviso-educativo`: alcance, privacidad y limitaciones de uso.
- `/proyectos`: roadmap de proyectos recomendados.

## Fichas de equipo incluidas

- Monitor multiparametrico.
- Bomba de infusion.
- Desfibrilador.
- Autoclave.
- Electrocardiografo.
- Incubadora / cuna termica.

## Roadmap recomendado

- MedTech Atlas Edu: activo dentro de `/atlas`.
- Electrical Safety Trainer.
- SafeCheck Health.
- Maintenance Planner Lite.
- Biomedical Calculators Edu.

## Fase 2: piloto academico

Los documentos base para validacion humana, actividad piloto y evidencia academica estan en:

- [Guia del estudiante](docs/piloto-academico/guia-estudiante.md)
- [Guia del docente](docs/piloto-academico/guia-docente.md)
- [Encuesta post-uso](docs/piloto-academico/encuesta-post-uso.md)
- [Rubrica para evaluar reporte tecnico](docs/piloto-academico/rubrica-reporte-tecnico.md)
- [Piloto 01: monitoreo de signos vitales / SpO2](docs/piloto-academico/piloto-01-monitoreo-spo2.md)
- [Mensaje para alumnos del piloto 01](docs/piloto-academico/mensaje-alumnos-piloto-01.md)
- [Resumen de resultados del piloto 01](docs/piloto-academico/resumen-resultados-piloto-01.md)

## Recursos visuales

- Iconografia tecnica: Lucide React.
- Iconos de salud incluidos en `public/assets/health-icons`: Health Icons.
- Referencias visuales abiertas consultadas: Bioicons, Health Icons y NIH BioArt.
- Atlas de equipos: asset local de BioMedTools MX para mantener consistencia entre modulos.

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
