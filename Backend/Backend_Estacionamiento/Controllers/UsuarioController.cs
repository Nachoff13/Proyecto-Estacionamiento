using Core.DTO;
using Microsoft.AspNetCore.Mvc;
using Servicios.Servicios;

namespace WebAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UsuarioController : ControllerBase
    {
        private readonly IUsuario _usuario;

        public UsuarioController(IUsuario usuario)
        {
            _usuario = usuario;
        }

        [HttpPost("Agregar")]
        public async Task<ActionResult<int>> Agregar(Core.DTO.UsuarioCrearDTO usuario)
        {
            var resultado = await _usuario.Agregar(usuario).ConfigureAwait(false);
            return Ok(resultado);
        }

        [HttpPut("Modificar")]
        public async Task<ActionResult<bool>> Modificar(UsuarioConId usuario)
        {
            var resultado = await _usuario.Modificar(usuario).ConfigureAwait(false);
            return Ok(resultado);
        }

        [HttpDelete("Eliminar/{id}")]
        public async Task<ActionResult<bool>> Eliminar(int id)
        {
            var resultado = await _usuario.Eliminar(id).ConfigureAwait(false);
            return Ok(resultado);
        }

        [HttpGet("Obtener")]
        public async Task<ActionResult<List<UsuarioConId>>> Obtener()
        {
            var resultados = await _usuario.Obtener().ConfigureAwait(false);
            return Ok(resultados);
        }

        [HttpGet("ObtenerIndividual/{id}")]
        public async Task<ActionResult<UsuarioConId>> ObtenerIndividual(int id)
        {
            var resultado = await _usuario.ObtenerIndividual(id).ConfigureAwait(false);
            return Ok(resultado);
        }
    }
}
