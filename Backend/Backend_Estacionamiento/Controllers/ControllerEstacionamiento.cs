using Backend_Estacionamiento.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq; 

namespace Backend_Estacionamiento.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsuarioController : ControllerBase
    {
        private readonly DbEstacionamientoContext _dbContext;

        public UsuarioController( DbEstacionamientoContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet(Name = "GetUsuarios")]
        public ActionResult<IEnumerable<Usuario>> Get()
        {
            var usuarios = _dbContext.Usuarios.ToList();
            return Ok(usuarios); 
        }
    }
}
