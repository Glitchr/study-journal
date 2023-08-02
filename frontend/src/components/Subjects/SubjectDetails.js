import { useState, useEffect } from 'react';
import { Card, Row, Col, Button, ProgressBar } from 'react-bootstrap';
import CreateTask from '../Tasks/CreateTask';
import { secondsToHms } from '../../utils';
import { FaBookOpen } from 'react-icons/fa';
import { FaCalendarDays, FaCalendarCheck, FaChartSimple, FaRegClock, FaBarsProgress } from "react-icons/fa6";

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
          <div className='d-flex'>
            <FaBookOpen/>
            <Card.Title className='ms-2'>Descripción</Card.Title>
          </div>
          <Card.Text>{subjectData.description}</Card.Text>
        </Card.Body>
      </Card>

      <Card className='mb-3 rounded'>
        <Card.Body>
          <Row>
            <Col className='mb-3'>
              <div className='d-flex'>
                <FaCalendarDays />
                <Card.Title className='ms-2'>Fecha de inicio</Card.Title>
              </div>
              <Card.Text>{subjectData.start_date}</Card.Text>
            </Col>

            <Col>
              <div className='d-flex'>
                <FaCalendarCheck />
                <Card.Title className='ms-2'>Fecha de finalización</Card.Title>
              </div>
              <Card.Text>{subjectData.end_date}</Card.Text>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <Card className='mb-3 rounded'>
        <Card.Body>
          <Row>
            <Col className='mb-3'>
              <div className='d-flex'>
                <FaChartSimple />
                <Card.Title className='ms-2'>Estado</Card.Title>
              </div>
              <Card.Text>{STATUS[subjectData.status]}</Card.Text>
            </Col>

            <Col className='mb-3'>
              <div className='d-flex'>
                <FaRegClock />
                <Card.Title className='ms-2'>Tiempo</Card.Title>
              </div>
              <Card.Text>{secondsToHms(subjectData.total_time)}</Card.Text>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <Card className='mb-3 rounded'>
        <Card.Body>
          <div className='d-flex'>
            <FaBarsProgress />
            <Card.Title className='ms-2'>Progreso</Card.Title>
          </div>
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
