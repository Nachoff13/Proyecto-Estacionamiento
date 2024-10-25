using Core.DTO;
using Microsoft.AspNetCore.Mvc;
using Servicios.Servicios;

namespace WebAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ModeloController : ControllerBase
    {
        private readonly IModelo _modelo;

        public ModeloController(IModelo modelo)
        {
            _modelo = modelo;
        }

        [HttpPost("Agregar")]
        public async Task<ActionResult<int>> Agregar(Core.DTO.ModeloDTO modelo)
        {
            var resultado = await _modelo.Agregar(modelo).ConfigureAwait(false);
            return Ok(resultado);
        }

        [HttpPut("Modificar")]
        public async Task<ActionResult<bool>> Modificar(ModeloConId modelo)
        {
            var resultado = await _modelo.Modificar(modelo).ConfigureAwait(false);
            return Ok(resultado);
        }

        [HttpDelete("Eliminar/{id}")]
        public async Task<ActionResult<bool>> Eliminar(int id)
        {
            var resultado = await _modelo.Eliminar(id).ConfigureAwait(false);
            return Ok(resultado);
        }

        [HttpGet("Obtener")]
        public async Task<ActionResult<List<ModeloConId>>> Obtener()
        {
            var resultados = await _modelo.Obtener().ConfigureAwait(false);
            return Ok(resultados);
        }

        [HttpGet("ObtenerIndividual/{id}")]
        public async Task<ActionResult<ModeloConId>> ObtenerIndividual(int id)
        {
            var resultado = await _modelo.ObtenerIndividual(id).ConfigureAwait(false);
            return Ok(resultado);
        }
    }
}
