import React, { Component } from 'react';

class MovieForm extends Component {

  state = {
    
  }

  cancelClicked = () => {
    this.props.cancelForm();
  }

  inputChanged = () => {

  }

  saveClicked = () => {

  }

  render() {
    return (
      <React.Fragment>
        <span>Title</span><br />
        <input type="text" value={this.props.movie.title} onChange={this.inputChanged} /><br />
        <span>Description</span><br />
        <textarea value={this.props.movie.description} onChange={this.inputChanged} /><br />
        <button onClick={this.saveClicked}>Save</button>
        <button onClick={this.cancelClicked}>Cancel</button>
      </React.Fragment>
    )
  }
}

export default MovieForm;