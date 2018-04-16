import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Todos from '@/components/Todos'
import EditTodo from '@/components/EditTodo'
import Login from '@/views/Login'
import Activos from '@/components/Activos'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: HelloWorld
    },
    {
      path: '/todos',
      name: 'Todos',
      component: Todos
    },
    {
      path: '/todos/:todoId',
      name: 'EditTodo',
      component: EditTodo
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/activos',
      name: 'Activos',
      component: Activos
    }
  ]
})
