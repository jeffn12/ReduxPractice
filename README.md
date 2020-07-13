# ReduxPractice

## Description
Practice workspace for learning about redux
1. created a custom store
2. created reducers to handle slices of state
3. created a reducer to combine all others into a single object for the store

This is a basic TODO list application for tracking todos and goals.  The state of the application is controlled through the custom store (modeled on Redux)

## Usage
1. Create your reducer function(s) - these take an action object as @param, with a 'type' property at minimum
2. Combine your reducers using the `appReducer(<{reducers}>)` - takes an object, each property is its own reducer function
1. Create a store using the combined appReducer: `createStore(<reducer>)`
4. subscribe to changes in the state using <store>.subscribe(<function>) - takes a function to execute when the state is changed
5. change the state using <store>.dispatch(<action, newState>) - dispatch needs an action to perform, and a change to make to the state


### Contributing
As this is a repo for practicing, it is likely that no contributions will be merged.  If you would like to use this repo as a reference or as a resource, feel free to fork!
