namespace BrunoVehicleHire.Domain.Entities;

public class Vehicle
{
    public Guid Id { get; private set; }
    public string RegistrationNumber { get; private set; } = string.Empty;
    public string Make { get; private set; } = string.Empty;
    public string Model { get; private set; } = string.Empty;
    public int Year { get; private set; }
    public double Mileage { get; private set; }
    public VehicleColour Colour { get; private set; }
    public bool PreviouslyOwned { get; private set; }
    public ServiceHistory ServiceHistory { get; private set; }
    public bool IsDeleted { get; private set; }
    public DateTime CreatedDate { get; private set; }

    private Vehicle() { }

    public Vehicle(string registrationNumber, string make, string model, int year, double mileage, VehicleColour colour, bool previouslyOwned, ServiceHistory serviceHistory)
    {
        Id = Guid.NewGuid();
        RegistrationNumber = registrationNumber;
        Make = make;
        Model = model;
        Year = year;
        Mileage = mileage;
        Colour = colour;
        PreviouslyOwned = previouslyOwned;
        ServiceHistory = serviceHistory;
        IsDeleted = false;
        CreatedDate = DateTime.UtcNow;
    }

    public void Update(string make, string model, int year, double mileage, VehicleColour colour, bool previouslyOwned, ServiceHistory serviceHistory)
    {
        Make = make;
        Model = model;
        Year = year;
        Mileage = mileage;
        Colour = colour;
        PreviouslyOwned = previouslyOwned;
        ServiceHistory = serviceHistory;
    }

    public void SoftDelete()
    {
        IsDeleted = true;
    }
}
