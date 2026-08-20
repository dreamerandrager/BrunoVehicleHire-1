using FluentValidation;

namespace BrunoVehicleHire.Application.Vehicles.Queries.GetVehiclesPaged;

public class GetVehiclesPagedQueryValidator : AbstractValidator<GetVehiclesPagedQuery>
{
    public GetVehiclesPagedQueryValidator()
    {
        RuleFor(x => x.PageNumber).GreaterThanOrEqualTo(1);
        RuleFor(x => x.PageSize).GreaterThanOrEqualTo(1);
    }
}
