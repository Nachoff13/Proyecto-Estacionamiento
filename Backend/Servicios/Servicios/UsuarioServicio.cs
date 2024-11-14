using Core.DTO;
using Data;
using Data.Contexto;
using FluentValidation;
using Mapster;
using Servicios.Validadores;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Hashing;

namespace Servicios.Servicios
{
    public interface IUsuario
    {
        Task<int> Agregar(Core.DTO.UsuarioCrearDTO usuario);
        Task<bool> Eliminar(int id);
        Task<bool> Modificar(UsuarioConId usuario);
        Task<UsuarioConIdSinContrasena> ObtenerIndividual(int id);
        Task<UsuarioConIdSinContrasena> ObtenerPropietarioIndividual(int id);
        Task<UsuarioConIdSinContrasena> ObtenerConductorIndividual(int id);
        Task<List<UsuarioConIdSinContrasena>> Obtener();
        Task<List<UsuarioConIdSinContrasena>> ObtenerPropietario();
        Task<List<UsuarioConIdSinContrasena>> ObtenerConductor();
    }

    public class UsuarioServicio : IUsuario
    {
        private readonly DbEstacionamientoContext _db;

        public UsuarioServicio(DbEstacionamientoContext db)
        {
            _db = db;
        }

        public async Task<int> Agregar(Core.DTO.UsuarioCrearDTO usuario)
        {
            try
            {
                var validador = new UsuarioAgregarValidador();
                var validadorResultado = validador.Validate(usuario);

                if (validadorResultado.IsValid)
                {
                    var nuevoUsuario = usuario.Adapt<Data.Models.Usuario>();

                    // hashear la contraseña
                    var hasher = new Hashear();
                    nuevoUsuario.Contrasena = hasher.HashearConSHA256(usuario.Contrasena);

                    await _db.Usuario.AddAsync(nuevoUsuario).ConfigureAwait(false);
                    await _db.SaveChangesAsync().ConfigureAwait(false);
                    return nuevoUsuario.Id;
                }
                else
                {
                    throw new Exception("El nombre no puede estar vacío");
                }
            }
            catch (Exception ex)
            {
                throw new Exception($"No se pudo crear el usuario. Detalles: {ex.Message}", ex);
            }
        }

        public async Task<bool> Modificar(UsuarioConId usuario)
        {
            try
            {
                var validador = new UsuarioModificarValidador();
                var validadorResultado = validador.Validate(usuario);

                if (validadorResultado.IsValid)
                {
                    var usuarioModelo = _db.Usuario.FirstOrDefault(x => x.Id == usuario.Id);

                    if (usuarioModelo != null)
                    {
                        usuarioModelo.Nombre = usuario.Nombre;
                        usuarioModelo.Apellido = usuario.Apellido;
                        usuarioModelo.Mail = usuario.Mail;
                        usuarioModelo.Username = usuario.Username;
                        // hasheo la nueva contraseña
                        var hasher = new Hashear();
                        usuarioModelo.Contrasena = hasher.HashearConSHA256(usuario.Contrasena);
                        usuarioModelo.Esconductor = usuario.Esconductor;
                        usuarioModelo.Espropietario = usuario.Espropietario;
                        
                        await _db.SaveChangesAsync().ConfigureAwait(false);
                        return true;
                    }
                    else
                    {
                        throw new Exception("No se encontró el usuario");
                    }
                }
                else
                {
                    throw new Exception("El ID y el nombre no pueden estar vacíos");
                }
            }
            catch (Exception ex)
            {
                throw new Exception($"No se pudo modificar el usuario. Detalles: {ex.Message}", ex);
            }
        }

        public async Task<bool> Eliminar(int id)
        {
            try
            {
                var modeloUsuario = _db.Usuario.FirstOrDefault(x => x.Id == id);

                if (modeloUsuario != null)
                {
                    _db.Usuario.Remove(modeloUsuario);
                    await _db.SaveChangesAsync().ConfigureAwait(false);
                    return true;
                }
                else
                {
                    throw new Exception("No es posible encontrar ese usuario");
                }
            }
            catch (Exception ex)
            {
                throw new Exception($"No se pudo eliminar el usuario. Detalles: {ex.Message}", ex);
            }
        }

        public async Task<List<UsuarioConIdSinContrasena>> Obtener()
        {
            try
            {
                List<Data.Models.Usuario> modelos = _db.Usuario.ToList();
                return modelos.Adapt<List<UsuarioConIdSinContrasena>>();
            }
            catch (Exception ex)
            {
                throw new Exception($"No se pudieron obtener los modelos. Detalles: {ex.Message}", ex);
            }
        }

        public async Task<List<UsuarioConIdSinContrasena>> ObtenerPropietario()
        {
            try
            {
                List<Data.Models.Usuario> modelos = _db.Usuario.Where(u => u.Espropietario == true).ToList();
                return modelos.Adapt<List<UsuarioConIdSinContrasena>>();
            }
            catch (Exception ex)
            {
                throw new Exception($"No se pudieron obtener los modelos. Detalles: {ex.Message}", ex);
            }
        }

        public async Task<List<UsuarioConIdSinContrasena>> ObtenerConductor()
        {
            try
            {
                List<Data.Models.Usuario> modelos = _db.Usuario.Where(u => u.Esconductor == true).ToList();
                return modelos.Adapt<List<UsuarioConIdSinContrasena>>();
            }
            catch (Exception ex)
            {
                throw new Exception($"No se pudieron obtener los modelos. Detalles: {ex.Message}", ex);
            }
        }

        public async Task<UsuarioConIdSinContrasena> ObtenerPropietarioIndividual(int id)
        {
            try
            {
                var modeloUsuario = _db.Usuario.Where(u => u.Espropietario == true).FirstOrDefault(x => x.Id == id);

                if (modeloUsuario != null)
                {
                    return modeloUsuario.Adapt<UsuarioConIdSinContrasena>();
                }
                else
                {
                    throw new Exception("No es posible encontrar ese usuario");
                }
            }
            catch (Exception ex)
            {
                throw new Exception($"No se pudo recuperar el usuario con ID {id}. Detalles: {ex.Message}", ex);
            }
        }

        public async Task<UsuarioConIdSinContrasena> ObtenerConductorIndividual(int id)
        {
            try
            {
                var modeloUsuario = _db.Usuario.Where(u => u.Esconductor == true).FirstOrDefault(x => x.Id == id);

                if (modeloUsuario != null)
                {
                    return modeloUsuario.Adapt<UsuarioConIdSinContrasena>();
                }
                else
                {
                    throw new Exception("No es posible encontrar ese usuario");
                }
            }
            catch (Exception ex)
            {
                throw new Exception($"No se pudo recuperar el usuario con ID {id}. Detalles: {ex.Message}", ex);
            }
        }

        public async Task<UsuarioConIdSinContrasena> ObtenerIndividual(int id)
        {
            try
            {
                var modeloUsuario = _db.Usuario.FirstOrDefault(x => x.Id == id);

                if (modeloUsuario != null)
                {
                    return modeloUsuario.Adapt<UsuarioConIdSinContrasena>();
                }
                else
                {
                    throw new Exception("No es posible encontrar ese usuario");
                }
            }
            catch (Exception ex)
            {
                throw new Exception($"No se pudo recuperar el usuario con ID {id}. Detalles: {ex.Message}", ex);
            }
        }
    }
}
