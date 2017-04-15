import React, { Component } from 'react';
import './Person.css';

class Person extends Component {
  render() {
    return (
      <div className="Person">
        <img className="Person-image" src={this.props.src} alt={this.props.name}/>
        <h3 className="Person-name">{this.props.name}</h3>
        <p>{this.props.email}</p>
        <p>{this.props.phone}</p>
      </div>
    );
  }
}

export default Person;
