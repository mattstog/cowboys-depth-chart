using System.Text.Json;
using DepthChartAPI.Data;
using DepthChartAPI.Models;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<DepthChartDbContext>(opt => opt.UseInMemoryDatabase("DepthChart"));
builder.Services.AddDatabaseDeveloperPageExceptionFilter();

// Add CORS for frontend development
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins("http://localhost:5173", "http://localhost:3000", "http://localhost:5174")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddOpenApiDocument(config =>
{
    config.DocumentName = "DepthChartAPI";
    config.Title = "DepthChartAPI v1";
    config.Version = "v1";
});

var app = builder.Build();

// Seed database from JSON file
using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<DepthChartDbContext>();

    var jsonPath = Path.Combine(AppContext.BaseDirectory, "players.json");
    if (File.Exists(jsonPath))
    {
        var jsonData = File.ReadAllText(jsonPath);
        var players = JsonSerializer.Deserialize<List<Player>>(jsonData, new JsonSerializerOptions 
        { 
            PropertyNameCaseInsensitive = true 
        });

        if (players != null && players.Count > 0)
        {
            context.Players.AddRange(players);
            context.SaveChanges();
        }
    }
}

if (app.Environment.IsDevelopment())
{
    app.UseOpenApi();
    app.UseSwaggerUi(config =>
    {
        config.DocumentTitle = "DepthChartAPI";
        config.Path = "/swagger";
        config.DocumentPath = "/swagger/{documentName}/swagger.json";
        config.DocExpansion = "list";
    });
}

app.UseCors("AllowFrontend");
app.UseHttpsRedirection();

// GET /players - Get all players
app.MapGet("/players", async (DepthChartDbContext context) =>
{
    return await context.Players.OrderBy(p => p.Position).ThenBy(p => p.Order).ToListAsync();
})
.WithName("GetPlayers")
.WithOpenApi(op =>
{
    op.Summary = "Get all players";
    op.Description = "Returns a list of players including their jersey number, position, order, and status.";
    return op;
})
.Produces<List<Player>>(StatusCodes.Status200OK)
.WithTags("DepthChart");

// PUT /players/{id} - Update a player
app.MapPut("/players/{id}", async (Guid id, Player updatedPlayer, DepthChartDbContext context) =>
{
    var player = await context.Players.FindAsync(id);
    
    if (player == null)
    {
        return Results.NotFound(new { message = "Player not found" });
    }

    player.FirstName = updatedPlayer.FirstName;
    player.LastName = updatedPlayer.LastName;
    player.Jersey = updatedPlayer.Jersey;
    player.Position = updatedPlayer.Position;
    player.Order = updatedPlayer.Order;
    player.Status = updatedPlayer.Status;

    await context.SaveChangesAsync();
    return Results.Ok(player);
})
.WithName("UpdatePlayer")
.WithOpenApi(op =>
{
    op.Summary = "Update a player";
    op.Description = "Updates a player's information including position and depth chart order.";
    return op;
})
.Produces<Player>(StatusCodes.Status200OK)
.Produces(StatusCodes.Status404NotFound)
.WithTags("DepthChart");

// POST /players/reorder - Reorder players in bulk
app.MapPost("/players/reorder", async (List<Player> players, DepthChartDbContext context) =>
{
    foreach (var updatedPlayer in players)
    {
        var player = await context.Players.FindAsync(updatedPlayer.Id);
        if (player != null)
        {
            player.Position = updatedPlayer.Position;
            player.Order = updatedPlayer.Order;
        }
    }

    await context.SaveChangesAsync();
    return Results.Ok(new { message = "Players reordered successfully" });
})
.WithName("ReorderPlayers")
.WithOpenApi(op =>
{
    op.Summary = "Reorder multiple players";
    op.Description = "Updates position and order for multiple players in a single request.";
    return op;
})
.Produces<object>(StatusCodes.Status200OK)
.WithTags("DepthChart");

// POST /players/swap - Swap two players' positions/orders
app.MapPost("/players/swap", async (SwapRequest request, DepthChartDbContext context) =>
{
    var player1 = await context.Players.FindAsync(request.Player1Id);
    var player2 = await context.Players.FindAsync(request.Player2Id);

    if (player1 == null || player2 == null)
    {
        return Results.NotFound(new { message = "One or both players not found" });
    }

    // Swap positions and orders
    var tempPosition = player1.Position;
    var tempOrder = player1.Order;
    
    player1.Position = player2.Position;
    player1.Order = player2.Order;
    
    player2.Position = tempPosition;
    player2.Order = tempOrder;

    await context.SaveChangesAsync();
    return Results.Ok(new { player1, player2 });
})
.WithName("SwapPlayers")
.WithOpenApi(op =>
{
    op.Summary = "Swap two players";
    op.Description = "Swaps the position and depth chart order of two players.";
    return op;
})
.Produces<object>(StatusCodes.Status200OK)
.Produces(StatusCodes.Status404NotFound)
.WithTags("DepthChart");

app.Run();

// Request model for swap endpoint
public record SwapRequest(Guid Player1Id, Guid Player2Id);
