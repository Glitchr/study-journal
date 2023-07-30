import { Button } from "react-bootstrap";


function NoCourses({ onNewCourseClick }) {
  return (
    <div>
      <h6 className="mt-5 ">Empieza tus estudios.</h6>
      <h3 className="mb-4">No tienes cursos todavia. Empieza uno nuevo!</h3>

      <Button variant='outline-success' onClick={onNewCourseClick}>
        Crear curso
      </Button>
      <div>
        
      </div> 
    </div>
  );
}

export default NoCourses;
