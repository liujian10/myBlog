import { injectReducer } from '../../store/reducers'
import Blog from './containers/BlogContainer'

const getComponent = (store, name) => (nextState, cb) => {
  /*  Webpack - use 'require.ensure' to create a split point
 and embed an async module loader (jsonp) when bundling   */
  require.ensure([], (require) => {
    console.log(name)
    /*  Webpack - use require callback to define
     dependencies for bundling   */
    const Counter = require('./containers/' + name + 'Container').default
    const reducer = require('./modules/Blog').default
    /*  Add the reducer to the store on key 'blog'  */
    injectReducer(store, { key: 'blog', reducer })

    /*  Return getComponent   */
    cb(null, Counter)

    /* Webpack named bundle   */
  }, 'blog')
}

export default (store) => ({
  path: 'blog',
  component: Blog,
  childRoutes: [
    {
      path:':id',
      breadcrumbName: '博客详情',
      getComponent: getComponent(store, 'BlogDetail')
    }
  ]
})
