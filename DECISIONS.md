
---

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

---

### Docker Postgres Container

Local Postgres runs via Docker Compose (`postgres:16`) instead of a native install, for deployment parity and easy reproducibility. Credentials in `.env` (gitignored), not hardcoded in compose. pgAdmin connects to it as GUI client.
