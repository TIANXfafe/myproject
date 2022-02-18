﻿export default [
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
        component: './Error/404',
      },
    ],
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    icon: 'DashboardOutlined',
    routes: [
      {
        path: '/dashboard/analysis',
        name: 'analysis',
        component: './Dashboard/Analysis'
      },
      {
        path: '/dashboard/workplace',
        name: 'workplace',
        component: './Dashboard/Workplace'
      },
      {
        component: './Error/404',
      }
    ]
  },
  {
    path: '/article',
    name: 'article',
    icon: 'BookOutlined',
    routes: [
      {
        path: '/article/classify',
        name: 'classify',
        component: './Article/Classify'
      },
      {
        path: '/article/list',
        name: 'list',
        component: './Article/List'
      },
      {
        path: '/article/detail',
        component: './Article/Detail'
      },
      {
        component: './Error/404',
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
