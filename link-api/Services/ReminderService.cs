using System;
using Microsoft.AspNetCore.Mvc;
using HeyListen.DTOs;
using HeyListen.Models;

namespace HeyListen.Services;

public class ReminderService
{
    private List<Reminder> _reminders = new();
    private int _nextId;

    public ReminderService() => _nextId = 0;

    public IEnumerable<Reminder> GetAllReminders() => _reminders;

    public Reminder CreateReminder(ReminderDTO reminderDTO)
    {
        if (reminderDTO.Date < DateOnly.FromDateTime(DateTime.Today))
        {
            throw new ArgumentOutOfRangeException(
                nameof(reminderDTO.Date), "A data precisa estar no futuro."
                );
        }

        if (String.IsNullOrWhiteSpace(reminderDTO.Name))
        {
            throw new ArgumentNullException(
                nameof(reminderDTO.Name), "O nome do lembrete não pode ser nulo"
                );
        }

        var reminder = new Reminder 
            {
                Id = _nextId++, 
                Name = reminderDTO.Name, 
                Date = reminderDTO.Date
            };

        _reminders.Add(reminder);

        return reminder;
    }

    public Reminder DeleteReminder(int id)
    {
        Reminder toDelete = _reminders.Find(r => r.Id == id) 
                            ?? throw new KeyNotFoundException(
                                        "O lembrete não foi encontrado"
                                        );

        _reminders.Remove(toDelete);

        return toDelete;
    }
}