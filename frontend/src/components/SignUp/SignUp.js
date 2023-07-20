import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';

import './SignUp.css';


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
  const [resetForm, setResetForm] = useState(() => () => {
    setUsername('');
    setEmail('');
    setPassword('');
  });

  // Resets the forms once the component is unmounted.
  useEffect(() => {
    return () => {
      resetForm();
    };
  }, [resetForm]);
  
  
  const handleSubmit = (e) => {
    if (validateForm()) {
      e.preventDefault();
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
      .then(function (res) {
        setCurrentUser(username);
        console.log(res.data);
        navigate('/');
      })
      .catch(function (error) {
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
      })
    }
  };


  const validateForm = () => {
    // Validate the form fields
    if (!username) {
      setErrorMessage('El campo de usuario es obligatorio');
      return false;
    } else if (!email) {
      setErrorMessage('El campo de correo es obligatorio');
      return false;
    } else if (!password) {
      setErrorMessage('El campo de contraseña es obligatorio');
      return false;
    } else if (password !== passwordConfirmation) {
      setErrorMessage('Las contraseñas no coinciden');
      return false;
    }
    return true;
  };


  return (
    <div className="register-form-container">
      <div className="register-form">
        <h4 className='text-center'>Crear usuario</h4>
        <hr />
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicUsername">
            <Form.Label>Usuario</Form.Label>
            <Form.Control type="text" placeholder="Ingresar usuario" value={username} onChange={e => setUsername(e.target.value)} />
          </Form.Group>

          <Form.Group className="mb-3" controlId='formBasicEmail'>
            <Form.Label>Correo</Form.Label>
            <Form.Control type='email' placeholder='Ingresar correo' value={email} onChange={e => setEmail(e.target.value)} />
            <Form.Text className="text-muted">
              Nunca compartiremos tu correo electrónico con nadie.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control type="password" placeholder="Contraseña" value={password} onChange={e => setPassword(e.target.value)} />
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
};

export default SignUp;
