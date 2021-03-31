import Vue from 'vue';
import Router from 'vue-router';
// import Dashboard from '@/components/Dashboard/Dashboard';
// import Clients from '@/components/Clients/Clients';
// import ClientForm from '@/components/Clients/ClientForm';
// import UserLogin from '@/components/Login/UserLogin';
// import Mortgage from '@/components/Mortgage/Mortgage';
// import MortgageForm from '@/components/Mortgage/MortgageForm';

import { routes } from './routes'
Vue.use(Router)

// export default new Router({
//   routes: [
//     {
//       path: '/',
//       name: 'Dashboard',
//       component: Dashboard
//     },
//     {
//       name: 'login',
//       path: '/login',
//       component: UserLogin
//     },
//     {
//       path: '/clients',
//       name: 'Clients',
//       component: Clients,
//     },
//     {
//       path: '/clientForm',
//       name: 'ClientForm',
//       component: ClientForm
//     },
//     {
//       path: '/mortgage',
//       name: 'Mortgage',
//       component: Mortgage,
//     },
//     {
//       path: '/mortgageForm',
//       name: 'MortgageForm',
//       component: MortgageForm,
//     }
//   ]
// })



 const router = new Router({
  mode: 'history',
  routes
});
const devMode = process.env.NODE_ENV !== 'production';


router.beforeEach((to, from, next) => {
  
  // redirect to login page if not logged in and trying to access a restricted page
  const authRequired = !to.meta.noAuth;
  const loggedIn = localStorage.getItem('user');

  if(devMode){
    console.log('routing from ' + from.name + ' to ' + to.name);
  }
  if (authRequired && !loggedIn) {
    return next('/login');
  }
  
  next();
});


export default router;