import React from 'react';
import { useNavigate } from 'react-router-dom';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import './Login.css';


function Login({
    client, 
    username, 
    setUsername, 
    password, 
    setPassword, 
    setCurrentUser,
    errorMessage,
    setErrorMessage,
}) {

  const navigate = useNavigate();

  function submitLogin(e) {
      e.preventDefault();
      client
        .post('/api/auth/token/', {
          username: username,
          password: password,
        })
        .then(function (res) {
          // Store the token in local storage
          localStorage.setItem('token', res.data.token);
          setCurrentUser(username);
          navigate('/');
        })
        .catch(function (error) {
          // Handle authentication errors
          if (error.response && error.response.status === 400) {
            setErrorMessage('Usuario o contraseña incorrectos');
          } else {
            setErrorMessage('Ocurrió un error al iniciar sesión');
          }
        });
    }

    return (
      <div className="login-form-container"> 
        <div className="login-form">
          <h4 className='text-center'>Iniciar sesión</h4>
          <hr />
          <Form onSubmit={submitLogin}>
              <Form.Group className="mb-3" controlId="formBasicUsername">
                <Form.Label>Usuario</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Ingresar usuario"
                    onChange={(e) => setUsername(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="Contraseña"
                    onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>

              {errorMessage && <p className="error-message">{errorMessage}</p>}
              
              <div className='d-grid gap-2'>
                <Button variant="success" type="submit" >
                Enviar
                </Button>
              </div>
          </Form>
        </div>
      </div>
    );
}

export default Login;
