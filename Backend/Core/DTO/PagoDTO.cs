namespace Core.DTO
{
    public class PagoDTO
    {
        public int? Idreserva { get; set; }
        public int? Idmetodopago { get; set; }
        public decimal Monto { get; set; }
        public DateTime? Fecha { get; set; }
    }

    public class PagoConId : PagoDTO
    {
        public int Id { get; set; }
    }
}
