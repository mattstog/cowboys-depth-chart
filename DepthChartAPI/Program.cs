using Microsoft.EntityFrameworkCore;
using DepthChartAPI.Data;
using DepthChartAPI.Models;
using System.Text.Json;

var builder = WebApplication.CreateBuilder(args);

// Get port from environment variable (Railway sets this)
var port = Environment.GetEnvironmentVariable("PORT") ?? "5210";
builder.WebHost.UseUrls($"http://0.0.0.0:{port}");

// Add services
builder.Services.AddControllers();

// Use in-memory database
builder.Services.AddDbContext<DepthChartDbContext>(options =>
    options.UseInMemoryDatabase("DepthChart"));

// Add CORS
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(builder =>
    {
        builder.AllowAnyOrigin()
               .AllowAnyMethod()
               .AllowAnyHeader();
    });
});

var app = builder.Build();

// Seed the database
using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<DepthChartDbContext>();
    
    // Read and seed data from players.json
    var jsonPath = Path.Combine(AppContext.BaseDirectory, "players.json");
    if (File.Exists(jsonPath))
    {
        var jsonData = File.ReadAllText(jsonPath);
        var players = JsonSerializer.Deserialize<List<Player>>(jsonData, new JsonSerializerOptions
        {
            PropertyNameCaseInsensitive = true
        });

        if (players != null)
        {
            context.Players.AddRange(players);
            context.SaveChanges();
        }
    }
}

app.UseCors();
app.UseAuthorization();
app.MapControllers();

app.Run();
