using BrunoVehicleHire.Application.Common.Exceptions;
using FluentValidation;
using Microsoft.AspNetCore.Mvc;

namespace BrunoVehicleHire.Api.Middleware;

public class ExceptionHandlingMiddleware
{
    private readonly RequestDelegate _next;

    public ExceptionHandlingMiddleware(RequestDelegate next)
    {
        _next = next;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch (ValidationException ex)
        {
            var errors = ex.Errors
                .GroupBy(e => e.PropertyName)
                .ToDictionary(g => g.Key, g => g.Select(e => e.ErrorMessage).ToArray());

            var problemDetails = new ValidationProblemDetails(errors)
            {
                Status = StatusCodes.Status400BadRequest,
                Title = "One or more validation errors occurred."
            };

            context.Response.StatusCode = StatusCodes.Status400BadRequest;
            context.Response.ContentType = "application/problem+json";

            await context.Response.WriteAsJsonAsync(problemDetails);
        }
        catch (NotFoundException ex)
        {
            var problemDetails = new ProblemDetails
            {
                Status = StatusCodes.Status404NotFound,
                Title = "Resource not found.",
                Detail = ex.Message
            };

            context.Response.StatusCode = StatusCodes.Status404NotFound;
            context.Response.ContentType = "application/problem+json";

            await context.Response.WriteAsJsonAsync(problemDetails);
        }
    }
}
