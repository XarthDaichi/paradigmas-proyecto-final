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
    return <div>Cargando...</div>; 
  }

  

  const customStyle = {
    fontFamily: 'Roboto, sans-serif', // Utiliza la fuente "Roboto" o la que desees
    fontSize: '18px',
    lineHeight: '1.5',
    textAlign: 'justify',
    color: '#333',
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card bg-light">
            <div className="card-body">
              <h1 className="text-center" style={customStyle}>One Flow Stream</h1>
              <p style={customStyle}>{about.introduccion}</p>
              <p style={customStyle}>Horario: {about.horario}</p>
              <p style={customStyle}>Grupo: {about.grupo}</p>
              <h2 className="text-center mb-4" style={customStyle}>Estudiantes</h2>
              <ul className="list-group">
                {about.autores.map((autor) => (
                  <li key={autor.id} className="list-group-item">
                    <p style={customStyle}>Nombre: {autor.name}</p>
                    <p style={customStyle}>ID: {autor.id}</p>
                    <p style={customStyle}>Correo: {autor.correo}</p>
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
