using Core.DTO;
using Data.Contexto;
using FluentValidation;
using Mapster;
using Servicios.Validadores;
using Helpers;

namespace Servicios.Servicios
{
    public interface IGarajefoto
    {
        Task <int> Agregar(GarajefotoDTO garajefoto);
        Task <bool> Eliminar(int id);
        Task <bool> Modificar(GarajefotoConId garajefoto);
        Task <GarajefotoConId> ObtenerIndividual(int id);
        Task <List<GarajefotoConId>> Obtener();
    }

    public class GarajefotoServicio : IGarajefoto
    {
        private readonly DbEstacionamientoContext _db;

        public GarajefotoServicio(DbEstacionamientoContext db)
        {
            _db = db;
        }

       public async Task<int> Agregar(Core.DTO.GarajefotoDTO garajefoto)
{
    try
    {
        var validador = new GarajefotoAgregarValidador();
        var validadorResultado = validador.Validate(garajefoto);

        if (validadorResultado.IsValid)
        {
            // Convertir de base64 a byte[]
            var nuevaGarajefoto = new Data.Models.Garajefoto
            {
                Idgaraje = garajefoto.Idgaraje,
                Foto = ImageProcessingHelper.ImagenAByte(garajefoto.Foto)
            };

            await _db.Garajefoto.AddAsync(nuevaGarajefoto).ConfigureAwait(false);
            await _db.SaveChangesAsync().ConfigureAwait(false);
            return nuevaGarajefoto.Id;
        }
        else
        {
            throw new Exception("El nombre no puede estar vacío");
        }
    }
    catch (Exception ex)
    {
        throw new Exception($"No se pudo crear el garajefoto. Detalles: {ex.Message}", ex);
    }
}


        public async Task<bool> Modificar(GarajefotoConId garajefoto)
        {
            try
            {
                var validador = new GarajefotoModificarValidador();
                var validadorResultado = validador.Validate(garajefoto);

                if (validadorResultado.IsValid)
                {
                    var garajefotoModelo = _db.Garajefoto.FirstOrDefault(x => x.Id == garajefoto.Id);

                    if (garajefotoModelo != null)
                    {
                        garajefotoModelo.Idgaraje = garajefoto.Idgaraje;

                        if (!string.IsNullOrEmpty(garajefoto.Foto))
                        {
                            garajefotoModelo.Foto = ImageProcessingHelper.ImagenAByte(garajefoto.Foto);
                        }

                        await _db.SaveChangesAsync().ConfigureAwait(false);
                        return true;
                    }
                    else
                    {
                        throw new Exception("No se encontró el garajefoto");
                    }
                }
                else
                {
                    throw new Exception("El ID y el nombre no pueden estar vacíos");
                }
            }
            catch (Exception ex)
            {
                throw new Exception($"No se pudo modificar el garajefoto. Detalles: {ex.Message}", ex);
            }
        }


        public async Task<bool> Eliminar(int id)
        {
            try
            {
                var garajefotoModelo = _db.Garajefoto.FirstOrDefault(x => x.Id == id);

                if (garajefotoModelo != null)
                {
                    _db.Garajefoto.Remove(garajefotoModelo);
                    await _db.SaveChangesAsync().ConfigureAwait(false);
                    return true;
                }
                else
                {
                    throw new Exception("No es posible encontrar ese garajefoto");
                }
            }
            catch (Exception ex)
            {
                throw new Exception($"No se pudo eliminar el garajefoto. Detalles: {ex.Message}", ex);
            }
        }

        public async Task<List<GarajefotoConId>> Obtener()
        {
            try
            {
                List<Data.Models.Garajefoto> garajefotos = _db.Garajefoto.ToList();
                return garajefotos.Adapt<List<GarajefotoConId>>();
            }
            catch (Exception ex)
            {
                throw new Exception($"No se pudieron obtener los garajefotos. Detalles: {ex.Message}", ex);
            }
        }

        public async Task<GarajefotoConId> ObtenerIndividual(int id)
        {
            try
            {
                var garajefotoModelo = _db.Garajefoto.FirstOrDefault(x => x.Id == id);

                if (garajefotoModelo != null)
                {
                    return garajefotoModelo.Adapt<GarajefotoConId>();
                }
                else
                {
                    throw new Exception("No es posible encontrar ese garajefoto");
                }
            }
            catch (Exception ex)
            {
                throw new Exception($"No se pudo recuperar el garajefoto con ID {id}. Detalles: {ex.Message}", ex);
            }
        }
    }
}
