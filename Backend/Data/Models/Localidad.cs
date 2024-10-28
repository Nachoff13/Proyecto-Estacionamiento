using System;
using System.Collections.Generic;

namespace Data.Models;

public partial class Localidad
{
    public int Id { get; set; }

    public int? Idprovincia { get; set; }

    public string Nombre { get; set; } = null!;

    public string Codpostal { get; set; } = null!;

    public virtual ICollection<Garaje> Garajes { get; } = new List<Garaje>();

    public virtual Provincia? IdprovinciaNavigation { get; set; }
}
