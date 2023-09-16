import React from 'react';

const About = () => {
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center">Estudiantes</h2>
              <ul className="list-group">
                <li className="list-group-item">Daniela Madrigal Morales</li>
                <li className="list-group-item">Jennifer Lobo Vásquez</li>
                <li className="list-group-item">Diego Quiros Artiñano</li>
                <li className="list-group-item">Jorge Durán Campos</li>
              </ul>
              <div className="mt-4">
                <h3>Curso:</h3>
                <p>Paradigmas de Programación</p>
                <h3>Horario:</h3>
                <p>6:00 PM</p>
                <h3>Grupo:</h3>
                <p>Grupo 03</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
