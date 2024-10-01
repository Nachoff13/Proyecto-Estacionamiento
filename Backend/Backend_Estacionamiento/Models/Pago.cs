using System;
using System.Collections.Generic;

namespace Backend_Estacionamiento.Models;

public partial class Pago
{
    public int Id { get; set; }

    public int? Idreserva { get; set; }

    public int? Idmetodopago { get; set; }

    public decimal Monto { get; set; }

    public DateTime? Fecha { get; set; }

    public virtual Metodopago? IdmetodopagoNavigation { get; set; }

    public virtual Reserva? IdreservaNavigation { get; set; }
}
