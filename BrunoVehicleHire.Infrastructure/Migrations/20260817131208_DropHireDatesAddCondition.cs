using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BrunoVehicleHire.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class DropHireDatesAddCondition : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "HireEndDate",
                table: "Vehicles");

            migrationBuilder.DropColumn(
                name: "HireStartDate",
                table: "Vehicles");

            migrationBuilder.AddColumn<int>(
                name: "Condition",
                table: "Vehicles",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Condition",
                table: "Vehicles");

            migrationBuilder.AddColumn<DateTime>(
                name: "HireEndDate",
                table: "Vehicles",
                type: "timestamp with time zone",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "HireStartDate",
                table: "Vehicles",
                type: "timestamp with time zone",
                nullable: true);
        }
    }
}
