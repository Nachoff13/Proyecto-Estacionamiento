import React from 'react';

export const Services = (props) => {
  return (
    <>
      <div id="services" className="text-center">
        <div className="container">
          <div className="section-title">
            <h2>Nuestros servicios</h2>
            <p>Servicios que ofrecemos</p>
          </div>
          <div className="row">
            <div className="col-md-4">
              <div className="icon-circle">
                <i className="fa fa-cloud-download"></i> {/* Icono redondo */}
              </div>
              <h4>Publicación de Garaje</h4>
              <p>
                Permite a los propietarios listar sus garajes disponibles para alquiler, incluyendo detalles como fotos, ubicación y precio.
              </p>
            </div>
            <div className="col-md-4">
              <div className="icon-circle">
                <i className="fa fa-calendar"></i> {/* Icono redondo */}
              </div>
              <h4>Reserva de Garaje</h4>
              <p>Los conductores pueden buscar, seleccionar y reservar un garaje adecuado a sus necesidades de manera rápida y sencilla.</p>
            </div>
            <div className="col-md-4">
              <div className="icon-circle">
                <i className="fa fa-map-marker"></i> {/* Icono redondo */}
              </div>
              <h4>Ubicación con el Mapa</h4>
              <p>Visualiza en un mapa interactivo los garajes disponibles cerca de tu ubicación para una fácil elección.</p>
            </div>
            <div className="col-md-4 spacing-top">
              <div className="icon-circle">
                <i className="fa fa-shield"></i> {/* Icono redondo */}
              </div>
              <h4>Seguridad y Verificación</h4>
              <p>Todos los garajes y propietarios son verificados para garantizar la seguridad de los usuarios.</p>
            </div>
            <div className="col-md-4  spacing-top">
              <div className="icon-circle">
                <i className="fa fa-cog"></i>
              </div>
              <h4>Gestión de Reservas para Propietarios</h4>
              <p>Los propietarios pueden gestionar sus garajes, ver reservas futuras y ajustar la disponibilidad en tiempo real.</p>
            </div>
            <div className="col-md-4  spacing-top">
              <div className="icon-circle">
                <i className="fa fa-star"></i> {/* Icono redondo */}
              </div>
              <h4>Comentarios y Valoraciones</h4>
              <p>Deja comentarios y calificaciones para ayudar a otros conductores a encontrar los mejores garajes disponibles.</p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .icon-circle {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 150px;
          height: 100px;
          border-radius: 10%;
          color: #fff;
          font-size: 24px;
          margin: 0 auto 15px;
        }
          .spacing-top {
          margin-top: 40px; 
        }
      `}</style>
    </>
  );
};
