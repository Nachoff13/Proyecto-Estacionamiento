namespace Core.DTO
{
    public class VehiculoDTO
    {
        public int? Idconductor { get; set; }
        public int? Idmodelo { get; set; }
        public string Matricula { get; set; }
    }

    public class VehiculoConId : VehiculoDTO
    {
        public int Id { get; set; }
    }
}
