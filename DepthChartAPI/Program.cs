using Microsoft.EntityFrameworkCore;
using DepthChartAPI.Data;
using DepthChartAPI.Models;
using System.Text.Json;

var builder = WebApplication.CreateBuilder(args);

// Railway provides PORT environment variable, default to 5210 for local
var port = Environment.GetEnvironmentVariable("PORT") ?? "5210";
Console.WriteLine($"Starting server on port: {port}");

builder.WebHost.UseUrls($"http://0.0.0.0:{port}");

// Add services
builder.Services.AddControllers();

// Use in-memory database
builder.Services.AddDbContext<DepthChartDbContext>(options =>
    options.UseInMemoryDatabase("DepthChart"));

// Add CORS - allow all origins
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.AllowAnyOrigin()
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
    Console.WriteLine($"Looking for players.json at: {jsonPath}");
    
    if (File.Exists(jsonPath))
    {
        var jsonData = File.ReadAllText(jsonPath);
        var players = JsonSerializer.Deserialize<List<Player>>(jsonData, new JsonSerializerOptions
        {
            PropertyNameCaseInsensitive = true
        });

        if (players != null)
        {
            Console.WriteLine($"Seeding {players.Count} players");
            context.Players.AddRange(players);
            context.SaveChanges();
        }
    }
    else
    {
        Console.WriteLine("players.json not found!");
    }
}

app.UseCors();
app.UseAuthorization();
app.MapControllers();

Console.WriteLine("Application started successfully");
app.Run();
