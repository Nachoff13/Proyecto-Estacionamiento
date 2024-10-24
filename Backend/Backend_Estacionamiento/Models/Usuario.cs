using System;
using System.Collections.Generic;

namespace Backend_Estacionamiento.Models;

public partial class Usuario
{
    public int Id { get; set; }

    public string? Nombre { get; set; }

    public string? Apellido { get; set; }

    public string Mail { get; set; } = null!;

    public string Username { get; set; } = null!;

    public string Contrasena { get; set; } = null!;

    public bool? Esconductor { get; set; }

    public bool? Espropietario { get; set; }

    public virtual ICollection<Garaje> Garajes { get; } = new List<Garaje>();

    public virtual ICollection<Reserva> Reservas { get; } = new List<Reserva>();

    public virtual ICollection<Vehiculo> Vehiculos { get; } = new List<Vehiculo>();
}
