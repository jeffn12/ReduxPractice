/**
 *  Todos reducer function
 * @description a reducer function to handle actions to the state
 */
function todos(state = [], action) {
  if (action.type === "ADD_TODO") {
    return [...state, action.todo];
  }
  return state;
}

/**
 *  createStore function
 * @description a function to mimic a redux store
 */

function createStore() {
  /**
   *  Store should have 4 parts:
   *   1. the state
   *   2. get the state
   *   3. listen to changes on state
   *   4. update the state
   */

  let state;
  let listeners = [];

  const getState = () => state;

  const subscribe = (listener) => {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  };

  const dispatch = (action) => {
    state = todos(state, action);
    listeners.forEach((listener) => listener());
  };

  return {
    getState,
    subscribe,
    dispatch
  };
}

let store = createStore();
