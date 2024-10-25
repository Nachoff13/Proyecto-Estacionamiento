namespace Core.DTO
{
    public class ModeloDTO
    {
        public int? Idmarca { get; set; }
        public string Nombre { get; set; }
    }

    public class ModeloConId : ModeloDTO
    {
        public int Id { get; set; }
    }
}
