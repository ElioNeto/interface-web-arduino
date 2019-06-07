import React, { Component } from 'react';
import './App.css';
import firebase, { auth, provider } from '../firebase';

import {Link} from 'react-router-dom';

class old extends Component {
  constructor() {
    super();
    this.state = {
      aparelho: '',
      raw: '',
      funcao: '',
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
    const itemsRef = firebase.database().ref('Aparelhos');
    const item = {
      aparelho: this.state.aparelho, // Nome do aparelho
      raw: this.state.raw, //Codigo IR Raw
      funcao: this.state.funcao, //Nome do comando
      user: this.state.user.displayName || this.state.user.email, //Usuario criador
      email: this.state.user.email, //validador de exibicao
    }
    itemsRef.push(item);
    this.setState({
      aparelho: '',
      raw: '',
      funcao: '',
      username: '',
      email: ''
    });
  }

  submitRaw(codRaw) {
    const stringRaw = firebase.database().ref('IR_RECEIVE').set(codRaw);
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
  removeItem(itemId) {
    const itemRef = firebase.database().ref(`/Aparelhos/${itemId}`);
    itemRef.remove();
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
              <Link to='/'>Aplicativo Novo</Link>&nbsp;&nbsp;&nbsp;
              <button className="buttonLogin" onClick={this.logout}>Logout</button>
            </div>                 
              :
              <button className="buttonLogin" onClick={this.login}>Log In</button>     
                      
            }
          </div>
          
        </header>
        {this.state.user ?
          <div>
            <div className='container'>
              <section className='add-item'>
                <form onSubmit={this.handleSubmit}>
                  <input type="text" name="username" placeholder="Seu Nome" value={this.state.user.displayName || this.state.user.email} />
                  <input type="hidden" name="email" placeholder="email" value={this.state.user.email} />
                  <input type="text" name="aparelho" placeholder="Aparelho" onChange={this.handleChange} value={this.state.aparelho} />
                  <input type="text" name="raw" placeholder="String Raw" onChange={this.handleChange} value={this.state.raw} />
                  <input type="text" name="funcao" placeholder="Função" onChange={this.handleChange} value={this.state.funcao} />
                  <button>Criar</button>
                  <button disabled>Gravar Raw :: Em Breve</button>
                </form>
              </section>
              <section className='display-item'>
              <div className="wrapper">
                <ul>
                  {this.state.items.map((item) => {
                    if(this.state.user.email === item.email)
                      return (
                        <li className='lista' key={item.id}>
                          <h3>{item.aparelho}</h3>
                          <p>
                         <button className="buttonController"onClick={() => this.submitRaw(item.raw)}>{item.funcao}</button>
                            {item.user === this.state.user.displayName || item.user === this.state.user.email ?
                            <button className="buttonDelete"onClick={() => this.removeItem(item.id)}>Delete Função</button> : null} 
                          </p>
                        </li>
                      )
                  })}
                </ul>
              </div>
            </section>
            </div>
          </div>
          :
          <div>
            <p>Você precisa estar conectado para cadastrar</p>
          </div>
        }
      </div>
    );
  }

}
export default old;