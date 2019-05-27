import React, { Component } from 'react';
import './Create.css';
import firebase, { auth, provider } from '../../firebase';
import {Link} from 'react-router-dom';

import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge'

import logo from './logo.svg';

class Create extends Component {
    render() {
      return (
        <div>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Navbar.Brand href="#Create">
          <img 
            src={logo} 
            width="30"
            height="30"
            className="d-inline-block align-top"
            alt=""
          /> Automação <Badge variant="secondary">New</Badge>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Nav>
          <Form inline>
            <Button variant="outline-info">Logout</Button>
          </Form>
          </Navbar.Collapse>
        </Navbar>
        <Container>
          <row>&nbsp;</row>
          <center>
            <h2>
              Cadastro Do Controle <Badge pill variant="danger">Versão 2.0.1</Badge>
            </h2>
          </center>
          
          <row>&nbsp;</row>
          
          <Form>
            <Form.Group>
              <Form.Label>Nome do Aparelho</Form.Label>
              <Form.Control placeholder="Entre com o Nome do Aparelho" />
            </Form.Group>
            
            <Form.Row>
              <Form.Group as={Col} >
                <Form.Label>Comando Botão 1</Form.Label>
                <Form.Control type="text" placeholder="Entre com o comando" />
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>RAW Botão 1</Form.Label>
                <Form.Control type="text" placeholder="Entre com o código" />
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col} >
                <Form.Label>Comando Botão 2</Form.Label>
                <Form.Control type="text" placeholder="Entre com o comando" />
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>RAW Botão 2</Form.Label>
                <Form.Control type="text" placeholder="Entre com o código" />
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col} >
                <Form.Label>Comando Botão 3</Form.Label>
                <Form.Control type="text" placeholder="Entre com o comando" />
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>RAW Botão 3</Form.Label>
                <Form.Control type="text" placeholder="Entre com o código" />
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col} >
                <Form.Label>Comando Botão 4</Form.Label>
                <Form.Control type="text" placeholder="Entre com o comando" />
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>RAW Botão 4</Form.Label>
                <Form.Control type="text" placeholder="Entre com o código" />
              </Form.Group>
            </Form.Row>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Container>   
        </div>          
      );
    }
  }
  export default Create;