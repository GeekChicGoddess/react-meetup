import React from 'react';
import ReactDOM from 'react-dom';
import Person from './Person';
import './index.css';

ReactDOM.render(
  <Person name='Kia Farhang' src='https://kiafarhang.com/img/kf.jpg' email='fakeemail@google.com' phone='(123) 456-7890'/>,
  document.getElementById('root')
);
