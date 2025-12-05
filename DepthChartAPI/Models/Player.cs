using System;

namespace DepthChartAPI.Models;

public class Player
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public int Jersey { get; set; }
    public string Position { get; set; } = string.Empty;
    public int Order { get; set; }
    public string Status { get; set; } = string.Empty;
}