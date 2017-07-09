# Rendering Data from an API #

We created a React component that accepts an array of person objects and renders them on the page. But we don't want to code those people ourselves. For our app to scale, we need this component to fetch as many people as we like from *another source*. We'll use the [Random User Generator's API](https://randomuser.me/) for this demonstration, but the concept would work similarly if we wanted to grab people from our app's database.

To separate API and presentational logic, we're going to create a container component - call it ```PersonListContainer.js```. Its *only* task will be to grab people from the API, package them in the manner ```PersonList``` expects, then render a ```PersonList``` component with those people. Let's dive in!

```
import React, { Component } from 'react';
import PersonList from './PersonList';

import backupPeople from './people.json';
```

The first two lines are old by now - we're just importing the stuff this component needs to function. Ignore the `backupPeople` part, we'll come back to it later. Check this out, though:

```
class PersonListContainer extends Component {
  constructor(props){
    super();

    this.state = {
      data: []
    };
  }
```

What be that? Let's take it line by line.

```
constructor(props){
  
}
```

Before we jump to the ```render()``` method, we're giving our component a custom constructor. This is basically us saying "Yo, before React creates you like it creates every other component, we gotta add some special stuff." (You'll see why shortly). The ```constructor()``` method accepts a ```props``` object, as per usual.

```super();```

[This Stack Overflow answer](http://stackoverflow.com/questions/39822941/what-does-super-do-with-any-arguments) explains the use of ```super()``` better than I could. In ES6, any classes with a constructor *must* call ```super()```. Since we're setting a custom constructor, we're doing just that.

```
this.state = {
      data: []
    };
```

And here's *why* we need a constructor. Our ```PersonListContainer``` is going to have its own private "state," which is where the people will eventually live. Why? Well, this way the component is independent - it doesn't depend on something else to pass it props. We could use this ```PersonListContainer``` anywhere in our application. (I'll note here that [Redux](http://redux.js.org/) is a very popular way to help manage app-wide state with React. We'll get to it later.)

To start, ```state``` is just an object with an empty ```data``` property. 

Next, we're going to hook into our component's ```componentDidMount()``` method, which is invoked right after the component moves from React's "virtual DOM" to the one in the browser. The fine folks at Facebook [recommends starting network requests at this point.](https://facebook.github.io/react/docs/react-component.html#componentdidmount)

```
componentDidMount() {
    const th = this;
```

We're getting a handle on ```this``` - the component - because ```this``` will mean something different inside the Promise where we work with the data from the API. ([More on the madness of ```this```](https://github.com/getify/You-Dont-Know-JS/blob/master/this%20&%20object%20prototypes/README.md#you-dont-know-js-this--object-prototypes))

```
const url = 'https://randomuser.me/api/?results=10';

    fetch(url)
    .then((response) =>{
      return response.json();
    })
```

This is [fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch), a newer alternative to XMLHttpRequest. I like it because it plays nice with promises, and this is a demo app so we don't need to worry about browser compatibility. The code above uses an [arrow function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions) to grab the list of people and turn it into JSON. Then...

```
.then((json)=>{
      let dataArray = json.results.map((person)=>{
        let personObject = {
          name: `${person.name.first} ${person.name.last}`,
          src: `${person.picture.large}`,
          email: `${person.email}`,
          phone: `${person.cell}`
        };
        return personObject;
      });
      th.setState({data: dataArray});
    })
```

Once we've got all my people in an array, we map it to a new array containing one object (with the properties we care about) for each person. Then we call the component's ```setState()``` method. This is us telling React, "Yo, this component changed, so you should re-render it." React obliges. (Oh yeah, and this is why we used ```th```: in the current context, ```this``` doesn't refer to the component.)

```
.catch((error)=>{
  console.log(`Error fetching users: ${error}`);

  let dataArray = backupPeople.results.map((person)=>{
  let personObject = {
    name: `${person.name.first} ${person.name.last}`,
    src: `${person.picture.large}`,
    email: `${person.email}`,
    phone: `${person.cell}`
  };

  return personObject;
  });

  th.setState({data: dataArray});

});
```

This `catch` fires if something with our `fetch()` goes wrong - maybe the API is down, for example. Remember this line from the top of the file?

```
import React, { Component } from 'react';
import PersonList from './PersonList';

import backupPeople from './people.json';
```

`people.json` is just a JSON file with the results from a call to the random user API. we import it as a variable so, if anything fails, the component still has some fallback data to parse and display.

The rest of our component is pretty basic. We render a ```PersonList``` component, but instead of passing it something from ```this.props```, we give it ```this.state.data``` instead.

```
  render() {
    return (
      <div className="PersonListContainer">
        <PersonList people={this.state.data}/>
      </div>
    );
  }
}

export default PersonListContainer;
```

Now we can jump into our ```App``` component and change it like this:

```
import React, { Component } from 'react';
import PersonListContainer from './PersonListContainer';
import './App.css';

class App extends Component {
  render() {
    return (
      <PersonListContainer />
    );
  }
}

export default App;

```

Note that we don't give ```PersonListContainer``` anything - we don't need to! Everything is encapsulated within the component. Now, run an ```npm start``` and should see 10 fake-looking people, along with names and photos. Success!

With the basics of rendering components and updating their states, we've got a decent handle on beginner-level React. There's one more thing we'll work on, though: [adding event listeners to components.](https://github.com/KiaFarhang/react-meetup/tree/stage-4)

