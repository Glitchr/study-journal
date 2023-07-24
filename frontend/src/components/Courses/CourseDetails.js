import { useState, useEffect } from 'react';
import { Card, Row, Col, Button } from 'react-bootstrap';


function CourseDetails({ client, course, onUpdateCourseClick, onDelete }) {
    const [categoryName, setCategoryName] = useState('');
    const STATUS = {
      'pe': 'Pendiente',
      'ep': 'En progreso',
      'co': 'Completado',
      'sa': 'Saltado',
    };
  
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
  
    return (
      <Card>
        <Card.Header className='d-flex justify-content-between'>
          {course.name}
          <div>
            <Button className='me-2' variant='dark' size='sm' onClick={onUpdateCourseClick}>Editar</Button>
            <Button variant='danger' size='sm' onClick={() => onDelete(course)}>Eliminar</Button>
          </div>
        </Card.Header>
        <Card.Body>
          <Card.Title>Descripción</Card.Title>
          <Card.Text>{course.description}</Card.Text>
  
          <Row className='mb-3'>
            <Col>
              <Card.Title>Start Date</Card.Title>
              <Card.Text>{course.start_date}</Card.Text>
            </Col>
  
            <Col>
              <Card.Title>End Date</Card.Title>
              <Card.Text>{course.end_date}</Card.Text>
            </Col>
          </Row>
  
          <Row className='mb-3'>
            <Col>
              <Card.Title>Estado</Card.Title>
              <Card.Text>{STATUS[course.status]}</Card.Text>
            </Col>
  
            <Col>
              <Card.Title>Categoria</Card.Title>
              <Card.Text>{categoryName}</Card.Text>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    );
  }

export default CourseDetails;
  