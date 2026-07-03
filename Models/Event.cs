using System.ComponentModel.DataAnnotations;

namespace EventManager.Models;

public class Event
{
    public Guid Id { get; set; }

    [Required]
    [StringLength(200)]
    public string Title { get; set; } = String.Empty;

    [Required]
    [DataType(DataType.Date)]
    public DateOnly Date { get; set; }

    public EventStatus Status { get; set; } = EventStatus.Scheduled;
}