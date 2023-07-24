import { useState } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';


function UpdateSubject({ client, course, subject, onCancel, onUpdate }) {
  const [name, setName] = useState(subject.name);
  const [description, setDescription] = useState(subject.description);
  const [startDate, setStartDate] = useState(subject.start_date);
  const [endDate, setEndDate] = useState(subject.end_date);
  const [status, setStatus] = useState(subject.status);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!subject) {
      console.log('Error: subject prop is null');
      return;
    }
    // Submit form data to the server
    client.put(subject.url, {
      name: name,
      description: description,
      status: status,
      course: course.url,
      start_date: startDate,
      end_date: endDate,
    }, {
      headers: {
        'Authorization': `Token ${localStorage.getItem('token')}`
      }
    })
      .then(res => {
        alert('Asignatura actualizada satisfacoriamente!');
        onUpdate(res.data);
      })
      .catch(error => {
        alert('Se ha producido un error al actualizar la asignatura. Por favor, inténtelo de nuevo.');
        console.log(error);
      });
  }
  
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className='mb-3' controlId='name'>
        <Form.Label>Nombre</Form.Label>
        <Form.Control type='text' value={name} onChange={e => setName(e.target.value)} />
      </Form.Group>

      <Form.Group className='mb-3' controlId='description'>
        <Form.Label>Descripción</Form.Label>
        <Form.Control type='textarea' value={description} onChange={e => setDescription(e.target.value)} />
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

        <Col>
          <Form.Group className='mb-3' controlId='status'>
            <Form.Label>Estado</Form.Label>
            <Form.Select value={status} onChange={e => setStatus(e.target.value)}>
              <option value='pe'>Pendiente</option>
              <option value='ep'>En progreso</option>
              <option value='co'>Completado</option>
              <option vlaue='sa'>Saltado</option>
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col className='d-grip gap-2'>
          <Button variant='success' type='submit'>Actualizar asignatura</Button>
        </Col>

        <Col className='d-grip gap-2'>
          <Button variant='secondary' onClick={onCancel}>Cancelar</Button>
        </Col>
      </Row>
    </Form>
  );
}

export default UpdateSubject;
