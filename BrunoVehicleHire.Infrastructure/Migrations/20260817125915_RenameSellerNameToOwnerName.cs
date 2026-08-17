using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BrunoVehicleHire.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class RenameSellerNameToOwnerName : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "SellerName",
                table: "Vehicles",
                newName: "OwnerName");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "OwnerName",
                table: "Vehicles",
                newName: "SellerName");
        }
    }
}
