using Core.DTO;
using FluentValidation;

namespace Servicios.Validadores;

public class VehiculoAgregarValidador : AbstractValidator<VehiculoDTO>
{
    public VehiculoAgregarValidador()
    {
    }
}

public class VehiculoModificarValidador : AbstractValidator<VehiculoConId>
{
    public VehiculoModificarValidador()
    {
    }
}