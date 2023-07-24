import { useState, useEffect } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';


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

export default UpdateCourse;
  