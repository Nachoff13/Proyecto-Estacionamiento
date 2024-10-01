using Npgsql;
using Microsoft.Extensions.Configuration;

var builder = WebApplication.CreateBuilder(args);

// Configuraci�n de la cadena de conexi�n desde appsettings.json
builder.Configuration.AddJsonFile("appsettings.json", optional: false, reloadOnChange: true);
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

// Agregar servicios al contenedor.
builder.Services.AddControllers();
// Configuraci�n de Swagger/OpenAPI
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

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

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();
app.Run();
