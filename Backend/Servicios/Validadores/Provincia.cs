using Core.DTO;
using FluentValidation;

namespace Servicios.Validadores;

public class ProvinciaAgregarValidador : AbstractValidator<ProvinciaDTO>
{
    public ProvinciaAgregarValidador()
    {
    }
}

public class ProvinciaModificarValidador : AbstractValidator<ProvinciaConId>
{
    public ProvinciaModificarValidador()
    {
    }
}
