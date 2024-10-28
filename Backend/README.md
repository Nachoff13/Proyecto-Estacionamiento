# Pasos  
## Conectar a BBDD local:
1) Tener instalado PostgreSQL
2) Crea una base de datos llamada "db_estacionamiento"
3) Configura la cadena de conexión en appsettings.json y DbEstacionamientoContext.cs. El puerto es el default, pone tu usuario y contraseña.
Host=localhost;Port=5432;Database=db_estacionamiento;Username=postgres;Password=pone_tu_contraseña;
## Generar las tablas en la base de datos usando migraciones
1) Desde la Consola de Administrador de Paquetes, ejecuta "Add-Migration InitialCreate" y después "Update-Database"

