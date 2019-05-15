import React, { Component } from 'react';
import './App.css';
import firebase, { auth, provider } from './firebase.js';

class App extends Component {
  constructor() {
    super();
    this.state = {
      currentItem: '',
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
    const itemsRef = firebase.database().ref('items');
    const item = {
      title: this.state.currentItem,
      user: this.state.user.displayName || this.state.user.email,
      email: this.state.user.email
    }
    itemsRef.push(item);
    this.setState({
      currentItem: '',
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
    const itemsRef = firebase.database().ref('items');

    itemsRef.on('value', (snapshot) => {
      let items = snapshot.val();
      let newState = [];
      for (let item in items) {
        newState.push({
          id: item,
          title: items[item].title,
          user: items[item].user,
          email: items[item].email
        });
      }
      this.setState({
        items: newState
      });
    });
  }
  removeItem(itemId) {
    const itemRef = firebase.database().ref(`/items/${itemId}`);
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
            <h1>Comandos</h1>
            {this.state.user ?
              <button onClick={this.logout}>Logout</button>                
              :
              <button onClick={this.login}>Log In</button>              
            }
          </div>
        </header>
        {this.state.user ?
          <div>
            <div className='user-profile'>
              <img src={this.state.user.photoURL} />
            </div>
            <div className='container'>
              <section className='add-item'>
                <form onSubmit={this.handleSubmit}>
                  <input type="text" name="username" placeholder="Seu Nome" value={this.state.user.displayName || this.state.user.email} />
                  <input type="hidden" name="email" placeholder="email" value={this.state.user.email} />
                  <input type="text" name="currentItem" placeholder="Comando" onChange={this.handleChange} value={this.state.currentItem} />
                  <button>Adicionar</button>
                </form>
              </section>
              <section className='display-item'>
              <div className="wrapper">
                <ul>
                  {this.state.items.map((item) => {
                    if(this.state.user.email === item.email)
                      return (
                        <li key={item.id}>
                          <h3>{item.title}</h3>
                          <p>Criado por: {item.user}
                            {item.user === this.state.user.displayName || item.user === this.state.user.email ?
                              <button onClick={() => this.removeItem(item.id)}>Delete Item</button> : null}
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
          <div className='wrapper'>
            <p>Você precisa estar conectado para cadastrar</p>
          </div>
        }
      </div>
    );
  }

}
export default App;
