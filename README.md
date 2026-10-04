# Shamsa Kanwal — Psychology Academic Portfolio

Academic evidence portfolio for master's, scholarship and Erasmus Mundus applications, built from [Docs/spec.md](Docs/spec.md).

**Stack:** Next.js (App Router, static rendering) · React · TypeScript · Tailwind CSS v4. No runtime dependencies beyond Next/React.

## Commands

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run typecheck
npm run lint
npm run cv:pdf     # after a build: regenerates public/documents/Shamsa-Kanwal-CV.pdf from the /cv page
```

## Editing content

All content lives in [data/data.json](data/data.json). Its shape is defined in [lib/types.ts](lib/types.ts), and
`npm run typecheck` fails if the JSON doesn't match.

- Empty strings hide things cleanly: e.g. `contact.email` (the contact form and mailto links appear only once it's set),
  `socialLinks.*`, `personal.profileImage` (initials are shown until a photo is added).
- Set the deployed URL in `site.url`, or set `NEXT_PUBLIC_SITE_URL`. It is used for canonical URLs, the sitemap and Open Graph tags.
- **After changing CV-related content, run `npm run build && npm run cv:pdf`** so the PDF matches the online CV.

## Documents

Public files are in `public/documents/` (certificates, the blank research questionnaire, the CV) and
`public/images/certificates/` (WebP previews). Do not add the degree, transcript, SSC/HSSC records, recommendation
letters, the full research report, the internship case report or the Pathways to Healing report: they contain CNIC
numbers, other students' details, or patient/participant information.

## Deployment

Deploys to Vercel as-is (`npm run build`).
