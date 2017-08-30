import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path : 'cashier',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
     and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
       dependencies for bundling   */
      const Cashier = require('./containers/CashierContainer').default
      const reducer = require('./modules/cashier').default

      /*  Add the reducer to the store on key 'counter'  */
      injectReducer(store, { key: 'cashier', reducer })

      /*  Return getComponent   */
      cb(null, Cashier)

      /* Webpack named bundle   */
    }, 'counter')
  }
})
