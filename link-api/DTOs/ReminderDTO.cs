using System;
using System.ComponentModel.DataAnnotations;


namespace HeyListen.DTOs;

public class ReminderDTO
{
    [Required(ErrorMessage = "Insira uma descrição.")]
    public required string Name { get; set; }

    [Required(ErrorMessage = "Insira uma descrição.")]
    public required DateOnly Date { get; set; }
}