import { useState } from 'react';
import { Card, Row, Col, Button } from 'react-bootstrap';
import CreateTask from '../Tasks/CreateTask';


function SubjectDetails({
  client,
  course,
  subject,
  onUpdateSubjectClick,
  onDelete,
  onAddTask,
}) {
  const STATUS = {
    'pe': 'Pendiente',
    'ep': 'En progreso',
    'co': 'Completado',
    'sa': 'Saltado',
  };
  const [showCreateTask, setShowCreateTask] = useState(false);
  
  return (
    <Card>
      <Card.Header className='d-flex justify-content-between'>
        {subject.name}
        <div>
          <Button className='me-2' variant='dark' size='sm' onClick={onUpdateSubjectClick}>
            Editar
          </Button>
          <Button variant='danger' size='sm' onClick={() => onDelete(subject)}>Eliminar</Button>
        </div>
      </Card.Header>
      <Card.Body>
        <Card.Title>Descripción</Card.Title>
        <Card.Text className='mb-3'>{subject.description}</Card.Text>

        <Row className='mb-3'>
          <Col>
            <Card.Title>Fecha de inicio</Card.Title>
            <Card.Text>{subject.start_date}</Card.Text>
          </Col>

          <Col>
            <Card.Title>Fecha de finalización</Card.Title>
            <Card.Text>{subject.end_date}</Card.Text>
          </Col>

          <Col>
            <Card.Title>Estado</Card.Title>
            <Card.Text>{STATUS[subject.status]}</Card.Text>
          </Col>
        </Row>

        <Card.Title>Progreso</Card.Title>
        <Card.Text>progressBar</Card.Text>
      </Card.Body>
      <Card.Footer>
        <Button variant='success' size='sm' onClick={() => setShowCreateTask(true)}>
          Añadir tarea
        </Button>
      </Card.Footer>
      {showCreateTask && (
        <CreateTask 
          client={client}
          subject={subject}
          onCreate={(newTask) => {
            setShowCreateTask(false);
            onAddTask(newTask, course, subject);
          }}
          onCancel={() => setShowCreateTask(false)}
        />
      )}
    </Card>
  );
}

export default SubjectDetails;
