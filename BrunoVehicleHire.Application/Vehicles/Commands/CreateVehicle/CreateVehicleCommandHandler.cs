using BrunoVehicleHire.Application.Common.Interfaces;
using BrunoVehicleHire.Application.Vehicles.Dtos;
using BrunoVehicleHire.Application.Vehicles.Mappings;
using BrunoVehicleHire.Domain.Entities;
using MediatR;

namespace BrunoVehicleHire.Application.Vehicles.Commands.CreateVehicle;

public class CreateVehicleCommandHandler : IRequestHandler<CreateVehicleCommand, VehicleDto>
{
    private readonly IVehicleRepository _vehicleRepository;

    public CreateVehicleCommandHandler(IVehicleRepository vehicleRepository)
    {
        _vehicleRepository = vehicleRepository;
    }

    public async Task<VehicleDto> Handle(CreateVehicleCommand request, CancellationToken cancellationToken)
    {
        var vehicle = new Vehicle(
            request.RegistrationNumber,
            request.VehicleType,
            request.Make,
            request.Model,
            request.Year,
            request.Colour,
            request.OwnerName,
            request.PricePerDay,
            request.Condition,
            request.ImageUrls);

        await _vehicleRepository.AddAsync(vehicle, cancellationToken);
        await _vehicleRepository.SaveChangesAsync(cancellationToken);

        return vehicle.ToModel();
    }
}
