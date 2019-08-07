import React, { Component } from 'react';
import './Create.css';
import firebase, { auth, provider } from '../../firebase';

import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';

import Barra from '../../Component/Headder';

class Create extends Component {

  constructor() {
    super();
    this.state = {
      aparelho: '',
      funcao1:'',
      cod1:'',
      funcao2:'',
      cod2:'',
      funcao3:'',
      cod3:'',
      funcao4:'',
      cod4:'',
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
    const itemsRef = firebase.database().ref('V4');
    const item = {
      aparelho: this.state.aparelho, // Nome do aparelho
      funcao1: this.state.funcao1,
      cod1: this.state.cod1,
      funcao2: this.state.funcao2,
      cod2: this.state.cod2,
      funcao3: this.state.funcao3,
      cod3: this.state.cod3,
      funcao4: this.state.funcao4,
      cod4: this.state.cod4,
      user: this.state.user.displayName, //Usuario criador
      email: this.state.user.email, //validador de exibicao
    }
    itemsRef.push(item);
    this.setState({
      aparelho: '',
      funcao1: '',
      cod1: '',
      funcao2: '',
      cod2: '',
      funcao3: '',
      cod3: '',
      funcao4: '',
      cod4: '',
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
        <Barra />
        <Container>
        {this.state.user ?
        <div>

          <row>&nbsp;</row>
          <center>
            <h2>
              Cadastro <small><Badge pill variant="secondary">V 2.0.1</Badge></small>
            </h2>
          </center>
          <row>&nbsp;</row>
          <Form onSubmit={this.handleSubmit}>
            <Form.Group controlId="formGridAddress1">
              <Form.Label>Aparelho</Form.Label>
              <Form.Control 
                placeholder="Insira aqui o nome do dispositivo a ser controlado" 
                name="aparelho" 
                onChange={this.handleChange} 
                value={this.state.aparelho} 
                />
            </Form.Group>

            <Badge pill variant="dark">Botão 1</Badge>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Função</Form.Label>
                <Form.Control
                  placeholder="Insira aqui a função desejada" 
                  name="funcao1" 
                  onChange={this.handleChange} 
                  value={this.state.funcao1} 
                />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Código</Form.Label>
                <Form.Control
                  placeholder="Insira aqui o código da função (RAW)" 
                  name="cod1" 
                  onChange={this.handleChange} 
                  value={this.state.cod1} 
                />
              </Form.Group>
            </Form.Row>

            <Badge pill variant="dark">Botão 2</Badge>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Função</Form.Label>
                <Form.Control
                  placeholder="Insira aqui a função desejada" 
                  name="funcao2" 
                  onChange={this.handleChange} 
                  value={this.state.funcao2} 
                />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Código</Form.Label>
                <Form.Control
                  placeholder="Insira aqui o código da função (RAW)" 
                  name="cod2" 
                  onChange={this.handleChange} 
                  value={this.state.cod2} 
                />
              </Form.Group>
            </Form.Row>

            <Badge pill variant="dark">Botão 3</Badge>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Função</Form.Label>
                <Form.Control
                  placeholder="Insira aqui a função desejada" 
                  name="funcao3" 
                  onChange={this.handleChange} 
                  value={this.state.funcao3} 
                />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Código</Form.Label>
                <Form.Control
                  placeholder="Insira aqui o código da função (RAW)" 
                  name="cod3" 
                  onChange={this.handleChange} 
                  value={this.state.cod3} 
                />
              </Form.Group>
            </Form.Row>

            <Badge pill variant="dark">Botão 4</Badge>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Função</Form.Label>
                <Form.Control
                  placeholder="Insira aqui a função desejada" 
                  name="funcao4" 
                  onChange={this.handleChange} 
                  value={this.state.funcao4} 
                />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Código</Form.Label>
                <Form.Control
                  placeholder="Insira aqui o código da função (RAW)" 
                  name="cod4" 
                  onChange={this.handleChange} 
                  value={this.state.cod4} 
                />
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