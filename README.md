# Building a Multi-Page Application with React Router #

You can do quite a bit with a single-page application, but eventually you'll probably want to add some routes to your app. Anything that requires authentication, for example, should probably send users to a `/login` page. They should be able to tweak their settings on a `/settings` route, etc.

Luckily, we don't have to build separate React apps for each page of our application. The amazing [React Router](https://reacttraining.com/react-router/) lets us add navigational components to our code. Those components tell the app what to render based on the current URL.

You see, our app technically _will_ still be just a single page. Someone visiting it would download all the code, routes and components the first time they hit it. From there, they don't have to request any additional pages from the server - React Router just shows them different parts of the app we've created as they navigate through it.

This approach does have drawbacks, namely that not having separate discrete pages can hurt your site's search engine ranking. We won't cover that issue in depth here, other than to say React Router supports [server-side rendering](https://reacttraining.com/react-router/web/guides/server-rendering), which gets around the problem.

Head to the root of the project on the command line and run the following: 

`npm install react-router-dom`

Now let's get started!

### Rendering the root of our app ### 

So far, everything we've built lives in the `App` component, which the `index.js` file in our `src` file renders. Let's call this the home page of our app - a screen full of users.

To learn how React Router, we're going to explicitly tell it to render the `PersonListContainer` component (and everything inside it) when anyone visits the root `/` path of the app.

Open up `src/index.js` and add the following line to your import statements:

`import { BrowserRouter as Router} from 'react-router-dom';`

We're taking [React Router's `BrowserRouter`](https://reacttraining.com/react-router/web/api/BrowserRouter) component and giving it a simpler name. `BrowserRouter` relies on [the HTML5 history API](https://developer.mozilla.org/en-US/docs/Web/API/History_API) to manage the UI of your app. Let's wrap the whole `App` in it so we can use it throughout:

```
ReactDOM.render(
  <Router>
      <App/>
  </Router>,
    document.getElementById('root')
);
```

Next, open up `App/index.js` and import [React Router's `Route`](https://reacttraining.com/react-router/web/api/Route) component:

import { Route } from 'react-router-dom';

To better understand React Router, it helps to keep in mind that _a route is just a component_. We're basically going to say, "Hey, when the URL path matches x, render x component. If it matches y, render y component instead."

change `App`'s render method to the following:

```
  render() {
    return (
      <Route exact path='/' component={PersonListContainer}/>
    );
  }
```

So, we added a `Route`, and said "When the URL matches `/`, render the `PersonListContainer` component." To do that, we just set the `Route`'s `path` prop to '/'.

Save the file and you should see your app rendering the same as before. But head up to the URL bar and change it from `localhost:3000` to `localhost:3000/test`.

Blank screen, right? Perfect - React Router is working. See, we told it to render the `PersonListContainer` _only when the URL exactly matched `/`_ - that's what the `exact` before `path` meant. `/test` doesn't match `/` exactly, so the Route doesn't render `PersonListContainer`. We haven't set up any more routes, so it doesn't render anything at all.

We used an exact path because if we didn't, further routes wouldn't work properly. If we build a route called `/profile`, that would still match `/` - so the router would render both. 

### Creating Profile Links for Each Person ###

Remember when we set up our app so clicking on someone's profile picture would display their login credentials? Well, let's switch to a more realistic use case. We're going to display a user's profile on a separate page when we click their profile image instead.

To do this, we're going to edit the `Person` component to wrap the profile photo in a React Router `Link` component. That `Link` will send the browser to `/users/:id`, where `id` is the ID of the user we've clicked on. This will take a few steps, so let's dive in.

First, you'll notice we don't actually _have_ an ID property on our `Person` component. That's an easy fix: add it to the component's `props` declaration like so to start:

```
props: {
    src: string,
    name: string,
    email: string,
    phone: string,
    username: string,
    password: string,
    id: number
  };
```

Save and the app should render fine - though if you ran `flow` it would complain that you never pass `id` to `Person` when you render them all in `PersonList`. Let's change that by grabbing an ID when we make our API call to the random user generator. Open up `src/components/PersonListContainer/index.jsx` and update the `componentDidMount` method:

```
    .then((json)=>{
      let dataArray = json.results.map((person)=>{
        let personObject = {
          name: `${person.name.first} ${person.name.last}`,
          src: `${person.picture.large}`,
          email: `${person.email}`,
          phone: `${person.cell}`,
          username: `${person.login.username}`,
          password: `${person.login.password}`,
          id: person.id.value
        };
        return personObject;
      });
      th.setState({data: dataArray});
    })
```

We only changed the line after `password`. We're just also grabbing the `id` value our API returns. Next, we can open up `PersonList/index.jsx` and change the `map` function where we render all of our `Person` components:

```
const components = people.map(function(person: Object, index: number){
    return <Person key={index} name={person.name} src={person.src} email={person.email} phone={person.phone} username={person.username} password={person.password} id={person.password}/>;
  });
```

Great - now our each `Person` component will have access to that user's ID. Open up `Person/index.jsx` and import what we need from React Router up top:

`import { Link } from 'react-router-dom';`

[The `Link` component](https://reacttraining.com/react-router/web/api/Link) is where you tell your app how to manipulate the URL location in the browser. If a user's ID is 555, we want clicking on their profile image to change the URL to `/users/555`. So let's define the path the `Link` will use in our `Person`'s `render` method:
```
render() {
    const showLogin = this.state.showLogin;
    const linkPath = `/users/${this.props.id}`;
    ...
}
```

Next, let's wrap the profile image in a `Link`:

```
    return (
      <div className="Person">
        <div>
          <Link to={linkPath}>
            <img className="Person-image" src={this.props.src} alt={this.props.name}/>
          </Link>
        </div>
```

Simple enough, right? You'll notice I removed the click handler for the image - we're no longer going to render the login credentials conditionally, so you can remove that code below:

```
        <div className='Person-info'>
          <h3 className="Person-name">{this.props.name}</h3>
          <p>{this.props.email}</p>
          <p>{this.props.phone}</p>
        </div>
```

Of course, we should come back later and clean up all the state-related work we did to render those login credentials if we're never going to use them.

Now clicking on a profile image should take you `localhost:3000/users/344560-9936`, or whatever the given user's ID is. That should result in a blank page - remember, it's not exactly matching `/`, so the React Router isn't rendering anything. Let's fix that.

### Rendering Profile Components ###

We need to tell React Router to render a `Profile` component when the URL matches `/users/id`, where `id` is the `id` of the user we clicked on. Let's create a very simple `Profile` component in a new `src/components/Profile/index.jsx` file:

```
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
```

Most of this is pretty basic, so I'll focus on what's new. Our component expects a `match` prop - essentially, this is an object that tracks how we matched the URL React Router was looking for.

The `match` prop has a `params` property, also an object, that contains all the parameters we passed with our `Link` component. Anything in a url with a colon `:` before it is a parameter. Since we linked to `/users/:id`, the `id` is our parameter.

Now, this component doesn't have a lot of real-world use. If we had the user's ID, we'd normally take that and query our database for the user, so we could display all their public information in their profile. (One caveat: React Router parameters always come through as strings, so you'd want to `parseInt()` the parameter before querying the DB with it.)

The random user API doesn't expose ID-based endpoints, so we've created this simple component for demo purposes. In real life, though, try to make your routes a bit more interesting :)

There's one more step left to creating a multi-page app: defining the second `Route`. Open `components/App/index.jsx` back up and let's do that now. Import `Profile` at the top:

`import Profile from '../Profile';`

Then update the following:

```
class App extends Component {
  render() {
    return (
      <div>
        <Route exact path='/' component={PersonListContainer}/>
        <Route path='/users/:id' component={Profile}/>
      </div>
    );
  }
}

export default App;
```

We first created a `<div>` to hold our two `Route`s, as every React component can only return one element. Then we added a second `Route`, this time without the `exact` property.

This is telling React Router, when the URL matches `/users/anything`, render the `Profile` component - and send `anything` as a parameter to that component so it can use it.

Our app should now take you to a user's "profile page" when you click their photo. We're able to use the back button to get back to the root of the app, which renders a list of people. (If a user's ID is `null`, don't worry - the random user API just sends those sometimes.)

You'll notice that every time we go back to the home page, we get a new list of 10 people. That's because React Router is rerendering the component every time, which triggers its `ComponentDidMount` method, which pings the API, etc. For some further exploration, take a look at [the router's `Route render` API](https://reacttraining.com/react-router/web/api/Route/render-func) and see if you can figure out how to prevent that from occurring.