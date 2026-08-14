namespace BrunoVehicleHire.Api.Middleware;

public class ApiKeyMiddleware
{
    private const string ApiKeyHeaderName = "X-Api-Key";

    private readonly RequestDelegate _next;
    private readonly IConfiguration _configuration;

    public ApiKeyMiddleware(RequestDelegate next, IConfiguration configuration)
    {
        _next = next;
        _configuration = configuration;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        if (context.Request.Path.StartsWithSegments("/swagger"))
        {
            await _next(context);
            return;
        }

        var configuredApiKey = _configuration["ApiKey"];

        if (!context.Request.Headers.TryGetValue(ApiKeyHeaderName, out var providedApiKey) ||
            string.IsNullOrEmpty(configuredApiKey) ||
            providedApiKey != configuredApiKey)
        {
            context.Response.StatusCode = StatusCodes.Status401Unauthorized;
            await context.Response.WriteAsJsonAsync(new { error = "Missing or invalid API key." });
            return;
        }

        await _next(context);
    }
}
