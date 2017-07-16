# Writing Smarter JavaScript with Flow #

To illustrate the value of the tool we're about to add to our project, let's start with a situation we've all likely faced. Let's say I have a function:

```
function sum(a, b){
    return a + b;
}
```

I use my function to add two numbers, like so:

`let sum = sum(15, 20); //sum = 35`

This is a super simple function and it's pretty hard to screw up.

But as my project grows - like our React app is growing - something may go wrong. As we pass around props, we may accidentally pass a _string_ to our `sum()` function instead of a number. 

`let sum = sum('15', 20); //sum = '1520'`

That's not at all what we want our function to do, but JavaScript will do it anyway. Why? Well, JavaScript is a __loosely typed language,__ which basically means __you don't need to declare a variable or parameter's type.__

We know that `sum()` takes two numbers, but because of loose typing, it actually doesn't care whether `a` and `b` are numbers, strings, arrays, objects or dates. It just adds `a` and `b` and returns the results.

You can lose hours of productivity to issues like this: accidentally passing the wrong type of variable to a function, or accidentally _converting_ a variable from one type to another deep within your program or app. 

__Strongly typed languages__ like Java and C++ don't have this problem. In C++, for example, our `sum()` function would look like this:

```
int sum(int a, int b){
    return a + b;
}
```

If we passed a string to `sum()`, our C++ compiler would throw an error. We'd go, "Oh, duh, I screwed up somewhere," fix the mistake and be on our way in _seconds_ - no hunting for where the code went wrong.

Luckily, we don't have to switch to C++ or Java. There are a few tools to add __static typing__ to JS, and these are two of the most common ones:

- [Microsoft's TypeScript](https://www.typescriptlang.org/), and
- [Flow](https://flow.org/en/), from the Fine Folks at Facebook.

Flow is extremely easy to drop into a create-react-app project, so we'll use it for this tutorial. Head to the terminal and run the following two commands:

```
npm install flow-bin --save-dev
flow init
```

Flow just created a `.flowconfig` file in the root of our project directory. We can customize how Flow will run in this file, but it'll work fine out of the box for our purposes.

From now on, whenever we run `flow` on the command line (like we would `npm run start`), Flow will start up a little server and parse all of our code. It looks at files that start with `// @flow` on the first line - so if we ran it right now, it wouldn't look at any of our components. Head into `src/components/PersonList/index.jsx` and add that marker to the top of the file:

```
// @flow

import React, { Component } from 'react';
import Person from '../Person';

```

Run `flow` on the command line. You'll get a message that says `No errors!` Which is great - but wait, we have a function in this file:

```
const components = people.map(function(person, index){
    return <Person key={index} name={person.name} src={person.src} email={person.email} phone={person.phone} username={person.username} password={person.password}/>;
  });
```

Shouldn't flow complain that we don't tell it what that `person` should be an object and `index` should be a number?

Well, no - because in this case, Flow has _inferred_ those types from the rest of our code, so it won't throw an error. Always keep this in mind - and err on the side of over-describing your code to Flow.

Let's do that now. Change the function like so:

```
const components = people.map(function(person: Object, index: number){
    return <Person key={index} name={person.name} src={person.src} email={person.email} phone={person.phone} username={person.username} password={person.password}/>;
  });
```

If you're ever unsure of how to annotate a type, just [check out the Flow docs](https://flow.org/en/docs/types/).

Alright, we've Flow-ified one component. Let's try the PersonListContainer next:

```
// @flow

import React, { Component } from 'react';
import PersonList from '../PersonList';

import backupPeople from './people.json';
```

Run `flow` and...

```
src/components/PersonListContainer/index.jsx:9
  9:   constructor(props){
                   ^^^^^ parameter `props`. Missing annotation

src/components/PersonListContainer/index.jsx:12
                      v
 12:     this.state = {
 13:       data: []
 14:     };
         ^ object literal. This type is incompatible with
  8: class PersonListContainer extends Component {
                                       ^^^^^^^^^ undefined. Did you forget to declare type parameter `State` of identifier `Component`?

src/components/PersonListContainer/index.jsx:38
 38:       th.setState({data: dataArray});
           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ call of method `setState`
 38:       th.setState({data: dataArray});
                       ^^^^^^^^^^^^^^^^^ property `data` of object literal. Property cannot be assigned on possibly undefined value
  8: class PersonListContainer extends Component {
                                       ^^^^^^^^^ undefined. Did you forget to declare type parameter `State` of identifier `Component`?

src/components/PersonListContainer/index.jsx:56
 56:       th.setState({data: dataArray});
           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ call of method `setState`
 56:       th.setState({data: dataArray});
                       ^^^^^^^^^^^^^^^^^ property `data` of object literal. Property cannot be assigned on possibly undefined value
  8: class PersonListContainer extends Component {
                                       ^^^^^^^^^ undefined. Did you forget to declare type parameter `State` of identifier `Component`?

src/components/PersonListContainer/index.jsx:65
 65:         <PersonList people={this.state.data}/>
                                            ^^^^ property `data`. Property cannot be accessed on possibly undefined value
 65:         <PersonList people={this.state.data}/>
                                 ^^^^^^^^^^ undefined. Did you forget to declare type parameter `State` of identifier `Component`?


Found 5 errors
```

What just happened?!? Well, as scary as this looks, it's actually fairly simple. The errors revolve around two things:

1. We didn't tell flow what type the `props` we pass to `PersonListContainer` will be, and
2. We didn't tell Flow what the component's initial state is (and what types it'll contain).

Just like declaring the parameters of a function, you can (and should) tell Flow exactly what props your components take and what types they'll be. Same with state. Flow's docs [tell us how to use it with React](https://flow.org/en/docs/frameworks/react/), so let's follow their lead and change `PersonListContainer` like so:

```
class PersonListContainer extends Component {
  // constructor(props){
  //   super();

  //   this.state = {
  //     data: []
  //   };
  // }

  state = {
    data: []
  };
```

We declared our component's initial state as an object _outside the constructor_, which Flow lets us do. You'll notice we didn't say `data: Array` in that declaration - Flow figured it out itself, because we set the initial value to an empty array.

While we were at it, we removed the constructor entirely - because we were only using it to declare initial state. If we were `bind`ing other methods in the constructor, we'd keep it around.

(Also: I left it in for illustration purposes, but we actually shouldn't have called our constructor with `props` in the first place - we never used `props` in that function!)

Run `flow` again. Just like that, we eliminated _all_ of the errors it threw at us. As a bonus, our component is likely a bit easier for someone else to understand at a glance.

To really see the benefit of that last point, let's open up our `Person` component and add Flow.

```
// @flow

import React, { Component } from 'react';
import LoginInfo from '../LoginInfo';
import './Person.css';
```

Running `flow` should get you some similar errors and a new one. Let's tackle the easy ones first:

```
  state = {
    showLogin: false
  };

  constructor(){
    super();

    this.toggleLoginInfo = this.toggleLoginInfo.bind(this);
  }
```

Like before, we abstracted state into its own object and removed `props` from the constructor call, because we don't use them in the constructor. We should be down to one error:

```
 16:     this.toggleLoginInfo = this.toggleLoginInfo.bind(this);
              ^^^^^^^^^^^^^^^ property `toggleLoginInfo`. Covariant property `toggleLoginInfo` incompatible with contravariant use in
 16:     this.toggleLoginInfo = this.toggleLoginInfo.bind(this);
         ^^^^^^^^^^^^^^^^^^^^ assignment of property `toggleLoginInfo`
```

There are [a few](https://github.com/facebook/flow/issues/3076) [GitHub issues](https://github.com/facebook/flow/issues/1397) examining this error on a much better level than I'm able to. Luckily, there's an easy fix:

```
  toggleLoginInfo = function() {
    this.setState(prevState => ({
      showLogin: !prevState.showLogin
    }));
  }
```

Or, if you prefer:

```
  toggleLoginInfo = () => {
    this.setState(prevState => ({
      showLogin: !prevState.showLogin
    }));
  }
```

Either way, telling Flow that toggleLoginInfo is a `Function` type will remove the error.

Before we finish up with Flow, let's make this component even better. We're going to declare `props` up top like we do with state - so anyone looking at the file can instantly know what the component needs to render.

```
class Person extends Component {

  props: {
    src: string,
    name: string,
    email: string,
    phone: string,
    username: string,
    password: string
  };

  state = {
    showLogin: false
  };
```

There - much easier than hunting and pecking through the component's `render` method to see exactly where we refer to `this.props`. Check this out, too: head into `PersonList` and remove the change the `map` function so we don't pass a `name` property to the `Person`s we create:

```
    const components = people.map(function(person: Object, index: number){
    return <Person key={index} src={person.src} email={person.email} phone={person.phone} username={person.username} password={person.password}/>;
  });
```

Run `flow` and you'll get an error:

```
src/components/PersonList/index.jsx:12
 12:     return <Person key={index} src={person.src} email={person.email} phone={person.phone} username={person.username} password={person.password}/>;
                ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ React element `Person`
              v
  9:   props: {
 10:     src: string,
 11:     name: string,
...:
 16:   };
       ^ property `name`. Property not found in. See: src/components/Person/index.jsx:9
 12:     return <Person key={index} src={person.src} email={person.email} phone={person.phone} username={person.username} password={person.password}/>;
                ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ props of React element `Person`
```

This is Flow saying, "Wait, you told me every `Person` has a `name` component, but you wrote code that renders a `Person` without a `name`. What's up with that?"

We can even set a _default_ value for `props`, if we want to be able to render a component without passing all of them:

```
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

```

This does two things:

1. Flow will no longer complain if we don't pass a `name` to a `Person`, and
2. If we don't, that `Person`'s name will be set to `Rita React`. Remove `name` from your `PersonList` mapping function and do an `npm run start` to see for yourself.

(Note: You don't _need_ Flow to declare prop types or default props; React [handles that out of the box.](https://facebook.github.io/react/docs/typechecking-with-proptypes.html) Still, Flow's way of doing things is a bit more succinct.)

This was a _long_ section, but I hope you found it valuable. Flow can save you a lot of headaches when used properly. It's even better when you don't have to remember to run `flow` on the command line.

Where I work, we use [the `pre-commit` npm package](https://www.npmjs.com/package/pre-commit) to run Flow. We're actually _unable_ to commit our work until we fix any errors that Flow discovers. Makes for fewer issues on projects.

Oh - and I'll leave you with this. Sometimes Flow is just _dumb_, and it throws an error that may make no sense to you. My rule is, if it takes more than 15 minutes to try and satisfy Flow, Flow is unreasonable. You can use `// $FlowFixMe` to tell it to ignore a troublesome line:

```
// $FlowFixMe 
code that throws an error here
```

You can also set your own ignore flags [in your `.flowconfig` file.](https://flow.org/en/docs/config/options/)