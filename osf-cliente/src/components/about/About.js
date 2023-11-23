import React, { useState, useEffect } from 'react';
import { API_SERVER_URL } from '../api/Url';

const About = () => {
  const [about, setAbout] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_SERVER_URL}/about`);
        if (!response.ok) {
          throw new Error('No se pudo obtener la información');
        }
        const data = await response.json();
        setAbout(data);
      } catch (error) {
        console.error('Error al recuperar la información sobre About:', error);
      }
    };
  
    fetchData();
  }, []);
  

  console.log(about);

  if (!about) {
    return (
      <div className="text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    ); 
  }


  return (
    <div className="container mt-3" style={{ fontFamily: "'Baloo 2', cursive" }}>
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow-lg p-3 mb-5 bg-body rounded ">
            <div className="card-body">
              <h1 className="text-center text-primary">One Flow Stream</h1>
              <p className="text-muted">{about.introduccion}</p>
              <p className="text-center"><strong>Horario:</strong> {about.horario}  <strong>Grupo:</strong> {about.grupo}</p>
              <h2 className="text-center text-primary mb-2">Estudiantes</h2>
              <div className="row ">
                {about.autores.map((autor, index) => (
                  <div key={autor.id} className={`col-md-6  ${index % 2 === 0 ? 'pe-2' : 'ps-2'}`}>
                    <div className="card mb-2">
                      <div className="card-body">
                        <p className="fw-bold">{autor.name}</p>
                        <p>ID: {autor.id}</p>
                        <p>Correo: {autor.correo}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  
};

export default About;
