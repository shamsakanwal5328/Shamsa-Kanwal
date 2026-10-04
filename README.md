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

## Deployment (Netlify + GitHub Actions)

[.github/workflows/ci-cd.yml](.github/workflows/ci-cd.yml) runs on every push and pull request:

| Trigger | Jobs |
| --- | --- |
| Pull request to `main` | asset check, type check, lint, build, then a Netlify **preview** deploy with the URL posted on the PR |
| Push to `main` | same checks, then a **production** deploy and a smoke test of key URLs |

GitHub configuration (Settings → Secrets and variables → Actions):

- Secret `NETLIFY_AUTH_TOKEN`: Netlify personal access token
- Secret `NETLIFY_SITE_ID`: Netlify site ID (Project configuration → General)
- Variable `SITE_URL`: the live URL, e.g. `https://your-site.netlify.app`

Netlify's own Git builds should be stopped (Project configuration → Build & deploy → Continuous deployment →
Stop builds) so each commit is deployed once, by GitHub Actions. Build settings live in [netlify.toml](netlify.toml).
