namespace Core.DTO
{
    public class GarajeDTO
    {
        public int? Idpropietario { get; set; }
        public int? Idlocalidad { get; set; }
        public int Altura { get; set; }
        public string Calle { get; set; }
        public string? Descripcion { get; set; }
        public decimal Preciohora { get; set; }
        public int Capacidad { get; set; }
        public bool? Disponible { get; set; }
    }

    public class GarajeConId : GarajeDTO
    {
        public int Id { get; set; }
    }
}
