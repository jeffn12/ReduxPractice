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
const todosReducer = function (state = [], action) {
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

/**
 *  Goals reducer function
 * @description a reducer function to handle actions to the state
 */
const goalsReducer = function (state = [], action) {
  switch (action.type) {
    case "ADD_GOAL":
      return [...state, action.goal];
    case "DELETE_GOAL":
      return state.filter((goal) => action.id !== goal.id);
    default:
      return state;
  }
};

/**
 *  App reducer function
 * @description a function to combine the reducers into 1 object for the store
 */
const appReducer = function (state = {}, action) {
  return {
    todos: todosReducer(state.todos, action),
    goals: goalsReducer(state.goals, action)
  };
};

let store = createStore(appReducer);
const unsub1 = store.subscribe(() => {
  console.log("The state is: " + store.getState());
});

unsub1();

function addTodo() {
  const input = document.getElementById("todo");
  const name = input.value;
  input.value = "";
}

function addGoal() {}
