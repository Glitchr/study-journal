import { Modal } from 'react-bootstrap';


function Notification({ achievement, ...props }) {
  return (
    <Modal
    {...props}
    size="lg"
    aria-labelledby="contained-modal-title-vcenter"
    centered
    >
      <Modal.Header closeButton>
        <Modal.Title id='contained-modal-title-vcenter'>
          ¡Felicitaciones!
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h5>Te has ganado el logro {achievement.name}!</h5>
        <img src={achievement.badge} alt={achievement.name} />
        <p>{achievement.description}</p>
      </Modal.Body>
    </Modal>
  );
};

export default Notification;
