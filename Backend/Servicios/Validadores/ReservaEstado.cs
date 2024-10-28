using Core.DTO;
using FluentValidation;

namespace Servicios.Validadores;

public class ReservaEstadoAgregarValidador : AbstractValidator<ReservaEstadoDTO>
{
    public ReservaEstadoAgregarValidador()
    {
    }
}

public class ReservaEstadoModificarValidador : AbstractValidator<ReservaEstadoConId>
{
    public ReservaEstadoModificarValidador()
    {
    }
}
