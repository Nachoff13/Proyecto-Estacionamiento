using Core.DTO;
using Data.Contexto;
using FluentValidation;
using Mapster;
using Microsoft.Extensions.Configuration;
using Servicios.Validadores;

namespace Servicios.Servicios
{
    public interface IMetodopago
    {
        Task<int> Agregar(Core.DTO.MetodopagoDTO metodopago);
        Task<bool> Eliminar(int id);
        Task<bool> Modificar(MetodopagoConId metodopago);
        Task<MetodopagoConId> ObtenerIndividual(int id);
        Task<List<MetodopagoConId>> Obtener();
    }

    public class MetodopagoServicio : IMetodopago
    {
        private readonly DbEstacionamientoContext _db;

        public MetodopagoServicio(DbEstacionamientoContext db)
        {
            _db = db;
        }

        public async Task<int> Agregar(Core.DTO.MetodopagoDTO metodopago)
        {
            try
            {
                var validador = new MetodopagoAgregarValidador();
                var validadorResultado = validador.Validate(metodopago);

                if (validadorResultado.IsValid)
                {
                    var nuevaMetodopago = metodopago.Adapt<Data.Models.Metodopago>();
                    //nuevaMetodopago.Baja = false;
                    await _db.Metodopago.AddAsync(nuevaMetodopago).ConfigureAwait(false);
                    await _db.SaveChangesAsync().ConfigureAwait(false);
                    return nuevaMetodopago.Id;
                }
                else
                {
                    throw new Exception("El nombre no puede estar vacío");
                }
            }
            catch (Exception ex)
            {
                throw new Exception("No se pudo crear el metodopago. Detalles: " + ex.Message + (ex.InnerException == null ? "" : ". Más detalles: " + ex.InnerException.Message));
            }
        }

        public async Task<bool> Modificar(MetodopagoConId metodopago)
        {
            try
            {
                var validador = new MetodopagoModificarValidador();
                var validadorResultado = validador.Validate(metodopago);

                if (validadorResultado.IsValid)
                {
                    var metodopagoModelo = _db.Metodopago.FirstOrDefault(x => x.Id == metodopago.Id);

                    if (metodopagoModelo != null)
                    {
                        metodopagoModelo.Nombre = metodopago.Nombre;
                        await _db.SaveChangesAsync().ConfigureAwait(false);
                        return true;
                    }
                    else
                    {
                        throw new Exception("No se encontró el metodopago");
                    }
                }
                else
                {
                    throw new Exception("El ID y el nombre no pueden estar vacíos");
                }
            }
            catch (Exception ex)
            {
                throw new Exception("No se pudo modificar el metodopago. Detalles: " + ex.Message + (ex.InnerException == null ? "" : ". Más detalles: " + ex.InnerException.Message));
            }
        }

        public async Task<bool> Eliminar(int id)
        {
            try
            {
                var metodopagoModelo = _db.Metodopago.FirstOrDefault(x => x.Id == id);

                if (metodopagoModelo != null)
                {
                    _db.Metodopago.Remove(metodopagoModelo);
                    await _db.SaveChangesAsync().ConfigureAwait(false);
                    return true;
                }
                else
                {
                    throw new Exception("No es posible encontrar ese metodopago");
                }
            }
            catch (Exception ex)
            {
                throw new Exception("No se pudo eliminar el metodopago. Detalles: " + ex.Message + (ex.InnerException == null ? "" : ". Más detalles: " + ex.InnerException.Message));
            }
        }

        public async Task<List<MetodopagoConId>> Obtener()
        {
            try
            {
                List<Data.Models.Metodopago> metodopagos = _db.Metodopago.ToList();
                return metodopagos.Adapt<List<MetodopagoConId>>();
            }
            catch (Exception ex)
            {
                throw new Exception("No se pudieron obtener los metodopagos. Detalles: " + ex.Message + (ex.InnerException == null ? "" : ". Más detalles: " + ex.InnerException.Message));
            }
        }

        public async Task<MetodopagoConId> ObtenerIndividual(int id)
        {
            try
            {
                var metodopagoModelo = _db.Metodopago.FirstOrDefault(x => x.Id == id);

                if (metodopagoModelo != null)
                {
                    return metodopagoModelo.Adapt<MetodopagoConId>();
                }
                else
                {
                    throw new Exception("No es posible encontrar ese metodopago");
                }
            }
            catch (Exception ex)
            {
                throw new Exception("No se pudo recuperar el metodopago con ID " + id.ToString() + ". Detalles: " + ex.Message + (ex.InnerException == null ? "" : ". Más detalles: " + ex.InnerException.Message));
            }
        }
    }
}
