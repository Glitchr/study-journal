import { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { Collapse, Button, Form, FloatingLabel } from 'react-bootstrap';

import NoCourses from './NoCourses';


function CourseNavbar({ 
  courses, 
  onCourseClick, 
  onSubjectClick, 
  onTaskClick,
  onNewCourseClick,
}) {
    const [openCourses, setOpenCourses] = useState({});
    const [openSubjects, setOpenSubject] = useState({});
    const [searchTerm, setSearchTerm] = useState('');
  
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
  
    const filteredCourses = courses.filter((course) => {
      return (
        course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.subjects.some((subject) =>
          subject.name.toLowerCase().includes(searchTerm.toLowerCase())
        ) ||
        course.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.status.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });

    const handleKeyPress = (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
      }
    };

    return (
      <div className='mb-5'>
        {courses.length > 0 ? (
          <div className='nav-border'>
          <div className="d-inline-flex align-items-center">
            <Form className="form-style" onKeyDown={handleKeyPress}>
              <FloatingLabel
                controlId="searchBar"
                label="Buscar Curso"
                className="mb-3 floating-label-form"
              >
                <Form.Control type="text" placeholder="Buscar curso" onChange={(e) => setSearchTerm(e.target.value)} />
              </FloatingLabel>
            </Form>
            <Button className='btn-nav-style' onClick={onNewCourseClick} variant="success" size="sm">
              Nuevo
            </Button>
          </div>
          
          <div className='scroll'>
            {filteredCourses.map((course) => (
            <div key={course.url}>
              <div className='d-flex justify-content-between'>
                <Button className='nav-btn' variant='light' onClick={() => onCourseClick(course)}>
                  {course.name}
                </Button>
                <Button variant='link' onClick={() => handleCourseClick(course.url)}>
                  {openCourses[course.url] ? <FaChevronUp className='arrow' /> : <FaChevronDown className='arrow' />}
                </Button>
              </div>
              <Collapse in={openCourses[course.url]}>
                <div className='indent'>
                  {course.subjects.map((subject) => (
                    <div key={subject.url}>
                      <div className='d-flex justify-content-between'>
                        <Button className='nav-btn' variant='light' onClick={() => onSubjectClick(subject)}>{subject.name}</Button>
                        <Button variant='link' onClick={() => handleSubjectClick(subject.url)}>
                          {openSubjects[subject.url] ? <FaChevronUp className='arrow' /> : <FaChevronDown className='arrow' />}
                        </Button>
                      </div>
                      <Collapse in={openSubjects[subject.url]}>
                        <div className='indent'>
                          {subject.tasks.map((task) => (
                            <div key={task.url}>
                              <Button className='nav-btn' variant='light' size='sm' onClick={() => onTaskClick(task)}>{task.name}</Button>
                            </div>  
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
        </div>
        ) : (
          <NoCourses
            onNewCourseClick={onNewCourseClick}
          />
        )}
      </div> 
    );
  }

export default CourseNavbar;
  