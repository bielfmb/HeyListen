using Microsoft.AspNetCore.Mvc;


using HeyListen.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers()
    .ConfigureApiBehaviorOptions(options =>
    {
        options.InvalidModelStateResponseFactory = context =>
        {
            var error = context.ModelState.Values
                .SelectMany(v => v.Errors)
                .Select(e => e.ErrorMessage)
                .FirstOrDefault();

            return new BadRequestObjectResult(error);
        };
    });

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
    app.MapOpenApi();

app.UseCors();
app.UseHttpsRedirection();
app.MapControllers();

app.Run();