using BrunoVehicleHire.Application.Vehicles.Dtos;
using BrunoVehicleHire.Domain.Entities;

namespace BrunoVehicleHire.Application.Vehicles.Mappings;

public static class MappingExtensions
{
    public static VehicleDto ToModel(this Vehicle vehicle) => new()
    {
        Id = vehicle.Id,
        RegistrationNumber = vehicle.RegistrationNumber,
        Make = vehicle.Make,
        Model = vehicle.Model,
        Year = vehicle.Year,
        Mileage = vehicle.Mileage,
        Colour = vehicle.Colour,
        ServiceHistory = vehicle.ServiceHistory,
        SellerName = vehicle.SellerName,
        PricePerDay = vehicle.PricePerDay,
        HireStartDate = vehicle.HireStartDate,
        HireEndDate = vehicle.HireEndDate,
        CreatedDate = vehicle.CreatedDate
    };
}
