FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /app

# Copy everything first
COPY . ./

# Restore dependencies
RUN dotnet restore DepthChartAPI.csproj

# Build and publish
RUN dotnet publish DepthChartAPI.csproj -c Release -o out

# Build runtime image
FROM mcr.microsoft.com/dotnet/aspnet:10.0
WORKDIR /app
COPY --from=build /app/out .

# Expose port (Railway sets PORT env variable)
EXPOSE 5210
ENV ASPNETCORE_URLS=http://+:${PORT:-5210}

ENTRYPOINT ["dotnet", "DepthChartAPI.dll"]
