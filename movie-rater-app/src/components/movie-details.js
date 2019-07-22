import React, { Component } from 'react';
var FontAwesome = require('react-fontawesome');

class MovieDetails extends Component {
  render() {
    const movie = this.props.movie;
    return (
      <React.Fragment>
        { movie ? (
          <div>
            <h3>{movie.title}</h3>
            <FontAwesome name="star" className={movie.avg_rating > 0 ? 'yellow' : ''} />
            <FontAwesome name="star" className={movie.avg_rating > 1 ? 'yellow' : ''} />
            <FontAwesome name="star" className={movie.avg_rating > 2 ? 'yellow' : ''} />
            <FontAwesome name="star" className={movie.avg_rating > 3 ? 'yellow' : ''} />
            <FontAwesome name="star" className={movie.avg_rating > 4 ? 'yellow' : ''} />
            ({movie.number_of_ratings})

            <p>{movie.description}</p>
          </div>
        ) : null
        }
      </React.Fragment>
    )
  }
}

export default MovieDetails;