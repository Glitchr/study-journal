import { useState, useEffect } from 'react';
import { Card, Row, Col, Button } from 'react-bootstrap';


function SubjectDetails({
  subject,
}) {
  const STATUS = {
    'pe': 'Pendiente',
    'ep': 'En progreso',
    'co': 'Completado',
    'sa': 'Saltado',
  };
  return (
    <Card>
      <Card.Header className='d-flex justify-content-between'>
        {subject.name}
        <div>
          <Button className='me-2' variant='dark' size='sm'>Editar</Button>
          <Button variant='danger' size='sm'>Eliminar</Button>
        </div>
      </Card.Header>
      <Card.Body>
        <Card.Title>Descripción</Card.Title>
        <Card.Text>{subject.description}</Card.Text>

        <Row>
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
        <Button variant='primary' size='sm'>Añadir tarea</Button>
      </Card.Footer>
    </Card>
  );
}

export default SubjectDetails;