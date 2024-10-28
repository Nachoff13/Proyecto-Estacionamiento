using Core.DTO;
using FluentValidation;

namespace Servicios.Validadores;

public class GarajeAgregarValidador : AbstractValidator<GarajeDTO>
{
    public GarajeAgregarValidador()
    {
    }
}

public class GarajeModificarValidador : AbstractValidator<GarajeConId>
{
    public GarajeModificarValidador()
    {
    }
}