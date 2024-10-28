namespace Core.DTO
{
    public class ReservaEstadoDTO
    {
        public string Nombre { get; set; }
    }

    public class ReservaEstadoConId : ReservaEstadoDTO
    {
        public int Id { get; set; }
    }
}
