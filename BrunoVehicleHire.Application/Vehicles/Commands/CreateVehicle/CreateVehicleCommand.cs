using BrunoVehicleHire.Application.Vehicles.Dtos;
using BrunoVehicleHire.Domain.Entities;
using MediatR;

namespace BrunoVehicleHire.Application.Vehicles.Commands.CreateVehicle;

public record CreateVehicleCommand(
    string RegistrationNumber,
    string Make,
    string Model,
    int Year,
    double Mileage,
    VehicleColour Colour,
    ServiceHistory ServiceHistory,
    string SellerName,
    decimal PricePerDay,
    DateTime? HireStartDate,
    DateTime? HireEndDate
) : IRequest<VehicleDto>;
