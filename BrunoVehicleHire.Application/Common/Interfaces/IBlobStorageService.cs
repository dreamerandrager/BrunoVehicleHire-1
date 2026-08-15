namespace BrunoVehicleHire.Application.Common.Interfaces;

public interface IBlobStorageService
{
    Task<string> UploadAsync(Stream content, string fileName, string contentType, CancellationToken cancellationToken = default);
}
