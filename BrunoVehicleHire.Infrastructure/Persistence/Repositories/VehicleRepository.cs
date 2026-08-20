using BrunoVehicleHire.Application.Common.Interfaces;
using BrunoVehicleHire.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace BrunoVehicleHire.Infrastructure.Persistence.Repositories;

public class VehicleRepository : IVehicleRepository
{
    private readonly ApplicationDbContext _dbContext;

    public VehicleRepository(ApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<Vehicle?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default)
    {
        return await _dbContext.Vehicles.FirstOrDefaultAsync(v => v.Id == id, cancellationToken);
    }

    public async Task<Vehicle?> GetByRegistrationNumberAsync(string registrationNumber, CancellationToken cancellationToken = default)
    {
        return await _dbContext.Vehicles
            .Where(v => EF.Functions.ILike(v.RegistrationNumber, $"%{registrationNumber}%"))
            .OrderByDescending(v => v.CreatedDate)
            .FirstOrDefaultAsync(cancellationToken);
    }

    public async Task<bool> RegistrationNumberExistsAsync(string registrationNumber, CancellationToken cancellationToken = default)
    {
        return await _dbContext.Vehicles.AnyAsync(v => v.RegistrationNumber == registrationNumber, cancellationToken);
    }

    public async Task<(IReadOnlyList<Vehicle> Items, int TotalCount)> GetPagedAsync(int pageNumber, int pageSize, CancellationToken cancellationToken = default)
    {
        var query = _dbContext.Vehicles.OrderBy(v => v.CreatedDate);

        var totalCount = await query.CountAsync(cancellationToken);

        var items = await query
            .Skip((pageNumber - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync(cancellationToken);

        return (items, totalCount);
    }

    public async Task AddAsync(Vehicle vehicle, CancellationToken cancellationToken = default)
    {
        await _dbContext.Vehicles.AddAsync(vehicle, cancellationToken);
    }

    public async Task SaveChangesAsync(CancellationToken cancellationToken = default)
    {
        await _dbContext.SaveChangesAsync(cancellationToken);
    }
}
