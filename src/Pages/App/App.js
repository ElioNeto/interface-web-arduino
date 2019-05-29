import React, { Component } from 'react';
import firebase, { auth, provider } from '../../firebase';
import {Link} from 'react-router-dom';
import './App.css';

import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import Card from 'react-bootstrap/Card';
import FormLabel from 'react-bootstrap/FormLabel';

import logo from '../Create/logo.svg';


class App extends Component {

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
    this.login = this.login.bind(this); 
    this.logout = this.logout.bind(this); 
  }

  submitRaw(codRaw) {
    firebase.database().ref('IR_RECEIVE').set(codRaw);
    firebase.database().ref('Mensagem').set("Enviando código para o Arduino");
    firebase.database().ref('MODO').set(3);
  }
  
  componentDidMount() {
    auth.onAuthStateChanged((user, email) => {
      if (user) {
        this.setState({ user, email });
      } 
    });
    const itemsRef = firebase.database().ref('Teste');

    itemsRef.on('value', (snapshot) => {
      let items = snapshot.val();
      let newState = [];
      for (let item in items) {
        newState.push({
          id: item,
          aparelho: items[item].aparelho,
          funcao1: items[item].funcao1,
          cod1: items[item].cod1,
          funcao2: items[item].funcao2,
          cod2: items[item].cod2,
          funcao3: items[item].funcao3,
          cod3: items[item].cod3,
          funcao4: items[item].funcao4,
          cod4: items[item].cod4,
          user: items[item].user,
          email: items[item].email,
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
            <Nav.Link><Link to="/Createv6" >Cadastro V6</Link></Nav.Link>
            <Nav.Link><Link to="/Create">Cadastro V4</Link></Nav.Link>
            <Nav.Link><Link to="/">Controles</Link></Nav.Link>
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
            Controle <Badge pill variant="danger">Versão 2.0.1</Badge>
            </h2>
          </center>
          <row>&nbsp;</row>

           <ul>
            {this.state.items.map((item) => {
            if(this.state.user.email === item.email)
                return (
                <li>
                <Card border="info" style={{ width: '80%' }}>
                    <Card.Header>{item.aparelho}</Card.Header>
                    <Card.Body>
                        <Button variant="outline-primary" onClick={() => this.submitRaw(item.cod1)}>
                        {item.funcao1}
                        </Button>
                        <Button variant="outline-primary" onClick={() => this.submitRaw(item.cod2)}>
                        {item.funcao2}
                        </Button>
                        <Button variant="outline-primary" onClick={() => this.submitRaw(item.cod3)}>
                        {item.funcao3}
                        </Button>
                        <Button variant="outline-danger" onClick={() => this.submitRaw(item.cod4)}>
                        {item.funcao4}
                        </Button>
                    </Card.Body>
                </Card>
                </li>
                )
                })}
            </ul>
          </div>
          :
          <div>Faca Login</div>}
        </Container>   
        </div>          
      );
    }
  }
  export default App;