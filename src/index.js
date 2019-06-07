import React from 'react';
import ReactDOM from 'react-dom';
import Create from './Pages/Create/Create';
import Createv6 from './Pages/Create/Createv6';
import App from './Pages/App/App';
import old from './OLD/old';
import off from './Pages/off/off';
import './index.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route path="/" exact={true} component={App}/>
            <Route path="/Create" component={Create}/>
            <Route path="/Createv6" component={Createv6}/>
            <Route path="/old" component={old}/>
            <Route path="/off" component={off}/>
        </Switch>
    </ BrowserRouter>, 
  document.getElementById('root')
);
