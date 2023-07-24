import React, { useState, useEffect } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

import './Courses.css'


function UpdateCourse({ client, course, onCancel, onUpdate }) {
  const [name, setName] = useState(course.name);
  const [description, setDescription] = useState(course.description);
  const [status, setStatus] = useState(course.status);
  const [category, setCategory] = useState(course.category);
  const [startDate, setStartDate] = useState(course.start_date);
  const [endDate, setEndDate] = useState(course.end_date);
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
    client.put(course.url, {
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
        alert('Curso actualizado satisfactoriamente!');
        onUpdate(res.data);

      })
      .catch(error => {
        alert('Se ha producido un error al actualizar el curso. Por favor, inténtelo de nuevo.');
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

      <div>
        <Row>
          <Col className='d-grid gap-2'>
            <Button variant="success" type="submit">
              Actualizar curso
            </Button>          
          </Col>
          <Col className='d-grid gap-2'>
            <Button variant="secondary" onClick={onCancel}>
              Cancelar
            </Button>
          </Col>
        </Row>
      </div>
    </Form>
  );
}


function CourseDetails({ client, course, onUpdateCourseClick}) {
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
        <Button variant='light' size='sm' onClick={onUpdateCourseClick}>Editar curso</Button>
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

function CourseNavbar({ courses, onCourseClick }) {
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
            <Button variant='link' onClick={() => onCourseClick(course)}>
              {course.name}
            </Button>
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

function CreateCourse({ client, onCreate }) {
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
        onCreate(res.data);
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
        <Button variant="success" type="submit">
          Crear curso
        </Button>
      </div>
    </Form>
  );
}


function Courses({ client, currentUser }) {
  const [courses, setCourses] = useState([]);
  const [showCreateCourse, setShowCreateCourse] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showUpdateCourse, setShowUpdateCourse] = useState(false);

  const handleCourseUpdated = (updatedCourse) => {
    setShowUpdateCourse(false);
    setCourses(courses.map(course => course.url === updatedCourse.url ? updatedCourse : course));
    setSelectedCourse(updatedCourse);
  };

  const handleUpdateCourseClick = () => {
    setShowUpdateCourse(true);
  };

  const handleCancelUpdateCourse = () => {
    setShowUpdateCourse(false);
  };
  
  const handleCourseCreated = (newCourse) => {
    setShowCreateCourse(false);
    setCourses(courses => [...courses, newCourse]);
    setSelectedCourse(newCourse);
  };

  const handleCreateCourseClick = () => {
    setShowCreateCourse(true);
  };

  useEffect(() => {
    const getCourses = () => {
      client
        .get('/api/courses/', {
          headers: {
            Authorization: `Token ${localStorage.getItem('token')}`,
          },
        })
        .then((res) => {
          setCourses(res.data.results);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    if (currentUser) {
      getCourses();
    }
  }, [currentUser, client]);

  return (
    <>
      {currentUser ? (
        <Container>
          <div className='d-flex justify-content-between align-items-center'>
            <h1>Cursos</h1>
            <Button onClick={handleCreateCourseClick} variant='light' size='sm'>
              Nuevo curso
            </Button>
          </div>

          <hr />
          <Row>
            <Col md='auto'>
              <CourseNavbar
                courses={courses}
                onCourseClick={(course) => {
                  setShowCreateCourse(false);
                  setSelectedCourse(course);
                }}
              />
            </Col>
            <Col>
              {showCreateCourse ? (
                <CreateCourse client={client} onCreate={handleCourseCreated} />
              ) : showUpdateCourse && selectedCourse ? (
                <UpdateCourse 
                  client={client}
                  course={selectedCourse} 
                  onCancel={handleCancelUpdateCourse}
                  onUpdate={handleCourseUpdated}
                />
              ) : selectedCourse ? (
                <CourseDetails
                  client={client}
                  course={selectedCourse}
                  onUpdateCourseClick={handleUpdateCourseClick}
                />
              ) : null}
            </Col>
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
