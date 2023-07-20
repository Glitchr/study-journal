import React from 'react';

import Container from 'react-bootstrap/Container';

import './Login.css';


function Logout() {
  return (
    <div>
      <Container>
        <h1 className='text-left logout-text'>Has cerrado sesión. Te esperamos de vuelta!</h1>
        <hr />
      </Container>
    </div>
  )
}

export default Logout;
