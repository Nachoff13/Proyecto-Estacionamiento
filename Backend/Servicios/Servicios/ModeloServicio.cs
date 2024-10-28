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
    public interface IModelo
    {
        Task<int> Agregar(Core.DTO.ModeloDTO modelo);
        Task<bool> Eliminar(int id);
        Task<bool> Modificar(ModeloConId modelo);
        Task<ModeloConId> ObtenerIndividual(int id);
        Task<List<ModeloConId>> Obtener();
    }

    public class ModeloServicio : IModelo
    {
        private readonly DbEstacionamientoContext _db;

        public ModeloServicio(DbEstacionamientoContext db)
        {
            _db = db;
        }

        public async Task<int> Agregar(Core.DTO.ModeloDTO modelo)
        {
            try
            {
                var validador = new ModeloAgregarValidador();
                var validadorResultado = validador.Validate(modelo);

                if (validadorResultado.IsValid)
                {
                    var nuevoModelo = modelo.Adapt<Data.Models.Modelo>();
                    //nuevoModelo.Baja = false;
                    await _db.Modelo.AddAsync(nuevoModelo).ConfigureAwait(false);
                    await _db.SaveChangesAsync().ConfigureAwait(false);
                    return nuevoModelo.Id;
                }
                else
                {
                    throw new Exception("El nombre no puede estar vacío");
                }
            }
            catch (Exception ex)
            {
                throw new Exception($"No se pudo crear el modelo. Detalles: {ex.Message}", ex);
            }
        }

        public async Task<bool> Modificar(ModeloConId modelo)
        {
            try
            {
                var validador = new ModeloModificarValidador();
                var validadorResultado = validador.Validate(modelo);

                if (validadorResultado.IsValid)
                {
                    var modeloModelo = _db.Modelo.FirstOrDefault(x => x.Id == modelo.Id);

                    if (modeloModelo != null)
                    {
                        modeloModelo.Idmarca = modelo.Idmarca;
                        modeloModelo.Nombre = modelo.Nombre;
                        await _db.SaveChangesAsync().ConfigureAwait(false);
                        return true;
                    }
                    else
                    {
                        throw new Exception("No se encontró el modelo");
                    }
                }
                else
                {
                    throw new Exception("El ID y el nombre no pueden estar vacíos");
                }
            }
            catch (Exception ex)
            {
                throw new Exception($"No se pudo modificar el modelo. Detalles: {ex.Message}", ex);
            }
        }

        public async Task<bool> Eliminar(int id)
        {
            try
            {
                var modeloModelo = _db.Modelo.FirstOrDefault(x => x.Id == id);

                if (modeloModelo != null)
                {
                    _db.Modelo.Remove(modeloModelo);
                    await _db.SaveChangesAsync().ConfigureAwait(false);
                    return true;
                }
                else
                {
                    throw new Exception("No es posible encontrar ese modelo");
                }
            }
            catch (Exception ex)
            {
                throw new Exception($"No se pudo eliminar el modelo. Detalles: {ex.Message}", ex);
            }
        }

        public async Task<List<ModeloConId>> Obtener()
        {
            try
            {
                List<Data.Models.Modelo> modelos = _db.Modelo.ToList();
                return modelos.Adapt<List<ModeloConId>>();
            }
            catch (Exception ex)
            {
                throw new Exception($"No se pudieron obtener los modelos. Detalles: {ex.Message}", ex);
            }
        }

        public async Task<ModeloConId> ObtenerIndividual(int id)
        {
            try
            {
                var modeloModelo = _db.Modelo.FirstOrDefault(x => x.Id == id);

                if (modeloModelo != null)
                {
                    return modeloModelo.Adapt<ModeloConId>();
                }
                else
                {
                    throw new Exception("No es posible encontrar ese modelo");
                }
            }
            catch (Exception ex)
            {
                throw new Exception($"No se pudo recuperar el modelo con ID {id}. Detalles: {ex.Message}", ex);
            }
        }
    }
}
