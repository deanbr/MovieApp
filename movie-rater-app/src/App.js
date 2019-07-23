import React, { Component } from 'react';
import './App.css';
import MovieList from './components/movie-list';
import MovieDetails from './components/movie-details';
import MovieForm from './components/movie-form';

class App extends Component {
  state = {
    movies: [], 
    selectedMovie: null,
    editedMovie: null
  }

  componentDidMount() {
    fetch(`${process.env.REACT_APP_API_URL}/api/movies/`, {
      method: 'GET', 
      headers: {
        'Authorization': `Token ${process.env.REACT_APP_API_TOKEN}`
      }
    }).then( resp => resp.json() )
    .then( resp => this.setState({movies: resp}) )
    .catch( error => console.log(error) );
  }

  loadMovie = movie => {
    this.setState({selectedMovie: movie, editedMovie: null});
  }

  movieDeleted = selectedMovie => {
    const movies = this.state.movies.filter(movie => movie.id !== selectedMovie.id);
    this.setState({movies: movies});
  }

  editClicked = movie => {
    console.log("edited clicked in app");
    this.setState({editedMovie: movie});
  }

  newMovie = () => {
    this.setState({editedMovie: {title: '', description: ''}});
  }

  cancelForm = () => {
    this.setState({editedMovie: null});
  }

  createdMovie = movie => {
    this.setState({movies: [...this.state.movies, movie]});
  }

  render() {
    return (
      <div className="App">
        <h1>Movie Rater</h1>
        <div className="layout">
          <MovieList movies={this.state.movies} movieClicked={this.loadMovie}
            editClicked={this.editClicked} movieDeleted={this.movieDeleted} newMovie={this.newMovie} />
          
          <div>
            { this.state.editedMovie ? 
              <MovieForm movie={this.state.editedMovie} cancelForm={this.cancelForm} 
                createdMovie={this.createdMovie} editedMovie={this.loadMovie} /> : 
              <MovieDetails movie={this.state.selectedMovie} updateMovie={this.loadMovie} /> 
            }
          </div>
        </div>
      </div>
    );
  }
}

export default App;
