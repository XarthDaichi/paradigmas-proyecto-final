import React, { useState, useEffect } from 'react';
import { API_SERVER_URL } from './Url';

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

  return (
    <div>
      <h1>Información About</h1>
      <p>Curso: {about.curso}</p>
      <p>Horario: {about.horario}</p>
      <p>Grupo: {about.grupo}</p>
      <p>Escuela: {about.escuela}</p>
      <p>Universidad: {about.universidad}</p>
      <h2>Autores:</h2>
      <ul>
        {about.autores.map((autor) => (
          <li key={autor.id}>
            <p>Nombre: {autor.name}</p>
            <p>ID: {autor.id}</p>
            <p>Correo: {autor.correo}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default About;
