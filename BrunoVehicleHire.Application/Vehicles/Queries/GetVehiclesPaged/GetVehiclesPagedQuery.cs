using BrunoVehicleHire.Application.Common.Models;
using BrunoVehicleHire.Application.Vehicles.Dtos;
using MediatR;

namespace BrunoVehicleHire.Application.Vehicles.Queries.GetVehiclesPaged;

public record GetVehiclesPagedQuery(int PageNumber, int PageSize) : IRequest<PagedResult<VehicleDto>>;
