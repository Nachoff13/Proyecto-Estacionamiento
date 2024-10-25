using System;
using System.Collections.Generic;

namespace Data.Models;

public partial class Modelo
{
    public int Id { get; set; }

    public int? Idmarca { get; set; }

    public string Nombre { get; set; }

    public virtual Marca? IdmarcaNavigation { get; set; }

    public virtual ICollection<Vehiculo> Vehiculos { get; } = new List<Vehiculo>();
}
