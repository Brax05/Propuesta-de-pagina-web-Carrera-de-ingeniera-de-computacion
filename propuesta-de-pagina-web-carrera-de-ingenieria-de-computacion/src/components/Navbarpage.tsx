import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NavbarPage: React.FC = () => {
  return (
    <Navbar bg="light" expand="lg" fixed="top">
      <Container>
        <Navbar.Brand href="#">
          <img
            src=""
            alt="Universidad de La Serena"
            height="30"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/">Inicio</Nav.Link>
            <Nav.Link as={Link} to="/academicos">Académicos</Nav.Link>
            <Nav.Link as={Link} to="/plan-estudios">Plan de Estudios</Nav.Link>
            <Nav.Link as={Link} to="/noticias">Noticias</Nav.Link>
            <Nav.Link as={Link} to="/egresados">Egresados</Nav.Link>
            <Nav.Link as={Link} to="/contacto">Contacto</Nav.Link>
          </Nav>
          {/* Botones alineados a la derecha */}
          <Nav className="ms-auto">
            <Nav.Link>
              <Button variant="outline-primary" className="ms-2">Iniciar sesión</Button>
            </Nav.Link>
            <Nav.Link>
              <Button variant="primary" className="ms-2">Registro</Button>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarPage;
