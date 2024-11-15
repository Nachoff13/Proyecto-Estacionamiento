import React from 'react';
import about from '../../../assets/images/presentacion/about/about.jpg';

export const About = (props) => {
  return (
    <div id="about">
      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-md-6">
            {' '}
            <img src={about} className="img-responsive" alt="" />{' '}
          </div>
          <div className="col-xs-12 col-md-6">
            <div className="about-text">
              <h2>Sobre Nosotros</h2>
              <p>
                En GARAJITO, somos una empresa dedicada a ofrecer una solución innovadora para propietarios y conductores en La Plata,
                provincia de Buenos Aires. Nuestro objetivo es conectar a quienes tienen garajes disponibles con aquellos que necesitan un
                espacio para estacionar de forma rápida, segura y conveniente.
              </p>
              <h3>¿Cómo funciona?</h3>
              <div className="list-style row">
                <div className="col-lg-6 col-sm-6 col-xs-12">
                  <ul>
                    <li>
                      <strong>Para los propietarios:</strong> Si tienes un garaje o espacio disponible, puedes ofrecerlo a través de nuestra
                      plataforma para que otros usuarios lo alquilen. Es una forma fácil y flexible de generar ingresos con un espacio que
                      no utilizas constantemente.
                    </li>
                  </ul>
                </div>
                <div className="col-lg-6 col-sm-6 col-xs-12">
                  <ul>
                    <li>
                      <strong>Para los conductores:</strong> A través de nuestra plataforma, puedes ver en tiempo real qué garajes están
                      disponibles cerca de tu ubicación. Nuestro mapa interactivo te permitirá encontrar y reservar el lugar perfecto para
                      estacionar tu vehículo, sin la preocupación de no encontrar un espacio libre.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
