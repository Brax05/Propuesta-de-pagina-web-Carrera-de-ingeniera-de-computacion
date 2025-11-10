import React from 'react';
import { Container, Row, Col, Button, Image } from 'react-bootstrap';

const Footerpage: React.FC = () => (
  <footer className="footer mt-5">
    <Container fluid>
      <Row className="py-4 align-items-center">
        <Col xs={12} md={4} className="d-flex align-items-center justify-content-md-start justify-content-center mb-3 mb-md-0">
          <Image
            src=""
            alt=""
            roundedCircle
            height={80}
            className="footer-logo"
          />
          <div>
            <h5 className="mb-1">UNIVERSIDAD DE LA SERENA</h5>
            <h6 className="mb-0">CHILE</h6>
          </div>
        </Col>
        <Col xs={12} md={4} className="text-center mb-3 mb-md-0">
          <strong>CONTACTOS POR UNIDADES</strong>
          <br />
          <Button
            variant="success"
            className="footer-button"
            href="#"
          >
            VER AQUÍ
          </Button>
          <hr className="footer-divider" />
          <p className="mb-0">
            Benavente 980 - La Serena - Chile
            <br />
            51 2 20 4000
          </p>
        </Col>
        <Col xs={12} md={4} className="d-flex flex-column align-items-md-end align-items-center">
          <Image
            src=""
            alt="CNA"
            height={50}
            className="footer-sello"
          />
          <h6 className="mb-0 footer-acreditacion">
            UNIVERSIDAD ACREDITADA <br /> NIVEL AVANZADO
          </h6>
        </Col>
      </Row>
      <Row>
        <Col className="text-center pt-3">
          <small>
            © 2025 Derechos reservados<br />
            Desarrollado por estudiantes de Ingeniería en computación de la Universidad de la Serena
          </small>
        </Col>
      </Row>
    </Container>
  </footer>
);

export default Footerpage;
