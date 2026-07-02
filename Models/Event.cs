namespace EventManager.Models;

public class Event
{
    public Guid Id { get; set; }
    public string Title { get; set; } = String.Empty;
    public DateOnly Date { get; set; }
    public EventStatus Status { get; set; } = EventStatus.Scheduled;
}