import React, { Component } from 'react';
import './plan.css';
import Tabletop from 'tabletop';
import Barra from '../../Component/Headder';
import firebase, { auth, provider } from '../../firebase';

import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';

class plan extends Component {
  constructor() {
    super()
    this.state = {
      data: [],
      user: null,
      email: null
    }
    this.login = this.login.bind(this)
    this.logout = this.logout.bind(this) 
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


/*   const { data } = this.state
  return (
    <div className="App">
      <div id="employee-details">
        {
          data.map(obj => {
            return (
              <div key={obj.employee}>
                <p>{obj.aparelho} / {obj.nome}</p>
              </div>
            )
          })
        }
      </div>
    </div>
  ); */

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
          
          <select>
            {
              data.map(obj => {
                return (
                  <option>{obj.AparelhoCombo}</option>
                )
              })
            }
          </select>
          </div>
          :
          <div>Faca Login</div>}
        </Container>   
        </div>          
      )
    }
}

export default plan;