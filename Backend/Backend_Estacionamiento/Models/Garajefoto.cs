using System;
using System.Collections.Generic;

namespace Backend_Estacionamiento.Models;

public partial class Garajefoto
{
    public int Id { get; set; }

    public int? Idgaraje { get; set; }

    public byte[]? Foto { get; set; }

    public virtual Garaje? IdgarajeNavigation { get; set; }
}
