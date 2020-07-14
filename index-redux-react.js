// App Code

/**
 *  ID Generator helper function
 */
const generateID = function () {
  return Math.random().toString(36).substring(2);
};

/**
 *  Todos
 * @description functions associated with managing the state of the todos
 */

// reducer function for managing todo actions
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

// Todo list Action Creators:
const addTodoAction = function (todo) {
  return {
    type: "ADD_TODO",
    todo
  };
};
const deleteTodoAction = function (id) {
  return {
    type: "DELETE_TODO",
    id
  };
};
const toggleTodoAction = function (id) {
  return {
    type: "TOGGLE_TODO",
    id
  };
};

/**
 *  Goals
 * @description functions associated with managing the state of the goals
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

// Goal list Action creators:
const addGoalAction = function (goal) {
  return {
    type: "ADD_GOAL",
    goal
  };
};
const deleteGoalAction = function (id) {
  return {
    type: "DELETE_GOAL",
    id
  };
};

/**
 * Middleware functions
 */

// Don't allow 'bitcoin' on either list
const bitcoinChecker = (store) => (next) => (action) => {
  if (
    action.type === "ADD_TODO" &&
    action.todo.name.toLowerCase().includes("bitcoin")
  ) {
    return alert("Bitcoin is a bad idea...");
  } else if (
    action.type === "ADD_GOAL" &&
    action.goal.name.toLowerCase().includes("bitcoin")
  ) {
    return alert("Bitcoin is a bad idea...");
  }
  return next(action);
};

// Logger Middleware
const logger = (store) => (next) => (action) => {
  console.group(action.type);
  console.log("Action: ", action);
  const result = next(action);
  console.log("New State: ", store.getState());
  console.groupEnd();
  return result;
};

// Create the store using Redux
let store = Redux.createStore(
  Redux.combineReducers({ todos: todosReducer, goals: goalsReducer }),
  Redux.applyMiddleware(logger, bitcoinChecker)
);

// Subscribe to listen for changes in the state
const unsub1 = store.subscribe(() => {
  const { goals, todos } = store.getState();

  document.getElementById("goals").innerHTML = "";
  document.getElementById("todos").innerHTML = "";

  goals.forEach(addGoalToDOM);
  todos.forEach(addTodoToDOM);
});

const addTodo = function () {
  const input = document.getElementById("todo");
  const name = input.value;
  input.value = "";

  store.dispatch(
    addTodoAction({
      name,
      complete: false,
      id: generateID()
    })
  );
};

function addGoal() {
  const input = document.getElementById("goal");
  const goal = input.value;
  input.value = "";
  store.dispatch(
    addGoalAction({
      name: goal,
      id: generateID()
    })
  );
}

/**
 * DOM Code
 */

// Add event listeners
document.getElementById("todoBtn").addEventListener("click", addTodo);
document.getElementById("goalBtn").addEventListener("click", addGoal);

// Button to remove an item from a list
const createRemoveButton = function (onClick) {
  const removeBtn = document.createElement("button");
  removeBtn.innerHTML = "X";
  removeBtn.style.marginRight = "20px";
  removeBtn.addEventListener("click", onClick);
  return removeBtn;
};

// Add a Todo item to the list in the DOM
const addTodoToDOM = function (todo) {
  const node = document.createElement("li");
  node.style.listStyle = "none";
  const text = document.createTextNode(todo.name);
  const removeBtn = createRemoveButton(() =>
    store.dispatch(deleteTodoAction(todo.id))
  );

  node.append(removeBtn);
  node.appendChild(text);
  node.style.textDecoration = todo.completed ? "line-through" : "none";
  node.addEventListener("click", () => {
    store.dispatch(toggleTodoAction(todo.id));
  });
  document.getElementById("todos").appendChild(node);
};

// Add a Goal item to the list in the DOM
const addGoalToDOM = function (goal) {
  const node = document.createElement("li");
  node.style.listStyle = "none";
  const text = document.createTextNode(goal.name);
  const removeBtn = createRemoveButton(() =>
    store.dispatch(deleteGoalAction(goal.id))
  );

  node.append(removeBtn);
  node.appendChild(text);
  document.getElementById("goals").appendChild(node);
};
