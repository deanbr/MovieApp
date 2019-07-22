import React, { Component } from 'react';
var FontAwesome = require('react-fontawesome');

class MovieDetails extends Component {

  state = {
    highlighted: -1
  }

  highlightRate = rating => evt => {
    this.setState({highlighted: rating});
  }

  ratingClicked = rating => evt => {
    fetch(`${process.env.REACT_APP_API_URL}/api/movies/${this.props.movie.id}/rate_movie/`, {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${process.env.API_TOKEN}`
      },
      body: JSON.stringify({stars: rating})
    }).then( resp => resp.json() )
    .then( resp => this.getDetails() )
    .catch( error => console.log(error) );
  }

  getDetails = () => {
    fetch(`${process.env.REACT_APP_API_URL}/api/movies/${this.props.movie.id}/`, {
      method: 'GET', 
      headers: {
        'Authorization': `Token ${process.env.API_TOKEN}`
      }
    }).then( resp => resp.json() )
    .then( resp => this.props.updateMovie(resp) )
    .catch( error => console.log(error) );
  }

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

            <div className="rate-container">
              <h2>Rate the movie</h2>
              { [...Array(5)].map( (e, i) => {
                  return <FontAwesome key={i} name="star" className={this.state.highlighted > i - 1 ? 'purple' : ''} 
                            onMouseEnter={this.highlightRate(i)} onMouseLeave={this.highlightRate(-1)} onClick={this.ratingClicked(i + 1)} />;
              })}
            </div>
          </div>
        ) : null
        }
      </React.Fragment>
    )
  }
}

export default MovieDetails;