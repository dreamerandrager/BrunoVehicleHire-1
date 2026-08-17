using BrunoVehicleHire.Application.Common.Exceptions;
using BrunoVehicleHire.Application.Common.Interfaces;
using BrunoVehicleHire.Application.Vehicles.Dtos;
using BrunoVehicleHire.Application.Vehicles.Mappings;
using MediatR;

namespace BrunoVehicleHire.Application.Vehicles.Queries.GetVehicleByRegistrationNumber;

public class GetVehicleByRegistrationNumberQueryHandler : IRequestHandler<GetVehicleByRegistrationNumberQuery, VehicleDto>
{
    private readonly IVehicleRepository _vehicleRepository;

    public GetVehicleByRegistrationNumberQueryHandler(IVehicleRepository vehicleRepository)
    {
        _vehicleRepository = vehicleRepository;
    }

    public async Task<VehicleDto> Handle(GetVehicleByRegistrationNumberQuery request, CancellationToken cancellationToken)
    {
        var vehicle = await _vehicleRepository.GetByRegistrationNumberAsync(request.RegistrationNumber, cancellationToken)
            ?? throw new NotFoundException($"Vehicle with registration number '{request.RegistrationNumber}' was not found.");

        return vehicle.ToModel();
    }
}
