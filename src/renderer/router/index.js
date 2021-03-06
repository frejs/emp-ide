import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'landing-page',
      component: require('@/views/WorkbenchPage').default
    },
    {
      path: '/workbench',
      name: 'workbench-page',
      component: require('@/views/WorkbenchPage').default
    }
  ]
});
