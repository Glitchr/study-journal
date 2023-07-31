import { useState, useEffect } from 'react';
import { Card, Row, Col, Button } from 'react-bootstrap';

import Timer from '../Timer/Timer';
import { secondsToHms } from '../../utils';


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
  const [showTimer, setShowTimer] = useState(false);
  const [taskData, setTaskData] = useState(task);

  const handleTimerStop = async () => {
    try {
      const response = await client.get(task.url, {
        headers: {
          'Authorization': `Token ${localStorage.getItem('token')}`
        }
      });
      setTaskData(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  const handleTimerClick = () => {
    !showTimer ? setShowTimer(true) : setShowTimer(false);
  }

  useEffect(() => {
    const fetchTaskData = async () => {
      try {
        const response = await client.get(task.url, {
          headers: {
            'Authorization': `Token ${localStorage.getItem('token')}`
          }
        });
        setTaskData(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchTaskData();
  }, [client, task]);
  
  return (
    <div>
        <Card className='mb-3 rounded'>
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
        </Card>

      <Row>
        <Col>
          <Card className='mb-3 rounded'>
            <Card.Body>
              <Card.Title>Notas</Card.Title>
              <Card.Text>{taskData.description}</Card.Text>
            </Card.Body>
          </Card>

          <Card className='mb-3 rounded'>
            <Card.Body>
              <Row className='mb-3'>
                <Col>
                  <Card.Title>Fecha de entrega</Card.Title>
                  <Card.Text>{taskData.due_date}</Card.Text>
                </Col>

              </Row>
            </Card.Body>
          </Card>

          <Card className='mb-3 rounded'>
            <Card.Body>
              <Row>
                <Col className='mb-3'>
                  <Card.Title>Tiempo</Card.Title>
                  <Card.Text>{secondsToHms(taskData.total_time)}</Card.Text>
                </Col>

                <Col>
                  <Card.Title>Estado</Card.Title>
                  <Card.Text>{STATUS[taskData.status]}</Card.Text>
                </Col>                      
              </Row>
            </Card.Body>
          </Card>

          <Card className='mb-3 rounded'>
            <Card.Body>
              <Row>
                <Col className='mb-3'>
                  <Card.Title>Fecha de Inicio</Card.Title>
                  <Card.Text>{taskData.start_date}</Card.Text>
                </Col>

                <Col>
                  <Card.Title>Fecha de finalización</Card.Title>
                  <Card.Text>{taskData.end_date}</Card.Text>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
        {showTimer && (
          <Col>
            <Timer 
              client={client}
              task={task}
              onStop={handleTimerStop}
            />
          </Col>
        )}
      </Row>

      <Card.Footer className='mb-3'>
        <Button variant='success' size='sm' onClick={handleTimerClick}>
          Temporizador
        </Button>
      </Card.Footer>
    </div>
  );
}

export default TaskDetails;
