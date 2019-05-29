import React, { Component } from 'react';
import firebase, { auth, provider } from '../../firebase';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';


class Cv4 extends Component {

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
    this.removeItem = this.removeItem.bind(this);
  }

  removeItem(itemId) {
    const itemRef = firebase.database().ref(`/V4/${itemId}`);
    itemRef.remove();
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
    const itemsRef = firebase.database().ref('V4');

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
        <Container>
        {this.state.user ?
           <ul>
            {this.state.items.map((item) => {
            if(this.state.user.email === item.email)
                return (
                <li>
                <Card border="info">
                    <Card.Header>{item.aparelho}</Card.Header>
                    <Card.Body> 
                        <Row>
                        <center>
                        <Button variant="outline-primary" onClick={() => this.submitRaw(item.cod1)}>
                        {item.funcao1}
                        </Button>
                        <Button variant="outline-primary" onClick={() => this.submitRaw(item.cod2)}>
                        {item.funcao2}
                        </Button>
                        </center>
                        </Row><Row>
                            <center>
                        <Button variant="outline-success" onClick={() => this.submitRaw(item.cod3)}>
                        {item.funcao3}
                        </Button>
                        <Button variant="outline-danger" onClick={() => this.submitRaw(item.cod4)}>
                        {item.funcao4}
                        </Button>
                        </center>
                        </Row>
                        <Row>&nbsp;</Row> 
                        <Row>
                            <Button variant="outline-danger" onClick={() => this.removeItem(item.id)}>
                            Apagar Controle
                            </Button>
                        </Row>
                    </Card.Body>
                </Card>
                </li>
                )
                })}
            </ul>
          :
          <div>Faca Login</div>}
        </Container>   
        </div>          
      );
    }
  }
  export default Cv4;