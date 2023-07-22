import React, { useState, useEffect } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './Courses.css'


function CourseNavbar({ courses }) {
  const [openCourses, setOpenCourses] = useState({});
  const [openSubjects, setOpenSubject] = useState({});

  const handleCourseClick = (courseURL) => {
    setOpenCourses((prevState) => ({
      ...prevState,
      [courseURL]: !prevState[courseURL],
    }));
  };

  const handleSubjectClick = (subjectURL) => {
    setOpenSubject((prevState) => ({
      ...prevState,
      [subjectURL]: !prevState[subjectURL],
    }));
  };

  return (
    <div className='nav-border'>
      {courses.map((course) => (
        <div key={course.url}>
          <div className='d-flex justify-content-between'>
            <Button variant='link'>{course.name}</Button>
            <Button variant='link' onClick={() => handleCourseClick(course.url)}>
              {openCourses[course.url] ? <FaChevronUp /> : <FaChevronDown />}
            </Button>
          </div>
          <Collapse in={openCourses[course.url]}>
            <div className='indent'>
              {course.subjects.map((subject) => (
                <div key={subject.url}>
                  <div className='d-flex justify-content-between'>
                    <Button variant='link'>{subject.name}</Button>
                    <Button variant='link' onClick={() => handleSubjectClick(subject.url)}>
                      {openSubjects[subject.url] ? <FaChevronUp /> : <FaChevronDown />}
                    </Button>
                  </div>
                  <Collapse in={openSubjects[subject.url]}>
                    <div className='indent'>
                      {subject.tasks.map((task) => (
                        <Button variant='link' key={task.url}>{task.name}</Button>
                      ))}
                    </div>
                  </Collapse>
                </div>
              ))}
            </div>
          </Collapse>
        </div>
      ))}
    </div>
  );
}

function CreateCourse({ client }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('pe');
  const [category, setCategory] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Fetch the available categories from the API
    client.get('/api/categories/')
      .then(res => {
        setCategories(res.data.results);
      })
      .catch(error => {
        console.log(error);
      });
  }, [client]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit the form data to the server
    client.post('/api/courses/', {
      name: name,
      description: description,
      status: status,
      category: category,
      start_date: startDate,
      end_date: endDate,
    }, {
      headers: {
        'Authorization': `Token ${localStorage.getItem('token')}`
      }
    })
      .then(res => {
        alert('Curso creado satisfactoriamente!');
      })
      .catch(error => {
        alert('Se ha producido un error al crear el curso. Por favor, inténtelo de nuevo.');
      });
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className='mb-3' controlId="name">
        <Form.Label>Nombre</Form.Label>
        <Form.Control type="text" value={name} onChange={e => setName(e.target.value)} />
      </Form.Group>

      <Form.Group className='mb-3' controlId="description">
        <Form.Label>Descripción</Form.Label>
        <Form.Control as="textarea" value={description} onChange={e => setDescription(e.target.value)} />
      </Form.Group>

      <Row>
        <Col>
          <Form.Group className='mb-3' controlId="status">
            <Form.Label>Estado</Form.Label>
            <Form.Select value={status} onChange={e => setStatus(e.target.value)}>
              <option value="pe">Pendiente</option>
              <option value="ep">En progreso</option>
              <option value="co">Completado</option>
              <option value="sa">Saltado</option>
            </Form.Select>
          </Form.Group>
        </Col>

        <Col>
          <Form.Group className='mb-3' controlId="category">
            <Form.Label>Categoría</Form.Label>
            <Form.Select value={category} onChange={e => setCategory(e.target.value)}>
              {categories.map(category => (
                <option key={category.url} value={category.url}>{category.name}</option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col>
          <Form.Group className='mb-3' controlId="startDate">
            <Form.Label>Fecha de inicio</Form.Label>
            <Form.Control type="date" value={startDate} onChange={e => setStartDate(e.target.value)} />
          </Form.Group>
        </Col>

        <Col>
          <Form.Group className='mb-3' controlId="endDate">
            <Form.Label>Fecha de finalización</Form.Label>
            <Form.Control type="date" value={endDate} onChange={e => setEndDate(e.target.value)} />
          </Form.Group>
        </Col>
      </Row>

      <div className='d-grid gap-2'>
        <Button variant="primary" type="submit">
          Crear curso
        </Button>
      </div>
    </Form>
  );
}


function Courses({
  client,
  currentUser,
}) {
  const [courses, setCourses] = useState([]);
  const [showCreateCourse, setShowCreateCourse] = useState(false);
  const hasCourses = courses.length > 0;

  const handleCreateCourseClick = () => {
    setShowCreateCourse(true);
  }

  useEffect(() => {
    const getCourses = () => {
      client.get('/api/courses/', {
        headers: {
          'Authorization': `Token ${localStorage.getItem('token')}`
        }
      })
        .then(res => {
          setCourses(res.data.results);
        })
        .catch(error => {
          console.log(error);
        })
    }
  
    if (currentUser) {
      getCourses();
    }
  }, [currentUser, client]);
  
  return(
    <>
      {currentUser ? (
        <Container>
          <div className='d-flex justify-content-between align-items-center'>
            <h1>Cursos</h1>
            <Button 
              onClick={handleCreateCourseClick} 
              variant='light'
              size="sm">
                Nuevo curso
            </Button>
          </div>

          <hr />
          <Row>
            <Col md='auto'>
                <CourseNavbar
                  courses={courses}
                  hasCourses={courses.length > 0} 
                  />
            </Col>
            {hasCourses && (
              <Col>
                <CreateCourse client={client} />
              </Col>
            )}
          </Row>
        </Container>
      ) : (
        <Container className='mt-5'>
          <h1>Oops!</h1>
          <h5>Debes iniciar sesión para ver esta página.</h5>
        </Container>
      )}
    </>
  );
}

export default Courses;
