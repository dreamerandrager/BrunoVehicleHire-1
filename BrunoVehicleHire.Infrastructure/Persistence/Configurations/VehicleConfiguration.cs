using BrunoVehicleHire.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace BrunoVehicleHire.Infrastructure.Persistence.Configurations;

public class VehicleConfiguration : IEntityTypeConfiguration<Vehicle>
{
    public void Configure(EntityTypeBuilder<Vehicle> builder)
    {
        builder.ToTable("Vehicles");

        builder.HasKey(v => v.Id);

        builder.Property(v => v.RegistrationNumber)
            .IsRequired()
            .HasMaxLength(20);

        builder.HasIndex(v => v.RegistrationNumber)
            .IsUnique();

        builder.Property(v => v.Make)
            .IsRequired()
            .HasMaxLength(50);

        builder.Property(v => v.Model)
            .IsRequired()
            .HasMaxLength(50);

        builder.Property(v => v.OwnerName)
            .IsRequired()
            .HasMaxLength(100);

        builder.Property(v => v.PricePerDay)
            .HasPrecision(10, 2);

        builder.Property(v => v.VehicleType)
            .HasConversion<int>();

        builder.Property(v => v.Colour)
            .HasConversion<int>();

        builder.Property(v => v.Condition)
            .HasConversion<int>();

        builder.HasQueryFilter(v => !v.IsDeleted);
    }
}
