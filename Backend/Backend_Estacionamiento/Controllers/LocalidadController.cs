using Core.DTO;
using Microsoft.AspNetCore.Mvc;
using Servicios.Servicios;

namespace WebAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class LocalidadController : ControllerBase
    {
        private readonly ILocalidad _localidad;

        public LocalidadController(ILocalidad localidad)
        {
            _localidad = localidad;
        }

        [HttpPost("Agregar")]
        public async Task<ActionResult<int>> Agregar(Core.DTO.LocalidadDTO localidad)
        {
            var resultado = await _localidad.Agregar(localidad).ConfigureAwait(false);
            return Ok(resultado);
        }

        [HttpPut("Modificar")]
        public async Task<ActionResult<bool>> Modificar(LocalidadConId localidad)
        {
            var resultado = await _localidad.Modificar(localidad).ConfigureAwait(false);
            return Ok(resultado);
        }

        [HttpDelete("Eliminar/{id}")]
        public async Task<ActionResult<bool>> Eliminar(int id)
        {
            var resultado = await _localidad.Eliminar(id).ConfigureAwait(false);
            return Ok(resultado);
        }

        [HttpGet("Obtener")]
        public async Task<ActionResult<List<LocalidadConId>>> Obtener()
        {
            var resultados = await _localidad.Obtener().ConfigureAwait(false);
            return Ok(resultados);
        }

        [HttpGet("ObtenerIndividual/{id}")]
        public async Task<ActionResult<LocalidadConId>> ObtenerIndividual(int id)
        {
            var resultado = await _localidad.ObtenerIndividual(id).ConfigureAwait(false);
            return Ok(resultado);
        }
    }
}
