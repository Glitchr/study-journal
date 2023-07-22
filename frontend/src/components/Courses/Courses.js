import React, { useState, useEffect } from 'react';

import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


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
  }, []);

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
        // Handle successful form submission
      })
      .catch(error => {
        // Handle form submission error
      });
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="name">
        <Form.Label>Nombre</Form.Label>
        <Form.Control type="text" value={name} onChange={e => setName(e.target.value)} />
      </Form.Group>

      <Form.Group controlId="description">
        <Form.Label>Descripción</Form.Label>
        <Form.Control as="textarea" value={description} onChange={e => setDescription(e.target.value)} />
      </Form.Group>

      <Form.Group controlId="status">
        <Form.Label>Estado</Form.Label>
        <Form.Control as="select" value={status} onChange={e => setStatus(e.target.value)}>
          <option value="pe">Pendiente</option>
          <option value="ep">En progreso</option>
          <option value="co">Completado</option>
          <option value="sa">Saltado</option>
        </Form.Control>
      </Form.Group>

      <Form.Group controlId="category">
        <Form.Label>Categoría</Form.Label>
        <Form.Control as="select" value={category} onChange={e => setCategory(e.target.value)}>
          {categories.map(category => (
            <option key={category.id} value={category.url}>{category.name}</option>
          ))}
        </Form.Control>
      </Form.Group>

      <Form.Group controlId="startDate">
        <Form.Label>Fecha de inicio</Form.Label>
        <Form.Control type="date" value={startDate} onChange={e => setStartDate(e.target.value)} />
      </Form.Group>

      <Form.Group controlId="endDate">
        <Form.Label>Fecha de finalización</Form.Label>
        <Form.Control type="date" value={endDate} onChange={e => setEndDate(e.target.value)} />
      </Form.Group>

      <Button variant="primary" type="submit">
        Crear curso
      </Button>
    </Form>
  );
}


function Courses({
  client,
  currentUser,
}) {
  const [courses, setCourses] = useState([]);
  const [showCreateCourse, setShowCreateCourse] = useState(false);

  const handleCreateCourseClick = () => {
    setShowCreateCourse(true);
  }

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

  useEffect(() => {
    if (currentUser) {
      getCourses();
    }
  }, [currentUser]);
  
  return(
    <>
      {currentUser ? (
        <Container>
          <div className='d-flex justify-content-between'>
            <h1>Cursos</h1>
            <Button 
              onClick={handleCreateCourseClick} 
              variant='light'>
                Crear curso
            </Button>
          </div>

          <hr />
          {courses.length > 0 ? (
            <ul>
              {courses.map(course => (
                <li key={course.url}>{course.name}</li>
              ))}
            </ul>
          ) : (
            <>
              <h4>No tienes cursos todavia. Empieza uno nuevo!</h4>
            </>
          )}
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
