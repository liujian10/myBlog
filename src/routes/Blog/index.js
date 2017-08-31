import { injectReducer } from '../../store/reducers'

const getComponent = (store, name) => (nextState, cb) => {
  /*  Webpack - use 'require.ensure' to create a split point
   and embed an async module loader (jsonp) when bundling   */
  require.ensure([], (require) => {
    /*  Webpack - use require callback to define
     dependencies for bundling   */
    const Counter = require('./containers/BlogContainer').default
    const reducer = require('./modules/blog').default

    /*  Add the reducer to the store on key 'blog'  */
    injectReducer(store, { key: 'blog', reducer })

    /*  Return getComponent   */
    cb(null, Counter)

    /* Webpack named bundle   */
  }, 'blog')
}

export default (store) => ({
  path: 'blog',
  indexRoute: { getComponent: getComponent(store, 'Blog') },
  childRoutes: [
    {
      path:':id',
      getComponent: getComponent(store, 'BlogDetail')
    }
  ]
})
