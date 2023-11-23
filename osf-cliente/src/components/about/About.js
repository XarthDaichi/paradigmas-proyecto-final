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
    <div className="container mt-5" style={{ fontFamily: "'Baloo 2', cursive" }}>
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow-lg p-3 mb-5 bg-body rounded">
            <div className="card-body">
              <h1 className="text-center text-primary">One Flow Stream</h1>
              <p className="text-muted">{about.introduccion}</p>
              <p><strong>Horario:</strong> {about.horario}</p>
              <p><strong>Grupo:</strong> {about.grupo}</p>
              <h2 className="text-center text-success mb-4">Estudiantes</h2>
              <ul className="list-group list-group-flush">
                {about.autores.map((autor) => (
                  <li key={autor.id} className="list-group-item">
                    <p className="fw-bold">Nombre: {autor.name}</p>
                    <p>ID: {autor.id}</p>
                    <p>Correo: {autor.correo}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  
};

export default About;
