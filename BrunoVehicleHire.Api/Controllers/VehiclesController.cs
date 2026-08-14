using BrunoVehicleHire.Application.Vehicles.Commands.CreateVehicle;
using BrunoVehicleHire.Application.Vehicles.Dtos;
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
}
