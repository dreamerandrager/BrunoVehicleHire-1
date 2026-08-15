using BrunoVehicleHire.Application.Vehicles.Dtos;
using MediatR;

namespace BrunoVehicleHire.Application.Vehicles.Queries.GetVehicleByRegistrationNumber;

public record GetVehicleByRegistrationNumberQuery(string RegistrationNumber) : IRequest<VehicleDto?>;
