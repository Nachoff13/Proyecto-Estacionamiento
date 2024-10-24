namespace Core.DTO
{
    public class LocalidadDTO
    {
        public int? Idprovincia { get; set; }
        public string Nombre { get; set; }
        public string Codpostal { get; set; }
    }

    public class LocalidadConId : LocalidadDTO
    {
        public int Id { get; set; }
    }
}
