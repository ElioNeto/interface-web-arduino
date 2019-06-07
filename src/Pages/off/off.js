import React, { Component } from 'react';
import firebase, { auth, provider } from '../../firebase';
import './off.css';
import {Redirect} from 'react-router-dom';

import Barra from '../../Component/Headder';


class off extends Component {

  constructor() {
    super();
    this.state = {
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
          user: items[item].user,
          email: items[item].email
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
            <p>Voce esta conectado</p>
            <Redirect to="/"/>
          </div>
            :
          <div>
            <p>Faça login</p>
          </div>}      
        </div>
      ); 
    }
  }
  export default off;