# Rendering Multiple Components #

Why use React for one-off UI elements? Well, you probably shouldn't. The framework's power comes in rendering many of the same type of component - often with different properties - across different sections of the app. To do that, we're going to create a ```PersonList``` component that will generate *multiple* ```Person```s based on the properties we pass it. Create a new file called ```PersonList.js```, importing React (because we always have to) and the ```Person``` we just created (because we'll be calling it here).

```
import React, { Component } from 'react';
import Person from './Person';

import './PersonList.css';
```

Start the PersonList class definition like you normally would, but hold off before telling React what to return from the ```render()``` method:

```
class PersonList extends Component {
  render() {
    const people = this.props.people;
```

That's right - you can actually *do JavaScript* inside React components. Let's look at the next couple of lines to see why that's useful:

```
const components = people.map(function(person, index){
    return <Person key={index} name={person.name} src={person.src} email={person.email} phone={person.phone}/>;
});
```

This...looks more complicated than our ```Person``` code. Let's walk through it step by step.

1. First, we define a [constant](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const) equal to the ```people``` property of the ```props``` object we'll send to our PersonList when we call it. ```people``` will be an array of objects, each of which contain the information a ```Person``` component accepts.

2. Then we use [the Array.map() method](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) to create a *new* array *of Person components*. We're saying, "Okay, React, for every person object in the people array I've passed you, create a ```Person``` component." 

3. Each ```Person``` takes its name, image and contact info from the person object. We also add a "key" attribute equal to the current index of the array. Keys [help React know which parts of a list have changed](https://facebook.github.io/react/docs/lists-and-keys.html), so it only needs to update those and not run through the whole list. Use them!

So now our ```components``` constant references an array of ```Person``` components. So what? Well, let's tell our ```PersonList``` component what to return when rendered:

```
   return (
      <div className="PersonList">
        {components}
      </div>
    );
  }
}

export default PersonList;
```

All our ```PersonList``` renders is a ```<div>``` holding our ```Person```s! That means we can pass ```PersonList``` some ```props``` that contain a ```people``` property which is an array of ```Person``` attributes and...Maybe this is still more complicated than it sounds.

Open up ```App.js``` and swap out the whole file for the following:

```
import React, { Component } from 'react';
import PersonList from './PersonList'
import './App.css';

class App extends Component {
  render() {
    const kia = {
      name: 'Kia',
      src: 'https://randomuser.me/api/portraits/men/74.jpg',
      email: 'kia@google.com',
      phone: '(123) 456-7890'
    };

    const ashley = {
      name: 'Ashley',
      src: 'https://randomuser.me/api/portraits/women/87.jpg',
      email: 'ashley@facebook.com',
      phone: '(555) 555-4567'
    }
    const thePeople = [kia, ashley];
    return (
      <PersonList people={thePeople}/>
    );
  }
}

export default App;
```

Top part makes sense, right? Just pulling in our necessary files. In the ```render()``` method, we define two constants for two different people. Then we store them in an array. Our ```App``` returns a PersonList, and we pass that array of people as the people property.

Because we added this code to ```App.js``` instead of ```index.js```, we need to open up ```index.js``` and tweak a few things:

```
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

ReactDOM.render(
  <App/>,
  document.getElementById('root')
);
```

This tells React to render the ```App``` to the root ```<div>```, instead of rendering a ```Person``` like last time. Run another ```npm start``` and bam - *two* people on your screen!

Okay, so React is getting cooler. But why build an array every time we want to create more than one person? Well, we don't have to. Let's move to the next stage, where we'll discuss [generating components from data obtained through an API](https://github.com/KiaFarhang/react-meetup/tree/stage-3).