using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DepthChartAPI.Data;
using DepthChartAPI.Models;

namespace DepthChartAPI.Controllers;

[ApiController]
[Route("[controller]")]
public class PlayersController : ControllerBase
{
    private readonly DepthChartDbContext _context;

    public PlayersController(DepthChartDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Player>>> GetPlayers()
    {
        return await _context.Players.ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Player>> GetPlayer(string id)
    {
        var player = await _context.Players.FindAsync(id);

        if (player == null)
        {
            return NotFound();
        }

        return player;
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdatePlayer(string id, Player player)
    {
        if (id != player.Id)
        {
            return BadRequest();
        }

        _context.Entry(player).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!PlayerExists(id))
            {
                return NotFound();
            }
            else
            {
                throw;
            }
        }

        return NoContent();
    }

    [HttpPost("reorder")]
    public async Task<ActionResult> ReorderPlayers(List<Player> players)
    {
        foreach (var player in players)
        {
            var existingPlayer = await _context.Players.FindAsync(player.Id);
            if (existingPlayer != null)
            {
                existingPlayer.Position = player.Position;
                existingPlayer.Order = player.Order;
            }
        }

        await _context.SaveChangesAsync();
        return Ok();
    }

    [HttpPost("swap")]
    public async Task<ActionResult<object>> SwapPlayers([FromBody] SwapRequest request)
    {
        var player1 = await _context.Players.FindAsync(request.Player1Id);
        var player2 = await _context.Players.FindAsync(request.Player2Id);

        if (player1 == null || player2 == null)
        {
            return NotFound();
        }

        // Swap orders
        var tempOrder = player1.Order;
        player1.Order = player2.Order;
        player2.Order = tempOrder;

        await _context.SaveChangesAsync();

        return Ok(new { player1, player2 });
    }

    private bool PlayerExists(string id)
    {
        return _context.Players.Any(e => e.Id == id);
    }
}

public class SwapRequest
{
    public string Player1Id { get; set; } = string.Empty;
    public string Player2Id { get; set; } = string.Empty;
}
