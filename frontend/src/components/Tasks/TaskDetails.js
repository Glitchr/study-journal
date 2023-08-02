import { useState, useEffect } from 'react';
import { Card, Row, Col, Button } from 'react-bootstrap';
import { FaBookOpen } from 'react-icons/fa';
import { FaCalendarDays, FaCalendarDay, FaCalendarCheck, FaChartSimple, FaRegClock } from "react-icons/fa6";


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
              <div className='d-flex'>
                <FaBookOpen/>
                <Card.Title className='ms-3'>Notas</Card.Title>
              </div>
              <Card.Text>{taskData.description}</Card.Text>
            </Card.Body>
          </Card>

          <Card className='mb-3 rounded'>
            <Card.Body>
                  <div className='d-flex mb-3'>
                    <FaCalendarDay />
                    <Card.Title className='ms-2'>Fecha de entrega</Card.Title>
                  </div>
                  <Card.Text>{taskData.due_date}</Card.Text>
            </Card.Body>
          </Card>

          <Card className='mb-3 rounded'>
            <Card.Body>
              <Row>
                <Col className='mb-3'>
                  <div className='d-flex'>
                    <FaRegClock />
                    <Card.Title className='ms-2'>Tiempo</Card.Title>
                  </div>
                  <Card.Text>{secondsToHms(taskData.total_time)}</Card.Text>
                </Col>

                <Col>
                  <div className='d-flex'>
                    <FaChartSimple />
                    <Card.Title className='ms-2'>Estado</Card.Title>
                  </div>
                  <Card.Text>{STATUS[taskData.status]}</Card.Text>
                </Col>                      
              </Row>
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
                  <Card.Text>{taskData.start_date}</Card.Text>
                </Col>

                <Col>
                  <div className='d-flex'>
                    <FaCalendarCheck />
                    <Card.Title className='ms-2'>Fecha de finalización</Card.Title>
                  </div>
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
