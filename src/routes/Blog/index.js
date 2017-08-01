import Dashboard from './containers/BlogContainer'
import BlogReducer from './modules/blog'
import {injectReducer} from '../../store/reducers'

export default (store) => ({
    path: 'blog',
    /*  Async getComponent is only invoked when route matches   */
    getComponent (nextState, cb) {
        /*  Webpack - use 'require.ensure' to create a split point
         and embed an async module loader (jsonp) when bundling   */
        require.ensure([], (require) => {
            /*  Webpack - use require callback to define
             dependencies for bundling   */

            /*  Add the reducer to the store on key 'counter'  */
            injectReducer(store, {key: 'blog', BlogReducer});

            /*  Return getComponent   */
            cb(null, Dashboard);

            /* Webpack named bundle   */
        }, 'counter')
    },
    childRoutes: []
});