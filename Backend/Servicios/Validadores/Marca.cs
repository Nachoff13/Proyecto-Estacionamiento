using Core.DTO;
using FluentValidation;

namespace Servicios.Validadores;

public class MarcaAgregarValidador : AbstractValidator<MarcaDTO>
{
    public MarcaAgregarValidador()
    {
    }
}

public class MarcaModificarValidador : AbstractValidator<MarcaConId>
{
    public MarcaModificarValidador()
    {
    }
}

