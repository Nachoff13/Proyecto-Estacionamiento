using Core.DTO;
using Microsoft.AspNetCore.Mvc;
using Servicios.Servicios;

namespace WebAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class GarajeFotoController : ControllerBase
    {
        private readonly IGarajefoto _garajeFoto;

        public GarajeFotoController(IGarajefoto garajeFoto)
        {
            _garajeFoto = garajeFoto;
        }

        [HttpPost("Agregar")]
        public async Task<ActionResult<int>> Agregar(Core.DTO.GarajefotoDTO garajeFoto)
        {
            var resultado = await _garajeFoto.Agregar(garajeFoto).ConfigureAwait(false);
            return Ok(resultado);
        }

        [HttpPut("Modificar")]
        public async Task<ActionResult<bool>> Modificar(GarajefotoConId garajeFoto)
        {
            var resultado = await _garajeFoto.Modificar(garajeFoto).ConfigureAwait(false);
            return Ok(resultado);
        }

        [HttpDelete("Eliminar/{id}")]
        public async Task<ActionResult<bool>> Eliminar(int id)
        {
            var resultado = await _garajeFoto.Eliminar(id).ConfigureAwait(false);
            return Ok(resultado);
        }

        [HttpGet("Obtener")]
        public async Task<ActionResult<List<GarajefotoConId>>> Obtener()
        {
            var resultados = await _garajeFoto.Obtener().ConfigureAwait(false);
            return Ok(resultados);
        }

        [HttpGet("ObtenerIndividual/{id}")]
        public async Task<ActionResult<GarajefotoConId>> ObtenerIndividual(int id)
        {
            var resultado = await _garajeFoto.ObtenerIndividual(id).ConfigureAwait(false);
            return Ok(resultado);
        }
    }
}
