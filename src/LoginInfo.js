import React, { Component } from 'react';

class LoginInfo extends Component {
  render() {
    return (
      <div className='LoginInfo'>
        <p><strong>Username:</strong> {this.props.username}</p>
        <p><strong>Password:</strong> {this.props.password}</p>
      </div>
    );
  }
}

export default LoginInfo;
