using MediatR;

namespace BrunoVehicleHire.Application.Vehicles.Commands.SoftDeleteVehicle;

public record SoftDeleteVehicleCommand(Guid Id) : IRequest;
