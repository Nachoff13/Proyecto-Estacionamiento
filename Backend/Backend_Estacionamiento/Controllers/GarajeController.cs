using Core.DTO;
using Microsoft.AspNetCore.Mvc;
using Servicios.Servicios;

namespace WebAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class GarajeController : ControllerBase
    {
        private readonly IGaraje _garaje;

        public GarajeController(IGaraje garaje)
        {
            _garaje = garaje;
        }

        [HttpPost("Agregar")]
        public async Task<ActionResult<int>> Agregar(Core.DTO.GarajeDTO garaje)
        {
            var resultado = await _garaje.Agregar(garaje).ConfigureAwait(false);
            return Ok(resultado);
        }

        [HttpPut("Modificar")]
        public async Task<ActionResult<bool>> Modificar(GarajeConId garaje)
        {
            var resultado = await _garaje.Modificar(garaje).ConfigureAwait(false);
            return Ok(resultado);
        }

        [HttpDelete("Eliminar/{id}")]
        public async Task<ActionResult<bool>> Eliminar(int id)
        {
            var resultado = await _garaje.Eliminar(id).ConfigureAwait(false);
            return Ok(resultado);
        }

        [HttpGet("Obtener")]
        public async Task<ActionResult<List<GarajeConId>>> Obtener()
        {
            var resultados = await _garaje.Obtener().ConfigureAwait(false);
            return Ok(resultados);
        }

        [HttpGet("ObtenerIndividual/{id}")]
        public async Task<ActionResult<GarajeConId>> ObtenerIndividual(int id)
        {
            var resultado = await _garaje.ObtenerIndividual(id).ConfigureAwait(false);
            return Ok(resultado);
        }

        [HttpGet("ObtenerConPropietario/{idPropietario}")]
        public async Task<ActionResult<List<GarajeConId>>> ObtenerConPropietario(int idPropietario)
        {
            var resultados = await _garaje.ObtenerConPropietario(idPropietario).ConfigureAwait(false);
            return Ok(resultados);
        }
    }
}
