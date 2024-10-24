using System;
using System.Collections.Generic;

namespace Backend_Estacionamiento.Models;

public partial class Reserva
{
    public int Id { get; set; }

    public int? Idgaraje { get; set; }

    public int? Idconductor { get; set; }
    public int? Idreservaestado { get; set; }

    public DateTime Fechainicio { get; set; }

    public DateTime Fechafin { get; set; }

    public string? Estado { get; set; }

    public virtual Usuario? IdconductorNavigation { get; set; }

    public virtual Garaje? IdgarajeNavigation { get; set; }
    public virtual ReservaEstado? IdreservaestadoNavigation { get; set; }

    public virtual ICollection<Pago> Pagos { get; } = new List<Pago>();
}
