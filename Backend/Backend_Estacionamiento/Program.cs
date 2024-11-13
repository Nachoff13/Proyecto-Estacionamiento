using Npgsql;
using Microsoft.Extensions.Configuration;
using Data.Models;
using Data.Contexto;
using Microsoft.EntityFrameworkCore;
using Servicios.Servicios;
using Core.DTO;
using Mapster;
using Helpers;

var builder = WebApplication.CreateBuilder(args);

// Configuraci�n de la cadena de conexi�n desde appsettings.json
builder.Configuration.AddJsonFile("appsettings.json", optional: false, reloadOnChange: true);
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

builder.Services.AddDbContext<DbEstacionamientoContext>(options =>
    options.UseNpgsql(connectionString));

// Agregar servicios al contenedor.
builder.Services.AddControllers();

builder.Services.AddScoped<IProvincia, ProvinciaServicio>();
builder.Services.AddScoped<ILocalidad, LocalidadServicio>();
builder.Services.AddScoped<IMarca, MarcaServicio>();
builder.Services.AddScoped<IReservaEstado, ReservaEstadoServicio>();
builder.Services.AddScoped<IReserva, ReservaServicio>();
builder.Services.AddScoped<IVehiculo, VehiculoServicio>();
builder.Services.AddScoped<IGaraje, GarajeServicio>();
builder.Services.AddScoped<IGarajefoto, GarajefotoServicio>();
builder.Services.AddScoped<IModelo, ModeloServicio>();
builder.Services.AddScoped<IPago, PagoServicio>();
builder.Services.AddScoped<IMetodopago, MetodopagoServicio>();
builder.Services.AddScoped<IUsuario, UsuarioServicio>();


// Configurar Mapster
TypeAdapterConfig<GarajefotoDTO, Garajefoto>
    .ForType()
    .Map(dest => dest.Foto, src => ImageProcessingHelper.ImagenAByte(src.Foto));

TypeAdapterConfig<Garajefoto, GarajefotoDTO>
    .ForType()
    .Map(dest => dest.Foto, src => ImageProcessingHelper.ByteAImagen(src.Foto));


// Configuraci�n de Swagger/OpenAPI
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options =>
{
    options.AddPolicy("PermitirLocalhost3000", policy =>
    {
        policy.WithOrigins("http://localhost:3000")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

builder.Services.AddCors(options =>
{
    options.AddPolicy("PermitirLocalhost3000", policy =>
    {
        policy.WithOrigins("http://localhost:3000")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

// Crear una nueva conexi�n a la base de datos para probarla
using (var conn = new NpgsqlConnection(connectionString))
{
    try
    {
        conn.Open();
        Console.WriteLine("Conexi�n exitosa a la base de datos.");
        // Aqu� puedes realizar consultas a la base de datos si lo deseas.
    }
    catch (Exception ex)
    {
        Console.WriteLine($"Error al conectar a la base de datos: {ex.Message}");
    }
}

var app = builder.Build();

// Configurar el pipeline de solicitudes HTTP.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("PermitirLocalhost3000");

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();
app.Run();
