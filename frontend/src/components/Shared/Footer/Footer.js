import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  const [showFooter, setShowFooter] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        setShowFooter(true);
      } else {
        setShowFooter(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const currentYear = new Date().getFullYear();

  return showFooter ? (
    <Container fluid className="bg-dark text-white py-3">
      <Row>
        <Col className="text-center">
          © {currentYear} Study Journal Manuel Maldonado
        </Col>
      </Row>
    </Container>
  ) : null;
};

export default Footer;
