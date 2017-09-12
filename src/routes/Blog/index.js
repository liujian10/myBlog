import { injectReducer } from '../../store/reducers'

let containers = false
const getComponent = (store, name) => (nextState, cb) => {
  console.log(name)
  if (containers) {
    cb(null, containers[`${name}Container`])
    return
  }
  /*  Webpack - use 'require.ensure' to create a split point
 and embed an async module loader (jsonp) when bundling   */
  require.ensure([], (require) => {
    /*  Webpack - use require callback to define
     dependencies for bundling   */
    containers = require('./containers')
    const reducer = require('./modules/Blog').default
    /*  Add the reducer to the store on key 'blog'  */
    injectReducer(store, { key: 'blog', reducer })

    /*  Return getComponent   */
    cb(null, containers[`${name}Container`])

    /* Webpack named bundle   */
  }, 'blog')
}

export default (store) => {
  console.log(store)
  return {
    path: 'blog',
    getComponent: getComponent(store, 'Blog'),
    childRoutes: [
      {
        path: 'detail/:id',
        breadcrumbName: '博客详情',
        getComponent: getComponent(store, 'BlogDetail')
      }
    ]
  }
}
