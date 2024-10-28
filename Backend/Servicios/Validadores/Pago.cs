using Core.DTO;
using FluentValidation;

namespace Servicios.Validadores;

public class PagoAgregarValidador : AbstractValidator<PagoDTO>
{
    public PagoAgregarValidador()
    {
    }
}

public class PagoModificarValidador : AbstractValidator<PagoConId>
{
    public PagoModificarValidador()
    {
    }
}
