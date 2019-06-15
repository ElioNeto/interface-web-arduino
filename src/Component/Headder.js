import React, { Component } from 'react';
import './Headder.css';
import { auth, provider } from '../firebase';
import {Link} from 'react-router-dom';

import Form from 'react-bootstrap/Form';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';

import logo from './logo.svg';


class Barra extends Component {

  constructor() {
    super();
    this.state = {
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
          <Navbar.Brand href="/">
          <img 
            src={logo} 
            width="30"
            height="30"
            className="d-inline-block align-top"
            alt=""
          /> Automação 
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
            <Nav.Link><Link to="/Createv6" >Cadastro V6</Link></Nav.Link>
            <Nav.Link><Link to="/Create">Cadastro V4</Link></Nav.Link>
            <Nav.Link><Link to="/">Controles</Link></Nav.Link>
            <Nav.Link><Link to="/plan">Cadastro <Badge variant="danger">New</Badge><small></small></Link></Nav.Link>
          </Nav>
          <Form inline>
          {this.state.user ?
              <Button variant="outline-info" onClick={this.logout} href='/noLoggad'>Logout</Button>              
              : 
              <Button variant="outline-info" onClick={this.login}>Log In</Button>             
            }
          </Form>
          </Navbar.Collapse>
        </Navbar>
        </div> 
      );
  }
}
  export default Barra;