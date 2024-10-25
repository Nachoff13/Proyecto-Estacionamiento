using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace BackendEstacionamiento.Migrations
{
    /// <inheritdoc />
    public partial class Inicial : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "marca",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    nombre = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("marca_pkey", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "metodopago",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    nombre = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("metodopago_pkey", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "provincia",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    nombre = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("provincia_pkey", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "reservaestado",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    nombre = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("reservaestado_pkey", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "usuario",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    nombre = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    apellido = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    mail = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: false),
                    username = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    contraseña = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: false),
                    esconductor = table.Column<bool>(type: "boolean", nullable: true),
                    espropietario = table.Column<bool>(type: "boolean", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("usuario_pkey", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "modelo",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    idmarca = table.Column<int>(type: "integer", nullable: true),
                    nombre = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("modelo_pkey", x => x.id);
                    table.ForeignKey(
                        name: "modelo_idmarca_fkey",
                        column: x => x.idmarca,
                        principalTable: "marca",
                        principalColumn: "id");
                });

            migrationBuilder.CreateTable(
                name: "localidad",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    idprovincia = table.Column<int>(type: "integer", nullable: true),
                    nombre = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    codpostal = table.Column<string>(type: "character varying(10)", maxLength: 10, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("localidad_pkey", x => x.id);
                    table.ForeignKey(
                        name: "localidad_idprovincia_fkey",
                        column: x => x.idprovincia,
                        principalTable: "provincia",
                        principalColumn: "id");
                });

            migrationBuilder.CreateTable(
                name: "vehiculo",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    idconductor = table.Column<int>(type: "integer", nullable: true),
                    idmodelo = table.Column<int>(type: "integer", nullable: true),
                    matricula = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("vehiculo_pkey", x => x.id);
                    table.ForeignKey(
                        name: "vehiculo_idconductor_fkey",
                        column: x => x.idconductor,
                        principalTable: "usuario",
                        principalColumn: "id");
                    table.ForeignKey(
                        name: "vehiculo_idmodelo_fkey",
                        column: x => x.idmodelo,
                        principalTable: "modelo",
                        principalColumn: "id");
                });

            migrationBuilder.CreateTable(
                name: "garaje",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    idpropietario = table.Column<int>(type: "integer", nullable: true),
                    idlocalidad = table.Column<int>(type: "integer", nullable: true),
                    altura = table.Column<int>(type: "integer", nullable: false),
                    calle = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    descripcion = table.Column<string>(type: "text", nullable: true),
                    preciohora = table.Column<decimal>(type: "numeric(10,2)", precision: 10, scale: 2, nullable: false),
                    capacidad = table.Column<int>(type: "integer", nullable: false),
                    disponible = table.Column<bool>(type: "boolean", nullable: true, defaultValue: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("garaje_pkey", x => x.id);
                    table.ForeignKey(
                        name: "garaje_idlocalidad_fkey",
                        column: x => x.idlocalidad,
                        principalTable: "localidad",
                        principalColumn: "id");
                    table.ForeignKey(
                        name: "garaje_idpropietario_fkey",
                        column: x => x.idpropietario,
                        principalTable: "usuario",
                        principalColumn: "id");
                });

            migrationBuilder.CreateTable(
                name: "garajefoto",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    idgaraje = table.Column<int>(type: "integer", nullable: true),
                    foto = table.Column<byte[]>(type: "bytea", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("garajefoto_pkey", x => x.id);
                    table.ForeignKey(
                        name: "garajefoto_idgaraje_fkey",
                        column: x => x.idgaraje,
                        principalTable: "garaje",
                        principalColumn: "id");
                });

            migrationBuilder.CreateTable(
                name: "reserva",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    idgaraje = table.Column<int>(type: "integer", nullable: true),
                    idconductor = table.Column<int>(type: "integer", nullable: true),
                    idreservaestado = table.Column<int>(type: "integer", nullable: true),
                    fechainicio = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    fechafin = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    Estado = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("reserva_pkey", x => x.id);
                    table.ForeignKey(
                        name: "reserva_idconductor_fkey",
                        column: x => x.idconductor,
                        principalTable: "usuario",
                        principalColumn: "id");
                    table.ForeignKey(
                        name: "reserva_idgaraje_fkey",
                        column: x => x.idgaraje,
                        principalTable: "garaje",
                        principalColumn: "id");
                    table.ForeignKey(
                        name: "reserva_idreservaestado_fkey",
                        column: x => x.idreservaestado,
                        principalTable: "reservaestado",
                        principalColumn: "id");
                });

            migrationBuilder.CreateTable(
                name: "pago",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    idreserva = table.Column<int>(type: "integer", nullable: true),
                    idmetodopago = table.Column<int>(type: "integer", nullable: true),
                    monto = table.Column<decimal>(type: "numeric(10,2)", precision: 10, scale: 2, nullable: false),
                    fecha = table.Column<DateTime>(type: "timestamp without time zone", nullable: true, defaultValueSql: "CURRENT_TIMESTAMP")
                },
                constraints: table =>
                {
                    table.PrimaryKey("pago_pkey", x => x.id);
                    table.ForeignKey(
                        name: "pago_idmetodopago_fkey",
                        column: x => x.idmetodopago,
                        principalTable: "metodopago",
                        principalColumn: "id");
                    table.ForeignKey(
                        name: "pago_idreserva_fkey",
                        column: x => x.idreserva,
                        principalTable: "reserva",
                        principalColumn: "id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_garaje_idlocalidad",
                table: "garaje",
                column: "idlocalidad");

            migrationBuilder.CreateIndex(
                name: "IX_garaje_idpropietario",
                table: "garaje",
                column: "idpropietario");

            migrationBuilder.CreateIndex(
                name: "IX_garajefoto_idgaraje",
                table: "garajefoto",
                column: "idgaraje");

            migrationBuilder.CreateIndex(
                name: "IX_localidad_idprovincia",
                table: "localidad",
                column: "idprovincia");

            migrationBuilder.CreateIndex(
                name: "IX_modelo_idmarca",
                table: "modelo",
                column: "idmarca");

            migrationBuilder.CreateIndex(
                name: "IX_pago_idmetodopago",
                table: "pago",
                column: "idmetodopago");

            migrationBuilder.CreateIndex(
                name: "IX_pago_idreserva",
                table: "pago",
                column: "idreserva");

            migrationBuilder.CreateIndex(
                name: "IX_reserva_idconductor",
                table: "reserva",
                column: "idconductor");

            migrationBuilder.CreateIndex(
                name: "IX_reserva_idgaraje",
                table: "reserva",
                column: "idgaraje");

            migrationBuilder.CreateIndex(
                name: "IX_reserva_idreservaestado",
                table: "reserva",
                column: "idreservaestado");

            migrationBuilder.CreateIndex(
                name: "usuario_mail_key",
                table: "usuario",
                column: "mail",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "usuario_username_key",
                table: "usuario",
                column: "username",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_vehiculo_idconductor",
                table: "vehiculo",
                column: "idconductor");

            migrationBuilder.CreateIndex(
                name: "IX_vehiculo_idmodelo",
                table: "vehiculo",
                column: "idmodelo");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "garajefoto");

            migrationBuilder.DropTable(
                name: "pago");

            migrationBuilder.DropTable(
                name: "vehiculo");

            migrationBuilder.DropTable(
                name: "metodopago");

            migrationBuilder.DropTable(
                name: "reserva");

            migrationBuilder.DropTable(
                name: "modelo");

            migrationBuilder.DropTable(
                name: "garaje");

            migrationBuilder.DropTable(
                name: "reservaestado");

            migrationBuilder.DropTable(
                name: "marca");

            migrationBuilder.DropTable(
                name: "localidad");

            migrationBuilder.DropTable(
                name: "usuario");

            migrationBuilder.DropTable(
                name: "provincia");
        }
    }
}
