import React from 'react';
import { Card, Form, Button } from 'react-bootstrap';
import NavbarPage from '../components/Navbarpage';

const RegistroPage: React.FC = () => (
  <div className="login-bg">
    <NavbarPage /> 
    <div className="login-content">
      <h1 className="login-title">Registro</h1>
      <p className="login-subtitle">
        Crea tu cuenta institucional de la Universidad de La Serena para ingresar al portal.<br />
        Solo los usuarios con correo <b>@userena.cl</b> pueden registrarse.
      </p>
      <Card className="login-card">
        <Card.Body>
          <div className="login-icon">
            <svg xmlns="http://www.w3.org/2000/svg" height="50" viewBox="0 0 24 24" fill="#3f4ca6">
              <path d="M12 12c2.7 0 8 1.34 8 4v2H4v-2c0-2.66 5.3-4 8-4zM12 2a5 5 0 110 10 5 5 0 010-10z"/>
            </svg>
          </div>
          <Form>
            <Form.Group controlId="formNombres" className="mb-3">
              <Form.Label>Nombres</Form.Label>
              <Form.Control type="text" placeholder="Nombres" />
            </Form.Group>
            <Form.Group controlId="formApellidos" className="mb-3">
              <Form.Label>Apellidos</Form.Label>
              <Form.Control type="text" placeholder="Apellidos" />
            </Form.Group>
            <Form.Group controlId="formEmail" className="mb-3">
              <Form.Label>Correo institucional</Form.Label>
              <Form.Control type="email" placeholder="usuario@userena.cl" />
            </Form.Group>
            <Form.Group controlId="formPassword" className="mb-3">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control type="password" placeholder="Contraseña" />
            </Form.Group>
            <Form.Group controlId="formPasswordRepeat" className="mb-4">
              <Form.Label>Repetir contraseña</Form.Label>
              <Form.Control type="password" placeholder="Repite la contraseña" />
            </Form.Group>
            <div className="d-grid">
              <Button type="submit" variant="primary" className="login-btn">
                Registrarse
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
      <div className="text-center mt-3">
        <a href="/login" style={{ color: "#ffffffff", textDecoration: "none", fontSize: "0.95rem" }}>
          ¿Ya tienes cuenta? Iniciar sesión
        </a>
      </div>
    </div>
  </div>
);

export default RegistroPage;
