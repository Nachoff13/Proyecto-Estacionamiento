namespace Core.DTO
{
    public class ReservaDTO
    {
        public int? Idgaraje { get; set; }
        public int? Idconductor { get; set; }

        public int? Idreservaestado { get; set; }
        public DateTime Fechainicio { get; set; }
        public DateTime Fechafin { get; set; }
    }

    public class ReservaConId : ReservaDTO
    {
        public int Id { get; set; }
    }
}
