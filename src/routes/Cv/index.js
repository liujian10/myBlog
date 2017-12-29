import { injectReducer } from '../../store/reducers';

let containers = false;
export const getComponent = (store, param) => (nextState, cb) => {
  const { containerName, key } = param;
  if (containers) {
    cb(null, containers[`${containerName}Container`]);
    return;
  }
  /*  Webpack - use 'require.ensure' to create a split point
 and embed an async module loader (jsonp) when bundling   */
  require.ensure([], (require) => {
    /*  Webpack - use require callback to define
     dependencies for bundling   */
    containers = require('./containers');
    const reducer = require(`../Home/modules/Home`).default;
    /*  Add the reducer to the store on key 'blog'  */
    injectReducer(store, { key, reducer });

    /*  Return getComponent   */
    cb(null, containers[`${containerName}Container`]);

    /* Webpack named bundle   */
  });
};

// Sync route definition
export default store => {
  return {
    path: 'cv',
    getComponent: getComponent(store, { containerName: 'Cv', reducerName: 'Home', key: 'home' })
  };
}
