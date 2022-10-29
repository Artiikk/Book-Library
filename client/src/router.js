import Vue from 'vue'
import Router from 'vue-router'
import BooksView from '@/views/Books/booksList'
import { checkIfUserIsAuthorized } from './utils/helpers/auth'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: BooksView,
      beforeEnter: checkIfUserIsAuthorized
    },
    {
      path: '/login',
      component: () => import('./views/Authorization/Login')
    },
    {
      path: '/registration',
      component: () => import('./views/Authorization/Registration')
    }
  ]
})
