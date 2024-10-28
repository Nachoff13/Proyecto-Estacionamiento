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
    public interface IVehiculo
    {
        Task<int> Agregar(Core.DTO.VehiculoDTO vehiculo);
        Task<bool> Eliminar(int id);
        Task<bool> Modificar(VehiculoConId vehiculo);
        Task<VehiculoConId> ObtenerIndividual(int id);
        Task<List<VehiculoConId>> Obtener();
    }

    public class VehiculoServicio : IVehiculo
    {
        private readonly DbEstacionamientoContext _db;

        public VehiculoServicio(DbEstacionamientoContext db)
        {
            _db = db;
        }

        public async Task<int> Agregar(Core.DTO.VehiculoDTO vehiculo)
        {
            try
            {
                var validador = new VehiculoAgregarValidador();
                var validadorResultado = validador.Validate(vehiculo);

                if (validadorResultado.IsValid)
                {
                    var nuevoVehiculo = vehiculo.Adapt<Data.Models.Vehiculo>();
                    //nuevoVehiculo.Baja = false;
                    await _db.Vehiculo.AddAsync(nuevoVehiculo).ConfigureAwait(false);
                    await _db.SaveChangesAsync().ConfigureAwait(false);
                    return nuevoVehiculo.Id;
                }
                else
                {
                    throw new Exception("El nombre no puede estar vacío");
                }
            }
            catch (Exception ex)
            {
                throw new Exception($"No se pudo crear el vehiculo. Detalles: {ex.Message}", ex);
            }
        }

        public async Task<bool> Modificar(VehiculoConId vehiculo)
        {
            try
            {
                var validador = new VehiculoModificarValidador();
                var validadorResultado = validador.Validate(vehiculo);

                if (validadorResultado.IsValid)
                {
                    var vehiculoModelo = _db.Vehiculo.FirstOrDefault(x => x.Id == vehiculo.Id);

                    if (vehiculoModelo != null)
                    {
                        vehiculoModelo.Idconductor = vehiculo.Idconductor;
                        vehiculoModelo.Idmodelo = vehiculo.Idmodelo;
                        vehiculoModelo.Matricula = vehiculo.Matricula;
                        await _db.SaveChangesAsync().ConfigureAwait(false);
                        return true;
                    }
                    else
                    {
                        throw new Exception("No se encontró el vehiculo");
                    }
                }
                else
                {
                    throw new Exception("El ID y el nombre no pueden estar vacíos");
                }
            }
            catch (Exception ex)
            {
                throw new Exception($"No se pudo modificar el vehiculo. Detalles: {ex.Message}", ex);
            }
        }

        public async Task<bool> Eliminar(int id)
        {
            try
            {
                var modeloVehiculo = _db.Vehiculo.FirstOrDefault(x => x.Id == id);

                if (modeloVehiculo != null)
                {
                    _db.Vehiculo.Remove(modeloVehiculo);
                    await _db.SaveChangesAsync().ConfigureAwait(false);
                    return true;
                }
                else
                {
                    throw new Exception("No es posible encontrar ese vehiculo");
                }
            }
            catch (Exception ex)
            {
                throw new Exception($"No se pudo eliminar el vehiculo. Detalles: {ex.Message}", ex);
            }
        }

        public async Task<List<VehiculoConId>> Obtener()
        {
            try
            {
                List<Data.Models.Vehiculo> modelos = _db.Vehiculo.ToList();
                return modelos.Adapt<List<VehiculoConId>>();
            }
            catch (Exception ex)
            {
                throw new Exception($"No se pudieron obtener los modelos. Detalles: {ex.Message}", ex);
            }
        }

        public async Task<VehiculoConId> ObtenerIndividual(int id)
        {
            try
            {
                var modeloVehiculo = _db.Vehiculo.FirstOrDefault(x => x.Id == id);

                if (modeloVehiculo != null)
                {
                    return modeloVehiculo.Adapt<VehiculoConId>();
                }
                else
                {
                    throw new Exception("No es posible encontrar ese vehiculo");
                }
            }
            catch (Exception ex)
            {
                throw new Exception($"No se pudo recuperar el vehiculo con ID {id}. Detalles: {ex.Message}", ex);
            }
        }
    }
}
