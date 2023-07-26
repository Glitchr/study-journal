import { useState } from 'react';
import { Card, Row, Col, Button } from 'react-bootstrap';


function TaskDetails({
  client,
  task,
  onUpdateTaskClick,
  onDelete,
}) {
  const STATUS = {
    'pe': 'Pendiente',
    'ep': 'En progreso',
    'co': 'Completado',
    'sa': 'Saltado',    
  }
  const [showCreateTimer, setShowCreateTimer] = useState(false);

  return (
    <Card>
      <Card.Header className='d-flex justify-content-between'>
        {task.name}
        <div>
          <Button className='me-2' variant='dark' size='sm' onClick={onUpdateTaskClick}>
            Editar
          </Button>
          <Button variant='danger' size='sm' onClick={() => onDelete(task)}>
            Eliminar
          </Button>
        </div>
      </Card.Header>
      <Card.Body>
        <Row className='mb-3'>
          <Card.Title>Notas</Card.Title>
          <Card.Text>{task.description}</Card.Text>
        </Row>

        <Row className='mb-3'>
          <Col>
            <Card.Title>Fecha de entrega</Card.Title>
            <Card.Text>{task.due_date}</Card.Text>
          </Col>

          <Col>
            <Card.Title>Estado</Card.Title>
            <Card.Text>{STATUS[task.status]}</Card.Text>
          </Col>
        </Row>

        <Row className='mb-3'>
          <Col>
            <Card.Title>Progreso</Card.Title>
            <Card.Text>progressBar</Card.Text>
          </Col>

          <Col>
            <Card.Title>Tiempo</Card.Title>
            <Card.Text>timerDuration</Card.Text>
          </Col>
        </Row> 

        <Row className='mb-3'>
          <Col>
            <Card.Title>Fecha de Inicio</Card.Title>
            <Card.Text>{task.start_date}</Card.Text>
          </Col>

          <Col>
            <Card.Title>Fecha de finalización</Card.Title>
            <Card.Text>{task.end_date}</Card.Text>
          </Col>
        </Row>
      </Card.Body>
      <Card.Footer>
        <Button variant='success' size='sm'>
          Temporizador
        </Button>
      </Card.Footer>
    </Card>
  );
}

export default TaskDetails;
