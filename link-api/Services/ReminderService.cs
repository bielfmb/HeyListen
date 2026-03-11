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
        ValidateFutureDate(reminderDTO);

        var reminder = MapToModel(reminderDTO);

        _reminders.Add(reminder);

        return reminder;
    }

    public Reminder DeleteReminder(int id)
    {
        Reminder toBeDeleted = _reminders.Find(r => r.Id == id)
                            ?? throw new KeyNotFoundException(
                                        "O lembrete não foi encontrado"
                                        );

        _reminders.Remove(toBeDeleted);

        return toBeDeleted;
    }

    private static void ValidateFutureDate(ReminderDTO reminderDTO)
    {
        if (reminderDTO.Date <= DateOnly.FromDateTime(DateTime.Today))
            throw new ArgumentException("A data precisa estar no futuro.");
    }

    private Reminder MapToModel(ReminderDTO reminderDTO)
    {
        return new Reminder
        {
            Id = _nextId++,
            Name = reminderDTO.Name,
            Date = reminderDTO.Date
        };
    }
}