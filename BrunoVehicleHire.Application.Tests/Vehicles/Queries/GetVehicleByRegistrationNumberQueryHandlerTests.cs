using BrunoVehicleHire.Application.Common.Exceptions;
using BrunoVehicleHire.Application.Common.Interfaces;
using BrunoVehicleHire.Application.Vehicles.Queries.GetVehicleByRegistrationNumber;
using BrunoVehicleHire.Domain.Entities;
using Moq;
using Xunit;

namespace BrunoVehicleHire.Application.Tests.Vehicles.Queries;

public class GetVehicleByRegistrationNumberQueryHandlerTests
{
    [Fact]
    public async Task Handle_VehicleExists_ReturnsDto()
    {
        var vehicle = new Vehicle("CA123456", VehicleType.Car, "Toyota", "Corolla", 2022, VehicleColour.Blue, "Bruno Motors", 450m, VehicleCondition.Good);

        var repository = new Mock<IVehicleRepository>();
        repository.Setup(r => r.GetByRegistrationNumberAsync("CA123456", It.IsAny<CancellationToken>()))
            .ReturnsAsync(vehicle);

        var handler = new GetVehicleByRegistrationNumberQueryHandler(repository.Object);

        var result = await handler.Handle(new GetVehicleByRegistrationNumberQuery("CA123456"), CancellationToken.None);

        Assert.Equal(vehicle.RegistrationNumber, result.RegistrationNumber);
    }

    [Fact]
    public async Task Handle_VehicleDoesNotExist_ThrowsNotFoundException()
    {
        var repository = new Mock<IVehicleRepository>();
        repository.Setup(r => r.GetByRegistrationNumberAsync("UNKNOWN", It.IsAny<CancellationToken>()))
            .ReturnsAsync((Vehicle?)null);

        var handler = new GetVehicleByRegistrationNumberQueryHandler(repository.Object);

        await Assert.ThrowsAsync<NotFoundException>(() =>
            handler.Handle(new GetVehicleByRegistrationNumberQuery("UNKNOWN"), CancellationToken.None));
    }
}
