namespace Backend_Estacionamiento.DTO
{
    public class UsuarioDto
    {
        public int Id { get; set; }
        public string Nombre { get; set; }
        public string Apellido { get; set; }
        public string Mail { get; set; }
        public bool? Esconductor { get; set; }
        public bool? Espropietario { get; set; }
    }

}
