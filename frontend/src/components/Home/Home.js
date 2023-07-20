import React from 'react';
import Container from 'react-bootstrap/Container';

import './Home.css';


function Home() {
  return (
    <div>
      <Container>
        <h1 className='home-text'>Organiza tus estudios y triunfa con Study Journal</h1>
        <h4>Crea tus propios cursos, asignaturas y tareas a tu tiempo.</h4>
      </Container>
    </div>
  )
}

export default Home;