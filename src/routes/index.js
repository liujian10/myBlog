// We only need to import the modules necessary for initial render
import HomeRouter from './Home';
import CvRoute from './Cv';
import BlogRoute from './Blog';
import WaterFallRoute from './WaterFall';
import DemoRoute from './demo';

/*  Note: Instead of using JSX, we recommend using react-router
 PlainRoute objects to build route definitions.   */

const createRoutes = store => ({
  path: '/',
  breadcrumbName: 'Home',
  indexRoute: HomeRouter(store),
  childRoutes: [
    CvRoute(store),
    BlogRoute(store),
    WaterFallRoute(store),
    DemoRoute(store),
  ]
});

/*  Note: childRoutes can be chunked or otherwise loaded programmatically
 using getChildRoutes with the following signature:

 getChildRoutes (location, cb) {
 require.ensure([], (require) => {
 cb(null, [
 // Remove imports!
 require('./Counter').default(store)
 ])
 })
 }

 However, this is not necessary for code-splitting! It simply provides
 an API for async route definitions. Your code splitting should occur
 inside the route `getComponent` function, since it is only invoked
 when the route exists and matches.
 */

export default createRoutes;
