import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import throttle from 'lodash.throttle';
import { loadState, saveState } from './services/localStorage';
import root from './reducers/root';

 // eslint-disable-next-line no-underscore-dangle
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const configureStore = (): Store<State> => {
  const persistedState = loadState();
  const store = createStore(
    root,
    persistedState,
    composeEnhancers(applyMiddleware(thunk)) // eslint-disable-line comma-dangle
    );

  store.subscribe(throttle(() => {
    saveState({
      auth:  store.getState().auth,
    });
  }, 1000));


  return store;
};

export default configureStore;
