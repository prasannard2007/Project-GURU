# Project GURU - Agentic AI Career Guidance Platform

This repository implements a complete frontend using **Next.js App Router** with the required structure:

```text
src/
  app/
    (auth)/
      login/
        page.tsx
    (dashboard)/
      layout.tsx
      dashboard/
        page.tsx
      education/
        page.tsx
      certifications/
        page.tsx
      softskills/
        page.tsx
    api/
      auth/route.ts
      resume/route.ts
      roadmap/route.ts
      agent/route.ts
    globals.css
    layout.tsx
    page.tsx
  components/
    agent-guru-chat.tsx
    navbar.tsx
    roadmap.tsx
    sidebar.tsx
  lib/
    db.ts
    resume-parser.ts
    types.ts
```

## Features
- Unified login via LinkedIn/GitHub or resume upload.
- AI resume builder redirect when resume is unavailable.
- NLP-style resume parsing + structured storage.
- Interactive Duolingo-style dashboard roadmap with central goal + progress paths.
- Education, certification, and softskills roadmap pages generated from user data.
- Floating AGENT GURU assistant for plan updates, guidance, and roadmap modifications.

## Run
```bash
npm install
npm run dev
```
