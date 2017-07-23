// @flow

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import LoginInfo from '../LoginInfo';
import './Person.css';

class Person extends Component {

  props: {
    src: string,
    name: string,
    email: string,
    phone: string,
    username: string,
    password: string,
    id: number
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
    const linkPath = `/users/${this.props.id}`;
    return (
      <div className="Person">
        <div>
          <Link to={linkPath}>
            <img className="Person-image" src={this.props.src} alt={this.props.name}/>
          </Link>
        </div>
        <div className='Person-info'>
          <h3 className="Person-name">{this.props.name}</h3>
          <p>{this.props.email}</p>
          <p>{this.props.phone}</p>
        </div>
      </div>
    );
  }
}

export default Person;
