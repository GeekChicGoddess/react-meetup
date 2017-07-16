// @flow

import React, { Component } from 'react';
import Person from '../Person';

import './PersonList.css';

class PersonList extends Component {
  render() {
    const people = this.props.people;
    const components = people.map(function(person: Object, index: number){
    return <Person key={index} name={person.name} src={person.src} email={person.email} phone={person.phone} username={person.username} password={person.password}/>;
  });
    return (
      <div className="PersonList">
        {components}
      </div>
    );
  }
}

export default PersonList;