# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository layout

Monorepo with two independent applications:

- `backend/` — Django 5 + Django REST Framework, PostgreSQL, deployed to Vercel as a Python serverless function.
- `frontend/` — React 18 + TypeScript + Vite, following the [bulletproof-react](https://github.com/alan2207/bulletproof-react) structure.
- `docs/` — PDFs and C4 diagrams for the ESS (Engenharia de Software) coursework this project belongs to.
- `scripts/verify-branch` + husky pre-commit — block commits to `main`/`develop` and reject branch names containing uppercase or non-ASCII characters.

The root `package.json` exists only to host husky; there are no root-level test/build commands.

## Backend (`backend/`)

### Common commands
Run from `backend/` with the venv activated (`source .venv/bin/activate`):

```bash
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver           # http://127.0.0.1:8000
python manage.py makemigrations
python manage.py test                # runs yureka/tests.py
python manage.py test yureka.tests.SomeTestCase.test_method  # single test
```

Swagger UI is at `/swagger/`, ReDoc at `/redoc/`. All app routes are mounted under `/api/` (see `core/urls.py`), auth flows live under `/accounts/` (django-allauth).

Environment variables (loaded from `backend/.env`): `DB_NAME`, `DB_USER`, `DB_PASSWORD`, `DB_HOST`, `DB_PORT`, `GOOGLE_CLIENT_ID`, `GOOGLE_SECRET_ID`. There is no `.env.example`; check `core/settings.py` for the full list before setting up a new environment.

### Architecture notes
- **Single Django app**: everything lives in `yureka/` — `models.py`, `serializers.py`, `views.py`, `urls.py`, `admin.py`. The `README.md` still describes an aspirational hexagonal layout (`domain/`, `ports/`, `use_cases/`) that does **not** exist in the current code. Don't refactor toward it unless asked.
- **Domain**: users pick `Topic`s (interests) and define weekly `UserRoutine`s (weekday + start/end time + topic). `Video`s are ingested from YouTube and promoted to `CuratedVideo` after approval; `VideoTopic` links curated videos to topics. `VideoRecommendationViewSet.get_recommendations` finds the active routine for the current time/weekday and returns the top curated videos matching its topic.
- **Custom `User` model**: `yureka.models.User` is a **plain `models.Model`** with a UUID pk, not a `AbstractUser` and not set as `AUTH_USER_MODEL`. Django's built-in `auth.User` still exists for admin/allauth. When touching auth code, be explicit about which `User` you mean — mixing them is the most likely source of bugs here.
- **Standardized responses**: `views.py` defines `create_response(data, message, status_code)` and `GlobalErrorHandler.handle_exception(exc)`. New endpoints in the "v2" viewsets (`InterestViewSet`, `RoutineViewSet`, `VideoRecommendationViewSet`, `VideoInteractionViewSet`, `ChannelViewSet`) use this envelope; older `ModelViewSet`s (`UserViewSet`, `TopicViewSet`, etc.) return raw DRF payloads. Both shapes coexist — match the surrounding style when editing.
- **Auth**: django-allauth handles Google social login; JWT is issued via `rest_framework_simplejwt`. `settings.DEBUG=True` and `SECRET_KEY` are hardcoded — do not treat this as production-safe.
- **Vercel deploy**: `vercel.json` builds `core/wsgi.py` with `@vercel/python` and runs `build_files.sh` (`makemigrations` + `migrate` + `collectstatic`) as a static build step. `Python3.9` is pinned there even though local dev uses Python 3.x from `requirements.txt`.

## Frontend (`frontend/`)

### Common commands
Uses **pnpm**. Run from `frontend/`:

```bash
pnpm install
pnpm dev                    # Vite dev server on :3000
pnpm build                  # tsc + vite build
pnpm lint                   # eslint src
pnpm check-types            # tsc --noEmit
pnpm test                   # vitest
pnpm test path/to.test.tsx  # single Vitest file
pnpm test-e2e               # starts mock server via pm2 + runs Playwright
pnpm run-mock-server        # MSW-backed mock API (used by e2e + Storybook)
pnpm storybook              # Storybook on :6006
pnpm generate               # plop scaffold for a new component
```

### Architecture (bulletproof-react)
- `src/app/` — routing shell. `router.tsx` lazy-loads route modules from `app/routes/**` and wires them into `createBrowserRouter`. All app-scope providers (React Query, error boundary, helmet) live in `app/provider.tsx`.
- `src/features/<feature>/` — self-contained modules, each with the same subfolder shape: `api/`, `components/`, `hooks/`, `stores/`, `types/`, plus `index.ts` as the public entrypoint. Use `pnpm generate` to scaffold new components.
- `src/components/` (ui, layouts, shared, errors, seo, fancy) — shadcn-style primitives and cross-feature UI.
- `src/lib/` — shared infra: `api-client.ts` (axios instance reading `env.API_URL`), `react-query.ts`, `auth.tsx`, `authorization.tsx`, `error-handler.ts`.
- `src/config/paths.ts` — single source of truth for routes; use `paths.app.watch.getHref(id)` rather than hardcoded strings.

### Enforced boundaries (eslint.config.cjs)
`import/no-restricted-paths` prevents:
- **Cross-feature imports**: `features/auth` cannot import from `features/comments`, etc. If you need to share, lift into `components/`, `hooks/`, `lib/`, `types/`, or `utils/`.
- **Reverse imports**: `features/*` cannot import from `app/`; `components|hooks|lib|types|utils` cannot import from `features/*` or `app/`. Dependency direction is strictly `app → features → shared`.
- Filenames under `src/**/*.{ts,tsx}` must be **kebab-case** (`check-file/filename-naming-convention`).
- `import/no-cycle` is on and imports are auto-sorted (`import/order`, alphabetical, newlines between groups).

### Testing
- **Unit**: Vitest + Testing Library. Setup file: `src/testing/setup-tests.ts`. Test utilities and MSW handlers under `src/testing/`.
- **E2E**: Playwright config in `playwright.config.ts`; specs in `e2e/`. `pnpm test-e2e` boots the MSW-backed `mock-server.ts` via pm2 before running.
- **Mocks**: MSW writes its service worker to `public/mockServiceWorker.js` (see the `msw` block in `package.json`).

### Env
Frontend env vars come from `.env.example` / `.env.example-e2e`; `src/config/env.ts` validates them. The axios client sends `withCredentials: true`, so backend CORS + CSRF settings matter for local dev.

## Git workflow

The husky pre-commit hook (installed via the root `postinstall` script) will reject:
- direct commits to `main` or `develop`
- branch names with uppercase or non-ASCII characters

Follow Conventional Commits (per `CONTRIBUTING.md`) — recent history uses `feat:` / `fix:` prefixes.
