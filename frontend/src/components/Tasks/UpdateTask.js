import { useState } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';


function UpdateTask({
  client,
  subject,
  task,
  onCancel,
  onUpdate,
}) {
  const [name, setName] = useState(task.name);
  const [description, setDescription] = useState(task.description);
  const [startDate, setStartDate] = useState(task.start_date);
  const [endDate, setEndDate] = useState(task.end_date);
  const [status, setStatus] = useState(task.status);
  const [dueDate, setDueDate] = useState(task.due_date);

  const handleSubmit = (e) => {
    e.preventDefault();
    client.put(task.url, {
      name: name,
      description: description,
      status: status,
      subject: subject.url,
      start_date: startDate,
      end_date: endDate,
      due_date: dueDate,
    }, {
      headers: {
        'Authorization': `Token ${localStorage.getItem('token')}`
      }
    })
      .then(res => {
        alert('Tarea actualizada satisfactoriamente!');
        onUpdate(res.data);
      })
      .catch(error => {
        alert('Se ha producido un error al actualizar la tarea. Por favor, inténtelo de nuevo.')
        console.log(error);
      })
  }

  return (
      <Form onSubmit={handleSubmit}>
        <Form.Group className='mb-3' controlId='name'>
          <Form.Label>Nombre</Form.Label>
          <Form.Control type='text' value={name} onChange={e => setName(e.target.value)} />
        </Form.Group>
  
        <Form.Group controlId='description'>
          <Form.Label>Descripción</Form.Label>
          <Form.Control as='textarea' value={description} onChange={e => setDescription(e.target.value)} />
        </Form.Group>

        <Row className='mb-3'>
          <Col>
            <Form.Group controlId='dueDate'>
              <Form.Label>Fecha de entrega</Form.Label>
              <Form.Control type='date' value={dueDate} onChange={e => setDueDate(e.target.value)} />
            </Form.Group>
          </Col>

          <Col>
            <Form.Group controlId='status'>
              <Form.Label>Estado</Form.Label>
              <Form.Select value={status} onChange={e => setStatus(e.target.value)}>
                <option value='pe'>Pendiente</option>
                <option value='ep'>En progreso</option>
                <option value='co'>Completado</option>
                <option value='sa'>Saltado</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        <Row className='mb-3'>
          <Col>
            <Form.Group controlId='startDate'>
              <Form.Label>Fecha de inicio</Form.Label>
              <Form.Control type='date' value={startDate} onChange={e => setStartDate(e.target.value)} />
            </Form.Group>
          </Col>
  
          <Col>
            <Form.Group controlId='endDate'>
              <Form.Label>Fecha de finalización</Form.Label>
              <Form.Control type='date' value={endDate} onChange={e => setEndDate(e.target.value)} />
            </Form.Group>
          </Col>
        </Row>
  
        <Row>
          <Col className='d-grid gap-2'>
            <Button variant='success' type='submit'>Actualizar asignatura</Button>
          </Col>
  
          <Col className='d-grid gap-2'>
            <Button variant='secondary' onClick={onCancel}>Cancelar</Button>
          </Col>
        </Row>
    </Form>
  );
}

export default UpdateTask;
