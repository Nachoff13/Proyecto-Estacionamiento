using Core.DTO;
using Data.Contexto;
using Data.Models;
using FluentValidation;
using Mapster;
using Servicios.Validadores;

namespace Servicios.Servicios
{
    public interface IGaraje
    {
        Task<int> Agregar(GarajeDTO garaje);
        Task<bool> Eliminar(int id);
        Task<bool> Modificar(GarajeConId garaje);
        Task<GarajeConId> ObtenerIndividual(int id);
        Task<List<GarajeConId>> Obtener();
    }

    public class GarajeServicio : IGaraje
    {
        private readonly DbEstacionamientoContext _db;

        public GarajeServicio(DbEstacionamientoContext db)
        {
            _db = db;
        }

        public async Task<int> Agregar(Core.DTO.GarajeDTO garaje)
        {
            try
            {
                var validador = new GarajeAgregarValidador();
                var validadorResultado = validador.Validate(garaje);

                if (validadorResultado.IsValid)
                {
                    var nuevaGaraje = garaje.Adapt<Data.Models.Garaje>();
                    //nuevaGaraje.Baja = false;
                    await _db.Garaje.AddAsync(nuevaGaraje).ConfigureAwait(false);
                    await _db.SaveChangesAsync().ConfigureAwait(false);
                    return nuevaGaraje.Id;
                }
                else
                {
                    throw new Exception("El nombre no puede estar vacío");
                }
            }
            catch (Exception ex)
            {
                throw new Exception($"No se pudo crear el garaje. Detalles: {ex.Message}", ex);
            }
        }

        public async Task<bool> Modificar(GarajeConId garaje)
        {
            try
            {
                var validador = new GarajeModificarValidador();
                var validadorResultado = validador.Validate(garaje);

                if (validadorResultado.IsValid)
                {
                    var garajeModelo = _db.Garaje.FirstOrDefault(x => x.Id == garaje.Id);

                    if (garajeModelo != null)
                    {
                        garajeModelo.Idpropietario = garaje.Idpropietario;
                        garajeModelo.Idlocalidad = garaje.Idlocalidad;
                        garajeModelo.Altura = garaje.Altura;
                        garajeModelo.Calle = garaje.Calle;
                        garajeModelo.Descripcion = garaje.Descripcion;
                        garajeModelo.Preciohora = garaje.Preciohora;
                        garajeModelo.Capacidad = garaje.Capacidad;
                        garajeModelo.Disponible = garaje.Disponible;
                        await _db.SaveChangesAsync().ConfigureAwait(false);
                        return true;
                    }
                    else
                    {
                        throw new Exception("No se encontró el garaje");
                    }
                }
                else
                {
                    throw new Exception("El ID y el nombre no pueden estar vacíos");
                }
            }
            catch (Exception ex)
            {
                throw new Exception($"No se pudo modificar el garaje. Detalles: {ex.Message}", ex);
            }
        }

        public async Task<bool> Eliminar(int id)
        {
            try
            {
                var garajeModelo = _db.Garaje.FirstOrDefault(x => x.Id == id);

                if (garajeModelo != null)
                {
                    _db.Garaje.Remove(garajeModelo);
                    await _db.SaveChangesAsync().ConfigureAwait(false);
                    return true;
                }
                else
                {
                    throw new Exception("No es posible encontrar ese garaje");
                }
            }
            catch (Exception ex)
            {
                throw new Exception($"No se pudo eliminar el garaje. Detalles: {ex.Message}", ex);
            }
        }

        public async Task<List<GarajeConId>> Obtener()
        {
            try
            {
                List<Data.Models.Garaje> garajes = _db.Garaje.ToList();
                return garajes.Adapt<List<GarajeConId>>();
            }
            catch (Exception ex)
            {
                throw new Exception($"No se pudieron obtener los garaje. Detalles: {ex.Message}", ex);
            }
        }

        public async Task<GarajeConId> ObtenerIndividual(int id)
        {
            try
            {
                var garajeModelo = _db.Garaje.FirstOrDefault(x => x.Id == id);

                if (garajeModelo != null)
                {
                     return garajeModelo.Adapt<GarajeConId>();
                    
                }
                else
                {
                    throw new Exception("No es posible encontrar ese garaje");
                }
            }
            catch (Exception ex)
            {
                throw new Exception($"No se pudo recuperar el garaje con ID {id}. Detalles: {ex.Message}", ex);
            }
        }
    }
}
