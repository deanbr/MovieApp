import React, { Component } from 'react';
import './App.css';
import MovieList from './components/movie-list';

class App extends Component {
  state = {
    movies: []
  }

  token = 'n/a'

  componentDidMount() {
    fetch('http://127.0.0.1:8000/api/movies/', {
      method: 'GET', 
      headers: {
        'Authorization': 'Token {token}'
      }
    }).then( resp => resp.json() )
    .then( resp =>  this.setState({movies: resp}) )
    .catch( error => console.log(error) )
  }

  render() {
    return (
      <div className="App">
        <h1>Movie Rater</h1>
        <MovieList movies={this.state.movies} />
      </div>
    );
  }
}

export default App;
