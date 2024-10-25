namespace Core.DTO
{
    public class MetodopagoDTO
    {
        public string Nombre { get; set; }

    }

    public class MetodopagoConId : MetodopagoDTO
    {
        public int Id { get; set; }
    }
}
