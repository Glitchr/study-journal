import { useState, useEffect } from 'react';
import { Card, Row, Col, Button, ProgressBar } from 'react-bootstrap';
import CreateTask from '../Tasks/CreateTask';
import { secondsToHms } from '../../utils';


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
  const [subjectData, setSubjectData] = useState(subject);

  useEffect(() => {
    const fetchTaskData = async () => {
      try {
        const response = await client.get(subject.url, {
          headers: {
            'Authorization': `Token ${localStorage.getItem('token')}`
          }
        });
        setSubjectData(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchTaskData();
  }, [client, subject]);
  
  return (
    <div>
      <Card className='mb-3 rounded'>
        <Card.Header className='d-flex justify-content-between'>
          {subject.name}
          <div>
            <Button className='me-2' variant='dark' size='sm' onClick={onUpdateSubjectClick}>
              Editar
            </Button>
            <Button variant='danger' size='sm' onClick={() => onDelete(subject)}>Eliminar</Button>
          </div>
        </Card.Header>
      </Card>

      <Card className='mb-3 rounded'>
        <Card.Body>
            <Card.Title>Descripción</Card.Title>
            <Card.Text>{subjectData.description}</Card.Text>
        </Card.Body>
      </Card>

      <Card className='mb-3 rounded'>
        <Card.Body>
          <Row>
            <Col className='mb-3'>
              <Card.Title>Fecha de inicio</Card.Title>
              <Card.Text>{subjectData.start_date}</Card.Text>
            </Col>

            <Col>
              <Card.Title>Fecha de finalización</Card.Title>
              <Card.Text>{subjectData.end_date}</Card.Text>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <Card className='mb-3 rounded'>
        <Card.Body>
          <Row>
            <Col className='mb-3'>
              <Card.Title>Estado</Card.Title>
              <Card.Text>{STATUS[subjectData.status]}</Card.Text>
            </Col>

            <Col className='mb-3'>
              <Card.Title>Tiempo</Card.Title>
              <Card.Text>{secondsToHms(subjectData.total_time)}</Card.Text>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <Card className='mb-3 rounded'>
        <Card.Body>
        <Card.Title>Progreso</Card.Title>
            <ProgressBar now={subjectData.progress * 100} />
        </Card.Body>
      </Card>

      <Card.Footer>
        <Button variant='success' size='sm' onClick={() => setShowCreateTask(true)}>
          Añadir Tarea
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
    </div>
  );
}

export default SubjectDetails;
