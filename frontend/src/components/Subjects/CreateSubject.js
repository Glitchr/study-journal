import { useState } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';


function CreateSubject({ client, course, onCreate, onCancel }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('pe');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit the form data to the server
    client.post('/api/subjects/', {
      name: name,
      description: description,
      status: status,
      course: course.url,
      start_date: startDate || null,
      end_date: endDate || null,
    }, {
      headers: {
        'Authorization': `Token ${localStorage.getItem('token')}`
      }
    })
      .then(res => {
        alert('Asignatura creada satisfactoriamente!')
        onCreate(res.data);
      }) 
      .catch(error => {
        alert('Se ha producido un error al crear la asignatura. Por favor, inténtelo de nuevo.')
        console.log(error);
      });
  }

  return (
    <Form className='m-3' onSubmit={handleSubmit}>
      <Form.Group className='mb-3' controlId='name'>
        <Form.Label>Nombre</Form.Label>
        <Form.Control type='text' value={name} onChange={e => setName(e.target.value)} />
      </Form.Group>

      <Form.Group className='mb-3' controlId='description'>
        <Form.Label>Descripción</Form.Label>
        <Form.Control as='textarea' value={description} onChange={e => setDescription(e.target.value)} /> 
      </Form.Group>

      <Form.Group className='mb-3' controlId='status'>
        <Form.Label>Estado</Form.Label>
        <Form.Select value={status} onChange={e => setStatus(e.target.value)}>
          <option value='pe'>Pendiente</option>
          <option value='ep'>En progreso</option>
          <option value='co'>Completado</option>
          <option value='sa'>Saltado</option>
        </Form.Select>
      </Form.Group>

      <Row>
        <Col>
          <Form.Group className='mb-3' controlId='startDate'>
            <Form.Label>Fecha de inicio</Form.Label>
            <Form.Control type='date' value={startDate} onChange={e => setStartDate(e.target.value)} />
          </Form.Group>
        </Col>

        <Col>
          <Form.Group className='mb-3' controlId='endDate'>
            <Form.Label>Fecha de finalización</Form.Label>
            <Form.Control type='date' value={endDate} onChange={e => setEndDate(e.target.value)} />
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col className='d-grid gap-2'>
          <Button variant='success' type='submit'>Crear Asignatura</Button>
        </Col>

        <Col className='d-grid gap-2'>
          <Button variant='secondary' onClick={onCancel}>Cancelar</Button>
        </Col>
      </Row>
    </Form>
  );
}

export default CreateSubject;
