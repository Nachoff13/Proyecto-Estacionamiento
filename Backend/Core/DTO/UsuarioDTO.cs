namespace Core.DTO
{
    
    public class UsuarioDTO
    {
        public string Nombre { get; set; }
        public string Apellido { get; set; }
        public string Mail { get; set; }
        public string Username { get; set; } 
        public bool? Esconductor { get; set; }
        public bool? Espropietario { get; set; }
    }

    public class UsuarioCrearDTO
    {
        public string Nombre { get; set; }
        public string Apellido { get; set; }
        public string Mail { get; set; }
        public string Username { get; set; }
        public string Contrasena { get; set; }
        public bool? Esconductor { get; set; }
        public bool? Espropietario { get; set; }
    }

    public class UsuarioConId : UsuarioCrearDTO
    {
        public int Id { get; set; }
    }

    public class UsuarioConIdSinContrasena : UsuarioDTO
    {
        public int Id { get; set; }
    }
}
