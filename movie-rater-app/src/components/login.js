import React, { Component } from 'react';

class Login extends Component {

  state = {
    credentials: {
      username: '',
      password: ''
    }
  }

  inputChanged = event => {
    let cred = this.state.credentials;
    cred[event.target.name] = event.target.value;
    this.setState({credentials: cred});
  }

  login = event => {
    fetch(`${process.env.REACT_APP_API_URL}/auth/`, {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state.credentials)
    }).then( resp => resp.json() )
    .then( resp => {
      window.location.href = "/movies"; 
    })
    .catch( error => console.log(error) );
  }

  render() {
    return (
      <div className="login-container">
        <h1>Login</h1>

        <span>Username</span><br />
        <input type="text" name="username" value={this.state.credentials.username} 
          onChange={this.inputChanged} /><br />
      
        <span>Password</span><br />
        <input type="password" name="password" value={this.state.credentials.password} 
          onChange={this.inputChanged} /><br />

        <button onClick={this.login}>Login</button>
      </div>
    );
  }

};

export default Login;
