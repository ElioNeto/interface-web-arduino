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

  constructor() {
    super();
    this.state = {
      aparelho: '',
      raw1: '',
      funcao1: '',
      raw2: '',
      funcao2: '',
      raw3: '',
      funcao3: '',
      raw4: '',
      funcao4: '',
      username: '',
      items: [],
      user: null,
      email: null
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.login = this.login.bind(this); 
    this.logout = this.logout.bind(this); 
  }
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  handleSubmit(e) {
    e.preventDefault();
    const itemsRef = firebase.database().ref('Controle4bt');
    const item = {
      aparelho: this.state.aparelho, // Nome do aparelho
      
      raw1: this.state.raw1, //Codigo IR Raw
      funcao1: this.state.funcao1, //Nome do comando
      raw2: this.state.raw2, //Codigo IR Raw
      funcao2: this.state.funcao2, //Nome do comando
      raw3: this.state.raw3, //Codigo IR Raw
      funcao3: this.state.funcao3, //Nome do comando
      raw4: this.state.raw4, //Codigo IR Raw
      funcao4: this.state.funcao4, //Nome do comando
      
      user: this.state.user.displayName || this.state.user.email, //Usuario criador
      email: this.state.user.email, //validador de exibicao
    }
    itemsRef.push(item);
    this.setState({
      aparelho: '',
      raw1: '',
      funcao1: '',
      raw2: '',
      funcao2: '',
      raw3: '',
      funcao3: '',
      raw4: '',
      funcao4: '',
      username: '',
      email: ''
    });
  }

  componentDidMount() {
    auth.onAuthStateChanged((user, email) => {
      if (user) {
        this.setState({ user, email });
      } 
    });
    const itemsRef = firebase.database().ref('Controle4bt');

    itemsRef.on('value', (snapshot) => {
      let items = snapshot.val();
      let newState = [];
      for (let item in items) {
        newState.push({
          id: item,
          aparelho: items[item].aparelho,
          user: items[item].user,
          email: items[item].email,
          raw1: items[item].raw1,
          funcao1: items[item].funcao1,
          raw2: items[item].raw2,
          funcao2: items[item].funcao2,
          raw3: items[item].raw3,
          funcao3: items[item].funcao3,
          raw4: items[item].raw4,
          funcao4: items[item].funcao4
        });
      }
      this.setState({
        items: newState
      });
    });
  }

  logout() {
    auth.signOut()
    .then(() => {
      this.setState({
        user: null,
        email:null
      });
    });
  }
  login() {
    auth.signInWithPopup(provider) 
      .then((result) => {
        const user = result.user;
        const email = result.email;
        this.setState({
          user,
          email
        });
      });
  }

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
          {this.state.user ?
              <Button variant="outline-info" onClick={this.logout}>Logout</Button>              
              : 
              <Button variant="outline-info" onClick={this.login}>Logo In</Button>             
            }
          </Form>
          </Navbar.Collapse>
        </Navbar>
        <Container>
        {this.state.user ?
        <div>

          <row>&nbsp;</row>
          <center>
            <h2>
              Cadastro Do Controle <Badge pill variant="danger">Versão 2.0.1</Badge>
            </h2>
          </center>
          
          <row>&nbsp;</row>
          
          <Form onSubmit={this.handleSubmit}>
            <input type="hidden" name="username" placeholder="Seu Nome" value={this.state.user.displayName || this.state.user.email} />
            <input type="hidden" name="email" placeholder="email" value={this.state.user.email} />
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
          </div>
          :
          <div>Faca Login</div>}
        </Container>   
        </div>          
      );
    }
  }
  export default Create;