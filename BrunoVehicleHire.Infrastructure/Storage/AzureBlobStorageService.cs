using Azure.Storage.Blobs;
using Azure.Storage.Blobs.Models;
using BrunoVehicleHire.Application.Common.Interfaces;
using Microsoft.Extensions.Options;

namespace BrunoVehicleHire.Infrastructure.Storage;

public class AzureBlobStorageService : IBlobStorageService
{
    private readonly BlobContainerClient _containerClient;

    public AzureBlobStorageService(IOptions<AzureBlobStorageOptions> options)
    {
        var serviceClient = new BlobServiceClient(options.Value.ConnectionString);
        _containerClient = serviceClient.GetBlobContainerClient(options.Value.ContainerName);
    }

    public async Task<string> UploadAsync(Stream content, string fileName, string contentType, CancellationToken cancellationToken = default)
    {
        var blobName = $"{Guid.NewGuid()}{Path.GetExtension(fileName)}";
        var blobClient = _containerClient.GetBlobClient(blobName);

        await blobClient.UploadAsync(
            content,
            new BlobUploadOptions { HttpHeaders = new BlobHttpHeaders { ContentType = contentType } },
            cancellationToken);

        return blobClient.Uri.ToString();
    }
}
