# Deployment Guide

## Quick Testing Locally

### Option 1: Run Both Locally (Recommended for Demo)

1. **Terminal 1 - Backend:**
   ```bash
   cd DepthChartAPI
   dotnet run
   ```
   Backend runs on: http://localhost:5210

2. **Terminal 2 - Frontend:**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
   Frontend runs on: http://localhost:5173

3. Open browser to http://localhost:5173

---

## Production Deployment Options

### Option 1: Azure (Recommended for .NET)

#### Backend - Azure App Service
```bash
cd DepthChartAPI
dotnet publish -c Release -o ./publish
# Deploy to Azure App Service via Azure Portal or CLI
```

#### Frontend - Azure Static Web Apps
```bash
cd frontend
npm run build
# Deploy dist folder to Azure Static Web Apps
```

**Environment Variables:**
- Frontend: Update API_BASE_URL in `useDepthChart.ts` to Azure backend URL

---

### Option 2: Docker Compose

Create `docker-compose.yml` in project root:

```yaml
version: '3.8'

services:
  backend:
    build:
      context: ./DepthChartAPI
      dockerfile: Dockerfile
    ports:
      - "5210:5210"
    environment:
      - ASPNETCORE_URLS=http://+:5210
      - ASPNETCORE_ENVIRONMENT=Production

  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
    ports:
      - "80:80"
    depends_on:
      - backend
```

**Backend Dockerfile** (DepthChartAPI/Dockerfile):
```dockerfile
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src
COPY DepthChartAPI.csproj .
RUN dotnet restore
COPY . .
RUN dotnet publish -c Release -o /app

FROM mcr.microsoft.com/dotnet/aspnet:9.0
WORKDIR /app
COPY --from=build /app .
EXPOSE 5210
ENTRYPOINT ["dotnet", "DepthChartAPI.dll"]
```

**Frontend Dockerfile** (frontend/Dockerfile):
```dockerfile
FROM node:18 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

Deploy:
```bash
docker-compose up -d
```

---

### Option 3: Vercel (Frontend) + Azure (Backend)

**Frontend on Vercel:**
1. Push code to GitHub
2. Import to Vercel
3. Set build command: `npm run build`
4. Set output directory: `dist`
5. Add environment variable: `VITE_API_URL=<azure-backend-url>`

**Backend on Azure:**
Same as Option 1

---

## Environment Configuration

### Production Frontend Config

Update `frontend/src/hooks/useDepthChart.ts`:

```typescript
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5210';
```

Create `frontend/.env.production`:
```
VITE_API_URL=https://your-backend.azurewebsites.net
```

### Production Backend Config

Update CORS in `DepthChartAPI/Program.cs`:

```csharp
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins(
            "http://localhost:5173", 
            "https://your-frontend.vercel.app",
            "https://your-frontend.azurestaticapps.net"
        )
        .AllowAnyHeader()
        .AllowAnyMethod();
    });
});
```

---

## Database Migration (For Production)

### Replace In-Memory DB with SQL Server

1. **Add NuGet Package:**
   ```bash
   dotnet add package Microsoft.EntityFrameworkCore.SqlServer
   ```

2. **Update Program.cs:**
   ```csharp
   builder.Services.AddDbContext<DepthChartDbContext>(opt => 
       opt.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"))
   );
   ```

3. **Add Connection String to appsettings.json:**
   ```json
   {
     "ConnectionStrings": {
       "DefaultConnection": "Server=tcp:yourserver.database.windows.net;Database=DepthChart;..."
     }
   }
   ```

4. **Create Migrations:**
   ```bash
   dotnet ef migrations add InitialCreate
   dotnet ef database update
   ```

---

## Pre-Deployment Checklist

- [ ] Update CORS origins for production domains
- [ ] Change API_BASE_URL to production backend
- [ ] Add authentication if needed
- [ ] Set up logging and monitoring
- [ ] Configure HTTPS certificates
- [ ] Set up CI/CD pipeline
- [ ] Add rate limiting
- [ ] Configure error tracking (Application Insights, Sentry)
- [ ] Set up backup strategy for database
- [ ] Performance test with expected load

---

## Monitoring & Logging

### Azure Application Insights

Add to `Program.cs`:
```csharp
builder.Services.AddApplicationInsightsTelemetry();
```

### Frontend Error Tracking (Sentry)

```bash
npm install @sentry/react
```

```typescript
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "your-sentry-dsn",
  environment: "production"
});
```

---

## Performance Optimization

### Frontend
- Enable code splitting
- Optimize images
- Use CDN for static assets
- Enable gzip compression

### Backend
- Add response caching
- Implement query optimization
- Add connection pooling
- Use async/await consistently

---

## Security Hardening

1. **Add HTTPS Redirect** (already in place)
2. **Add Authentication:**
   ```csharp
   builder.Services.AddAuthentication(/* Azure AD config */);
   ```
3. **Add Rate Limiting:**
   ```bash
   dotnet add package AspNetCoreRateLimit
   ```
4. **Sanitize Inputs**
5. **Add CSRF Protection**
6. **Implement API Keys for public endpoints**
