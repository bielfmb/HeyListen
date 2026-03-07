using System;

namespace HeyListen.DTOs;

public class ReminderDTO
{
    public required string Name { get; set; }
    public required DateOnly Date { get; set; }
}