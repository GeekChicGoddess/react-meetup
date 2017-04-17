import React, { Component } from 'react';
import LoginInfo from './LoginInfo';
import './Person.css';

class Person extends Component {

  constructor(props){
    super(props);

    this.state = {showLogin: false};

    this.toggleLoginInfo = this.toggleLoginInfo.bind(this);
  }

  toggleLoginInfo(){
    this.setState(prevState => ({
      showLogin: !prevState.showLogin
    }));
  }

  render() {
    const showLogin = this.state.showLogin;
    return (
      <div className="Person">
        <img className="Person-image" src={this.props.src} alt={this.props.name} onClick={this.toggleLoginInfo}/>
        <h3 className="Person-name">{this.props.name}</h3>
        <p>{this.props.email}</p>
        <p>{this.props.phone}</p>
        { showLogin &&
          <LoginInfo username={this.props.username} password={this.props.password}/>          
        }
      </div>
    );
  }
}

export default Person;
