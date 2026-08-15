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
- [ ] Functional rules implemented: Create, Update, Get by RegistrationNumber, Paginated list, Soft delete — Create and Get by RegistrationNumber done; Update, Paginated list, Soft delete still missing
- [ ] REST API — proper HTTP verbs + status codes — established correctly for the one endpoint that exists (POST -> 201, 400, 401), but only one endpoint exists so far
- [x] API Key security (header-based)
- [x] Swagger enabled
- [x] No business logic in controllers
- [ ] Unit tests: ≥1 Command, ≥1 Query — no test project exists yet at all

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
- [ ] Clear state management approach

### Checklist — Deployment (not spec-required, planned anyway)
- [ ] Hosting target chosen (backend + frontend + Postgres)
- [ ] Environment variables / secrets handled (API key, DB connection string)
- [ ] CORS configured for deployed frontend origin

### Checklist — Final Review
- [ ] Full solution compiles and runs end-to-end
- [ ] Naming conventions consistent throughout
- [ ] Simplicity check — no overengineering, no unused abstractions
