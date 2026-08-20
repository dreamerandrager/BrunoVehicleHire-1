# Bruno Vehicle Hire

Clean Architecture .NET API (Domain/Application/Infrastructure/Api) + Next.js frontend, PostgreSQL database.

## Live deployment

- Frontend: https://bruno-vehicle-hire.vercel.app
- Backend API: https://bruno-vehicle-hire-api-dndcf8bsgqcmaea3.southafricanorth-01.azurewebsites.net
- Swagger is only available locally (see below) — disabled in production.

All API requests (except `/swagger`) require an `X-Api-Key` header. On first load the frontend prompts for this key and stores it in `sessionStorage`.

## Prerequisites

- .NET 10 SDK
- Node.js + pnpm
- Docker Desktop (for local Postgres)

## Local setup

**1. Database**

```
docker compose up -d
```

Starts Postgres in a container using the root `.env` file (`POSTGRES_DB`, `POSTGRES_USER`, `POSTGRES_PASSWORD`). Create this `.env` if it doesn't exist — it's gitignored.

**2. Backend**

Set the required secrets (run from `BrunoVehicleHire.Api`):

```
dotnet user-secrets set "ConnectionStrings:DefaultConnection" "Host=localhost;Port=5432;Database=<POSTGRES_DB>;Username=<POSTGRES_USER>;Password=<POSTGRES_PASSWORD>"
dotnet user-secrets set "ApiKey" "<any value you choose>"
dotnet user-secrets set "BlobStorage:ConnectionString" "<Azure Storage account connection string>"
dotnet user-secrets set "BlobStorage:ContainerName" "<container name>"
```

Apply migrations, then run:

```
dotnet ef database update --project BrunoVehicleHire.Infrastructure --startup-project BrunoVehicleHire.Api
dotnet run --project BrunoVehicleHire.Api
```

API runs at `https://localhost:7244`, Swagger at `/swagger` (opens automatically). Use the `ApiKey` value above to authorize requests.

**3. Frontend**

```
cd frontend
pnpm install
```

Create `frontend/.env`:

```
NEXT_PUBLIC_API_BASE_URL=https://localhost:7244
```

```
pnpm dev
```

Runs at `http://localhost:3000`. Enter the same `ApiKey` value on the Authorize screen.

## Environment variables reference

| Variable | Where | Purpose |
|---|---|---|
| `ConnectionStrings:DefaultConnection` | Backend (User Secrets locally / App Service setting `ConnectionStrings__DefaultConnection` in prod) | Postgres connection string |
| `ApiKey` | Backend (User Secrets locally / App Service setting `ApiKey` in prod) | Required value of the `X-Api-Key` header |
| `BlobStorage:ConnectionString` | Backend (User Secrets locally / App Service setting `BlobStorage__ConnectionString` in prod) | Azure Blob Storage account connection string, for vehicle images |
| `BlobStorage:ContainerName` | Backend (User Secrets locally / App Service setting `BlobStorage__ContainerName` in prod) | Blob container name |
| `NEXT_PUBLIC_API_BASE_URL` | Frontend `.env` (local) / Vercel project env var (prod) | Base URL of the backend API |
| `POSTGRES_DB` / `POSTGRES_USER` / `POSTGRES_PASSWORD` | Root `.env` (local only) | Docker Compose Postgres credentials |

Note: Azure App Service's Environment Variables blade rejects setting names ending in `ConnectionString` when the section prefix is literally `AzureBlobStorage` — hence the config section is named `BlobStorage`, not `AzureBlobStorage`.

## Deploying

- **Backend**: Visual Studio → right-click `BrunoVehicleHire.Api` → Publish → existing Azure App Service. No CI/CD — manual publish only.
- **Migrations**: run `dotnet ef database update` (as above) with `--connection` pointed at the Azure Postgres connection string, after any new migration.
- **Frontend**: push to `main` — Vercel auto-deploys (Root Directory is set to `frontend` in the Vercel project settings). After changing `NEXT_PUBLIC_API_BASE_URL`, trigger a redeploy — Next.js bakes it in at build time.
- After a fresh backend deploy, make sure its CORS policy (`Program.cs`) includes the frontend's deployed origin.
