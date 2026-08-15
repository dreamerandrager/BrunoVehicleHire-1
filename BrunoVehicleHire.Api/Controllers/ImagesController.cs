using BrunoVehicleHire.Application.Common.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace BrunoVehicleHire.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ImagesController : ControllerBase
{
    private readonly IBlobStorageService _blobStorageService;

    public ImagesController(IBlobStorageService blobStorageService)
    {
        _blobStorageService = blobStorageService;
    }

    [HttpPost]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult> Upload(IFormFile file, CancellationToken cancellationToken)
    {
        if (file.Length == 0)
        {
            return BadRequest("A file is required.");
        }

        await using var stream = file.OpenReadStream();
        var url = await _blobStorageService.UploadAsync(stream, file.FileName, file.ContentType, cancellationToken);

        return Ok(new { url });
    }
}
