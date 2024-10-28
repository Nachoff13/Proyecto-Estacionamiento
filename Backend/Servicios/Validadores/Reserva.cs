using Core.DTO;
using FluentValidation;

namespace Servicios.Validadores;

public class ReservaAgregarValidador : AbstractValidator<ReservaDTO>
{
    public ReservaAgregarValidador()
    {
    }
}

public class ReservaModificarValidador : AbstractValidator<ReservaConId>
{
    public ReservaModificarValidador()
    {
    }
}

