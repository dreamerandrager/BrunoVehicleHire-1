using FluentValidation;

namespace BrunoVehicleHire.Application.Vehicles.Commands.UpdateVehicle;

public class UpdateVehicleCommandValidator : AbstractValidator<UpdateVehicleCommand>
{
    public UpdateVehicleCommandValidator()
    {
        RuleFor(x => x.Id).NotEmpty();
        RuleFor(x => x.Make).NotEmpty().MaximumLength(50);
        RuleFor(x => x.Model).NotEmpty().MaximumLength(50);
        RuleFor(x => x.Year).InclusiveBetween(1900, DateTime.UtcNow.Year + 1);
        RuleFor(x => x.OwnerName).NotEmpty().MaximumLength(100);
        RuleFor(x => x.PricePerDay).GreaterThan(0);
        RuleFor(x => x.VehicleType).IsInEnum();
        RuleFor(x => x.Colour).IsInEnum();
        RuleFor(x => x.Condition).IsInEnum();
    }
}
