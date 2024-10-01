using System;
using System.Collections.Generic;

namespace Backend_Estacionamiento.Models;

public partial class Marca
{
    public int Id { get; set; }

    public int Nombre { get; set; }

    public virtual ICollection<Modelo> Modelos { get; } = new List<Modelo>();
}
