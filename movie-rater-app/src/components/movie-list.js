import React from 'react';
var FontAwesome = require('react-fontawesome');

function MovieList(props) {

  const movieClicked = movie => evnt => {
    props.movieClicked(movie);
  }

  const removeClicked = movie => evnt => {
    fetch(`${process.env.REACT_APP_API_URL}/api/movies/${movie.id}/`, {
      method: 'DELETE', 
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${process.env.API_TOKEN}`
      }
    }).then( resp => props.movieDeleted(movie) )
    .catch( error => console.log(error) );
  }

  return (
    <div>
      { props.movies.map( movie => {
        return (
          <div key={movie.id}>
            <h3 onClick={movieClicked(movie)}>
              {movie.title}
            </h3>

            <FontAwesome name="edit" />
            <FontAwesome name="trash" onClick={removeClicked(movie)} />
          </div>
        )
      })}
    </div>
  )
}

export default MovieList;