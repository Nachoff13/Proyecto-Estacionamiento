namespace Backend_Estacionamiento.DTOs
{
    public class ReservaEstadoDTO
    {
        public string Nombre { get; set; }
    }

    public class ProvinciaConId : ReservaEstadoDTO
    {
        public int Id { get; set; }
    }
}
