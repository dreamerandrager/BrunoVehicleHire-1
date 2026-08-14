namespace BrunoVehicleHire.Domain.Entities;

public class Vehicle
{
    public Guid Id { get; private set; }
    public string RegistrationNumber { get; private set; } = string.Empty;
    public VehicleType VehicleType { get; private set; }
    public string Make { get; private set; } = string.Empty;
    public string Model { get; private set; } = string.Empty;
    public int Year { get; private set; }
    public VehicleColour Colour { get; private set; }
    public string SellerName { get; private set; } = string.Empty;
    public decimal PricePerDay { get; private set; }
    public DateTime? HireStartDate { get; private set; }
    public DateTime? HireEndDate { get; private set; }
    public List<string> ImageUrls { get; private set; } = new();
    public bool IsDeleted { get; private set; }
    public DateTime CreatedDate { get; private set; }

    private Vehicle() { }

    public Vehicle(string registrationNumber, VehicleType vehicleType, string make, string model, int year, VehicleColour colour, string sellerName, decimal pricePerDay, DateTime? hireStartDate, DateTime? hireEndDate, List<string>? imageUrls = null)
    {
        Id = Guid.NewGuid();
        RegistrationNumber = registrationNumber;
        VehicleType = vehicleType;
        Make = make;
        Model = model;
        Year = year;
        Colour = colour;
        SellerName = sellerName;
        PricePerDay = pricePerDay;
        HireStartDate = hireStartDate;
        HireEndDate = hireEndDate;
        ImageUrls = imageUrls ?? new List<string>();
        IsDeleted = false;
        CreatedDate = DateTime.UtcNow;
    }

    public void Update(VehicleType vehicleType, string make, string model, int year, VehicleColour colour, string sellerName, decimal pricePerDay, DateTime? hireStartDate, DateTime? hireEndDate, List<string>? imageUrls = null)
    {
        VehicleType = vehicleType;
        Make = make;
        Model = model;
        Year = year;
        Colour = colour;
        SellerName = sellerName;
        PricePerDay = pricePerDay;
        HireStartDate = hireStartDate;
        HireEndDate = hireEndDate;
        ImageUrls = imageUrls ?? ImageUrls;
    }

    public void SoftDelete()
    {
        IsDeleted = true;
    }
}
