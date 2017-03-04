import Vue from 'vue';
import Router from 'vue-router';
import Sounds from '@/components/Sounds';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Sounds',
      component: Sounds,
    },
  ],
});
