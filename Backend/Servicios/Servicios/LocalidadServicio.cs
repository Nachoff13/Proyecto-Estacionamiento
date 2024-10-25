using Core.DTO;
using Data;
using Data.Contexto;
using FluentValidation;
using Mapster;
using Microsoft.Extensions.Configuration;
using Servicios.Validadores;

namespace Servicios.Servicios
{
    public interface ILocalidad
    {
        Task<int> Agregar(Core.DTO.LocalidadDTO localidad);
        Task<bool> Eliminar(int id);
        Task<bool> Modificar(LocalidadConId localidad);
        Task<LocalidadConId> ObtenerIndividual(int id);
        Task<List<LocalidadConId>> Obtener();
    }

    public class LocalidadServicio : ILocalidad
    {
        private readonly DbEstacionamientoContext _db;

        public LocalidadServicio(DbEstacionamientoContext db)
        {
            _db = db;
        }

        public async Task<int> Agregar(Core.DTO.LocalidadDTO localidad)
        {
            try
            {
                var validador = new LocalidadAgregarValidador();
                var validadorResultado = validador.Validate(localidad);

                if (validadorResultado.IsValid)
                {
                    var nuevaLocalidad = localidad.Adapt<Data.Models.Localidad>();
                    //nuevaLocalidad.Baja = false;
                    await _db.Localidad.AddAsync(nuevaLocalidad).ConfigureAwait(false);
                    await _db.SaveChangesAsync().ConfigureAwait(false);
                    return nuevaLocalidad.Id;
                }
                else
                {
                    throw new Exception("El nombre no puede estar vacío");
                }
            }
            catch (Exception ex)
            {
                throw new Exception($"No se pudo crear la localidad. Detalles: {ex.Message}", ex);
            }
        }

        public async Task<bool> Modificar(LocalidadConId localidad)
        {
            try
            {
                var validador = new LocalidadModificarValidador();
                var validadorResultado = validador.Validate(localidad);

                if (validadorResultado.IsValid)
                {
                    var localidadModelo = _db.Localidad.FirstOrDefault(x => x.Id == localidad.Id);

                    if (localidadModelo != null)
                    {
                        localidadModelo.Idprovincia = localidad.Idprovincia;
                        localidadModelo.Nombre = localidad.Nombre;
                        localidadModelo.Codpostal = localidad.Codpostal;
                        await _db.SaveChangesAsync().ConfigureAwait(false);
                        return true;
                    }
                    else
                    {
                        throw new Exception("No se encontró la localidad");
                    }
                }
                else
                {
                    throw new Exception("El ID y el nombre no pueden estar vacíos");
                }
            }
            catch (Exception ex)
            {
                throw new Exception($"No se pudo modificar la localidad. Detalles: {ex.Message}", ex);
            }
        }

        public async Task<bool> Eliminar(int id)
        {
            try
            {
                var localidadModelo = _db.Localidad.FirstOrDefault(x => x.Id == id);

                if (localidadModelo != null)
                {
                    _db.Localidad.Remove(localidadModelo);
                    await _db.SaveChangesAsync().ConfigureAwait(false);
                    return true;
                }
                else
                {
                    throw new Exception("No es posible encontrar esa localidad");
                }
            }
            catch (Exception ex)
            {
                throw new Exception($"No se pudo eliminar la localidad. Detalles: {ex.Message}", ex);
            }
        }

        public async Task<List<LocalidadConId>> Obtener()
        {
            try
            {
                List<Data.Models.Localidad> localidades = _db.Localidad.ToList();
                return localidades.Adapt<List<LocalidadConId>>();
            }
            catch (Exception ex)
            {
                throw new Exception($"No se pudieron obtener las localidades. Detalles: {ex.Message}", ex);
            }
        }

        public async Task<LocalidadConId> ObtenerIndividual(int id)
        {
            try
            {
                var localidadModelo = _db.Localidad.FirstOrDefault(x => x.Id == id);

                if (localidadModelo != null)
                {
                    return localidadModelo.Adapt<LocalidadConId>();
                }
                else
                {
                    throw new Exception("No es posible encontrar esa localidad");
                }
            }
            catch (Exception ex)
            {
                throw new Exception($"No se pudo recuperar la localidad con ID {id}. Detalles: {ex.Message}", ex);
            }
        }
    }
}