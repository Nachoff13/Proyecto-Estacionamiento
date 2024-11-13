namespace Core.DTO
{
    public class GarajefotoDTO
    {
        public int? Idgaraje { get; set; }
        public byte[]? Foto { get; set; }
    }

    public class GarajefotoConId : GarajefotoDTO
    {
        public int Id { get; set; }
    }
}
