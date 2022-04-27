export const loggerMiddleware = (store) => (next) => (action) => {
    if(!action.type) { //Sometimes we receive an action that we may need not to receive, this happens when we are working with redux thunk
      return next(action);
    }
  
    console.log('type', action.type);
    console.log('payload', action.payload);
    console.log('currentState', store.getState()); //it shows us the previous state
  
    //we can get next state from store object. We will only get the new state if it's updated, once its run through all the reducers with action
    next(action); //action finally hits the reducers and updates
  
    console.log('next state: ', store.getState());
  };