### Checklist — Repo / Project Setup
- [ ] Solution structure created (4 backend projects: Domain, Application, Infrastructure, API)
- [ ] Frontend project scaffolded (React + TypeScript + Vite)
- [ ] `.gitignore` in place for .NET + Node
- [ ] README started (setup steps — grows as stack is added)
- [ ] Git commit convention agreed (meaningful messages — spec requirement)

### Checklist — Database
- [x] PostgreSQL instance available (local/dev)
- [x] Vehicle entity fields modeled: Id (Guid), RegistrationNumber (unique), Make, Model, Year, IsDeleted, CreatedDate
- [x] EF Core code-first approach
- [x] Migrations included in solution
- [x] Unique constraint on RegistrationNumber enforced at DB level
- [x] Soft-deleted vehicles excluded from default query filter

### Checklist — Backend (.NET / Clean Architecture)
- [x] Domain layer — entity only, no infrastructure dependency
- [x] Application layer — Commands, Queries, Validators present
- [x] CQRS pattern applied
- [x] MediatR (or equivalent) wired
- [x] FluentValidation (or similar) wired
- [x] Repository pattern implemented
- [x] Functional rules implemented: Create, Update, Get by RegistrationNumber, Paginated list, Soft delete
- [x] REST API — proper HTTP verbs + status codes
- [x] API Key security (header-based)
- [x] Swagger enabled
- [x] No business logic in controllers
- [x] Unit tests: ≥1 Command, ≥1 Query

### Checklist — Frontend (React)
- [x] Functional components + TypeScript
- [x] Vite scaffold — Next.js instead (logged deviation), functionally equivalent React+TS scaffold
- [x] Axios or Fetch service layer
- [x] React Router — Next.js App Router file-based routing instead (logged deviation)
- [x] Folder separation: pages / components / services / models
- [x] Paginated list view
- [x] Create form
- [x] Edit form
- [x] Delete action
- [x] Loading states
- [x] Error handling
- [x] Client-side validation
- [x] Environment-based API config (no hardcoded URLs)
- [x] Basic reusable components (button, form input)
- [x] Clear state management approach

### Checklist — Deployment (not spec-required, planned anyway)
- [ ] Hosting target chosen (backend + frontend + Postgres)
- [ ] Environment variables / secrets handled (API key, DB connection string)
- [ ] CORS configured for deployed frontend origin

### Checklist — Final Review
- [ ] Full solution compiles and runs end-to-end
- [ ] Naming conventions consistent throughout
- [ ] Simplicity check — no overengineering, no unused abstractions
