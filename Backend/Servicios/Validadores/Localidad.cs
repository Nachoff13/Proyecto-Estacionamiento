using Core.DTO;
using FluentValidation;

namespace Servicios.Validadores;

public class LocalidadAgregarValidador : AbstractValidator<LocalidadDTO>
{
    public LocalidadAgregarValidador()
    {
    }
}

public class LocalidadModificarValidador : AbstractValidator<LocalidadConId>
{
    public LocalidadModificarValidador()
    {
    }
}