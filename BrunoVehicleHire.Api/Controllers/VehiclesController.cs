using BrunoVehicleHire.Application.Common.Models;
using BrunoVehicleHire.Application.Vehicles.Commands.CreateVehicle;
using BrunoVehicleHire.Application.Vehicles.Commands.UpdateVehicle;
using BrunoVehicleHire.Application.Vehicles.Dtos;
using BrunoVehicleHire.Application.Vehicles.Queries.GetVehicleByRegistrationNumber;
using BrunoVehicleHire.Application.Vehicles.Queries.GetVehiclesPaged;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace BrunoVehicleHire.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class VehiclesController : ControllerBase
{
    private readonly IMediator _mediator;

    public VehiclesController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpPost]
    [ProducesResponseType(typeof(VehicleDto), StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<VehicleDto>> Create(CreateVehicleCommand command, CancellationToken cancellationToken)
    {
        var vehicle = await _mediator.Send(command, cancellationToken);
        return Created($"/api/vehicles/{vehicle.Id}", vehicle);
    }

    [HttpGet]
    [ProducesResponseType(typeof(PagedResult<VehicleDto>), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<PagedResult<VehicleDto>>> GetPaged([FromQuery] int pageNumber = 1, [FromQuery] int pageSize = 10, CancellationToken cancellationToken = default)
    {
        var result = await _mediator.Send(new GetVehiclesPagedQuery(pageNumber, pageSize), cancellationToken);

        return Ok(result);
    }

    [HttpGet("{registrationNumber}")]
    [ProducesResponseType(typeof(VehicleDto), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<VehicleDto>> GetByRegistrationNumber(string registrationNumber, CancellationToken cancellationToken)
    {
        var vehicle = await _mediator.Send(new GetVehicleByRegistrationNumberQuery(registrationNumber), cancellationToken);

        return Ok(vehicle);
    }

    [HttpPut("{id:guid}")]
    [ProducesResponseType(typeof(VehicleDto), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<VehicleDto>> Update(Guid id, UpdateVehicleCommand command, CancellationToken cancellationToken)
    {
        var vehicle = await _mediator.Send(command with { Id = id }, cancellationToken);

        return Ok(vehicle);
    }
}
