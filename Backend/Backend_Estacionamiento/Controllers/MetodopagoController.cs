using Core.DTO;
using Microsoft.AspNetCore.Mvc;
using Servicios.Servicios;

namespace WebAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class MetodopagoController : ControllerBase
    {
        private readonly IMetodopago _metodoMetodopago;

        public MetodopagoController(IMetodopago metodoMetodopago) 
        {
            _metodoMetodopago = metodoMetodopago;
        }

        [HttpPost("Agregar")]
        public async Task<ActionResult<int>> Agregar(Core.DTO.MetodopagoDTO metodoMetodopago)
        {
            var resultado = await _metodoMetodopago.Agregar(metodoMetodopago).ConfigureAwait(false);
            return Ok(resultado);
        }

        [HttpPut("Modificar")]
        public async Task<ActionResult<bool>> Modificar(MetodopagoConId metodoMetodopago)
        {
            var resultado = await _metodoMetodopago.Modificar(metodoMetodopago).ConfigureAwait(false);
            return Ok(resultado);
        }

        [HttpDelete("Eliminar/{id}")]
        public async Task<ActionResult<bool>> Eliminar(int id)
        {
            var resultado = await _metodoMetodopago.Eliminar(id).ConfigureAwait(false);
            return Ok(resultado);
        }

        [HttpGet("Obtener")]
        public async Task<ActionResult<List<MetodopagoConId>>> Obtener()
        {
            var resultados = await _metodoMetodopago.Obtener().ConfigureAwait(false);
            return Ok(resultados);
        }

        [HttpGet("ObtenerIndividual/{id}")]
        public async Task<ActionResult<MetodopagoConId>> ObtenerIndividual(int id)
        {
            var resultado = await _metodoMetodopago.ObtenerIndividual(id).ConfigureAwait(false);
            return Ok(resultado);
        }
    }
}
