import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import './SignUp.css';
import { validateSignUpForm } from '../../utils';


function SignUp({
  client,
  username,
  setUsername,
  email,
  setEmail,
  password, 
  setPassword,
  errorMessage,
  setErrorMessage,
  setCurrentUser,
}) {
  const navigate = useNavigate();
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [formErrors, setFormErrors] = useState({
    username: '',
    email: '',
    password: '',
  });
  const resetForm = () => {
    setUsername('');
    setEmail('');
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
  
  
  const handleSubmit = (e) => {
    e.preventDefault();
  
    const { isValid, errors } = validateSignUpForm(
      username,
      email,
      password,
      passwordConfirmation,
    );
    setFormErrors(errors);
  
    if (!isValid) {
      return;
    }
  
    client
      .post('/api/users/', {
        username,
        password,
        email,
        profile: {
          avatar: null,
          bio: '',
          birth_date: null,
        },
      })
      .then(res => {
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
            // Handle errors when obtaining the token
            setErrorMessage('Ocurrió un error al iniciar sesión');
          });
      })
      .catch(error => {
        if (error.response && error.response.status === 400) {
          if (error.response.data) {
            // Display the first validation error in Spanish
            const [firstField, firstErrors] = Object.entries(error.response.data)[0];
            setErrorMessage(firstErrors[0]);
          } else {
            // Display a generic error message in Spanish
            setErrorMessage('Ocurrió un error al crear el usuario');
          }
        } else {
          // Handle other types of errors
          setErrorMessage('Ocurrió un error inesperado');
        }
      });
  }

  return (
    <div className="register-form-container">
      <div className="register-form">
        <h4 className='text-center'>Crear usuario</h4>
        <hr />
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicUsername">
            <Form.Label>Usuario</Form.Label>
            <Form.Control type="text" placeholder="Ingresar usuario" value={username} onChange={e => setUsername(e.target.value)} />
            {formErrors.username && <p className="error-message">{formErrors.username}</p>}
          </Form.Group>

          <Form.Group className="mb-3" controlId='formBasicEmail'>
            <Form.Label>Correo</Form.Label>
            <Form.Control type='email' placeholder='Ingresar correo' value={email} onChange={e => setEmail(e.target.value)} />
            {formErrors.email && <p className="error-message">{formErrors.email}</p>}
            <Form.Text className="text-muted">
              Nunca compartiremos tu correo electrónico con nadie.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control type="password" placeholder="Contraseña" value={password} onChange={e => setPassword(e.target.value)} />
            {formErrors.password && <p className="error-message">{formErrors.password}</p>}
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
            <Form.Label>Confirmar contraseña</Form.Label>
            <Form.Control type="password" placeholder="Confirmar contraseña" value={passwordConfirmation} onChange={e => setPasswordConfirmation(e.target.value)} />
            {formErrors.passwordConfirmation && <p className="error-message">{formErrors.passwordConfirmation}</p>}
          </Form.Group>
          
          <div className='d-grid gap-2'>
            <Button variant="success" type="submit" >
              Enviar
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default SignUp;
