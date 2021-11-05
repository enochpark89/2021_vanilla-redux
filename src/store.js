import { createStore } from "redux";
import { createAction, createReducer, configureStore } from "@reduxjs/toolkit";

const ADD = "ADD";
const DELETE = "DELETE";

// use createAction to create action creators (redux toolkit)
const addToDo = createAction("ADD");
const deleteToDo = createAction("DELETE");


const reducer = createReducer([], {
  [addToDo]: (state, action) => {
    state.push({ text: action.payload, id: Date.now() });
  },
  [deleteToDo]: (state, action) =>
    state.filter(toDo => toDo.id !== action.payload)
});

const store = createStore(reducer);

export const actionCreators = {
  addToDo,
  deleteToDo
};

export default store;