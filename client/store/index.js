import { createStore, applyMiddleware, combineReducers } from 'redux';


function reducer(state = 0, action) {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1
    case 'DECREMENT':
      return state - 1
    default:
      return state
  }
}

export const getStore = (req) => {
  return createStore(reducer);
}

export const getClientStore = () => {
  const defaultState = window.context || {};
  return createStore(reducer, defaultState);
}
