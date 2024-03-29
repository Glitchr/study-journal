import { useState, useEffect } from 'react';
import { Container, Row, Col, } from 'react-bootstrap';

import CourseNavbar from './CourseNavbar';
import CreateCourse from './CreateCourse';
import CourseDetails from './CourseDetails';
import UpdateCourse from './UpdateCourse';


import './Courses.css'
import SubjectDetails from '../Subjects/SubjectDetails';
import UpdateSubject from '../Subjects/UpdateSubject';
import TaskDetails from '../Tasks/TaskDetails';
import UpdateTask from '../Tasks/UpdateTask';


function Courses({ client, currentUser }) {
  const [view, setView] = useState('home');
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);

  const handleCourseClick = (course) => {
    setView('courseDetails');
    setSelectedCourse(course);
  }

  const handleCourseUpdated = (updatedCourse) => {
    setView('courseDetails');
    setCourses(courses.map(course => course.url === updatedCourse.url ? updatedCourse : course));
    setSelectedCourse(updatedCourse);
  };
  
  const handleUpdateCourseClick = () => {
    setView('updateCourse');
  };
  
  const handleCancelUpdateCourse = () => {
    setView('courseDetails');
  };
  
  const handleCourseCreated = (newCourse) => {
    setView('courseDetails');
    setCourses(courses => [...courses, newCourse]);
    setSelectedCourse(newCourse);
  };
  
  const handleCreateCourseClick = () => {
    setView('createCourse');
  };

  const handleCancelCreateCourse = () => {
    setView(null);
  }
  
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

  const findCourse = (courses, selectedSubject) => courses.find(course => 
    course.subjects.some(subject => subject.url === selectedSubject.url));

  
  const handleSubjectClick = (subject) => {
    setView('subjectDetails');
    setSelectedSubject(subject);
  }

  const handleSubjectCreated = (newSubject) => {
    // Update the state to include the new subject in the list of subjects
    // for the current course
    setCourses(courses => courses.map(course => {
      if (course.url === selectedCourse.url) {
        course.subjects.push(newSubject);
        return {
          ...course,
          subjects: course.subjects,
        };
      } else {
        return course;
      }
    }));
  };
  
  const handleUpdateSubjectClick = () => {
    setView('updateSubject');
  }
  
  const handleCancelUpdateSubject = () => {
    setView('subjectDetails');
  }

  const handleSubjectUpdated = (updatedSubject) => {
    setView('subjectDetails');
    setCourses(courses => courses.map(course => {
        return {
          ...course,
          subjects: course.subjects.map(
            subject => subject.url === updatedSubject.url ? updatedSubject : subject),
    }}));
    setSelectedSubject(updatedSubject);
  }

  const handleSubjectDeleted = (deletedSubject) => {
    // Send a DELETE request to the server to delete the specified subject
    client.delete(deletedSubject.url, {
      headers: {
        'Authorization': `Token ${localStorage.getItem('token')}`
      }
    })
      .then(res => {
        // Remove the deleted subject from the list in the navbar
        setCourses(courses => courses.map(course => {
          if (course.url === deletedSubject.course) {
            return {
              ...course,
              subjects: course.subjects.filter(subject => subject.url !== deletedSubject.url)
            };
          } else {
            return course;
          }
        }));
        setSelectedSubject(null);
      })
      .catch(error => {
        console.log(error);
      })
  }

  const findSubject = (courses, selectedTask) => {
    let subject;
    courses.some(course => {
      subject = course.subjects.find(subject => 
        subject.tasks.some(task => task.url === selectedTask.url));
      return subject;
    });
    if (!subject) {
      console.error('Subject not found');
    }
    return subject;
  }
  

  const handleTaskClick = (task) => {
    setView('taskDetails'); 
    setSelectedTask(task);
  }
  
  const handleTaskCreated = (newTask, course, subject) => {
    // Update the state to include the new task in the list of tasks
    // for the current subject and course
    setCourses(courses => courses.map(c => {
      if (c.url === course.url) {
        return {
          ...c,
          subjects: c.subjects.map(s => {
            if (s.url === subject.url) {
              return {
                ...s,
                tasks: [...s.tasks, newTask]
              };
            } else {
              return s;
            }
          })
        };
      } else {
        return c;
      }
    }));
    setSelectedTask(newTask);
  }

  const handleCancelUpdateTask = () => {
    setView('taskDetails');
  }

  const handleUpdateTaskClick = () => {
    setView('updateTask');
  }

  const handleTaskUpdated = (updatedTask) => {
    setView('taskDetails');
    setCourses(courses => courses.map(course => {
      return {
        ...course,
        subjects: course.subjects.map(subject => {
            return {
              ...subject,
              tasks: subject.tasks.map(task => task.url === updatedTask.url ? 
                updatedTask : task),
            };
        })
      };
    }));
    setSelectedTask(updatedTask);
  }

  const handleTaskDeleted = (deletedTask) => {
    // Send a DELETE request to the server to delete the specified task
    console.log(deletedTask.url);
    client.delete(deletedTask.url, {
      headers: {
        'Authorization': `Token ${localStorage.getItem('token')}`
      }
    })
      .then(res => {
        // Remove the deleted task from the list of tasks
        setCourses(courses => courses.map(course => {
          return {
            ...course,
            subjects: course.subjects.map(subject => {
              if (subject.url === deletedTask.subject) {
                return {
                  ...subject,
                  tasks: subject.tasks.filter(task => task.url !== deletedTask.url)
                };
              } else {
                return subject;
              }
            })
          };
        }));
        setSelectedTask(null);
      })
      .catch(error => {
        console.log(error);
      });
  }

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
          <h1 className='text-center'>Cursos</h1>

          <hr />
          <Row>
            <Col md='auto'>
              <CourseNavbar
                courses={courses}
                onCourseClick={handleCourseClick}
                onSubjectClick={handleSubjectClick}
                onTaskClick={handleTaskClick}
                onNewCourseClick={handleCreateCourseClick}
              />
            </Col>
            <Col>
              {view === 'createCourse' ? (
                <CreateCourse 
                  client={client}
                  onCreate={handleCourseCreated} 
                  onCancel={handleCancelCreateCourse}
                />
              ) : view === 'updateCourse' && selectedCourse ? (
                <UpdateCourse 
                  client={client}
                  course={selectedCourse} 
                  onCancel={handleCancelUpdateCourse}
                  onUpdate={handleCourseUpdated}
                />
              ) : view === 'courseDetails' && selectedCourse ? (
                <CourseDetails
                  client={client}
                  course={selectedCourse}
                  onUpdateCourseClick={handleUpdateCourseClick}
                  onDelete={handleCourseDeleted}
                  onAddSubject={handleSubjectCreated}
                />
              ) : view === 'subjectDetails' && selectedSubject ? (
                <SubjectDetails
                  client={client}
                  course={findCourse(courses, selectedSubject)}
                  subject={selectedSubject}
                  onUpdateSubjectClick={handleUpdateSubjectClick}
                  onDelete={handleSubjectDeleted}
                  onAddTask={handleTaskCreated}
                />
              ) : view === 'updateSubject' && selectedSubject ? (
                <UpdateSubject 
                  client={client}
                  course={findCourse(courses, selectedSubject)}
                  subject={selectedSubject}
                  onCancel={handleCancelUpdateSubject}
                  onUpdate={handleSubjectUpdated}
                />
              ) : view === 'taskDetails' && selectedTask ? (
                <TaskDetails 
                  client={client}
                  task={selectedTask}
                  onUpdateTaskClick={handleUpdateTaskClick}
                  onDelete={handleTaskDeleted}
                />
              ) : view === 'updateTask' && selectedTask ? (
                <UpdateTask 
                  client={client}
                  subject={findSubject(courses, selectedTask)}
                  task={selectedTask}
                  onCancel={handleCancelUpdateTask}
                  onUpdate={handleTaskUpdated}
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
