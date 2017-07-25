import React, { Component } from 'react';
import Person from './Person';

import './PersonList.css';

class PersonList extends Component {
  render() {
    const people = this.props.people;
    const components = people.map(function(person, index){
    return <Person key={index} name={person.name} src={person.src} email={person.email} phone={person.phone}/>;
  });
    return (
      <div className="PersonList">
        {components}
      </div>
    );
  }
}

export default PersonList;