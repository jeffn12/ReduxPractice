// App Code

/**
 *  ID Generator helper function
 */
const generateID = function () {
  return Math.random().toString(36).substring(2);
};

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

let store = Redux.createStore(
  Redux.combineReducers({ todos: todosReducer, goals: goalsReducer })
);
const unsub1 = store.subscribe(() => {
  const { goals, todos } = store.getState();

  document.getElementById("goals").innerHTML = "";
  document.getElementById("todos").innerHTML = "";

  goals.forEach(addGoalToDOM);
  todos.forEach(addTodoToDOM);
});

const checkAndDispatch = function (store, action) {
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
  return store.dispatch(action);
};

const addTodo = function () {
  const input = document.getElementById("todo");
  const name = input.value;
  input.value = "";

  checkAndDispatch(
    store,
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
  checkAndDispatch(
    store,
    addGoalAction({
      name: goal,
      id: generateID()
    })
  );
}

// DOM Code

// Add event listeners
document.getElementById("todoBtn").addEventListener("click", addTodo);
document.getElementById("goalBtn").addEventListener("click", addGoal);

const createRemoveButton = function (onClick) {
  const removeBtn = document.createElement("button");
  removeBtn.innerHTML = "X";
  removeBtn.style.marginRight = "20px";
  removeBtn.addEventListener("click", onClick);
  return removeBtn;
};

const addTodoToDOM = function (todo) {
  const node = document.createElement("li");
  node.style.listStyle = "none";
  const text = document.createTextNode(todo.name);
  const removeBtn = createRemoveButton(() =>
    checkAndDispatch(store, deleteTodoAction(todo.id))
  );

  node.append(removeBtn);
  node.appendChild(text);
  node.style.textDecoration = todo.completed ? "line-through" : "none";
  node.addEventListener("click", () => {
    checkAndDispatch(store, toggleTodoAction(todo.id));
  });
  document.getElementById("todos").appendChild(node);
};

const addGoalToDOM = function (goal) {
  const node = document.createElement("li");
  node.style.listStyle = "none";
  const text = document.createTextNode(goal.name);
  const removeBtn = createRemoveButton(() =>
    checkAndDispatch(store, deleteGoalAction(goal.id))
  );

  node.append(removeBtn);
  node.appendChild(text);
  document.getElementById("goals").appendChild(node);
};
