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

import logo from './logo.svg';

class Create extends Component {
    render() {
      return (
        <div>
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="#Create">
          <h1><img 
            src={logo} 
            width="50"
            height="50"
            className="d-inline-block align-top"
            alt=""
          /> &nbsp; Automação</h1>
          </Navbar.Brand>
            <Nav className="mr-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Nav>
          <Form inline>
            <Button variant="outline-info">Logout</Button>
          </Form>
        </Navbar>
        <Container>
          <Form>
            <Form.Group as={Row} controlId="formPlaintextEmail">
              <Form.Label column sm="2">
                Email
              </Form.Label>
              <Col sm="10">
                <Form.Control plaintext readOnly defaultValue="email@example.com" />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formPlaintextPassword">
              <Form.Label column sm="2">
                Password
              </Form.Label>
              <Col sm="10">
                <Form.Control type="password" placeholder="Password" />
              </Col>
            </Form.Group>
          </Form>
        </Container>   
        </div>          
      );
    }
  }
  export default Create;