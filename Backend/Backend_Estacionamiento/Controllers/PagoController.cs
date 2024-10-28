using Core.DTO;
using Microsoft.AspNetCore.Mvc;
using Servicios.Servicios;

namespace WebAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PagoController : ControllerBase
    {
        private readonly IPago _pago;

        public PagoController(IPago pago)
        {
            _pago = pago;
        }

        [HttpPost("Agregar")]
        public async Task<ActionResult<int>> Agregar(Core.DTO.PagoDTO pago)
        {
            var resultado = await _pago.Agregar(pago).ConfigureAwait(false);
            return Ok(resultado);
        }

        [HttpPut("Modificar")]
        public async Task<ActionResult<bool>> Modificar(PagoConId pago)
        {
            var resultado = await _pago.Modificar(pago).ConfigureAwait(false);
            return Ok(resultado);
        }

        [HttpDelete("Eliminar/{id}")]
        public async Task<ActionResult<bool>> Eliminar(int id)
        {
            var resultado = await _pago.Eliminar(id).ConfigureAwait(false);
            return Ok(resultado);
        }

        [HttpGet("Obtener")]
        public async Task<ActionResult<List<PagoConId>>> Obtener()
        {
            var resultados = await _pago.Obtener().ConfigureAwait(false);
            return Ok(resultados);
        }

        [HttpGet("ObtenerIndividual/{id}")]
        public async Task<ActionResult<PagoConId>> ObtenerIndividual(int id)
        {
            var resultado = await _pago.ObtenerIndividual(id).ConfigureAwait(false);
            return Ok(resultado);
        }
    }
}
