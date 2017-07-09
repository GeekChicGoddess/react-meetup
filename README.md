# Adding Event Handlers to Components #

Our components are rendering just fine. But beyond that, they don't actually *do* anything. JavaScript is all about responding to user behavior - which is what we'll tackle in this stage of the tutorial.

We're going to add an event listener to the ```Person``` component's ```img``` tag. When a user clicks on the photo, that person's username and password will be displayed under their email and phone number. If they click the image again, that info disappears. I know, I know - why the hell would we want to display that? We wouldn't. This is just about demonstrating events and conditional rendering.

In the old days, we would probably do this by setting a "hide" class on the element containing the login information. Clicking the image would trigger a function that queries the DOM and checks the element's class. If it's "hide," the function would change it to "show," and vice versa. The CSS for those two classes would set the element as hidden or visible.

This approach essentially treats the DOM as the ["single source of truth"](https://css-tricks.com/project-need-react/) that we must beg for wisdom every time we want to change something. In complex applications, it can really slow things down.

React offers a better way. We're going to make each ```Person``` component keep track of whether the login info is visible *inside its own state*. Clicking the ```img``` will trigger a method *of the component* that updates its state - and thus re-renders the element, which knows to only show the login info if it's in a certain state.

Let's get started! Bust open that ```Person.js``` file we started with so many moons ago. We need to add some methods before the ```render()``` one.

```class Person extends Component {

  constructor(props){
    super();

    this.state = {showLogin: false};
```

So this is simple enough, right? We're giving our component a custom ```render()``` method, so we must first call ```super()``` to do all the normal rendering it'll get from React. This method accepts ```props```, and if I wanted to access them in the constructor I would change ```super()``` to ```super(props)```. 

We don't need any props in the ```render()``` method, though, because we want our component to default to *not* showing the username and password. So we give state a ```showLogin``` property set to ```false```.

```
    this.toggleLoginInfo = this.toggleLoginInfo.bind(this);
  }
```

Remember the ```this``` madness? Yeah, this is more of that. ```toggleLoginInfo``` is the name of the method we're about to write. It needs to access the ```this``` that refers to the component, so we have to bind that ```this``` up in the constructor. This is us telling React, "Hey, when you make this component, be sure that when its ```toggleLoginInfo``` method uses ```this``` it refers to the component."

Let's write that method, shall we? It's actually really simple.

```
toggleLoginInfo(){
    this.setState(prevState => ({
      showLogin: !prevState.showLogin
    }));
  }
```

We're using the ```setState``` method again, this time with a [fat arrow](https://www.sitepoint.com/es6-arrow-functions-new-fat-concise-syntax-javascript/) because I felt like it. We didn't need or use this earlier, but ```setState``` always has access to the previous state. That's great in this case because...

All we do is set the state to the *opposite* of whatever it was before, using the ```!``` [logical operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_Operators). This works, of course, because ```showLogin``` is a binary ```true/false``` value.

One more change: we need to tell our component to render the login information...but only if the state's ```showLogin``` is set to ```true```. Let's quickly create a ```LoginInfo.js``` file to house that separate component.

```
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
```
At this point, a component like this doesn't need much explanation. It's just going to hold the ```username``` and ```password``` properties we pass it. Let's get back to ```Person.js``` and add to the ```render()``` method.

```
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
```

What's going on after the phone ```p``` tag *looks* complicated, but it's just a fancy ```if``` statement stolen from React's docs on [conditional rendering](https://facebook.github.io/react/docs/conditional-rendering.html). We're saying, "If ```showLogin``` is ```true``` when you render the component, render ```ShowLogin``` too. Otherwise, don't render it."

You'll also noticed we added an ```onClick``` property to our ```img``` tag. That's how we tell React to run the component's ```toggleLoginInfo``` method when someone clicks the picture.

Save your files, ```npm start``` and click on a photo. You should see login information appear and disappear as you click! That's conditional rendering - not too tricky, right?