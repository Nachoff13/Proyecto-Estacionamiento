namespace Backend_Estacionamiento.Models
{
    public class ReservaEstado
    {
        public int Id { get; set; }
        public string Nombre { get; set; }

        public virtual ICollection<Reserva> Reservas { get; } = new List<Reserva>();
    }
}
