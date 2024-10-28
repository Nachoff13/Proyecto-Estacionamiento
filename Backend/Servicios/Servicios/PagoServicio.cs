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
    public interface IPago
    {
        Task<int> Agregar(Core.DTO.PagoDTO pago);
        Task<bool> Eliminar(int id);
        Task<bool> Modificar(PagoConId pago);
        Task<PagoConId> ObtenerIndividual(int id);
        Task<List<PagoConId>> Obtener();
    }

    public class PagoServicio : IPago
    {
        private readonly DbEstacionamientoContext _db;

        public PagoServicio(DbEstacionamientoContext db)
        {
            _db = db;
        }

        public async Task<int> Agregar(Core.DTO.PagoDTO pago)
        {
            try
            {
                var validador = new PagoAgregarValidador();
                var validadorResultado = validador.Validate(pago);

                if (validadorResultado.IsValid)
                {
                    var nuevoPago = pago.Adapt<Data.Models.Pago>();
                    //nuevoPago.Baja = false;
                    await _db.Pago.AddAsync(nuevoPago).ConfigureAwait(false);
                    await _db.SaveChangesAsync().ConfigureAwait(false);
                    return nuevoPago.Id;
                }
                else
                {
                    throw new Exception("El nombre no puede estar vacío");
                }
            }
            catch (Exception ex)
            {
                throw new Exception($"No se pudo crear el pago. Detalles: {ex.Message}", ex);
            }
        }

        public async Task<bool> Modificar(PagoConId pago)
        {
            try
            {
                var validador = new PagoModificarValidador();
                var validadorResultado = validador.Validate(pago);

                if (validadorResultado.IsValid)
                {
                    var pagoModelo = _db.Pago.FirstOrDefault(x => x.Id == pago.Id);

                    if (pagoModelo != null)
                    {
                        pagoModelo.Idreserva = pago.Idreserva;
                        pagoModelo.Idmetodopago = pago.Idmetodopago;
                        pagoModelo.Monto = pago.Monto;
                        pagoModelo.Fecha = pago.Fecha;
                        await _db.SaveChangesAsync().ConfigureAwait(false);
                        return true;
                    }
                    else
                    {
                        throw new Exception("No se encontró el pago");
                    }
                }
                else
                {
                    throw new Exception("El ID y el nombre no pueden estar vacíos");
                }
            }
            catch (Exception ex)
            {
                throw new Exception($"No se pudo modificar el pago. Detalles: {ex.Message}", ex);
            }
        }

        public async Task<bool> Eliminar(int id)
        {
            try
            {
                var modeloPago = _db.Pago.FirstOrDefault(x => x.Id == id);

                if (modeloPago != null)
                {
                    _db.Pago.Remove(modeloPago);
                    await _db.SaveChangesAsync().ConfigureAwait(false);
                    return true;
                }
                else
                {
                    throw new Exception("No es posible encontrar ese pago");
                }
            }
            catch (Exception ex)
            {
                throw new Exception($"No se pudo eliminar el pago. Detalles: {ex.Message}", ex);
            }
        }

        public async Task<List<PagoConId>> Obtener()
        {
            try
            {
                List<Data.Models.Pago> modelos = _db.Pago.ToList();
                return modelos.Adapt<List<PagoConId>>();
            }
            catch (Exception ex)
            {
                throw new Exception($"No se pudieron obtener los modelos. Detalles: {ex.Message}", ex);
            }
        }

        public async Task<PagoConId> ObtenerIndividual(int id)
        {
            try
            {
                var modeloPago = _db.Pago.FirstOrDefault(x => x.Id == id);

                if (modeloPago != null)
                {
                    return modeloPago.Adapt<PagoConId>();
                }
                else
                {
                    throw new Exception("No es posible encontrar ese pago");
                }
            }
            catch (Exception ex)
            {
                throw new Exception($"No se pudo recuperar el pago con ID {id}. Detalles: {ex.Message}", ex);
            }
        }
    }
}
