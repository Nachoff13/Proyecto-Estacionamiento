export const fakeReservas = [
    { id: 1, idGaraje: 1, idConductor: 1, fechaInicio: '2024-10-20T10:00:00', fechaFin: '2024-10-20T12:00:00', idEstado: 1 }, // Completado
    { id: 2, idGaraje: 1, idConductor: 2, fechaInicio: '2024-10-20T13:00:00', fechaFin: '2024-10-20T15:00:00', idEstado: 1 }, // Completado
    { id: 3, idGaraje: 1, idConductor: 1, fechaInicio: '2024-10-20T16:00:00', fechaFin: '2024-10-20T18:00:00', idEstado: 2 }, // Pendiente
    { id: 4, idGaraje: 1, idConductor: 4, fechaInicio: '2024-10-21T09:00:00', fechaFin: '2024-10-21T11:00:00', idEstado: 3 }, // Rechazado
    { id: 5, idGaraje: 1, idConductor: 5, fechaInicio: '2024-10-21T12:00:00', fechaFin: '2024-10-21T14:00:00', idEstado: 1 }, // Completado
    { id: 6, idGaraje: 2, idConductor: 6, fechaInicio: '2024-10-22T10:00:00', fechaFin: '2024-10-22T12:00:00', idEstado: 2 }, // Pendiente
    { id: 7, idGaraje: 2, idConductor: 1, fechaInicio: '2024-10-22T13:00:00', fechaFin: '2024-10-22T15:00:00', idEstado: 1 }, // Completado
    { id: 8, idGaraje: 2, idConductor: 2, fechaInicio: '2024-10-23T09:00:00', fechaFin: '2024-10-23T11:00:00', idEstado: 3 }, // Rechazado
    { id: 9, idGaraje: 3, idConductor: 4, fechaInicio: '2024-10-24T10:00:00', fechaFin: '2024-10-24T12:00:00', idEstado: 1 }, // Completado
    { id: 10, idGaraje: 3, idConductor: 5, fechaInicio: '2024-10-24T13:00:00', fechaFin: '2024-10-24T15:00:00', idEstado: 2 }  // Pendiente
];



export const fakeReservaEstado = [
    { id: 1, nombre: 'Pendiente' },
    { id: 2, nombre: 'Completado' },
    { id: 3, nombre: 'Rechazado' }
]