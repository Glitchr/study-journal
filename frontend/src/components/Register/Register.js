import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function Register({ client, username, setUsername, password, setPassword }) {
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await client.post('/api/users/', {
                username, 
                password,
                email: '',
                profile: {
                    avatar: null,
                    bio: '',
                    birth_date: null,
                },
            });
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="center">
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicUsername">
            <Form.Label>Usuario</Form.Label>
            <Form.Control type="text" placeholder="Ingresar usuario" value={username} onChange={e => setUsername(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control type="password" placeholder="Contraseña" value={password} onChange={e => setPassword(e.target.value)} />
          </Form.Group>
          <Button variant="primary" type="submit">
            Enviar
          </Button>
        </Form>
      </div>
    );
};

export default Register;
