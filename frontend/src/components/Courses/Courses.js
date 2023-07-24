import { useState, useEffect } from 'react';
import { Container, Button, Row, Col, } from 'react-bootstrap';

import CourseNavbar from './CourseNavbar';
import CreateCourse from './CreateCourse';
import CourseDetails from './CourseDetails';
import UpdateCourse from './UpdateCourse';


import './Courses.css'


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

  const handleCourseDeleted = (deletedCourse) => {
    // Send a DELETE request to the server to delete the specified course
    client.delete(deletedCourse.url, {
      headers: {
        'Authorization': `Token ${localStorage.getItem('token')}`
      }
    })
      .then(res => {
        // Remove the deleted course from the list of courses
        setCourses(courses => courses.filter(course => course.url !== deletedCourse.url));
        setSelectedCourse(null);
      })
      .catch(error => {
        console.log(error);
      });
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
                  onDelete={handleCourseDeleted}
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
