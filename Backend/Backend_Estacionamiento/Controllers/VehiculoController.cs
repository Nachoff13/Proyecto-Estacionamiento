using Core.DTO;
using Microsoft.AspNetCore.Mvc;
using Servicios.Servicios;

namespace WebAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class VehiculoController : ControllerBase
    {
        private readonly IVehiculo _vehiculo;

        public VehiculoController(IVehiculo vehiculo)
        {
            _vehiculo = vehiculo;
        }

        [HttpPost("Agregar")]
        public async Task<ActionResult<int>> Agregar(Core.DTO.VehiculoDTO vehiculo)
        {
            var resultado = await _vehiculo.Agregar(vehiculo).ConfigureAwait(false);
            return Ok(resultado);
        }

        [HttpPut("Modificar")]
        public async Task<ActionResult<bool>> Modificar(VehiculoConId vehiculo)
        {
            var resultado = await _vehiculo.Modificar(vehiculo).ConfigureAwait(false);
            return Ok(resultado);
        }

        [HttpDelete("Eliminar/{id}")]
        public async Task<ActionResult<bool>> Eliminar(int id)
        {
            var resultado = await _vehiculo.Eliminar(id).ConfigureAwait(false);
            return Ok(resultado);
        }

        [HttpGet("Obtener")]
        public async Task<ActionResult<List<VehiculoConId>>> Obtener()
        {
            var resultados = await _vehiculo.Obtener().ConfigureAwait(false);
            return Ok(resultados);
        }

        [HttpGet("ObtenerIndividual/{id}")]
        public async Task<ActionResult<VehiculoConId>> ObtenerIndividual(int id)
        {
            var resultado = await _vehiculo.ObtenerIndividual(id).ConfigureAwait(false);
            return Ok(resultado);
        }
    }
}
