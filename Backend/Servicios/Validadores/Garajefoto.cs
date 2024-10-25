using Core.DTO;
using FluentValidation;

namespace Servicios.Validadores;

public class GarajefotoAgregarValidador : AbstractValidator<GarajefotoDTO>
{
    public GarajefotoAgregarValidador()
    {
    }
}

public class GarajefotoModificarValidador : AbstractValidator<GarajefotoConId>
{
    public GarajefotoModificarValidador()
    {
    }
}
