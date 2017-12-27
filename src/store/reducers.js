import { combineReducers } from 'redux';
import locationReducer from './location';
import blog from '../routes/Blog/modules/Blog';

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    blog,
    location: locationReducer,
    ...asyncReducers
  });
};

export const injectReducer = (store, { key, reducer }) => {
  if (Object.hasOwnProperty.call(store.asyncReducers, key)) return;
  store.asyncReducers[key] = reducer;
  store.replaceReducer(makeRootReducer(store.asyncReducers));
};

export default makeRootReducer;
