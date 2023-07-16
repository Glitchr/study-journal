import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


function Login({
    client, 
    username, 
    setUsername, 
    password, 
    setPassword, 
    setCurrentUser 
}) {
    function submitLogin(e) {
        e.preventDefault();
        client.post('/api/auth/token/', {
            username: username,
            password: password,
          })
          .then(function (res) {
            // Store the token in local storage
            localStorage.setItem('token', res.data.token);
            // Get the current user's information
            client.get('/api/users/', {
                headers: { Authorization: `Token ${res.data.token}` },
              })
              .then(function (res) {
                // Update the value of currentUser in App.js
                setCurrentUser(username);
              });
          });
      }

    return (
      <div className="center">
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
          <Button variant="primary" type="submit">
            Enviar
          </Button>
        </Form>
      </div>
    );
  }

export default Login;
