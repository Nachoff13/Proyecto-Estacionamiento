using System;
using System.Collections.Generic;

namespace Backend_Estacionamiento.Models;

public partial class Metodopago
{
    public int Id { get; set; }

    public string Nombre { get; set; } = null!;

    public virtual ICollection<Pago> Pagos { get; } = new List<Pago>();
}
