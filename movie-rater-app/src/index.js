import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Login from './components/login';
import './index.css';
import { Route, BrowserRouter } from 'react-router-dom';

const routing = (
  <BrowserRouter>
    <div>
      <Route exact path="/" component={Login} />
      <Route exact path="/movies" component={App} />
    </div>
  </BrowserRouter>
)

ReactDOM.render(
  routing,
  document.getElementById('root')
);
