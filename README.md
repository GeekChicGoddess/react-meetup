# Our First React Component #

Our demo app will display users on a page based on data we retrieve from the [Random User Generator](https://randomuser.me/). We could write code for a "Users" page that would iterate through the remote data, generating HTML components for each one. But what happens when we want to show a user's data on another page? We'd have to copy that code and use it on the new page - or include it app-wide.

This is where React becomes very useful. React lets us define a component as a reusable piece of UI - what it looks like and how it functions - *once*. We can then use it anywhere in our app by calling it like we would a native HTML element, like a ```<div>``` or a ```<p>``` tag.

Let's take an example to show you what I mean. Open up the ```src``` folder of our project and create a new file named ```Person.js```. (React style is to start component names with upper-case letters.) Start it with the following lines:

```
import React, { Component } from 'react';
```

If you're familiar with JavaScript imports, this part will make sense. We're just bringing React and its Component class into our file, because this "Person" component will extend them. Now let's define our component:

```
class Person extends Component {
  render() {
    return (
      <div className="Person">
        <img className="Person-image" src={this.props.src} alt={this.props.name}/>
        <h3 className="Person-name">{this.props.name}</h3>
        <p>{this.props.email}</p>
        <p>{this.props.phone}</p>
      </div>
    );
  }
}
```

Looks weird, right? This is JSX - an extension to JavaScript that lets us better integrate our JS and HTML. Here we've defined a class - Person - that extends React's base Component class. Every component has a render() method that's called when React adds the component to the page. The render() method is where we tell React what our component will look like.

So what does a Person look like? For the most part, it's pretty basic HTML - a container ```<div>```, an image, heading, and two ```<p>``` tags for contact information. 

Those curly braces, however, are *not* standard HTML. They're references to the *properties* of the Person component, which we define when we create the component. Just like every React component has a render() method, they all accept a single "props" object argument containing read-only properties.

Using the above code, I can call a Person component anywhere in my app, pass it the person's name, email, phone number and a link to their image, and React will dynamically add those properties where I've referenced them with ```{this.props.name}``` and the like. Before doing that, though, we need to add one more line to our ```Person.js``` file:

```
export default Person;
```

There. Now this file *exports* the Person component, so other parts of the app can *import* and use it. Let's also create a ```Person.css``` file in the same ```src``` directory and import it at the top of our JS file (```import './Person.css'```) so the component doesn't look so ugly.

### Rendering our Person ###

It's time to get our Person on the page. Open up ```src/index.js``` and import the Person component near the top:

```
import Person from './Person';
```

Then change the code starting with ```ReactDOM.render``` to the following:

```
ReactDOM.render(
  <Person name='Kia Farhang' src='https://kiafarhang.com/img/kf.jpg' email='fakeemail@google.com' phone='(123) 456-7890'/>,
  document.getElementById('root')
);
```

```ReactDOM.render()``` takes two arguments: the component to render and the HTML element to attach it to. Our file at ```public/index.html``` already contains a ```<div id='root'>```, so we'll target that. When we add the Person component, note two things:

-React components are self-closing: we used ```<Person />```, not ```<Person></Person>```.
-You can pass component properties like you would attributes to an image or anchor tag.

Save the ```index.js``` file, open up a terminal in the project directory and run ```npm start```. You should see my ugly mug staring at you!

We've built our first React component, but we probably could have got the same information on the page a lot faster if we hard coded it. Let's mvoe on to [rendering multiple components at once](https://github.com/KiaFarhang/react-meetup/tree/stage-2) to see why React is so great.