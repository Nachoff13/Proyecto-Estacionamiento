const fakeGarajes = [
  {
    id: 1,
    idPropietario: 3, // Este garage pertenece al propietario con id 3
    idLocalidad: 1, // Asumiendo que 1 representa La Plata, puedes ajustar según necesites
    idGarajeEstado: 1,
    altura: '1234',
    calle: 'Calle 10',
    descripcion: 'Garage amplio con cámaras de seguridad, ideal para autos grandes.',
    precioHora: 150.5,
    capacidad: 1
  },
  {
    id: 2,
    idPropietario: 3, // Segundo garage del propietario con id 3
    idLocalidad: 1, // Asumiendo que 1 representa La Plata
    idGarajeEstado: 2,
    altura: '760',
    calle: 'Calle 56',
    descripcion: 'Garage techado, cerca de áreas comerciales.',
    precioHora: 200.75,
    capacidad: 1
  },
  {
    id: 55,
    idPropietario: 2,
    idLocalidad: 1,
    idGarajeEstado: 1,
    altura: 15,
    Calle: 'Av 7 entre 16 y 17',
    descripcion: 'Garaje amplio, techado y seguro.',
    precioHora: 50,
    capacidad: 4,
  },
  {
    id: 56,
    idPropietario: 2,
    idLocalidad: 1,
    idGarajeEstado: 1,
    altura: 22,
    Calle: 'Calle 530 entre 48 y 49',
    descripcion: 'Garaje pequeño, ideal para motocicletas.',
    precioHora: 30,
    capacidad: 1
  },
  {
    id: 57,
    idPropietario: 6,
    idLocalidad: 1,
    idGarajeEstado: 1,
    altura: 10,
    Calle: 'Av 13',
    descripcion: 'Garaje espacioso con vigilancia 24 horas.',
    precioHora: 60,
    capacidad: 5
  },
  {
    id: 58,
    idPropietario: 6,
    idLocalidad: 1,
    idGarajeEstado: 2,
    altura: 10,
    Calle: 'Av 32',
    descripcion: 'Garaje espacioso con vigilancia 24 horas.',
    precioHora: 60,
    capacidad: 5
  }
];

export default fakeGarajes;
