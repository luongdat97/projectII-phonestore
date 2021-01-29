import { ADD_TODO, TOGGLE_TODO, SET_FILTER, REMOVE_USER, ADD_USER } from "./actionTypes";

let nextTodoId = 0;

export const addTodo = content => ({
  type: ADD_TODO,
  payload: {
    id: ++nextTodoId,
    content
  }
});

export const toggleTodo = id => ({
  type: TOGGLE_TODO,
  payload: { id }
});

export const addUser = user => ({
  type: ADD_USER,
  payload: { user }
});

export const removeUser = () => ({
  type: REMOVE_USER,
});



export const setFilter = filter => ({ type: SET_FILTER, payload: { filter } });
