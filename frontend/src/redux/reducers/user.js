import { ADD_TODO, TOGGLE_TODO, ADD_USER, REMOVE_USER } from "../actionTypes";

const initialState = {
  user: null
};

export default function(state = initialState, action) {
    console.log('action........')
    console.log(action)
  switch (action.type) {
    case ADD_USER: {
      return {
        ...state,
        user: action.payload
      };
    }
    case REMOVE_USER: {
      return {
        ...state,
        user: null
      };
    }
    default:
      return state;
  }
}
