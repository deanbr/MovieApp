import React, { Component } from 'react';
import './App.css';
import MovieList from './components/movie-list';
import MovieDetails from './components/movie-details';
import MovieForm from './components/movie-form';
import { withCookies } from 'react-cookie';
var FontAwesome = require('react-fontawesome');

class App extends Component {
  state = {
    movies: [], 
    selectedMovie: null,
    editedMovie: null, 
    token: this.props.cookies.get('movie-rater-token')
  }

  componentDidMount() {
    // check if user has logged in - if not then redirect back to login page
    if (this.state.token) {
      fetch(`${process.env.REACT_APP_API_URL}/api/movies/`, {
        method: 'GET', 
        headers: {
          'Authorization': `Token ${this.state.token}`
        }
      }).then( resp => resp.json() )
      .then( resp => this.setState({movies: resp}) )
      .catch( error => console.log(error) );
    } else {
      window.location.href = '/';
    }
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
        <h1>
          <FontAwesome name="film" />
          <span>Movie Rater</span>
        </h1>
        <div className="layout">
          <MovieList movies={this.state.movies} movieClicked={this.loadMovie} token={this.state.token}
            editClicked={this.editClicked} movieDeleted={this.movieDeleted} newMovie={this.newMovie} />
          
          <div>
            { this.state.editedMovie ? 
              <MovieForm movie={this.state.editedMovie} cancelForm={this.cancelForm} 
                createdMovie={this.createdMovie} editedMovie={this.loadMovie} token={this.state.token} /> : 
              <MovieDetails movie={this.state.selectedMovie} updateMovie={this.loadMovie} token={this.state.token} /> 
            }
          </div>
        </div>
      </div>
    );
  }
}

export default withCookies(App);
