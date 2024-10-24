using System;
using System.Collections.Generic;

namespace Backend_Estacionamiento.Models;

public partial class Garaje
{
    public int Id { get; set; }

    public int? Idpropietario { get; set; }

    public int? Idlocalidad { get; set; }

    public int Altura { get; set; }

    public string Calle { get; set; } = null!;

    public string? Descripcion { get; set; }

    public decimal Preciohora { get; set; }

    public int Capacidad { get; set; }

    public bool? Disponible { get; set; }

    public virtual ICollection<Garajefoto> Garajefotos { get; } = new List<Garajefoto>();

    public virtual Localidad? IdlocalidadNavigation { get; set; }

    public virtual Usuario? IdpropietarioNavigation { get; set; }

    public virtual ICollection<Reserva> Reservas { get; } = new List<Reserva>();
}
