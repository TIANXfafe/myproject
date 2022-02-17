export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        path: '/user',
        routes: [
          {
            name: 'login',
            path: '/user/login',
            component: './user/Login',
          },
        ],
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/',
    name: 'dashboard',
    icon: 'DashboardOutlined',
    routes: [
      {
        path: '/analysis',
        name: 'analysis',
        icon: 'FundOutlined',
        component: './Dashboard/Analysis'
      },
      {
        path: '/workplace',
        name: 'workplace',
        icon: 'FundOutlined',
        component: './Dashboard/Workplace'
      }
    ]
  },
  {
    path: '/',
    redirect: '/analysis',
  },
  {
    component: './Error/404',
  },
];
