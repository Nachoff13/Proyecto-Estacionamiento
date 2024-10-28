using Core.DTO;
using Microsoft.AspNetCore.Mvc;
using Servicios.Servicios;

namespace WebAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ReservaController : ControllerBase
    {
        private readonly IReserva _reserva;

        public ReservaController(IReserva reserva)
        {
            _reserva = reserva;
        }

        [HttpPost("Agregar")]
        public async Task<ActionResult<int>> Agregar(Core.DTO.ReservaDTO reserva)
        {
            var resultado = await _reserva.Agregar(reserva).ConfigureAwait(false);
            return Ok(resultado);
        }

        [HttpPut("Modificar")]
        public async Task<ActionResult<bool>> Modificar(ReservaConId reserva)
        {
            var resultado = await _reserva.Modificar(reserva).ConfigureAwait(false);
            return Ok(resultado);
        }

        [HttpDelete("Eliminar/{id}")]
        public async Task<ActionResult<bool>> Eliminar(int id)
        {
            var resultado = await _reserva.Eliminar(id).ConfigureAwait(false);
            return Ok(resultado);
        }

        [HttpGet("Obtener")]
        public async Task<ActionResult<List<ReservaConId>>> Obtener()
        {
            var resultados = await _reserva.Obtener().ConfigureAwait(false);
            return Ok(resultados);
        }

        [HttpGet("ObtenerIndividual/{id}")]
        public async Task<ActionResult<ReservaConId>> ObtenerIndividual(int id)
        {
            var resultado = await _reserva.ObtenerIndividual(id).ConfigureAwait(false);
            return Ok(resultado);
        }
    }
}
