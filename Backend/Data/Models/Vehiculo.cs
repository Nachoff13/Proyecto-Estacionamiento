using System;
using System.Collections.Generic;

namespace Data.Models;

public partial class Vehiculo
{
    public int Id { get; set; }

    public int? Idconductor { get; set; }

    public int? Idmodelo { get; set; }

    public string Matricula { get; set; }

    public virtual Usuario? IdconductorNavigation { get; set; }

    public virtual Modelo? IdmodeloNavigation { get; set; }
}
