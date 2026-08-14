using BrunoVehicleHire.Domain.Entities;

namespace BrunoVehicleHire.Application.Common.Interfaces;

public interface IVehicleRepository
{
    Task<Vehicle?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default);

    Task<Vehicle?> GetByRegistrationNumberAsync(string registrationNumber, CancellationToken cancellationToken = default);

    Task<bool> RegistrationNumberExistsAsync(string registrationNumber, CancellationToken cancellationToken = default);

    Task<(IReadOnlyList<Vehicle> Items, int TotalCount)> GetPagedAsync(int pageNumber, int pageSize, CancellationToken cancellationToken = default);

    Task AddAsync(Vehicle vehicle, CancellationToken cancellationToken = default);

    Task SaveChangesAsync(CancellationToken cancellationToken = default);
}
