using Core.DTO;
using FluentValidation;

namespace Servicios.Validadores;

public class UsuarioAgregarValidador : AbstractValidator<UsuarioCrearDTO>
{
    public UsuarioAgregarValidador()
    {
    }
}

public class UsuarioModificarValidador : AbstractValidator<UsuarioConId>
{
    public UsuarioModificarValidador()
    {
    }
}
