import { useState, useEffect } from 'react';
import { Card, Row, Col, Button, ProgressBar } from 'react-bootstrap';
import CreateSubject from '../Subjects/CreateSubject';
import { FaBookOpen } from 'react-icons/fa';
import { FaCalendarDays, FaCalendarCheck, FaChartSimple, FaBoxesStacked, FaRegClock, FaBarsProgress } from "react-icons/fa6";

import { secondsToHms } from '../../utils';

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
      const fetchCourseData = async () => {
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
      fetchCourseData();
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
            <div className='d-flex'>
              <FaBookOpen/>
              <Card.Title className='ms-3'>Descripción</Card.Title>
            </div>
            <Card.Text>{courseData.description}</Card.Text>
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
                <Card.Text>{courseData.start_date}</Card.Text>
              </Col>

              <Col>
                <div className='d-flex'>
                  <FaCalendarCheck />
                  <Card.Title className='ms-2'>Fecha de finalización</Card.Title>
                </div>
                <Card.Text>{courseData.end_date}</Card.Text>
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
                <Card.Text>{STATUS[courseData.status]}</Card.Text>
              </Col>

              <Col>
                <div className='d-flex'>
                  <FaBoxesStacked />
                  <Card.Title className='ms-2'>Categoría</Card.Title>
                </div>
                <Card.Text>{categoryName}</Card.Text>
              </Col>

              <Col>
                <div className='d-flex'>
                  <FaRegClock />
                  <Card.Title className='ms-2'>Tiempo</Card.Title>
                </div>
                  <Card.Text>{secondsToHms(courseData.total_time)}</Card.Text>
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
  