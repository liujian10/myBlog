import { injectReducer } from '../../store/reducers';

let containers = false;
export const getComponent = (store, param) => (nextState, cb) => {
  const { containerName, reducerName, key } = param;
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
    const reducer = require(`./modules/${reducerName || containerName}`).default;
    /*  Add the reducer to the store on key 'blog'  */
    injectReducer(store, { key, reducer });

    /*  Return getComponent   */
    cb(null, containers[`${containerName}Container`]);

    /* Webpack named bundle   */
  });
};

export default store => {
  return {
    path: 'blog',
    breadcrumbName: '博客',
    getComponent: getComponent(store, { containerName: 'Blog', key: 'blog' }),
    childRoutes: [
      {
        path: 'detail/:id',
        breadcrumbName: '博客详情',
        getComponent: getComponent(store, { containerName: 'BlogDetail', reducerName: 'Blog', key: 'blog' })
      }
    ]
  };
}
