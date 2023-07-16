import React from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';

import './Header.css';


function Header({
  client,
  currentUser,
  setCurrentUser,
}) {
  function submitLogout(e) {
    e.preventDefault();
    client
      .post('/api/logout', { withCredentials: true })
      .then(function (res) {
        setCurrentUser(false);
        // Remove the token from local storage
        localStorage.removeItem('token');
      });
  }

  return (
      <>
        <Navbar className="bg-lime-green">
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
                  <Navbar.Text>
                    <form onSubmit={(e) => submitLogout(e)}>
                      <Button type="submit" variant="light">
                        Cerrar sesion
                      </Button>
                    </form>
                  </Navbar.Text>
                </>
              ) : (
                <>
                  <Navbar.Text>
                    <Link to="/login">
                      <Button variant="light">Iniciar sesion</Button>
                    </Link>
                  </Navbar.Text>
                  <Navbar.Text>
                    <Link to="/register">
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
