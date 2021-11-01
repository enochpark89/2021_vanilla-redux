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

# Redux - To Do List

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