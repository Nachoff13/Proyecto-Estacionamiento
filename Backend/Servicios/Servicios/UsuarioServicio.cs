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

namespace Servicios.Servicios
{
    public interface IUsuario
    {
        Task<int> Agregar(Core.DTO.UsuarioDTO usuario);
        Task<bool> Eliminar(int id);
        Task<bool> Modificar(UsuarioConId usuario);
        Task<UsuarioConId> ObtenerIndividual(int id);
        Task<List<UsuarioConId>> Obtener();
    }

    public class UsuarioServicio : IUsuario
    {
        private readonly DbEstacionamientoContext _db;

        public UsuarioServicio(DbEstacionamientoContext db)
        {
            _db = db;
        }

        public async Task<int> Agregar(Core.DTO.UsuarioDTO usuario)
        {
            try
            {
                var validador = new UsuarioAgregarValidador();
                var validadorResultado = validador.Validate(usuario);

                if (validadorResultado.IsValid)
                {
                    var nuevoUsuario = usuario.Adapt<Data.Models.Usuario>();
                    //nuevoUsuario.Baja = false;
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

        public async Task<List<UsuarioConId>> Obtener()
        {
            try
            {
                List<Data.Models.Usuario> modelos = _db.Usuario.ToList();
                return modelos.Adapt<List<UsuarioConId>>();
            }
            catch (Exception ex)
            {
                throw new Exception($"No se pudieron obtener los modelos. Detalles: {ex.Message}", ex);
            }
        }

        public async Task<UsuarioConId> ObtenerIndividual(int id)
        {
            try
            {
                var modeloUsuario = _db.Usuario.FirstOrDefault(x => x.Id == id);

                if (modeloUsuario != null)
                {
                    return modeloUsuario.Adapt<UsuarioConId>();
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
