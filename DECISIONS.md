# Decision Log — Bruno Vehicle Hire (Vehicles Module)

Purpose: running record of architecture/implementation decisions, why they were made, and where each spec requirement is satisfied. Entries are appended chronologically, never rewritten — corrections get a new entry that supersedes the old one.

Spec reference: `Bruno - Intermediate Level Movement 2.pdf`
Entity chosen: **Vehicles**
Stack: React (frontend) + .NET / Clean Architecture (backend) + PostgreSQL (db)

---

## Entry 1 — 2026-08-12 — Project kickoff & requirements checklist

Building Vehicles end-to-end. Build order: repo → DB → backend → frontend → deploy. Checklists below track spec coverage as work lands.

### Checklist — Repo / Project Setup
- [ ] Solution structure created (4 backend projects: Domain, Application, Infrastructure, API)
- [ ] Frontend project scaffolded (React + TypeScript + Vite)
- [ ] `.gitignore` in place for .NET + Node
- [ ] README started (setup steps — grows as stack is added)
- [ ] Git commit convention agreed (meaningful messages — spec requirement)

### Checklist — Database
- [ ] PostgreSQL instance available (local/dev)
- [ ] Vehicle entity fields modeled: Id (Guid), RegistrationNumber (unique), Make, Model, Year, IsDeleted, CreatedDate
- [ ] EF Core code-first approach
- [ ] Migrations included in solution
- [ ] Unique constraint on RegistrationNumber enforced at DB level
- [ ] Soft-deleted vehicles excluded from default query filter

### Checklist — Backend (.NET / Clean Architecture)
- [ ] Domain layer — entity only, no infrastructure dependency
- [ ] Application layer — Commands, Queries, Validators present
- [ ] CQRS pattern applied
- [ ] MediatR (or equivalent) wired
- [ ] FluentValidation (or similar) wired
- [ ] Repository pattern implemented
- [ ] Functional rules implemented: Create, Update, Get by RegistrationNumber, Paginated list, Soft delete
- [ ] REST API — proper HTTP verbs + status codes
- [ ] API Key security (header-based)
- [ ] Swagger enabled
- [ ] No business logic in controllers
- [ ] Unit tests: ≥1 Command, ≥1 Query

### Checklist — Frontend (React)
- [ ] Functional components + TypeScript
- [ ] Vite scaffold
- [ ] Axios or Fetch service layer
- [ ] React Router
- [ ] Folder separation: pages / components / services / models
- [ ] Paginated list view
- [ ] Create form
- [ ] Edit form
- [ ] Delete action
- [ ] Loading states
- [ ] Error handling
- [ ] Client-side validation
- [ ] Environment-based API config (no hardcoded URLs)
- [ ] Basic reusable components (button, form input)

### Checklist — Deployment (not spec-required, planned anyway)
- [ ] Hosting target chosen (backend + frontend + Postgres)
- [ ] Environment variables / secrets handled (API key, DB connection string)
- [ ] CORS configured for deployed frontend origin

**Status:** Kickoff complete. Next stage: Database design (Entry 2).

---

## Entry 2 — 2026-08-12 — Postgres via Docker

Local Postgres runs via Docker Compose (`postgres:16`) instead of a native install, for deployment parity and easy reproducibility. Credentials in `.env` (gitignored), not hardcoded in compose. pgAdmin connects to it as GUI client.
