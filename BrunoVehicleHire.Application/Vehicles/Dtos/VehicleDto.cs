using BrunoVehicleHire.Domain.Entities;

namespace BrunoVehicleHire.Application.Vehicles.Dtos;

public class VehicleDto
{
    public Guid Id { get; set; }
    public string RegistrationNumber { get; set; } = string.Empty;
    public string Make { get; set; } = string.Empty;
    public string Model { get; set; } = string.Empty;
    public int Year { get; set; }
    public double Mileage { get; set; }
    public VehicleColour Colour { get; set; }
    public ServiceHistory ServiceHistory { get; set; }
    public string SellerName { get; set; } = string.Empty;
    public decimal PricePerDay { get; set; }
    public DateTime? HireStartDate { get; set; }
    public DateTime? HireEndDate { get; set; }
    public DateTime CreatedDate { get; set; }
}
