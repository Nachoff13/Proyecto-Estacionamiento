namespace Core.DTO
{
    public class ReservaDTO
    {
        public int? Idgaraje { get; set; }
        public int? Idconductor { get; set; }
        public DateTime Fechainicio { get; set; }
        public DateTime Fechafin { get; set; }
        public string? Estado { get; set; }
        public string Nombre { get; set; }
    }

    public class ReservaConId : ReservaDTO
    {
        public int Id { get; set; }
    }
}
