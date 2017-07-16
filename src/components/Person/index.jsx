// @flow

import React, { Component } from 'react';
import LoginInfo from '../LoginInfo';
import './Person.css';

class Person extends Component {

  props: {
    src: string,
    name: string,
    email: string,
    phone: string,
    username: string,
    password: string
  };

  static defaultProps = {
    name: 'Rita React'
  };

  state = {
    showLogin: false
  };

  constructor(){
    super();

    this.toggleLoginInfo = this.toggleLoginInfo.bind(this);
  }

  toggleLoginInfo = () => {
    this.setState(prevState => ({
      showLogin: !prevState.showLogin
    }));
  }

  render() {
    const showLogin = this.state.showLogin;
    return (
      <div className="Person">
        <div>
          <img className="Person-image" src={this.props.src} alt={this.props.name} onClick={this.toggleLoginInfo}/>
        </div>
        <div className='Person-info'>
          <h3 className="Person-name">{this.props.name}</h3>
          <p>{this.props.email}</p>
          <p>{this.props.phone}</p>
          { showLogin &&
            <LoginInfo username={this.props.username} password={this.props.password}/>          
          }
        </div>
      </div>
    );
  }
}

export default Person;
