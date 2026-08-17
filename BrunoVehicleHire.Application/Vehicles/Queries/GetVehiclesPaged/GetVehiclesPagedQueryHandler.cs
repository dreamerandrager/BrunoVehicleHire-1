using BrunoVehicleHire.Application.Common.Interfaces;
using BrunoVehicleHire.Application.Common.Models;
using BrunoVehicleHire.Application.Vehicles.Dtos;
using BrunoVehicleHire.Application.Vehicles.Mappings;
using MediatR;

namespace BrunoVehicleHire.Application.Vehicles.Queries.GetVehiclesPaged;

public class GetVehiclesPagedQueryHandler : IRequestHandler<GetVehiclesPagedQuery, PagedResult<VehicleDto>>
{
    private readonly IVehicleRepository _vehicleRepository;

    public GetVehiclesPagedQueryHandler(IVehicleRepository vehicleRepository)
    {
        _vehicleRepository = vehicleRepository;
    }

    public async Task<PagedResult<VehicleDto>> Handle(GetVehiclesPagedQuery request, CancellationToken cancellationToken)
    {
        var (items, totalCount) = await _vehicleRepository.GetPagedAsync(request.PageNumber, request.PageSize, cancellationToken);

        return new PagedResult<VehicleDto>
        {
            Items = items.Select(v => v.ToModel()).ToList(),
            TotalCount = totalCount,
            PageNumber = request.PageNumber,
            PageSize = request.PageSize
        };
    }
}
