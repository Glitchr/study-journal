import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import './Login.css';
import { validateLoginForm } from '../../utils';


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
  const [formErrors, setFormErrors] = useState({
    username: '',
    password: '',
  });
  const navigate = useNavigate();
  const resetForm = () => {
    setUsername('');
    setPassword('');
    setFormErrors({
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    });
  }
  // Resets the forms once the component is unmounted.
  useEffect(() => {
    return () => {
      resetForm();
    };
  }, []);

  
  const submitLogin = (e) => {
      e.preventDefault();

      const {isValid, errors } = validateLoginForm(username, password);
      setFormErrors(errors);

      if (!isValid) {
        return;
      }

      client
        .post('/api/auth/token/', {
          username: username,
          password: password,
        })
        .then(res => {
          // Store the token in local storage
          localStorage.setItem('token', res.data.token);
          setCurrentUser(username);
          navigate('/');
        })
        .catch(error => {
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
              {formErrors.username && <p className='error-message'>{formErrors.username}</p>}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                  type="password"
                  placeholder="Contraseña"
                  onChange={(e) => setPassword(e.target.value)}
              />
              {formErrors.password && <p className='error-message'>{formErrors.password}</p>}
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
