using BrunoVehicleHire.Api.Middleware;
using BrunoVehicleHire.Application.Common.Behaviors;
using BrunoVehicleHire.Application.Common.Interfaces;
using BrunoVehicleHire.Application.Vehicles.Commands.CreateVehicle;
using BrunoVehicleHire.Infrastructure.Persistence;
using BrunoVehicleHire.Infrastructure.Persistence.Repositories;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();

// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddScoped<IVehicleRepository, VehicleRepository>();

builder.Services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(typeof(CreateVehicleCommand).Assembly));
builder.Services.AddValidatorsFromAssembly(typeof(CreateVehicleCommand).Assembly);
builder.Services.AddTransient(typeof(IPipelineBehavior<,>), typeof(ValidationBehavior<,>));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseMiddleware<ExceptionHandlingMiddleware>();

app.UseHttpsRedirection();

app.MapControllers();

app.Run();
