using BrunoVehicleHire.Domain.Entities;

namespace BrunoVehicleHire.Application.Vehicles.Dtos;

public class VehicleDto
{
    public Guid Id { get; set; }
    public string RegistrationNumber { get; set; } = string.Empty;
    public VehicleType VehicleType { get; set; }
    public string Make { get; set; } = string.Empty;
    public string Model { get; set; } = string.Empty;
    public int Year { get; set; }
    public VehicleColour Colour { get; set; }
    public string OwnerName { get; set; } = string.Empty;
    public decimal PricePerDay { get; set; }
    public VehicleCondition Condition { get; set; }
    public List<string> ImageUrls { get; set; } = new();
    public DateTime CreatedDate { get; set; }
}
