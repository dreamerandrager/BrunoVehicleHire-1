using BrunoVehicleHire.Application.Common.Exceptions;
using BrunoVehicleHire.Application.Common.Interfaces;
using BrunoVehicleHire.Application.Vehicles.Dtos;
using BrunoVehicleHire.Application.Vehicles.Mappings;
using MediatR;

namespace BrunoVehicleHire.Application.Vehicles.Commands.UpdateVehicle;

public class UpdateVehicleCommandHandler : IRequestHandler<UpdateVehicleCommand, VehicleDto>
{
    private readonly IVehicleRepository _vehicleRepository;

    public UpdateVehicleCommandHandler(IVehicleRepository vehicleRepository)
    {
        _vehicleRepository = vehicleRepository;
    }

    public async Task<VehicleDto> Handle(UpdateVehicleCommand request, CancellationToken cancellationToken)
    {
        var vehicle = await _vehicleRepository.GetByIdAsync(request.Id, cancellationToken)
            ?? throw new NotFoundException($"Vehicle with id '{request.Id}' was not found.");

        vehicle.Update(
            request.VehicleType,
            request.Make,
            request.Model,
            request.Year,
            request.Colour,
            request.OwnerName,
            request.PricePerDay,
            request.HireStartDate,
            request.HireEndDate);

        await _vehicleRepository.SaveChangesAsync(cancellationToken);

        return vehicle.ToModel();
    }
}
