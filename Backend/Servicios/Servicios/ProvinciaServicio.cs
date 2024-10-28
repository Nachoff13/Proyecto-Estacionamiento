using Core.DTO;
using Data;
using Data.Contexto;
using FluentValidation;
using Mapster;
using Servicios.Validadores;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Servicios.Servicios
{
    public interface IProvincia
    {
        Task<int> Agregar(Core.DTO.ProvinciaDTO provincia);
        Task<bool> Eliminar(int id);
        Task<bool> Modificar(ProvinciaConId provincia);
        Task<ProvinciaConId> ObtenerIndividual(int id);
        Task<List<ProvinciaConId>> Obtener();
    }

    public class ProvinciaServicio : IProvincia
    {
        private readonly DbEstacionamientoContext _db;

        public ProvinciaServicio(DbEstacionamientoContext db)
        {
            _db = db;
        }

        public async Task<int> Agregar(Core.DTO.ProvinciaDTO provincia)
        {
            try
            {
                var validador = new ProvinciaAgregarValidador();
                var validadorResultado = validador.Validate(provincia);

                if (validadorResultado.IsValid)
                {
                    var nuevoProvincia = provincia.Adapt<Data.Models.Provincia>();
                    //nuevoProvincia.Baja = false;
                    await _db.Provincia.AddAsync(nuevoProvincia).ConfigureAwait(false);
                    await _db.SaveChangesAsync().ConfigureAwait(false);
                    return nuevoProvincia.Id;
                }
                else
                {
                    throw new Exception("El nombre no puede estar vacío");
                }
            }
            catch (Exception ex)
            {
                throw new Exception($"No se pudo crear el provincia. Detalles: {ex.Message}", ex);
            }
        }

        public async Task<bool> Modificar(ProvinciaConId provincia)
        {
            try
            {
                var validador = new ProvinciaModificarValidador();
                var validadorResultado = validador.Validate(provincia);

                if (validadorResultado.IsValid)
                {
                    var provinciaModelo = _db.Provincia.FirstOrDefault(x => x.Id == provincia.Id);

                    if (provinciaModelo != null)
                    {
                        provinciaModelo.Nombre = provincia.Nombre;
                        await _db.SaveChangesAsync().ConfigureAwait(false);
                        return true;
                    }
                    else
                    {
                        throw new Exception("No se encontró el provincia");
                    }
                }
                else
                {
                    throw new Exception("El ID y el nombre no pueden estar vacíos");
                }
            }
            catch (Exception ex)
            {
                throw new Exception($"No se pudo modificar el provincia. Detalles: {ex.Message}", ex);
            }
        }

        public async Task<bool> Eliminar(int id)
        {
            try
            {
                var modeloProvincia = _db.Provincia.FirstOrDefault(x => x.Id == id);

                if (modeloProvincia != null)
                {
                    _db.Provincia.Remove(modeloProvincia);
                    await _db.SaveChangesAsync().ConfigureAwait(false);
                    return true;
                }
                else
                {
                    throw new Exception("No es posible encontrar ese provincia");
                }
            }
            catch (Exception ex)
            {
                throw new Exception($"No se pudo eliminar el provincia. Detalles: {ex.Message}", ex);
            }
        }

        public async Task<List<ProvinciaConId>> Obtener()
        {
            try
            {
                List<Data.Models.Provincia> modelos = _db.Provincia.ToList();
                return modelos.Adapt<List<ProvinciaConId>>();
            }
            catch (Exception ex)
            {
                throw new Exception($"No se pudieron obtener los modelos. Detalles: {ex.Message}", ex);
            }
        }

        public async Task<ProvinciaConId> ObtenerIndividual(int id)
        {
            try
            {
                var modeloProvincia = _db.Provincia.FirstOrDefault(x => x.Id == id);

                if (modeloProvincia != null)
                {
                    return modeloProvincia.Adapt<ProvinciaConId>();
                }
                else
                {
                    throw new Exception("No es posible encontrar ese provincia");
                }
            }
            catch (Exception ex)
            {
                throw new Exception($"No se pudo recuperar el provincia con ID {id}. Detalles: {ex.Message}", ex);
            }
        }
    }
}
