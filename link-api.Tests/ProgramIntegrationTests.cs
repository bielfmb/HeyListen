using System.Net;
using System.Net.Http.Json;
using System.Text;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.Extensions.Logging;

namespace HeyListen.Tests;

public class ProgramIntegrationTests
{
    [Fact]
    public async Task Api_ExecutaInicializacaoECicloDeVidaDeLembrete()
    {
        await using var factory = new WebApplicationFactory<Program>().WithWebHostBuilder(builder =>
        {
            builder.UseEnvironment("Development");
            builder.ConfigureLogging(logging => logging.ClearProviders());
        });
        using var client = factory.CreateClient();

        var openApi = await client.GetAsync("/openapi/v1.json");
        Assert.Equal(HttpStatusCode.OK, openApi.StatusCode);

        var initialList = await client.GetAsync("/api/reminder");
        Assert.Equal(HttpStatusCode.OK, initialList.StatusCode);
        var initialReminders = await initialList.Content.ReadFromJsonAsync<List<ReminderResponse>>();
        Assert.NotNull(initialReminders);
        Assert.Empty(initialReminders);

        var missingFields = await client.PostAsync(
            "/api/reminder",
            new StringContent("{}", Encoding.UTF8, "application/json"));
        Assert.Equal(HttpStatusCode.BadRequest, missingFields.StatusCode);

        var payload = new
        {
            name = "Consulta",
            date = DateOnly.FromDateTime(DateTime.Today).AddDays(3)
        };
        var created = await client.PostAsJsonAsync("/api/reminder", payload);
        Assert.Equal(HttpStatusCode.Created, created.StatusCode);
        var reminder = await created.Content.ReadFromJsonAsync<ReminderResponse>();
        Assert.NotNull(reminder);
        Assert.Equal("Consulta", reminder.Name);
        Assert.Equal(0, reminder.Id);

        var invalid = await client.PostAsJsonAsync("/api/reminder", new
        {
            name = "Vencido",
            date = DateOnly.FromDateTime(DateTime.Today)
        });
        Assert.Equal(HttpStatusCode.BadRequest, invalid.StatusCode);

        var missing = await client.DeleteAsync("/api/reminder/99");
        Assert.Equal(HttpStatusCode.NotFound, missing.StatusCode);

        var deleted = await client.DeleteAsync($"/api/reminder/{reminder.Id}");
        Assert.Equal(HttpStatusCode.NoContent, deleted.StatusCode);

        var finalList = await client.GetFromJsonAsync<List<ReminderResponse>>("/api/reminder");
        Assert.Empty(finalList!);
    }

    private sealed record ReminderResponse(int Id, string Name, DateOnly Date);
}
