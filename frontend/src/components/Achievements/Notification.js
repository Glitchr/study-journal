import { Modal } from 'react-bootstrap';
import './Achievement.css';


function Notification({ achievement, ...props }) {
  return (
    <Modal
    {...props}
    aria-labelledby="contained-modal-title-vcenter"
    centered
    >
      <Modal.Header closeButton>
        <Modal.Title id='contained-modal-title-vcenter'>
          ¡Felicitaciones!
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className='achievement-modal-body' style={{ textAlign: 'center', padding: '2rem' }}>
        <h5>Te has ganado el logro {achievement.name}!</h5>
        <img className='achievement-badge' src={achievement.badge} alt={achievement.name} />
        <p>{achievement.description}</p>
      </Modal.Body>
    </Modal>
  );
};

export default Notification;
