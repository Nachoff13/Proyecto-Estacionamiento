using System;
using System.Collections.Generic;

namespace Backend_Estacionamiento.Models;

public partial class Vehiculo
{
    public int Id { get; set; }

    public int? Idconductor { get; set; }

    public int? Idmodelo { get; set; }

    public int Matricula { get; set; }

    public virtual Usuario? IdconductorNavigation { get; set; }

    public virtual Modelo? IdmodeloNavigation { get; set; }
}
