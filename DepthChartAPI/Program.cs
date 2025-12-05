using Microsoft.EntityFrameworkCore;
using DepthChartAPI.Data;

var builder = WebApplication.CreateBuilder(args);

// Get port from environment variable (Railway sets this)
var port = Environment.GetEnvironmentVariable("PORT") ?? "5210";
builder.WebHost.UseUrls($"http://0.0.0.0:{port}");

// Add services
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

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
    SeedData.Initialize(context);
}

app.UseSwagger();
app.UseSwaggerUI();

app.UseCors();
app.UseAuthorization();
app.MapControllers();

app.Run();
