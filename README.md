# Vanilla Redux

Learning Vanilla-Redux and React-Redux

# Development Note

# 1.0 Create a vanilla counter

index.html
```html
<!DOCTYPE html>
<html lang="en">
......(skipped)
  <body>
    <button id="add">Add</button>
    <span></span>
    <button id="minus">Minus</button>
  </body>
</html>
```

app.js
```js
const add = document.getElementById("add");
const minus = document.getElementById("minus");
const number = document.querySelector("span");

let count = 0;
number.innerText = count;

const updateText = () => {
  number.innerText = count;
};

const handleAdd = () => {
  count = count + 1;
  updateText();
};

const handleMinus = () => {
  count = count - 1;
  updateText();
};

add.addEventListener("click", handleAdd);
minus.addEventListener("click", handleMinus);
```

# 2.0 Add Redux

1. Install Redux

```js
npm install redux
```

2. Create a store

- Store is where you put the data or the state. 
*State is a data that change in your application*

- Notice there are a lot of code just to modify count data.
- Redux is built to help out your data.
- data goes to the store

- To create the store, use the code below:
```js
const countStore = createStore(countModifier);
// Reducer is expected to be a function. 
```

*What is a reducer?*
- Reducer is a function that modifies your data.
- Reducer can be stated in index.js.
- Nobody can modify the state except for Modifiers.

```js
// modifies the data.
const countModifier = (count = 0) => {
  return count;
};
```

3. Action

*What is an action?*
- Action is what helps us communicate.

index.js:
```js
import { createStore } from "redux";
const add = document.getElementById("add");
const minus = document.getElementById("minus");
const number = document.querySelector("span");

// countModifier takes in a currentState and an action.
const countModifier = (count = 0, action) => {
  console.log(count, action);
  // action will have the object that was sent from countStore.
  if (action.type === "ADD") {
    return count + 1;
  } else if (action.type === "MINUS") {
    return count - 1;
  } else {
    return count;
  }
};

const countStore = createStore(countModifier);

// send a dispatch to the countModifier.
countStore.dispatch({ type: "ADD" });
countStore.dispatch({ type: "ADD" });
countStore.dispatch({ type: "ADD" });
countStore.dispatch({ type: "ADD" });
countStore.dispatch({ type: "ADD" });
countStore.dispatch({ type: "MINUS" });

console.log(countStore.getState());
```

4. Subscription

- Subscribe allows us to listen to changes.

```js
const onChange = () => {
  number.innerText = countStore.getState();
};

countStore.subscribe(onChange);
``` 

5. Recap

- countModifier is a function that is called with the current state. If no state, it will be called as 0.
- Whatever reducer returns become a current state. 
- If you want to communicate with the reducer, you use dispatch. Whatever is sent from dispatch will go to the reducer (action)
- Action must have types. 
- Actions are the way you communicate with the modifier. 
- If you want to listen to the change from the store, you can subscribe. 

*Make sure to modify the documents and try on your own how this actually works.*

6. Refactoring

- Change if-else to switch.
- Instead of sending String from dispatch, send const string because there might be an error and you might not know why it is not working. If it is const, JavaScript will notify you which error. 

# 3.0 - Redux - To Do List

1. Vanilla To-Do

- Usually when you create a todo list, you are only modifying html and not saving any data. 
- Redux can help you save data in the front end.
**Never mutate state**

2. State Mutation

*What is mutation?*
```js
const friends = ["dal"]
friends.push("lynn")
// friends now have two persons so this is mutation.
```

- Instead of mutating, you can return the new object with the new state.
- 

3. Delete To-Do

- You do not want to mutate the state or the array. 
- .splice() mutates the array. You want to return a new array.
- .filter() cretes the new array.

4. Conclusion

- Summary of how to-do-list work along with redux.
- Before we start, please note that you can't mutate the store. 

- Order of operation.
  a. Create Store
  b. Initiate the store
  c. Create a form
  d. When the form is submitted, dispatch input value.
  e. Dispatch will take in an object and transfer that object as an action in reducer. 
  f. Reducer contains a switch. 
  g. If Adding, it will add the input text received in the form and generate a random ID and return that object as a new state.
  h. If deleting, it will use .filter() to exclude selected id and and return a new object without a selected id.

- These whole things are within one page index.js. However, with react, these functions within functions can be simplified. 

Final code

index.js
```js
import { createStore } from "redux";

// Query selector to get the to-do list.
const form = document.querySelector("form");
const input = document.querySelector("input");
const ul = document.querySelector("ul");
const ADD_TODO = "ADD_TODO";
const DELETE_TODO = "DELETE_TODO";

// functions that returns an object for the store.
const addToDo = text => {
  return {
    type: ADD_TODO,
    text
  };
};

const deleteToDo = id => {
  return {
    type: DELETE_TODO,
    id
  };
};

// Whenevern dispatch is called, the reducer is called.
const reducer = (state = [], action) => {
  switch (action.type) {
    case ADD_TODO:
      const newToDoObj = { text: action.text, id: Date.now() };
      return [newToDoObj, ...state];
    case DELETE_TODO:
      const cleaned = state.filter(toDo => toDo.id !== action.id);
      return cleaned;
    default:
      return state;
  }
};

// store is created.
const store = createStore(reducer);

// console log for development.
store.subscribe(() => console.log(store.getState()));

// dispatch ADD and DELETE.
const dispatchAddToDo = text => {
  store.dispatch(addToDo(text));
};

const dispatchDeleteToDo = e => {
  const id = parseInt(e.target.parentNode.id);
  store.dispatch(deleteToDo(id));
};


const paintToDos = () => {
  const toDos = store.getState();
  // clean the current to-do list.
  ul.innerHTML = "";
  toDos.forEach(toDo => {
    const li = document.createElement("li");
    const btn = document.createElement("button");
    btn.innerText = "DEL";
    btn.addEventListener("click", dispatchDeleteToDo);
    li.id = toDo.id;
    li.innerText = toDo.text;
    li.appendChild(btn);
    ul.appendChild(li);
  });
};

// Show in index.html changes you made in the store. 
store.subscribe(paintToDos);

const onSubmit = e => {
  e.preventDefault();
  const toDo = input.value;
  input.value = "";
  dispatchAddToDo(toDo);
};

// Event listener for the form.
form.addEventListener("submit", onSubmit);
```

app.js
```js
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;

```


# 4.0 - Redux - React

**Clean all previous setups and startover in create-react-app**

1. Basic Setup

  a. Set up Index.js and App.js as a normal react way.
  - Index.js > export App.js
  - App.js > route to different pages.
  b. Set up home

home.js
```js
import React, { useState } from "react";

function Home() {
  const [text, setText] = useState("");
  function onChange(e) {
    setText(e.target.value);
  }
  function onSubmit(e) {
    e.preventDefault();
    setText("");
  }
  return (
    <>
      <h1>To Do</h1>
      <form onSubmit={onSubmit}>
        <input type="text" value={text} onChange={onChange} />
        <button>Add</button>
      </form>
      <ul></ul>
    </>
  );
}

export default Home;
```

2. Connect to the store

  a. create a new file called store.js as below

store.js
```js
import { createStore } from "redux";

const ADD = "ADD";
const DELETE = "DELETE";

// function that returns an object.
export const addToDo = text => {
  return {
    type: ADD,
    text
  };
};

export const deleteToDo = id => {
  return {
    type: DELETE,
    id
  };
};

// reducer that returns a new object to the state.
const reducer = (state = [], action) => {
  switch (action.type) {
    case ADD:
      return [{ text: action.text, id: Date.now() }, ...state];
    case DELETE:
      return state.filter(toDo => toDo !== action.id);
    default:
      return state;
  }
};

const store = createStore(reducer);

export default store;
```

3. mapStateToProps

- In redux-react documentation, you can see the connect function.

- mapStateToProps is a function that is called for two things. 

- import connect from react-redux.
```js
import { connect } from "react-redux";
```
- "connect" library connects your component to your store.

*How exactly do you connect from home to store?*

```js
// According to the redux documentation, export along with the name of the function in parenthesis will connect them together. 
export default connect(getCurrentState)(Home)

```

**export default connect ()() connects store.js to home.js**

**Now that it is connected, how do I use it?**

- you can use it using mapStateToProps.
- mapStateToProps: 
```js
// Two arguments: state from store; props from component.
mapStateToProps(state, ownProps?)
```
**mapStateToProps must return a plain object.** 

- For example, 
```js
function getCurrentState(state, ownProps) {
  console.log(state, ownProps)
  return {sexy: true};
}
// console log that state which is empty and ownProps that was given by default.
```
- Allows you to intercept the function. 
- 

4. mapDispatchToProps

- connect takes two argument (mapStateToProps and mapDispatchToProps)

- introducing mapDispatch

# 5.0 Redux Toolkit

1. Redux Toolkit

- There are many complaints from people that they need to use lots of code for redux. 
  - Use switch
  - Case default
  - Others. 
- They feel there are many codes. You need to have boiler plate code. 
- Therefore, Redux community came up with REdux toolkit that provide many shortcuts that you can use the same functionality with less code. 
- However, it is important that you don't learn Redux Toolkit in the beginning because there will be void in your knowledge in why you are using certain things. 
- We are going to exlore how we can save code by using these shortcuts. 
```

```


2. createAction

Before:
store.js
```js
const addToDo = text => {
  return {
    type: ADD,
    text
  };
};

const deleteToDo = id => {
  return {
    type: DELETE,
    id: parseInt(id)
  };
};

```

After:
```js
import { createAction} from "@reduxjs/toolkit";
const addToDo = createAction("ADD");
const deleteToDo = createAction("DELETE");
```

- whatever you want to send, you can send with the payload. 
- therefore, instead of action.text, you can change it to action.payload. 
- This is one of the optimization

After:

ToDo.js
```js
import React from "react";
import { connect } from "react-redux";
import { actionCreators } from "../store";
import { Link } from "react-router-dom";
function ToDo({ text, onBtnClick, id }) {
  return (
    <li>
      <Link to={`/${id}`}>{text}</Link>
      <button onClick={onBtnClick}>DEL</button>
    </li>
  );
}
function mapDispatchToProps(dispatch, ownProps) {
  return {
    onBtnClick: () => dispatch(actionCreators.deleteToDo(ownProps.id))
  };
}
export default connect(null, mapDispatchToProps)(ToDo);
```

store.js
```js
import { createStore } from "redux";
import { createAction } from "@reduxjs/toolkit";

const addToDo = createAction("ADD");
const deleteToDo = createAction("DELETE");

const reducer = (state = [], action) => {
  switch (action.type) {
    case addToDo.type:
      return [{ text: action.payload, id: Date.now() }, ...state];
    case deleteToDo.type:
      return state.filter(toDo => toDo.id !== action.payload);
    default:
      return state;
  }
```

2. createReducer
- createReducer has switch and ther eare many things that we have to configure. 

Typical example of reducer:
```js
const reducer = (state = [], action) => {
  switch (action.type) {
    case addToDo.type:
      return [{ text: action.payload, id: Date.now() }, ...state];
    case deleteToDo.type:
      return state.filter(toDo => toDo.id !== action.payload);
    default:
      return state;
  }

```

- instead of switch, you can use other things like action.todo.
Using createReducer:
```js
import { createAction, createReducer } from "@reduxjs/toolkit";
const reducer = createReducer([], {
  [addToDo]: (state, action) => {
    state.push({ text: action.payload, id: Date.now() });
  },
  [deleteToDo]: (state, action) =>
    state.filter(toDo => toDo.id !== action.payload)
});
```
- Another thing that is very important is that you can mutate the state. 
- This is amazing because before, we do not mutate the state. 

3. configureStore

- create configureSTore function.
- configureStore creates a cool middlewhere. - good defaults to the store. 
- You can install Redux DevTool on Chrome using the URL
https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=ko
- It just paints the graphical situation of state and store. 
- You can go back in time and do many other things. 
- If you want to, you can use dispatcher. This allow you to dispatch your actions. 
- If you go to the webiste that uses redux, the redux developer tool will light up and you can see all the states and others. Airbnb website can view the states. 
- 

4. createSlice

- Introducing a function called createSlice. 
- createSlice will create a reducer for you and an action for you. 
- you are going to comment everything. 
- Instead of creating action, you are going to write something like below

```js
const toDos = createSlice({
  name: "toDosReducer",
  initialState: [],
  reducers: {
    add: (state, action) => {
      state.push({ text: action.payload, id: Date.now() });
    },
    remove: (state, action) => state.filter(toDo => toDo.id !== action.payload)
  }
```
- automatically createSlice will provide a reducer. 
- There are state and action. 
- With this, you can reduce so much code. Less code is possible. 

# 6.0 Conclusions

- Long code can be divided into smaller functions. 
1. createAction

- Instead of having the name of action and function, you integrated using creatAction. This will create an action and the payload tha you keep it. 

2. createReducer
- Instead of using switch, we can use the ES6-like syntax to create a new things and reduce the amount of code. 
- 

3. 