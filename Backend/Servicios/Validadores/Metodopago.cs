using Core.DTO;
using FluentValidation;

namespace Servicios.Validadores;

public class MetodopagoAgregarValidador : AbstractValidator<MetodopagoDTO>
{
    public MetodopagoAgregarValidador()
    {
    }
}

public class MetodopagoModificarValidador : AbstractValidator<MetodopagoConId>
{
    public MetodopagoModificarValidador()
    {
    }
}