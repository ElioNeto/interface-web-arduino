import React from 'react';
import ReactDOM from 'react-dom';
import Create from './Pages/Create/Create';
import Createv6 from './Pages/Create/Createv6';
import App from './Pages/App/App';
import Auth from './Pages/Logout/Auth';
import plan from './Pages/Planilhas/plan';
import './index.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';


ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route path="/" exact={true} component={App}/>
            <Route path="/Create" component={Create}/>
            <Route path="/Createv6" component={Createv6}/>
            <Route path="/Auth" component={Auth}/>
            <Route path="/plan" component={plan}/>
        </Switch>
    </ BrowserRouter>, 
  document.getElementById('root')
);
