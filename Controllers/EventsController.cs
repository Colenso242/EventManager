using EventManager.Models;
using EventManager.Persistence;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EventManager.Controllers;

[ApiController]
[Route("api/[controller]")]
public class EventsController : ControllerBase
{
    private readonly AppDbContext _db;

    public EventsController(AppDbContext db) => _db = db;

    // GET: /api/events — elenco ordinato per data.
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Event>>> GetAll() =>
        await _db.Events.OrderBy(e => e.Date).ThenBy(e => e.Title).ToListAsync();

    // GET: /api/events/{id}
    [HttpGet("{id:guid}")]
    public async Task<ActionResult<Event>> Get(Guid id)
    {
        var ev = await _db.Events.FindAsync(id);
        return ev is null ? NotFound() : ev;
    }

    // POST: /api/events
    [HttpPost]
    public async Task<ActionResult<Event>> Create(Event ev)
    {
        ev.Id = Guid.NewGuid();
        _db.Events.Add(ev);
        await _db.SaveChangesAsync();
        return CreatedAtAction(nameof(Get), new { id = ev.Id }, ev);
    }

    // PUT: /api/events/{id}
    [HttpPut("{id:guid}")]
    public async Task<IActionResult> Update(Guid id, Event ev)
    {
        if (id != ev.Id)
            return BadRequest("L'id nella rotta non corrisponde a quello del corpo.");

        if (!await _db.Events.AnyAsync(e => e.Id == id))
            return NotFound();

        _db.Entry(ev).State = EntityState.Modified;
        await _db.SaveChangesAsync();
        return NoContent();
    }

    // DELETE: /api/events/{id}
    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        var ev = await _db.Events.FindAsync(id);
        if (ev is null)
            return NotFound();

        _db.Events.Remove(ev);
        await _db.SaveChangesAsync();
        return NoContent();
    }
}