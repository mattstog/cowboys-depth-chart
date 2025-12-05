using System;
using DepthChartAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace DepthChartAPI.Data;

public class DepthChartDbContext(DbContextOptions<DepthChartDbContext> options) 
    : DbContext(options)
{
    public DbSet<Player> Players => Set<Player>();
}
