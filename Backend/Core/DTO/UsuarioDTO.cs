namespace Core.DTO
{
    
    public class UsuarioDTO
    {
        public string Nombre { get; set; }
        public string Apellido { get; set; }
        public string Mail { get; set; }
        public bool? Esconductor { get; set; }
        public bool? Espropietario { get; set; }
    }

    public class UsuarioConId : UsuarioDTO
    {
        public int Id { get; set; }
    }
}
