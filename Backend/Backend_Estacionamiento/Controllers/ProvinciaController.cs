using Core.DTO;
using Microsoft.AspNetCore.Mvc;
using Servicios.Servicios;

namespace WebAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ProvinciaController : ControllerBase
    {
        private readonly IProvincia _provincia;

        public ProvinciaController(IProvincia provincia)
        {
            _provincia = provincia;
        }

        [HttpPost("Agregar")]
        public async Task<ActionResult<int>> Agregar(Core.DTO.ProvinciaDTO provincia)
        {
            var resultado = await _provincia.Agregar(provincia).ConfigureAwait(false);
            return Ok(resultado);
        }

        [HttpPut("Modificar")]
        public async Task<ActionResult<bool>> Modificar(ProvinciaConId provincia)
        {
            var resultado = await _provincia.Modificar(provincia).ConfigureAwait(false);
            return Ok(resultado);
        }

        [HttpDelete("Eliminar/{id}")]
        public async Task<ActionResult<bool>> Eliminar(int id)
        {
            var resultado = await _provincia.Eliminar(id).ConfigureAwait(false);
            return Ok(resultado);
        }

        [HttpGet("Obtener")]
        public async Task<ActionResult<List<ProvinciaConId>>> Obtener()
        {
            var resultados = await _provincia.Obtener().ConfigureAwait(false);
            return Ok(resultados);
        }

        [HttpGet("ObtenerIndividual/{id}")]
        public async Task<ActionResult<ProvinciaConId>> ObtenerIndividual(int id)
        {
            var resultado = await _provincia.ObtenerIndividual(id).ConfigureAwait(false);
            return Ok(resultado);
        }
    }
}
