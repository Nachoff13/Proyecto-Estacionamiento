import React from 'react';

export const Team = (props) => {
  return (
    <div id="team" className="text-center">
      <div className="container">
        <div className="col-md-8 col-md-offset-2 section-title">
          <h2>Conozca al equipo</h2>
          <p>Somos estudiantes de UTN-FRLP</p>
        </div>

        <div className="row">
          {/* Fila 1: 3 miembros */}
          {props.data && props.data.slice(0, 3).map((d, i) => (
            <div key={`${d.name}-${i}`} className="col-md-4 col-sm-6 team">
              <div className="thumbnail">
                <img src={d.img} alt={d.name} className="team-img" style={{ width: '80%', height: '200px', objectFit: 'cover' }}/>
                <div className="caption">
                  <h4>{d.name}</h4>
                  <p>{d.job}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="row">
          {/* Fila 2: 2 miembros */}
          {props.data && props.data.slice(3, 5).map((d, i) => (
            <div key={`${d.name}-${i}`} className="col-md-6 col-sm-6 team">
              <div className="thumbnail">
                <img src={d.img} alt={d.name} className="team-img" style={{ width: '70%', height: '200px', objectFit: 'cover' }}/>
                <div className="caption">
                  <h4>{d.name}</h4>
                  <p>{d.job}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
