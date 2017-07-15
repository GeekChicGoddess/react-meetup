# Project Structure #

Before we build anything more complex, I want to walk through some good practices to organize your code. It may not seem important for a scratch project of this size, but building good habits now will save you and your colleagues countless hours of frustration in the future.

First, let's reorganize our project using [Airbnb's React Style Guide.](https://github.com/airbnb/javascript/tree/master/react) Code style guides are wonderful because they take some of the opinion out of development. If everyone on your team follows the same style guide, you don't have to worry about where to find a certain file or how to format your code.

(Airbnb also has [a general JavaScript style guide](https://github.com/airbnb/javascript) that I recommend you bookmark.)

Right now, all of our components are jumbled together in our project's `src` folder. We've got just a handful, and that folder is already getting unruly. On larger projects with dozens of components, searching for anything would just suck.

Let's create a `components` folder inside `src`. Believe it or not, that's where all of our React components will live :)

Pushing all of our React components into one folder won't really help that much, so the next step is to create a separate folder for each component. Overkill? Well, on a small project it might be - but this is invaluable in larger codebases.

It also gets to a central tenet of React: keeping components far away from each other. If Facebook wants to change what the buttons on their site look like, they just have to open up the `Button` folder and go to town. *Everything* about that component - the code to render it, the code to test that it works and the code to set what it looks like - lives in one folder. Anyone working on the project can change the `Button` component and be reasonably confident they won't break anything else.

We'll start with our `App` component and use the same process for the rest. Create an `App` folder inside `src/components`, dropping `App.jsx`, `App.css` and `App.test.js` inside.

Head into that new `App` folder and change `App.jsx` to `index.jsx`. That'll help us cut down on the `import` code we have to write later.

I'll walk you through one more example. Create a `Person` next to the `App` one in `src/components`, and drop `Person.jsx` and `Person.css` inside. Then change `Person.jsx` to `index.jsx`.

Repeat this process for our `PersonList`, `LoginInfo` and `PersonListContainer` components. Remember the `people.json` file we created with mock API results? Throw that in with `PersonListContainer`, because that's the component that uses it.

Leave `index.js` and `index.css` in the root `src` folder - Create React App looks there to build the app.

Speaking of Create React App, once you've moved/renamed everything do an `npm run start` in your terminal. Your app won't run - because we moved everything around without telling our code about it! Luckily, this is an easy fix.

Head into `index.js` and change this line:

`import App from './App';`

to:

`import App from ./components/App;`

That'll point the app's entry point to the new location of the `App` component.

Unfortunately, you'll get another error - because we have to do this for the rest of our components. In the `index.jsx` for each component, change any component imports like so:

```
//import PersonListContainer from './PersonListContainer';
import PersonListContainer from '../PersonListContainer';
```

That's us telling React "Instead of looking in the current directory, go up one level into the `components` directory - then grab the relevant component."

Remember when we changed all the components' `.jsx` files to `index.jsx`? This is why. If we hadn't, we'd have to write our imports like this:

`import PersonListContainer from '../PersonListContainer/PersonListContainer;`

That's just unecessary extra work.

We've got a good foundation to build out our project. Let's take one more detour, though, and explore a powerful tool to improve code readability and cut down on debugging nightmares.