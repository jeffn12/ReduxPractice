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
const unsub1 = store.subscribe(() => {
  console.log("The state is: " + store.getState());
});
const unsub2 = store.subscribe(() => {
  console.log("In the second subscribe: " + store.getState());
});
store.dispatch({ type: "ADD_TODO", todo: "Test Todo" });
unsub1();
unsub2();
