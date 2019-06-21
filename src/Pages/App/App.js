import React, { Component } from 'react';
import firebase, { auth, provider } from '../../firebase';
import './App.css';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import Barra from '../../Component/Headder';
import Cv4 from '../../Component/Controles/ControleV4';
import Cv6 from '../../Component/Controles/ControleV6';
import Cvplan from '../../Component/Controles/ControleNew';

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
          <Barra />
          {this.state.user ?
          <div>
            <Container>
              <div>
                <row>&nbsp;</row>
                <center>
                  <h2> 
                    Sua Coleção 
                  </h2>
                </center>
                <row>&nbsp;</row>
              </div>
            </Container>
            <Row>
              <Cvplan />
            </Row>
            <Row>
              <Cv4 />
            </Row>
            <Row> 
              <Cv6 />
            </Row>
          </div>
            :
          <div>
            <p>Faça login</p>
          </div>}      
        </div>
      ); 
    }
  }
  export default App;