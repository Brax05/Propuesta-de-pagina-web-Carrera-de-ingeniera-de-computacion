import React from 'react';
//import { Container, Row, Col, Button} from 'react-bootstrap';
//import { Link } from 'react-router-dom';
import NavbarPage from '../components/Navbarpage';
//import './App.css'

const HomePage: React.FC = () => {
  return (
    <div>
      <NavbarPage />
      <div className="content-area">
      </div>
    </div>
  );
};

export default HomePage;
