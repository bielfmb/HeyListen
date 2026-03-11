using System;

namespace HeyListen.Models;

public class Reminder
{
    public required int Id { get; set; }
    public required string Name { get; set; }
    public required DateOnly Date { get; set; }
}