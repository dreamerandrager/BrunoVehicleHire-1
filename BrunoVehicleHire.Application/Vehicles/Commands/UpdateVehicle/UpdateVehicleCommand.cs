using BrunoVehicleHire.Application.Vehicles.Dtos;
using BrunoVehicleHire.Domain.Entities;
using MediatR;

namespace BrunoVehicleHire.Application.Vehicles.Commands.UpdateVehicle;

public record UpdateVehicleCommand(
    Guid Id,
    VehicleType VehicleType,
    string Make,
    string Model,
    int Year,
    VehicleColour Colour,
    string OwnerName,
    decimal PricePerDay,
    DateTime? HireStartDate,
    DateTime? HireEndDate
) : IRequest<VehicleDto>;
