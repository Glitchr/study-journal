import { useState, useEffect } from 'react';
import { Card, Row, Col, Button, ProgressBar } from 'react-bootstrap';
import CreateSubject from '../Subjects/CreateSubject';


function CourseDetails({ 
  client,
  course,
  onUpdateCourseClick,
  onDelete,
  onAddSubject,
}) {
    const [categoryName, setCategoryName] = useState('');
    const STATUS = {
      'pe': 'Pendiente',
      'ep': 'En progreso',
      'co': 'Completado',
      'sa': 'Saltado',
    };
    const [showCreateSubject, setShowCreateSubject] = useState(false);
    const [courseData, setCourseData] = useState(course);
  
    useEffect(() => {
      // Fetch the category data from the API
      client.get(course.category)
        .then(res => {
          setCategoryName(res.data.name);
        })
        .catch(error => {
          console.log(error);
        });
    }, [client, course.category]);

    useEffect(() => {
      const fetchTaskData = async () => {
        try {
          const response = await client.get(course.url, {
            headers: {
              'Authorization': `Token ${localStorage.getItem('token')}`
            }
          });
          setCourseData(response.data);
        } catch (error) {
          console.error(error);
        }
      }
      fetchTaskData();
    }, [client, course]);
  
    return (
      <div>
        <Card className='mb-3 rounded'>
          <Card.Header className='d-flex justify-content-between'>
            {courseData.name}
            <div>
              <Button className='me-2' variant='dark' size='sm' onClick={onUpdateCourseClick}>Editar</Button>
              <Button variant='danger' size='sm' onClick={() => onDelete(course)}>Eliminar</Button>
            </div>
          </Card.Header>
        </Card>

        <Card className='mb-3 rounded'>
          <Card.Body>
              <Card.Title>Descripción</Card.Title>
              <Card.Text>{courseData.description}</Card.Text>
          </Card.Body>
        </Card>

        <Card className='mb-3 rounded'>
          <Card.Body>
            <Row>
              <Col className='mb-3'>
                <Card.Title>Fecha de inicio</Card.Title>
                <Card.Text>{courseData.start_date}</Card.Text>
              </Col>

              <Col>
                <Card.Title>Fecha de finalización</Card.Title>
                <Card.Text>{courseData.end_date}</Card.Text>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        <Card className='mb-3 rounded'>
          <Card.Body>
            <Row>
              <Col className='mb-3'>
                <Card.Title>Estado</Card.Title>
                <Card.Text>{STATUS[courseData.status]}</Card.Text>
              </Col>

              <Col>
                <Card.Title>Categoria</Card.Title>
                <Card.Text>{categoryName}</Card.Text>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        <Card className='mb-3 rounded'>
          <Card.Body>
            <Card.Title>Progreso</Card.Title>
            <ProgressBar now={courseData.progress * 100} />
          </Card.Body>
        </Card>
        <Card.Footer className='mb-3'>
          <Button variant='success' size='sm' onClick={() => setShowCreateSubject(true)}>
            Añadir Asignatura
          </Button>
        </Card.Footer>
        {showCreateSubject && (
          <CreateSubject
            client={client}
            course={course}
            onCreate={(newSubject) => {
              setShowCreateSubject(false);
              onAddSubject(newSubject);
            }}
            onCancel={() => setShowCreateSubject(false)}
          />
        )}
      </div>
    );
  }

export default CourseDetails;
  