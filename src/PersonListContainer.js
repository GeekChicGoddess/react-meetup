import React, { Component } from 'react';
import PersonList from './PersonList';

class PersonListContainer extends Component {
  constructor(props){
    super(props);

    this.state = {
      data: []
    };
  }

  componentDidMount() {
    var th = this;
    const url = 'https://randomuser.me/api/?results=10';

    fetch(url)
    .then(function(response){
      return response.json();
    })
    .then(function(json){
      let dataArray = [];
      json.results.forEach(function(person){
        let personObject = {
          name: `${person.name.first} ${person.name.last}`,
          src: `${person.picture.large}`,
          email: `${person.email}`,
          phone: `${person.cell}`,
          username: `${person.login.username}`,
          password: `${person.login.password}`
        };
        dataArray.push(personObject);
      });
      th.setState({data: dataArray});
    })
    .catch(function(){
      })
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