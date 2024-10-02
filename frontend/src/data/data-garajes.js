const fakeGarajes = [
    {
      id: 1,
      idPropietario: 3, // Este garage pertenece al propietario con id 3
      idLocalidad: 1,    // Asumiendo que 1 representa La Plata, puedes ajustar según necesites
      idGarajeEstado: 1, 
      altura: '1234',
      calle: 'Calle Falsa',
      descripcion: 'Garage amplio con cámaras de seguridad, ideal para autos grandes.',
      precioHora: 150.50,
      capacidad: 2,
    },
    {
      id: 2,
      idPropietario: 3, // Segundo garage del propietario con id 3
      idLocalidad: 1,    // Asumiendo que 1 representa La Plata
      idGarajeEstado: 2,
      altura: '5678',
      calle: 'Avenida Siempreviva',
      descripcion: 'Garage techado, cerca de áreas comerciales.',
      precioHora: 200.75,
      capacidad: 3,
      Estado: 'Ocupado'
    }
  ];
  
  export default fakeGarajes;
  