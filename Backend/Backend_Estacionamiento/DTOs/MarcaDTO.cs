namespace Core.DTO
{
    public class MarcaDTO
    {
        public string Nombre { get; set; }
    }

    public class MarcaConId : MarcaDTO
    {
        public int Id { get; set; }
    }
}
