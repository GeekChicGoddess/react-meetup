import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import PersonListContainer from '../PersonListContainer';
import Profile from '../Profile';
import './App.css';

class App extends Component {
  render() {
    return (
    	<div>
    		<Route exact path='/' component={PersonListContainer}/>
    		<Route path='/users/:id' component={Profile}/>
    	</div>
    );
  }
}

export default App;
