import React from 'react';
import { BrowserRouter as Router, Link, useNavigate } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import { Nav, NavDropdown, Dropdown } from 'react-bootstrap';

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
  
  const handleCourseClick = (e) => {
    navigate('/courses');
  }

  return (
      <>
        <Navbar>
          <Container>
            <Navbar.Brand>
              <Link to="/" className="navbar-brand-link">
                <Image
                  alt="Logo"
                  src={process.env.PUBLIC_URL + '/logo.svg'}
                  width="30"
                  height="30"
                  className="d-inline-block align-top"
                />{' '}
                Study Journal
              </Link>
            </Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
              {currentUser ? (
                <>
                  <Navbar.Text className="ms-auto">Conectado como: </Navbar.Text>
                  <NavDropdown className="ms-2" align='end' title={currentUser} id='userLink'>
                    <NavDropdown.Item>Perfil</NavDropdown.Item>
                    <NavDropdown.Item onClick={(e) => handleCourseClick(e)}>Mis cursos</NavDropdown.Item>
                    <Dropdown.Divider />
                    <NavDropdown.Item onClick={(e) => submitLogout(e)}>Cerrar sesión</NavDropdown.Item>
                  </NavDropdown>
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
