import React from 'react';

export const Header = (props) => {
  return (
    <header id="header">
      <div className="intro">
        <div className="overlay">
          <div className="container">
            <div className="row">
              <div className="col-md-8 col-md-offset-2 intro-text">
                <h1>
                  Somos <span style={{ color: '#228AF6' }}>GARAJITO</span>, <br />
                  tu garaje de confianza
                  <span></span>
                </h1>
                <a href="#about" className="btn btn-custom btn-lg page-scroll">
                  Leer más
                </a>{' '}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
