using BrunoVehicleHire.Application.Vehicles.Dtos;
using BrunoVehicleHire.Domain.Entities;

namespace BrunoVehicleHire.Application.Vehicles.Mappings;

public static class MappingExtensions
{
    public static VehicleDto ToModel(this Vehicle vehicle) => new()
    {
        Id = vehicle.Id,
        RegistrationNumber = vehicle.RegistrationNumber,
        VehicleType = vehicle.VehicleType,
        Make = vehicle.Make,
        Model = vehicle.Model,
        Year = vehicle.Year,
        Colour = vehicle.Colour,
        OwnerName = vehicle.OwnerName,
        PricePerDay = vehicle.PricePerDay,
        Condition = vehicle.Condition,
        ImageUrls = vehicle.ImageUrls,
        CreatedDate = vehicle.CreatedDate
    };
}
