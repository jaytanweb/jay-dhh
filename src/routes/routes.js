import Global from '@/layout/Global';

const routes = [
  {
    path: '/',
    component: Global,

    routes: [
      {
        path: '/',
        exact: true,
        redirect: '/login',
      },
      {
        path: '/login',
        component: '/Login',
        title: 'Login',
      },
      {
        // path: '*',
        component: '/page404',
        title: '404',
      },
    ],
  },
  {
    // path: '*',
    component: '/page404',
    title: '404',
  },
];

export default routes;
