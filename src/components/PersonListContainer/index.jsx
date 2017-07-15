import React, { Component } from 'react';
import PersonList from '../PersonList';

import backupPeople from './people.json';

class PersonListContainer extends Component {
  constructor(props){
    super();

    this.state = {
      data: []
    };
  }

  componentDidMount() {
    const th = this;
    const url = 'https://randomuser.me/api/?results=10';

    fetch(url)
    .then((response) =>{
      return response.json();
    })
    .then((json)=>{
      let dataArray = json.results.map((person)=>{
        let personObject = {
          name: `${person.name.first} ${person.name.last}`,
          src: `${person.picture.large}`,
          email: `${person.email}`,
          phone: `${person.cell}`,
          username: `${person.login.username}`,
          password: `${person.login.password}`

        };
        return personObject;
      });
      th.setState({data: dataArray});
    })
    .catch((error)=>{
      console.log(`Error fetching users: ${error}`);

      let dataArray = backupPeople.results.map((person)=>{
        let personObject = {
          name: `${person.name.first} ${person.name.last}`,
          src: `${person.picture.large}`,
          email: `${person.email}`,
          phone: `${person.cell}`,
          username: `${person.login.username}`,
          password: `${person.login.password}`
        };

        return personObject;
      });

      th.setState({data: dataArray});

      });
  }


  render() {
    return (
      <div className="PersonListContainer">
        <PersonList people={this.state.data}/>
      </div>
    );
  }
}

export default PersonListContainer;