/**
 *  createStore function
 * @description library code to mimic a redux store
 */

function createStore(reducer) {
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
    state = reducer(state, action);
    listeners.forEach((listener) => listener());
  };

  return {
    getState,
    subscribe,
    dispatch
  };
}

/**
 *  Todos reducer function
 * @description a reducer function to handle actions to the state
 */
todosReducer = function todos(state = [], action) {
  switch (action.type) {
    case "ADD_TODO":
      return [...state, action.todo];
    case "DELETE_TODO":
      return state.filter((todo) => action.id !== todo.id);
    case "TOGGLE_TODO":
      return state.map((todo) =>
        todo.id === action.id
          ? Object.assign({}, todo, { completed: !todo.completed })
          : todo
      );
    default:
      return state;
  }
};

let store = createStore(todosReducer);
const unsub1 = store.subscribe(() => {
  console.log("The state is: " + store.getState());
});
const unsub2 = store.subscribe(() => {
  console.log("In the second subscribe: " + store.getState());
});
store.dispatch({
  type: "ADD_TODO",
  todo: { id: 0, title: "Test Todo", completed: false }
});
unsub1();
unsub2();
