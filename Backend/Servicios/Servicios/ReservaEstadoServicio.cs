using Core.DTO;
using Data;
using Data.Contexto;
using Data.Models;
using FluentValidation;
using Mapster;
using Servicios.Validadores;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Servicios.Servicios
{
    public interface IReservaEstado
    {
        Task<int> Agregar(Core.DTO.ReservaEstadoDTO reservaEstado);
        Task<bool> Eliminar(int id);
        Task<bool> Modificar(ReservaEstadoConId reservaEstado);
        Task<ReservaEstadoConId> ObtenerIndividual(int id);
        Task<List<ReservaEstadoConId>> Obtener();
    }

    public class ReservaEstadoServicio : IReservaEstado
    {
        private readonly DbEstacionamientoContext _db;

        public ReservaEstadoServicio(DbEstacionamientoContext db)
        {
            _db = db;
        }

        public async Task<int> Agregar(Core.DTO.ReservaEstadoDTO reservaEstado)
        {
            try
            {
                var validador = new ReservaEstadoAgregarValidador();
                var validadorResultado = validador.Validate(reservaEstado);

                if (validadorResultado.IsValid)
                {
                    var nuevoReservaEstado = reservaEstado.Adapt<Data.Models.ReservaEstado>();
                    //nuevoReservaEstado.Baja = false;
                    await _db.ReservaEstado.AddAsync(nuevoReservaEstado).ConfigureAwait(false);
                    await _db.SaveChangesAsync().ConfigureAwait(false);
                    return nuevoReservaEstado.Id;
                }
                else
                {
                    throw new Exception("El nombre no puede estar vacío");
                }
            }
            catch (Exception ex)
            {
                throw new Exception($"No se pudo crear el reservaEstado. Detalles: {ex.Message}", ex);
            }
        }

        public async Task<bool> Modificar(ReservaEstadoConId reservaEstado)
        {
            try
            {
                var validador = new ReservaEstadoModificarValidador();
                var validadorResultado = validador.Validate(reservaEstado);

                if (validadorResultado.IsValid)
                {
                    var reservaEstadoModelo = _db.ReservaEstado.FirstOrDefault(x => x.Id == reservaEstado.Id);

                    if (reservaEstadoModelo != null)
                    {
                        reservaEstadoModelo.Nombre = reservaEstado.Nombre;
                        await _db.SaveChangesAsync().ConfigureAwait(false);
                        return true;
                    }
                    else
                    {
                        throw new Exception("No se encontró el reservaEstado");
                    }
                }
                else
                {
                    throw new Exception("El ID y el nombre no pueden estar vacíos");
                }
            }
            catch (Exception ex)
            {
                throw new Exception($"No se pudo modificar el reservaEstado. Detalles: {ex.Message}", ex);
            }
        }

        public async Task<bool> Eliminar(int id)
        {
            try
            {
                var modeloReservaEstado = _db.ReservaEstado.FirstOrDefault(x => x.Id == id);

                if (modeloReservaEstado != null)
                {
                    _db.ReservaEstado.Remove(modeloReservaEstado);
                    await _db.SaveChangesAsync().ConfigureAwait(false);
                    return true;
                }
                else
                {
                    throw new Exception("No es posible encontrar ese reservaEstado");
                }
            }
            catch (Exception ex)
            {
                throw new Exception($"No se pudo eliminar el reservaEstado. Detalles: {ex.Message}", ex);
            }
        }

        public async Task<List<ReservaEstadoConId>> Obtener()
        {
            try
            {
                List<Data.Models.ReservaEstado> modelos = _db.ReservaEstado.ToList();
                return modelos.Adapt<List<ReservaEstadoConId>>();
            }
            catch (Exception ex)
            {
                throw new Exception($"No se pudieron obtener los modelos. Detalles: {ex.Message}", ex);
            }
        }

        public async Task<ReservaEstadoConId> ObtenerIndividual(int id)
        {
            try
            {
                var modeloReservaEstado = _db.ReservaEstado.FirstOrDefault(x => x.Id == id);

                if (modeloReservaEstado != null)
                {
                    return modeloReservaEstado.Adapt<ReservaEstadoConId>();
                }
                else
                {
                    throw new Exception("No es posible encontrar ese reservaEstado");
                }
            }
            catch (Exception ex)
            {
                throw new Exception($"No se pudo recuperar el reservaEstado con ID {id}. Detalles: {ex.Message}", ex);
            }
        }
    }
}
