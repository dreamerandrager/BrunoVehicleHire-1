using BrunoVehicleHire.Application.Common.Interfaces;
using FluentValidation;

namespace BrunoVehicleHire.Application.Vehicles.Commands.CreateVehicle;

public class CreateVehicleCommandValidator : AbstractValidator<CreateVehicleCommand>
{
    private readonly IVehicleRepository _vehicleRepository;

    public CreateVehicleCommandValidator(IVehicleRepository vehicleRepository)
    {
        _vehicleRepository = vehicleRepository;

        RuleFor(x => x.RegistrationNumber)
            .NotEmpty()
            .MaximumLength(20)
            .MustAsync(BeUniqueRegistrationNumber)
            .WithMessage("A vehicle with this registration number already exists.");

        RuleFor(x => x.Make).NotEmpty().MaximumLength(50);
        RuleFor(x => x.Model).NotEmpty().MaximumLength(50);
        RuleFor(x => x.Year).InclusiveBetween(1900, DateTime.UtcNow.Year + 1);
        RuleFor(x => x.SellerName).NotEmpty().MaximumLength(100);
        RuleFor(x => x.PricePerDay).GreaterThan(0);
        RuleFor(x => x.VehicleType).IsInEnum();
        RuleFor(x => x.Colour).IsInEnum();

        RuleFor(x => x)
            .Must(x => !x.HireStartDate.HasValue || !x.HireEndDate.HasValue || x.HireEndDate > x.HireStartDate)
            .WithMessage("Hire end date must be after hire start date.");
    }

    private async Task<bool> BeUniqueRegistrationNumber(string registrationNumber, CancellationToken cancellationToken)
    {
        return !await _vehicleRepository.RegistrationNumberExistsAsync(registrationNumber, cancellationToken);
    }
}
