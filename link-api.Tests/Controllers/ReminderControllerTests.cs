using HeyListen.Controllers;
using HeyListen.DTOs;
using HeyListen.Services;
using Microsoft.AspNetCore.Mvc;

namespace HeyListen.Tests;

public class ReminderControllerTests
{
    private static ReminderDTO CriarDTO(DateOnly? date = null, string name = "Evento") => new()
    {
        Name = name,
        Date = date ?? DateOnly.FromDateTime(DateTime.Today).AddDays(1)
    };

    [Fact]
    public void GetAll_RetornaOkComLembretesDoServico()
    {
        var service = new ReminderService();
        var reminder = service.CreateReminder(CriarDTO());
        var controller = new ReminderController(service);

        var result = Assert.IsType<OkObjectResult>(controller.GetAll().Result);
        Assert.Same(service.GetAllReminders(), result.Value);
        Assert.Contains(reminder, (IEnumerable<HeyListen.Models.Reminder>)result.Value!);
    }

    [Fact]
    public void Post_EntradaValida_RetornaCreatedAtActionComLembrete()
    {
        var controller = new ReminderController(new ReminderService());

        var result = Assert.IsType<CreatedAtActionResult>(controller.Post(CriarDTO()).Result);

        Assert.Equal(nameof(ReminderController.GetAll), result.ActionName);
        var reminder = Assert.IsType<HeyListen.Models.Reminder>(result.Value);
        Assert.Equal("Evento", reminder.Name);
    }

    [Fact]
    public void Post_DataInvalida_RetornaBadRequest()
    {
        var controller = new ReminderController(new ReminderService());
        var dto = CriarDTO(DateOnly.FromDateTime(DateTime.Today));

        var result = Assert.IsType<BadRequestObjectResult>(controller.Post(dto).Result);

        Assert.Equal("A data precisa estar no futuro.", result.Value);
    }

    [Fact]
    public void Post_FalhaInesperada_RetornaInternalServerError()
    {
        var controller = new ReminderController(null!);

        var result = Assert.IsType<ObjectResult>(controller.Post(CriarDTO()).Result);

        Assert.Equal(500, result.StatusCode);
        Assert.Equal("Erro no servidor", result.Value);
    }

    [Fact]
    public void Delete_IdExistente_RetornaNoContent()
    {
        var service = new ReminderService();
        var reminder = service.CreateReminder(CriarDTO());
        var controller = new ReminderController(service);

        Assert.IsType<NoContentResult>(controller.Delete(reminder.Id));
        Assert.Empty(service.GetAllReminders());
    }

    [Fact]
    public void Delete_IdInexistente_RetornaNotFound()
    {
        var controller = new ReminderController(new ReminderService());

        var result = Assert.IsType<NotFoundObjectResult>(controller.Delete(99));

        Assert.Equal("O lembrete não foi encontrado", result.Value);
    }

    [Fact]
    public void Delete_FalhaInesperada_RetornaInternalServerError()
    {
        var controller = new ReminderController(null!);

        var result = Assert.IsType<ObjectResult>(controller.Delete(1));

        Assert.Equal(500, result.StatusCode);
        Assert.Equal("Erro no servidor", result.Value);
    }
}
