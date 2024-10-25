using Core.DTO;
using FluentValidation;

namespace Servicios.Validadores;

public class ModeloAgregarValidador : AbstractValidator<ModeloDTO>
{
    public ModeloAgregarValidador()
    {
    }
}

public class ModeloModificarValidador : AbstractValidator<ModeloConId>
{
    public ModeloModificarValidador()
    {
    }
}
