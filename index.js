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

  return {
    getState,
    subscribe
  };
}

let store = createStore();
store.subscribe(() => {
  console.log("The state is: " + store.getState());
});
store.subscribe(() => {
  console.log("Changing the state...");
});
