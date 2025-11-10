import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import NavbarPage from '../components/Navbarpage';
import Footerpage from '../components/Footerpage';

interface Docente {
  id: number;
  nombre: string;
  titulo: string;
  descripcion: string;
  imagen: string;
}

const DocentesList: React.FC = () => {
  const docentes: Docente[] = [
    {
      id: 1,
      nombre: "Dr. Rodrigo Pizarro",
      titulo: "Doctor en Ciencias de la Computación",
      descripcion: "Doctor en Ciencias de la Computación (U. de Concepción). Especialista en inteligencia artificial y minería de datos.",
      imagen: ""
    },
    {
      id: 2,
      nombre: "Mg. Ana Pérez",
      titulo: "Magíster en Ingeniería Informática",
      descripcion: "Magíster en Ingeniería Informática (UTFSM). Enfocada en ingeniería de software y gestión de proyectos.",
      imagen: ""
    },
    {
      id: 3,
      nombre: "Dr. Carlos Díaz",
      titulo: "Doctor en Ingeniería Eléctrica",
      descripcion: "Doctor en Ingeniería Eléctrica (U. de Chile). Investigador en sistemas distribuidos y computación de alto desempeño.",
      imagen: ""
    }
  ];

  return (
    <div className="docentes-wrapper">
      <NavbarPage />
      <div className="docentes-hero">
        <h1 className="docentes-title">Listado de Docentes</h1>
        <p className="docentes-subtitle">Universidad de la Serena</p>
      </div>

      <Container fluid className="docentes-content">
        <Row className="g-4">
          {docentes.map((docente) => (
            <Col key={docente.id} xs={12} md={6} lg={4}>
              <Card className="docente-card">
                <Card.Img
                  variant="top"
                  src={docente.imagen}
                  className="docente-image"
                />
                <Card.Body>
                  <Card.Title className="docente-nombre">
                    {docente.nombre}
                  </Card.Title>
                  <Card.Text className="docente-descripcion">
                    {docente.descripcion}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
      <Footerpage />
    </div>
  );
};

export default DocentesList;

