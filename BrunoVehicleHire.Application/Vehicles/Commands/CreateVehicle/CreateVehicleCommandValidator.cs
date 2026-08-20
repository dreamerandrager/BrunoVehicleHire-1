using BrunoVehicleHire.Application.Common.Interfaces;
using BrunoVehicleHire.Application.Common.Validation;
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
            .Length(3, 20)
            .Must(StringValidationHelpers.IsAlphanumeric).WithMessage("Registration Number must contain only letters and numbers.")
            .MustAsync(BeUniqueRegistrationNumber)
            .WithMessage("A vehicle with this registration number already exists.");

        RuleFor(x => x.Make)
            .NotEmpty()
            .MaximumLength(30)
            .Must(StringValidationHelpers.IsWordsOfLettersAndDigits).WithMessage("Make must contain only letters, numbers, and single spaces between words.");

        RuleFor(x => x.Model)
            .NotEmpty()
            .MaximumLength(30)
            .Must(StringValidationHelpers.IsWordsOfLettersAndDigits).WithMessage("Model must contain only letters, numbers, and single spaces between words.");

        RuleFor(x => x.Year).InclusiveBetween(1900, DateTime.UtcNow.Year + 1);

        RuleFor(x => x.OwnerName)
            .NotEmpty()
            .MaximumLength(60)
            .Must(StringValidationHelpers.IsPersonName).WithMessage("Owner Name must contain only letters, spaces, hyphens, and apostrophes.");

        RuleFor(x => x.PricePerDay).GreaterThan(0).LessThanOrEqualTo(50000);
        RuleFor(x => x.VehicleType).IsInEnum();
        RuleFor(x => x.Colour).IsInEnum();
        RuleFor(x => x.Condition).IsInEnum();
    }

    private async Task<bool> BeUniqueRegistrationNumber(string registrationNumber, CancellationToken cancellationToken)
    {
        return !await _vehicleRepository.RegistrationNumberExistsAsync(registrationNumber, cancellationToken);
    }
}
