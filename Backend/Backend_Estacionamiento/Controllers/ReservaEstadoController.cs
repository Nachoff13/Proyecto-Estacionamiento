using Core.DTO;
using Microsoft.AspNetCore.Mvc;
using Servicios.Servicios;

namespace WebAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ReservaestadoController : ControllerBase
    {
        private readonly IReservaEstado _reservaestado;

        public ReservaestadoController(IReservaEstado reservaestado)
        {
            _reservaestado = reservaestado;
        }

        [HttpPost("Agregar")]
        public async Task<ActionResult<int>> Agregar(Core.DTO.ReservaEstadoDTO reservaestado)
        {
            var resultado = await _reservaestado.Agregar(reservaestado).ConfigureAwait(false);
            return Ok(resultado);
        }

        [HttpPut("Modificar")]
        public async Task<ActionResult<bool>> Modificar(ReservaEstadoConId reservaestado)
        {
            var resultado = await _reservaestado.Modificar(reservaestado).ConfigureAwait(false);
            return Ok(resultado);
        }

        [HttpDelete("Eliminar/{id}")]
        public async Task<ActionResult<bool>> Eliminar(int id)
        {
            var resultado = await _reservaestado.Eliminar(id).ConfigureAwait(false);
            return Ok(resultado);
        }

        [HttpGet("Obtener")]
        public async Task<ActionResult<List<ReservaEstadoConId>>> Obtener()
        {
            var resultados = await _reservaestado.Obtener().ConfigureAwait(false);
            return Ok(resultados);
        }

        [HttpGet("ObtenerIndividual/{id}")]
        public async Task<ActionResult<ReservaEstadoConId>> ObtenerIndividual(int id)
        {
            var resultado = await _reservaestado.ObtenerIndividual(id).ConfigureAwait(false);
            return Ok(resultado);
        }
    }
}
