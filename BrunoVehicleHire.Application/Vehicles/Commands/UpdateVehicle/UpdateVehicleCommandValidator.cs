using BrunoVehicleHire.Application.Common.Validation;
using FluentValidation;

namespace BrunoVehicleHire.Application.Vehicles.Commands.UpdateVehicle;

public class UpdateVehicleCommandValidator : AbstractValidator<UpdateVehicleCommand>
{
    public UpdateVehicleCommandValidator()
    {
        RuleFor(x => x.Id).NotEmpty();

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
}
