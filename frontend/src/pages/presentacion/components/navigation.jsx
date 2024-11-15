import React from 'react';
import { Link } from 'react-router-dom';
import  logo  from '../../../assets/images/logo.png';

export const Navigation = (props) => {
  const loginButtonStyle = {
    display: 'inline-block',
    backgroundColor: '#228AF6',
    color: 'white',
    padding: '10px 20px',
    borderRadius: '5px',
    textDecoration: 'none',
    fontWeight: 'bold'
  };

  const loginButtonHoverStyle = {
    backgroundColor: 'darkblue'
  };

  const registerLinkStyle = {
    color: '#228AF6',
    textDecoration: 'none',
    fontWeight: 'bold'
  };

  const registerLinkHoverStyle = {
    color: 'darkblue'
  };

  return (
    <nav id="menu" className="navbar navbar-default navbar-fixed-top">
      <div className="container">
        <div className="navbar-header" style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', marginTop: '-10px'}} >
          <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
            {' '}
            <span className="sr-only">Toggle navigation</span> <span className="icon-bar"></span> <span className="icon-bar"></span>{' '}
            <span className="icon-bar"></span>{' '}
          </button>
          <a className="navbar-brand page-scroll" href="#page-top">
          <img src={logo} alt="Logo" style={{ height: '47px', display: 'block' }} />
          </a>{' '}
        </div>

        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
          <ul className="nav navbar-nav navbar-right">
            <li>
              <a href="#about" className="page-scroll">
               Sobre Nosotros
              </a>
            </li>
            <li>
              <a href="#services" className="page-scroll">
                Servicios
              </a>
            </li>
            <li>
              <a href="#testimonials" className="page-scroll">
                Testimonios
              </a>
            </li>
            <li>
              <a href="#team" className="page-scroll">
                Team
              </a>
            </li>
            <li>
              <a href="#contact" className="page-scroll">
                Contacto
              </a>
            </li>
            <li>
              <Link className="page-scroll" to="/login" style={loginButtonStyle}>Iniciar Sesión</Link>
            </li>
            <li>
              <Link className="page-scroll" to="/register" style={registerLinkStyle}>Registrarme</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    
  );
};
