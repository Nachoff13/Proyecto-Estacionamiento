namespace Core.DTO
{
    public class ProvinciaDTO
    {
        public string Nombre { get; set; }
    }

    public class ProvinciaConId : ProvinciaDTO
    {
        public int Id { get; set; }
    }
}
