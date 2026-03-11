using System;
using HeyListen.DTOs;
using HeyListen.Models;
using HeyListen.Services;
using Microsoft.AspNetCore.Mvc;

namespace HeyListen.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ReminderController : ControllerBase
{
    private readonly ReminderService _service;

    public ReminderController(ReminderService service) => _service = service;
    
    [HttpGet]
    public ActionResult<IEnumerable<Reminder>> GetAll() 
                        => Ok(_service.GetAllReminders());
    
    [HttpPost]
    public ActionResult<Reminder> Post(ReminderDTO reminderDTO)
    {
        try
        {
            Reminder reminder = _service.CreateReminder(reminderDTO);

            return CreatedAtAction(nameof(GetAll), reminder);
        }
        catch (ArgumentException ex)
        {
            return BadRequest(ex.Message);
        }
        catch (Exception)
        {
            return StatusCode(500, "Erro no servidor");
        }
    }

    [HttpDelete("{id}")]
    public ActionResult Delete(int id)
    {
        try
        {
            Reminder reminder = _service.DeleteReminder(id);
            
            return NoContent();
        }
        catch (KeyNotFoundException ex)
        {
            return NotFound(ex.Message);
        }
        catch (Exception)
        {
            return StatusCode(500, "Erro no servidor");            
        }
    }
}