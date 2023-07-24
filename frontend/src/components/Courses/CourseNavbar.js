import { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { Collapse, Button } from 'react-bootstrap';


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

export default CourseNavbar;
  