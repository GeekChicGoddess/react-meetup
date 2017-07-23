// @flow

import React, { Component } from 'react';

class Profile extends Component{
	props: {
		match: Object
	};

	render(){
		return(
			<div className='Profile'>
				<h3>The user's ID is {this.props.match.params.id}</h3>
			</div>
		)
	}
}

export default Profile;