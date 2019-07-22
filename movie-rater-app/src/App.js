import React, { Component } from 'react';
import './App.css';
import MovieList from './components/movie-list';
import MovieDetails from './components/movie-details';

class App extends Component {
  state = {
    movies: [], 
    selectedMovie: null
  }

  componentDidMount() {
    fetch('http://127.0.0.1:8000/api/movies/', {
      method: 'GET', 
      headers: {
        'Authorization': 'Token '
      }
    }).then( resp => resp.json() )
    .then( resp => this.setState({movies: resp}) )
    .catch( error => console.log(error) );
  }

  movieClicked = movie => {
    this.setState({selectedMovie: movie});
  }

  movieDeleted = selectedMovie => {
    const movies = this.state.movies.filter(movie => movie.id !== selectedMovie.id);
    this.setState({movies: movies});
  }

  render() {
    return (
      <div className="App">
        <h1>Movie Rater</h1>
        <div className="layout">
          <MovieList movies={this.state.movies} 
            movieClicked={this.movieClicked} movieDeleted={this.movieDeleted} />
          <MovieDetails movie={this.state.selectedMovie} updateMovie={this.movieClicked} />
        </div>
      </div>
    );
  }
}

export default App;
