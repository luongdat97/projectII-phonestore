import { combineReducers } from "redux";
import visibilityFilter from "./visibilityFilter";
import todos from "./todos";
import user from './user';

export default combineReducers({ todos, visibilityFilter, user });
