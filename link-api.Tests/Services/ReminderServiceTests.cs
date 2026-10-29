using HeyListen.DTOs;
using HeyListen.Services;
using Xunit;

namespace HeyListen.Tests;

public class ReminderServiceTests
{
    private static ReminderDTO CriarDTO(DateOnly? date = null)
    {
        return new ReminderDTO
        {
            Name = "Consulta médica",
            Date = date ?? DateOnly.FromDateTime(DateTime.Today).AddDays(7)
        };
    }

    [Fact]
    public void GetAllReminders_SemLembretes_RetornaListaVazia()
    {
        var service = new ReminderService();

        Assert.Empty(service.GetAllReminders());
    }

    [Fact]
    public void CreateReminder_DataFutura_CriaLembretesComIdsSequenciais()
    {
        var service = new ReminderService();
        var primeiroDTO = CriarDTO();
        var segundoDTO = new ReminderDTO
        {
            Name = "Entregar trabalho",
            Date = DateOnly.FromDateTime(DateTime.Today).AddDays(14)
        };

        var primeiro = service.CreateReminder(primeiroDTO);
        var segundo = service.CreateReminder(segundoDTO);

        Assert.Equal(0, primeiro.Id);
        Assert.Equal("Consulta médica", primeiro.Name);
        Assert.Equal(primeiroDTO.Date, primeiro.Date);

        Assert.Equal(1, segundo.Id);
        Assert.Equal("Entregar trabalho", segundo.Name);
        Assert.Equal(segundoDTO.Date, segundo.Date);

        Assert.Equal(2, service.GetAllReminders().Count());
    }

    [Theory]
    [InlineData(0)]
    [InlineData(-1)]
    public void CreateReminder_DataHojeOuPassada_LancaArgumentException(
        int diasEmRelacaoAHoje)
    {
        var service = new ReminderService();
        var data = DateOnly.FromDateTime(DateTime.Today)
            .AddDays(diasEmRelacaoAHoje);

        var exception = Assert.Throws<ArgumentException>(
            () => service.CreateReminder(CriarDTO(data)));

        Assert.Equal("A data precisa estar no futuro.", exception.Message);
        Assert.Empty(service.GetAllReminders());
    }

    [Fact]
    public void DeleteReminder_IdInexistente_LancaKeyNotFoundException()
    {
        var service = new ReminderService();
        service.CreateReminder(CriarDTO());

        var exception = Assert.Throws<KeyNotFoundException>(
            () => service.DeleteReminder(999));

        Assert.Equal("O lembrete não foi encontrado", exception.Message);
        Assert.Single(service.GetAllReminders());
    }

    [Theory]
    [InlineData(null)]
    [InlineData("")]
    [InlineData("   ")]
    public void CreateReminder_DescricaoAusenteOuEmBranco_LancaArgumentNullException(string? name)
    {
        var service = new ReminderService();
        var dto = new ReminderDTO
        {
            Name = name!,
            Date = DateOnly.FromDateTime(DateTime.Today).AddDays(1)
        };

        Assert.Throws<ArgumentNullException>(() => service.CreateReminder(dto));
        Assert.Empty(service.GetAllReminders());
    }

    [Fact]
    public void DeleteReminder_IdExistente_RemoveERetornaLembrete()
    {
        var service = new ReminderService();
        var created = service.CreateReminder(CriarDTO());

        var deleted = service.DeleteReminder(created.Id);

        Assert.Same(created, deleted);
        Assert.Empty(service.GetAllReminders());
    }
}
