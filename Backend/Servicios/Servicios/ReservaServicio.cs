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
    public interface IReserva
    {
        Task<int> Agregar(Core.DTO.ReservaDTO reserva);
        Task<bool> Eliminar(int id);
        Task<bool> Modificar(ReservaConId reserva);
        Task<ReservaConId> ObtenerIndividual(int id);
        Task<List<ReservaConId>> Obtener();
    }

    public class ReservaServicio : IReserva
    {
        private readonly DbEstacionamientoContext _db;

        public ReservaServicio(DbEstacionamientoContext db)
        {
            _db = db;
        }

        public async Task<int> Agregar(Core.DTO.ReservaDTO reserva)
        {
            try
            {
                var validador = new ReservaAgregarValidador();
                var validadorResultado = validador.Validate(reserva);

                if (validadorResultado.IsValid)
                {
                    var nuevoReserva = reserva.Adapt<Data.Models.Reserva>();
                    //nuevoReserva.Baja = false;
                    await _db.Reserva.AddAsync(nuevoReserva).ConfigureAwait(false);
                    await _db.SaveChangesAsync().ConfigureAwait(false);
                    return nuevoReserva.Id;
                }
                else
                {
                    throw new Exception("El nombre no puede estar vacío");
                }
            }
            catch (Exception ex)
            {
                throw new Exception($"No se pudo crear el reserva. Detalles: {ex.Message}", ex);
            }
        }

        public async Task<bool> Modificar(ReservaConId reserva)
        {
            try
            {
                var validador = new ReservaModificarValidador();
                var validadorResultado = validador.Validate(reserva);

                if (validadorResultado.IsValid)
                {
                    var reservaModelo = _db.Reserva.FirstOrDefault(x => x.Id == reserva.Id);

                    if (reservaModelo != null)
                    {
                        reservaModelo.Idgaraje = reserva.Idgaraje;
                        reservaModelo.Idconductor = reserva.Idconductor;
                        reservaModelo.Idreservaestado = reserva.Idreservaestado;
                        reservaModelo.Fechainicio = reserva.Fechainicio;
                        reservaModelo.Fechafin = reserva.Fechafin;
                        await _db.SaveChangesAsync().ConfigureAwait(false);
                        return true;
                    }
                    else
                    {
                        throw new Exception("No se encontró el reserva");
                    }
                }
                else
                {
                    throw new Exception("El ID y el nombre no pueden estar vacíos");
                }
            }
            catch (Exception ex)
            {
                throw new Exception($"No se pudo modificar el reserva. Detalles: {ex.Message}", ex);
            }
        }

        public async Task<bool> Eliminar(int id)
        {
            try
            {
                var modeloReserva = _db.Reserva.FirstOrDefault(x => x.Id == id);

                if (modeloReserva != null)
                {
                    _db.Reserva.Remove(modeloReserva);
                    await _db.SaveChangesAsync().ConfigureAwait(false);
                    return true;
                }
                else
                {
                    throw new Exception("No es posible encontrar ese reserva");
                }
            }
            catch (Exception ex)
            {
                throw new Exception($"No se pudo eliminar el reserva. Detalles: {ex.Message}", ex);
            }
        }

        public async Task<List<ReservaConId>> Obtener()
        {
            try
            {
                List<Data.Models.Reserva> modelos = _db.Reserva.ToList();
                return modelos.Adapt<List<ReservaConId>>();
            }
            catch (Exception ex)
            {
                throw new Exception($"No se pudieron obtener los modelos. Detalles: {ex.Message}", ex);
            }
        }

        public async Task<ReservaConId> ObtenerIndividual(int id)
        {
            try
            {
                var modeloReserva = _db.Reserva.FirstOrDefault(x => x.Id == id);

                if (modeloReserva != null)
                {
                    return modeloReserva.Adapt<ReservaConId>();
                }
                else
                {
                    throw new Exception("No es posible encontrar ese reserva");
                }
            }
            catch (Exception ex)
            {
                throw new Exception($"No se pudo recuperar el reserva con ID {id}. Detalles: {ex.Message}", ex);
            }
        }
    }
}
