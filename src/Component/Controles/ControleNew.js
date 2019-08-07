import React, { Component } from 'react';
import firebase, { auth, provider } from '../../firebase';
import './controles.css';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';


class Cvplan extends Component {

  constructor() {
    super();
    this.state = {
      aparelhos: [],
      user: '',
      email: '',
      ap1 :'',
      ap2 :'',
      ap3 :'',
      ap4 :'',
      ap5 :'',
      ap6 :'',
      cmd1: '',
      cmd2: '',
      cmd3: '',
      cmd4: '',
      cmd5: '',
      cmd6: '',
      nomeGeral: ''
    }
    this.login = this.login.bind(this); 
    this.logout = this.logout.bind(this); 
    this.removeItem = this.removeItem.bind(this);
  }

  removeItem(itemId) {
    const itemRef = firebase.database().ref(`/planificado/${itemId}`);
    itemRef.remove();
  }

  submitRaw(codRaw, cmd) {
    for (let index = 0; index < 50; index++) {
      firebase.database().ref('IR_RECEIVE').set(codRaw);
      firebase.database().ref('Mensagem').set("Enviando código para o Arduino");
      firebase.database().ref('MODO').set(1);
      firebase.database().ref('IR_RECEIVE').set(codRaw);
      firebase.database().ref('UltimoComandoEnviado').set(cmd);      
    }
    firebase.database().ref('MODO').set(0);
    firebase.database().ref('Mensagem').set("Código enviado para o Arduino");
  }
  
  componentDidMount() {
    auth.onAuthStateChanged((user, email) => {
      if (user) {
        this.setState({ user, email });
      } 
    });
    const itemsRef = firebase.database().ref('planificado');

    itemsRef.on('value', (snapshot) => {
      let aparelhos = snapshot.val();
      let newState = [];
      for (let item in aparelhos) {
        newState.push({
          id: item,
          nomeGeral: aparelhos[item].nomeGeral,
          ap1: aparelhos[item].ap1,
          cmd1: aparelhos[item].cmd1,
          ap2: aparelhos[item].ap2,
          cmd2: aparelhos[item].cmd2,
          ap3: aparelhos[item].ap3,
          cmd3: aparelhos[item].cmd3,
          ap4: aparelhos[item].ap4,
          cmd4: aparelhos[item].cmd4,
          ap5: aparelhos[item].ap5,
          cmd5: aparelhos[item].cmd5,
          ap6: aparelhos[item].ap6,
          cmd6: aparelhos[item].cmd6,
          user: aparelhos[item].user,
          email: aparelhos[item].email
        });
      }
      this.setState({
        aparelhos: newState
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
        <Col>
        <Container>
          <Row>
            {this.state.aparelhos.map((item) => {
              if(this.state.user.email === item.email)
                return (
                  <div className='controle'> 
                    <Col>
                      <Card border="info">
                        <Card.Header>{item.nomeGeral}</Card.Header>
                        <Card.Body> 
                          <Row>
                            <center>
                              <Button variant="outline-primary" onClick={() => this.submitRaw(item.ap1, item.cmd1)}>
                                {item.cmd1}
                              </Button>
                              &nbsp;&nbsp;
                              <Button variant="outline-primary" onClick={() => this.submitRaw(item.ap2, item.cmd2)}>
                                {item.cmd2}
                              </Button>
                            </center>
                          </Row>
                          <Row>
                            <center>
                              <Button variant="outline-success" onClick={() => this.submitRaw(item.ap3, item.cmd3)}>
                                {item.cmd3}
                              </Button>
                              &nbsp;&nbsp;
                              <Button variant="outline-danger" onClick={() => this.submitRaw(item.ap4, item.cmd4)}>
                                {item.cmd4}
                              </Button>
                            </center>
                          </Row>
                          <Row>
                            <center>
                              <Button variant="outline-success" onClick={() => this.submitRaw(item.ap5, item.cmd5)}>
                                {item.cmd5}
                              </Button>
                              &nbsp;&nbsp;
                              <Button variant="outline-danger" onClick={() => this.submitRaw(item.ap6, item.cmd6)}>
                                {item.cmd6}
                              </Button>
                            </center>
                          </Row>
                          <Row>&nbsp;</Row> 
                          <Row>
                            <Button variant="outline-danger" onClick={() => { if (window.confirm('Tem certeza que deseja apagar o controle?'))this.removeItem(item.id)}}>
                              Apagar Controle
                            </Button>
                          </Row>
                        </Card.Body>
                      </Card>
                    </Col>
                  </div>
                )
              })
            }      
          </Row>
        </Container>
        </Col>   
      </div>          
    );
  }
}
export default Cvplan;