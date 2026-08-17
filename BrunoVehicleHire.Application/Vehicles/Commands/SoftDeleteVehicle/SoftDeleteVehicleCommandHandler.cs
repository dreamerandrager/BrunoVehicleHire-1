using BrunoVehicleHire.Application.Common.Exceptions;
using BrunoVehicleHire.Application.Common.Interfaces;
using MediatR;

namespace BrunoVehicleHire.Application.Vehicles.Commands.SoftDeleteVehicle;

public class SoftDeleteVehicleCommandHandler : IRequestHandler<SoftDeleteVehicleCommand>
{
    private readonly IVehicleRepository _vehicleRepository;

    public SoftDeleteVehicleCommandHandler(IVehicleRepository vehicleRepository)
    {
        _vehicleRepository = vehicleRepository;
    }

    public async Task Handle(SoftDeleteVehicleCommand request, CancellationToken cancellationToken)
    {
        var vehicle = await _vehicleRepository.GetByIdAsync(request.Id, cancellationToken)
            ?? throw new NotFoundException($"Vehicle with id '{request.Id}' was not found.");

        vehicle.SoftDelete();

        await _vehicleRepository.SaveChangesAsync(cancellationToken);
    }
}
