import React from 'react';
import ReactDOM from 'react-dom';
import App from './Pages/App';
import Create from './Pages/Create/Create';
import './index.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route path="/" exact={true} component={App}/>
            <Route path="/Create" component={Create}/>
        </Switch>
    </ BrowserRouter>, 
  document.getElementById('root')
);
