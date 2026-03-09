using HeyListen.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddOpenApi();
builder.Services.AddSingleton<ReminderService>();
builder.Services.AddCors(options => {
    options.AddDefaultPolicy(policy => policy
                                       .AllowAnyOrigin()
                                       .AllowAnyMethod()
                                       .AllowAnyHeader()
    );
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseCors();
app.UseHttpsRedirection();
app.MapControllers();

app.Run();