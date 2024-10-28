using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BackendEstacionamiento.Migrations
{
    /// <inheritdoc />
    public partial class Version1 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Estado",
                table: "reserva");

            migrationBuilder.RenameColumn(
                name: "contraseña",
                table: "usuario",
                newName: "contrasena");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "contrasena",
                table: "usuario",
                newName: "contraseña");

            migrationBuilder.AddColumn<string>(
                name: "Estado",
                table: "reserva",
                type: "text",
                nullable: true);
        }
    }
}
