using BrunoVehicleHire.Application.Common.Interfaces;
using BrunoVehicleHire.Application.Vehicles.Commands.CreateVehicle;
using BrunoVehicleHire.Domain.Entities;
using Moq;
using Xunit;

namespace BrunoVehicleHire.Application.Tests.Vehicles.Commands;

public class CreateVehicleCommandHandlerTests
{
    [Fact]
    public async Task Handle_ValidCommand_AddsVehicleAndReturnsDto()
    {
        var repository = new Mock<IVehicleRepository>();
        var handler = new CreateVehicleCommandHandler(repository.Object);

        var command = new CreateVehicleCommand(
            "CA123456",
            VehicleType.Car,
            "Toyota",
            "Corolla",
            2022,
            VehicleColour.Blue,
            "Bruno Motors",
            450m,
            null,
            null,
            null);

        var result = await handler.Handle(command, CancellationToken.None);

        Assert.Equal(command.RegistrationNumber, result.RegistrationNumber);
        Assert.Equal(command.Make, result.Make);
        Assert.Equal(command.PricePerDay, result.PricePerDay);
        repository.Verify(r => r.AddAsync(It.IsAny<Vehicle>(), It.IsAny<CancellationToken>()), Times.Once);
        repository.Verify(r => r.SaveChangesAsync(It.IsAny<CancellationToken>()), Times.Once);
    }
}
