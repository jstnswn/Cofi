import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import session from './session';
import home from './home';
import library from './library'
import active from './active';
import playlists from './playlists';
import albums from './/albums';

const rootReducer = combineReducers({
  session,
  home,
  library,
  active,
  playlists,
  albums
});


let enhancer;

if (process.env.NODE_ENV === 'development') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
