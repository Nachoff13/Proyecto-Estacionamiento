using Core.DTO;
using Microsoft.AspNetCore.Mvc;
using Servicios.Servicios;

namespace WebAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class MarcaController : ControllerBase
    {
        private readonly IMarca _marca;

        public MarcaController(IMarca marca)
        {
            _marca = marca;
        }

        [HttpPost("Agregar")]
        public async Task<ActionResult<int>> Agregar(Core.DTO.MarcaDTO marca)
        {
            var resultado = await _marca.Agregar(marca).ConfigureAwait(false);
            return Ok(resultado);
        }

        [HttpPut("Modificar")]
        public async Task<ActionResult<bool>> Modificar(MarcaConId marca)
        {
            var resultado = await _marca.Modificar(marca).ConfigureAwait(false);
            return Ok(resultado);
        }

        [HttpDelete("Eliminar/{id}")]
        public async Task<ActionResult<bool>> Eliminar(int id)
        {
            var resultado = await _marca.Eliminar(id).ConfigureAwait(false);
            return Ok(resultado);
        }

        [HttpGet("Obtener")]
        public async Task<ActionResult<List<MarcaConId>>> Obtener()
        {
            var resultados = await _marca.Obtener().ConfigureAwait(false);
            return Ok(resultados);
        }

        [HttpGet("ObtenerIndividual/{id}")]
        public async Task<ActionResult<MarcaConId>> ObtenerIndividual(int id)
        {
            var resultado = await _marca.ObtenerIndividual(id).ConfigureAwait(false);
            return Ok(resultado);
        }

        [HttpGet("ObtenerModelos/{id}")]
        public async Task<ActionResult<List<ModeloConId>>> ObtenerModelos(int id)
        {
            var resultado = await _marca.ObtenerModelos(id).ConfigureAwait(false);
            return Ok(resultado);
        }
    }
}
