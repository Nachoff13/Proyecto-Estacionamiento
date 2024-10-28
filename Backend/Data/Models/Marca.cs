using System;
using System.Collections.Generic;

namespace Data.Models;

public partial class Marca
{
    public int Id { get; set; }

    public string Nombre { get; set; }

    public virtual ICollection<Modelo> Modelos { get; } = new List<Modelo>();
}
