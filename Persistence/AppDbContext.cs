using EventManager.Models;
using Microsoft.EntityFrameworkCore;

namespace EventManager.Persistence;

// Contesto EF Core per la persistenza degli eventi su SQLite.
public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    public DbSet<Event> Events => Set<Event>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        var ev = modelBuilder.Entity<Event>();
        ev.HasKey(e => e.Id);
        ev.Property(e => e.Title).IsRequired().HasMaxLength(200);
        // DateOnly e l'enum EventStatus sono gestiti nativamente da EF Core 10 + SQLite.
    }
}