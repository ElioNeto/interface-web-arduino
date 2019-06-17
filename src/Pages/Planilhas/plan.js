import React, { Component } from 'react';
import './plan.css';
import Tabletop from 'tabletop';
import Barra from '../../Component/Headder';
import firebase, { auth, provider } from '../../firebase';

import Container from 'react-bootstrap/Container';
import Badge from 'react-bootstrap/Badge';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';



class plan extends Component {
  constructor() {
    super()
    this.state = {
      data: [],
      user: null,
      email: null,
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
    this.login = this.login.bind(this)
    this.logout = this.logout.bind(this) 
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  logout() {
    auth.signOut()
    .then(() => {
      this.setState({
        user: null,
        email:null
      })
    })
  }

  login() {
    auth.signInWithPopup(provider) 
      .then((result) => {
        const user = result.user;
        const email = result.email;
        this.setState({
          user,
          email
        })
      })
  }
  
  componentDidMount() {
    Tabletop.init({
      key: '13XgM5L9M_k-kiPE64udbwBSQfbBJ1TYTQ4CkD_kkZic',
      callback: googleData => {
        this.setState({
          data: googleData
        })
      },
      simpleSheet: true
    })
    auth.onAuthStateChanged((user, email) => {
      if (user) {
        this.setState({ user, email });
      } 
    })
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const itemsRef = firebase.database().ref('planificado');
    const item = {
      nomeGeral : this.state.nomeGeral,
      ap1 : this.state.ap1,
      ap2 : this.state.ap2,
      ap3 : this.state.ap3,
      ap4 : this.state.ap4,
      ap5 : this.state.ap5,
      ap6 : this.state.ap6,
      cmd1 : this.state.cmd1,
      cmd2 : this.state.cmd2,
      cmd3 : this.state.cmd3,
      cmd4 : this.state.cmd4,
      cmd5 : this.state.cmd5,
      cmd6 : this.state.cmd6,
      user: this.state.user.displayName, //Usuario criador
      email: this.state.user.email, //validador de exibicao
    }
    itemsRef.push(item);
    this.setState({
      user: null,
      email: null,
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
    });
  }

  render() {
    const { data } = this.state
    return (
      <div>
      <Barra />
      <Container>
      {this.state.user ?
      <div>
        <row>&nbsp;</row>
        <center>
          <h2>
            Cadastro <small><Badge pill variant="secondary">V 3.0.1</Badge></small>
          </h2>
        </center>
        <row>&nbsp;</row>

        <Form onSubmit={this.handleSubmit}>
          <Row>
            <Col>
              <Form.Group controlId="formGroupEmail">
                <Form.Label>Nome do Controle</Form.Label>
                <Form.Control type="text" name='nomeGeral' placeholder="Ex.: Controle do Projetor" onChange={this.handleChange}/>
              </Form.Group>
            </Col>
          </Row>
          {/** Comando 1 **/}
          <Row>
            <Col>
              <Form.Group controlId="formGroupEmail">
                <Form.Label>Nome do Comando</Form.Label>
                <Form.Control type="text" name='cmd1' placeholder="Ex.: Ligar TV" onChange={this.handleChange}/>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group as={Col} controlId="formGridState">
                <Form.Label>Comando</Form.Label>
                <Form.Control as="select"
                name='ap1'                 
                onChange={this.handleChange} >
                  <option>Escolha ...</option>
                  {data.map(obj => {return (<option value={obj.comando}>{obj.nome}</option>)})}
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>
          {/** Comando 2 **/}
          <Row>
            <Col>
              <Form.Group controlId="formGroupEmail">
                <Form.Label>Nome do Comando</Form.Label>
                <Form.Control type="text" name='cmd2' placeholder="Ex.: Ligar TV" onChange={this.handleChange}/>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group as={Col} controlId="formGridState">
                <Form.Label>Comando </Form.Label>
                <Form.Control as="select"
                name='ap2'                 
                onChange={this.handleChange} >
                  <option>Escolha ...</option>
                  {data.map(obj => {return (<option value={obj.comando}>{obj.nome}</option>)})}
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>
          {/** Comando 3 **/}
          <Row>
          <Col>
            <Form.Group controlId="formGroupEmail">
              <Form.Label>Nome do Comando</Form.Label>
              <Form.Control type="text" name='cmd3' placeholder="Ex.: Ligar TV" onChange={this.handleChange}/>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group as={Col} controlId="formGridState">
              <Form.Label>Comando </Form.Label>
              <Form.Control as="select"
              name='ap3'                 
              onChange={this.handleChange} >
                <option>Escolha ...</option>
                {data.map(obj => {return (<option value={obj.comando}>{obj.nome}</option>)})}
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>
        {/** Comando 4 **/}
        <Row>
          <Col>
            <Form.Group controlId="formGroupEmail">
              <Form.Label>Nome do Comando</Form.Label>
              <Form.Control type="text" name='cmd4' placeholder="Ex.: Ligar TV" onChange={this.handleChange}/>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group as={Col} controlId="formGridState">
              <Form.Label>Comando </Form.Label>
              <Form.Control as="select"
              name='ap4'                 
              onChange={this.handleChange} >
                <option>Escolha ...</option>
                {data.map(obj => {return (<option value={obj.comando}>{obj.nome}</option>)})}
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>
        {/** Comando 5 **/}
        <Row>
          <Col>
            <Form.Group controlId="formGroupEmail">
              <Form.Label>Nome do Comando</Form.Label>
              <Form.Control type="text" name='cmd5' placeholder="Ex.: Ligar TV" onChange={this.handleChange}/>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group as={Col} controlId="formGridState">
              <Form.Label>Comando </Form.Label>
              <Form.Control as="select"
              name='ap5'                 
              onChange={this.handleChange} >
                <option>Escolha ...</option>
                {data.map(obj => {return (<option value={obj.comando}>{obj.nome}</option>)})}
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>
        {/** Comando 6 **/}
        <Row>
          <Col>
            <Form.Group controlId="formGroupEmail">
              <Form.Label>Nome do Comando</Form.Label>
              <Form.Control type="text" name='cmd6' placeholder="Ex.: Ligar TV" onChange={this.handleChange}/>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group as={Col} controlId="formGridState">
              <Form.Label>Comando </Form.Label>
              <Form.Control as="select"
              name='ap6'                 
              onChange={this.handleChange} >
                <option>Escolha ...</option>
                {data.map(obj => {return (<option value={obj.comando}>{obj.nome}</option>)})}
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>
        <center><h2><Badge pill variant="secondary">Preview</Badge></h2></center>
        <Card border="info">
          <Card.Header>{this.state.nomeGeral}</Card.Header>
          <Card.Body> 
              <Row>
              <center>
              <Button variant="outline-primary" >
              {this.state.cmd1}
              </Button>
              &nbsp;&nbsp;
              <Button variant="outline-primary">
              {this.state.cmd2}
              </Button>
              </center>
              </Row><Row>
                  <center>
              <Button variant="outline-success">
              {this.state.cmd3}
              </Button>
              &nbsp;&nbsp;
              <Button variant="outline-danger" >
              {this.state.cmd4}
              </Button>
              </center>
              </Row>
              <Row>
              <center>
              <Button variant="outline-success" >
              {this.state.cmd5}
              </Button>
              &nbsp;&nbsp;
              <Button variant="outline-danger">
              {this.state.cmd6}
              </Button>
              </center>
              </Row>
            </Card.Body>
          </Card>
          <Row>&nbsp;</Row>
        <Button variant="success" type="submit">
          Submit
        </Button>
        </Form>


        </div>
        :
        <div>Faca Login</div>}
      </Container>   
      </div>          
    )
  }
}

export default plan;