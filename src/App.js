import React, { Component } from 'react';
import PersonList from './PersonList'
import './App.css';

class App extends Component {
  render() {
    const kia = {
      name: 'Kia',
      src: 'https://kiafarhang.com/img/kf.jpg',
      email: 'kia@google.com',
      phone: '(123) 456-7890'
    };

    const ashley = {
      name: 'Ashley',
      src: 'https://randomuser.me/api/portraits/women/87.jpg',
      email: 'ashley@facebook.com',
      phone: '(555) 555-4567'
    }
    const thePeople = [kia, ashley];
    return (
      <PersonList people={thePeople}/>
    );
  }
}

export default App;
