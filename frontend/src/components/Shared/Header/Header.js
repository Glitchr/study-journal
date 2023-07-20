import React from 'react';
import { BrowserRouter as Router, Link, useNavigate } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';

import './Shared.css';


function Header({
  currentUser,
  setCurrentUser,
}) {
  const navigate = useNavigate();
  
  const submitLogout = (e) => {
    setCurrentUser(false);
    // Remove the token from local storage
    localStorage.removeItem('token');
    navigate('/logout');
  }

  return (
      <>
        <Navbar>
          <Container>
            <Navbar.Brand>
              <Link to="/" className="navbar-brand-link">
                <Image
                  alt="Logo"
                  src={process.env.PUBLIC_URL + '/logo.png'}
                  width="30"
                  height="30"
                  className="d-inline-block align-top"
                  roundedCircle
                />{' '}
                Study Journal
              </Link>
            </Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
              {currentUser ? (
                <>
                  <Navbar.Text>Conectado como: {currentUser}</Navbar.Text>
                  <Navbar.Text className="">
                    <Link to="/courses">
                      <Button variant="light" className="ms-3">Mis cursos</Button>
                    </Link>
                  </Navbar.Text>
                  <Navbar.Text>
                    <form onSubmit={(e) => submitLogout(e)}>
                      <Button type="submit" variant="light" className="ms-3">
                        Cerrar sesión
                      </Button>
                    </form>
                  </Navbar.Text>
                </>
              ) : (
                <>
                  <Navbar.Text>
                    <Link to="/login">
                      <Button variant="light" className='me-3'>Iniciar sesión</Button>

                    </Link>
                  </Navbar.Text>
                  <Navbar.Text>
                    <Link to="/signup">
                      <Button variant="light">Registrarse</Button>
                    </Link>
                  </Navbar.Text>
                </>
              )}
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </>
  );
}

export default Header;
