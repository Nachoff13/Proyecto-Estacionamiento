using Core.DTO;
using Data.Contexto;
using FluentValidation;
using Mapster;
using Microsoft.EntityFrameworkCore;
using Servicios.Validadores;

namespace Servicios.Servicios
{
    public interface IMarca
    {
        Task<int> Agregar(Core.DTO.MarcaDTO marca);
        Task<bool> Eliminar(int id);
        Task<bool> Modificar(MarcaConId marca);
        Task<MarcaConId> ObtenerIndividual(int id);
        Task<List<MarcaConId>> Obtener();
    }

    public class MarcaServicio : IMarca
    {
        private readonly DbEstacionamientoContext _db;

        public MarcaServicio(DbEstacionamientoContext db)
        {
            _db = db;
        }

        public async Task<int> Agregar(Core.DTO.MarcaDTO marca)
        {
            try
            {
                var validador = new MarcaAgregarValidador();
                var validadorResultado = validador.Validate(marca);

                if (validadorResultado.IsValid)
                {
                    var nuevaMarca = marca.Adapt<Data.Models.Marca>();
                    //nuevaMarca.Baja = false;
                    await _db.Marca.AddAsync(nuevaMarca).ConfigureAwait(false);
                    await _db.SaveChangesAsync().ConfigureAwait(false);
                    return nuevaMarca.Id;
                }
                else
                {
                    throw new Exception("El nombre no puede estar vacío");
                }
            }
            catch (Exception ex)
            {
                throw new Exception($"No se pudo crear la marca. Detalles: {ex.Message}", ex);
            }
        }

        public async Task<bool> Modificar(MarcaConId marca)
        {
            try
            {
                var validador = new MarcaModificarValidador();
                var validadorResultado = validador.Validate(marca);

                if (validadorResultado.IsValid)
                {
                    var marcaModelo = _db.Marca.FirstOrDefault(x => x.Id == marca.Id);

                    if (marcaModelo != null)
                    {
                        marcaModelo.Nombre = marca.Nombre;
                        await _db.SaveChangesAsync().ConfigureAwait(false);
                        return true;
                    }
                    else
                    {
                        throw new Exception("No se encontró la marca");
                    }
                }
                else
                {
                    throw new Exception("El ID y el nombre no pueden estar vacíos");
                }
            }
            catch (Exception ex)
            {
                throw new Exception($"No se pudo modificar la marca. Detalles: {ex.Message}", ex);
            }
        }

        public async Task<bool> Eliminar(int id)
        {
            try
            {
                var marcaModelo = _db.Marca.FirstOrDefault(x => x.Id == id);

                if (marcaModelo != null)
                {
                    _db.Marca.Remove(marcaModelo);
                    await _db.SaveChangesAsync().ConfigureAwait(false);
                    return true;
                }
                else
                {
                    throw new Exception("No es posible encontrar esa marca");
                }
            }
            catch (Exception ex)
            {
                throw new Exception($"No se pudo eliminar la marca. Detalles: {ex.Message}", ex);
            }
        }

        public async Task<List<MarcaConId>> Obtener()
        {
            try
            {
                List<Data.Models.Marca> marcas = _db.Marca.ToList();
                return marcas.Adapt<List<MarcaConId>>();
            }
            catch (Exception ex)
            {
                throw new Exception($"No se pudieron obtener las marcas. Detalles: {ex.Message}", ex);
            }
        }

        public async Task<MarcaConId> ObtenerIndividual(int id)
        {
            try
            {
                var marcaModelo = _db.Marca.FirstOrDefault(x => x.Id == id);

                if (marcaModelo != null)
                {
                    return marcaModelo.Adapt<MarcaConId>();
                }
                else
                {
                    throw new Exception("No es posible encontrar esa marca");
                }
            }
            catch (Exception ex)
            {
                throw new Exception($"No se pudo recuperar la marca con ID {id}. Detalles: {ex.Message}", ex);
            }
        }
    }
}
