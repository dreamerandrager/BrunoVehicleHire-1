using BrunoVehicleHire.Application.Vehicles.Dtos;
using BrunoVehicleHire.Domain.Entities;
using MediatR;

namespace BrunoVehicleHire.Application.Vehicles.Commands.CreateVehicle;

public record CreateVehicleCommand(
    string RegistrationNumber,
    VehicleType VehicleType,
    string Make,
    string Model,
    int Year,
    VehicleColour Colour,
    string OwnerName,
    decimal PricePerDay,
    DateTime? HireStartDate,
    DateTime? HireEndDate,
    List<string>? ImageUrls
) : IRequest<VehicleDto>;
