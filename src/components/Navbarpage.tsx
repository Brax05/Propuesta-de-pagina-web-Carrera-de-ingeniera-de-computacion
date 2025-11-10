import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NavbarPage: React.FC = () => {
  return (
    <Navbar bg="light" expand="lg" fixed="top">
      <Container>
        <Navbar.Brand href="#">
          <img
            src=""
            alt=""
            height="30"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Inicio</Nav.Link>
            <Nav.Link as={Link} to="/academicos">Académicos</Nav.Link>
            <Nav.Link as={Link} to="/plan-estudios">Plan de Estudios</Nav.Link>
            <Nav.Link as={Link} to="/noticias">Noticias</Nav.Link>
            <Nav.Link as={Link} to="/egresados">Egresados</Nav.Link>
            <Nav.Link as={Link} to="/contacto">Contacto</Nav.Link>
          </Nav>
          {/* Botones de sesión/registro alineados a la derecha, con estilo de Bootstrap */}
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/login" className="ms-2 btn btn-outline-primary">
              Iniciar sesión
            </Nav.Link>
            <Nav.Link as={Link} to="/registro" className="ms-2 btn btn-primary">
              Registro
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarPage;


