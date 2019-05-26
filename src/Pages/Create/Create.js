import React, { Component } from 'react';
import './Create.css';
import firebase, { auth, provider } from '../../firebase';
import {Link} from 'react-router-dom';

import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


class Create extends Component {
    constructor() {
      super();
      this.state = {
        aparelho: '',
        raw1: '',
        raw2: '',
        raw3: '',
        raw4: '',
        funcao1: '',
        funcao2: '',
        funcao3: '',
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
      const itemsRef = firebase.database().ref('ControleV2');
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
      const itemsRef = firebase.database().ref('Aparelhos');
  
      itemsRef.on('value', (snapshot) => {
        let items = snapshot.val();
        let newState = [];
        for (let item in items) {
          newState.push({
            id: item,
            aparelho: items[item].aparelho,
            user: items[item].user,
            email: items[item].email,
            raw: items[item].raw,
            funcao: items[item].funcao
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
        <div className='app'>
          <header>
            <div className="wrapper">
              <h1>Meus Controles</h1>
              {this.state.user ?
                <div>
                  <button className="buttonLogin">Menu</button>
                  <button className="buttonLogin" onClick={this.logout}>Logout</button>   
                </div>   
                :
                <button className="buttonLogin" onClick={this.login}>Log In</button>              
              }
            </div> 
          </header>
          {this.state.user ?
          <Container>
            <Form>
              <Row className="justify-content-md-center">
                <Col md="auto">
                  <Form.Control placeholder="First name" />
                </Col>
                <Col md="auto"> 
                  <Form.Control placeholder="Last name" />
                </Col>
              </Row>
            </Form>
            </Container>
            :
            <div className='wrapper'>
              <p>Você precisa estar conectado para cadastrar</p>
            </div>
          }
        </div>
      );
    }
  
  }
  export default Create;