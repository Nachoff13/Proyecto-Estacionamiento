using System;
using System.Collections.Generic;

namespace Backend_Estacionamiento.Models;

public partial class Provincia
{
    public int Id { get; set; }

    public string Nombre { get; set; } = null!;

    public virtual ICollection<Localidad> Localidads { get; } = new List<Localidad>();
}
